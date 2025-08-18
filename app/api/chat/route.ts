import { NextRequest, NextResponse } from 'next/server';
import { createServerServiceClient } from '@/lib/supabase-server';
import {
  withApiMiddleware,
  successResponse,
  errorResponse,
  ValidationError,
  getClientIP,
  getUserAgent,
} from '@/lib/api-middleware';
import { analyticsService } from '@/lib/services';
import type { ChatSessionInsert } from '@/supabase/types/database.types';

// Conditionally initialize OpenAI only if API key is available
let openai: any = null;

// Initialize OpenAI lazily to avoid build-time errors
const getOpenAIClient = () => {
  if (!openai && process.env.OPENAI_API_KEY) {
    try {
      const OpenAI = require('openai');
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
    }
  }
  return openai;
};

const SYSTEM_PROMPT = `You are a helpful assistant for Wild West Construction, a construction company serving Salt Lake County, Utah. 

KEY INFORMATION:
- Services: Flooring (hardwood, LVP, tile, carpet), Kitchen/Bath remodeling, Home additions, Commercial construction, Junk removal
- Service areas: Salt Lake County cities including Salt Lake City, West Valley City, West Jordan, Murray, Midvale, Sandy, Draper, South Jordan, Riverton, Taylorsville, Millcreek, etc.
- Business hours: 8 AM - 6 PM, Monday-Saturday
- Contact: Available for estimates, measurements, site visits, junk pickup windows

GUARDRAILS (CRITICAL - ALWAYS FOLLOW):
1. NEVER provide specific pricing, cost estimates, or price ranges
2. NEVER make scheduling commitments or promise specific appointment times
3. NEVER guarantee completion timelines or project durations
4. NEVER provide technical specifications without proper assessment
5. ALWAYS redirect pricing questions to: "I'd be happy to connect you with our team for a free, no-obligation estimate that considers your specific needs and requirements."
6. ALWAYS redirect scheduling to: "Our team can work with you to find the best time. Would you like me to help connect you with them?"

ESCALATION TRIGGERS:
- Complex technical questions about structural work
- Specific material recommendations requiring assessment
- Permit or code-related questions
- Insurance or warranty claims
- Complaints or service issues
- Requests for detailed project planning

HELPFUL TOPICS:
- General service information and descriptions
- Service area verification (Salt Lake County cities)
- Basic FAQ about processes and approach
- Lead capture and contact information
- Next steps and what to expect

LEAD CAPTURE PROCESS:
When user shows genuine interest:
1. Ask for their name and preferred contact method
2. Ask about their project type and location
3. Get consent: "Can I have our team contact you within 24 hours?"
4. Explain next steps: "Our team will reach out to schedule a free consultation"
5. Offer immediate connection: "Would you also like our direct contact information?"

TONE:
- Professional but friendly
- Helpful and informative
- Confident in our services
- Respectful of customer's time
- Encouraging about next steps

Remember: Your goal is to provide helpful information while guiding interested customers to connect with our team for specific project details, pricing, and scheduling.`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  sessionId: string;
}

export const POST = withApiMiddleware(
  async (req: NextRequest) => {
    const supabase = createServerServiceClient();

    try {
      // Check if OpenAI is configured
      const client = getOpenAIClient();
      if (!client) {
        return NextResponse.json(
          errorResponse('Chat feature is currently unavailable. Please contact us directly.'),
          { status: 503 }
        );
      }

      // Parse request body
      let requestData: ChatRequestBody;
      try {
        requestData = await req.json();
      } catch (error) {
        throw new ValidationError('Invalid JSON in request body');
      }

      const { messages, sessionId } = requestData;

      // Validate input
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        throw new ValidationError('Messages array is required and must not be empty');
      }

      if (!sessionId || typeof sessionId !== 'string') {
        throw new ValidationError('Session ID is required');
      }

      // Validate message format
      for (const message of messages) {
        if (!message.role || !message.content) {
          throw new ValidationError('Each message must have role and content');
        }
        if (!['user', 'assistant', 'system'].includes(message.role)) {
          throw new ValidationError('Invalid message role');
        }
      }

      // Get the latest user message
      const userMessages = messages.filter((m) => m.role === 'user');
      const latestUserMessage = userMessages[userMessages.length - 1];

      if (!latestUserMessage) {
        throw new ValidationError('No user message found');
      }

      // Prepare messages for OpenAI (include system prompt)
      const openaiMessages: ChatMessage[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-10), // Keep last 10 messages for context
      ];

      // Get client information for logging
      const ip = getClientIP(req);
      const userAgent = getUserAgent(req);

      try {
        // Call OpenAI API
        const completion = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: openaiMessages,
          max_tokens: 500,
          temperature: 0.7,
          frequency_penalty: 0.1,
          presence_penalty: 0.1,
        });

        const assistantMessage = completion.choices[0]?.message?.content;

        if (!assistantMessage) {
          throw new Error('No response from OpenAI');
        }

        // Log conversation to database (fire and forget)
        const conversationData: ChatSessionInsert = {
          conversation: {
            session_id: sessionId,
            messages: messages.concat([{ role: 'assistant', content: assistantMessage }]) as any,
            ip,
            user_agent: userAgent,
            timestamp: new Date().toISOString(),
          } as any,
          captured_lead_id: null, // Will be updated if lead is captured
        };

        supabase
          .from('chat_sessions')
          .upsert(conversationData, { onConflict: 'id' })
          .then(({ error }) => {
            if (error) {
              console.error('Failed to log chat session:', error);
            }
          });

        // Track analytics (fire and forget)
        Promise.allSettled([
          analyticsService.trackCustomEvent('chat_api_call', {
            session_id: sessionId,
            message_count: messages.length,
            user_message_length: latestUserMessage.content.length,
            response_length: assistantMessage.length,
            model: 'gpt-4o-mini',
          }),

          // Track tokens used for cost monitoring
          analyticsService.trackCustomEvent('openai_tokens_used', {
            session_id: sessionId,
            prompt_tokens: completion.usage?.prompt_tokens || 0,
            completion_tokens: completion.usage?.completion_tokens || 0,
            total_tokens: completion.usage?.total_tokens || 0,
          }),
        ]).catch(console.error);

        return NextResponse.json(
          successResponse({
            message: assistantMessage,
            sessionId,
            tokensUsed: completion.usage?.total_tokens || 0,
          })
        );
      } catch (openaiError: any) {
        console.error('OpenAI API error:', openaiError);

        // Track OpenAI errors
        analyticsService
          .trackCustomEvent('openai_error', {
            session_id: sessionId,
            error_type: openaiError.code || 'unknown',
            error_message: openaiError.message || 'Unknown OpenAI error',
          })
          .catch(console.error);

        // Provide fallback response
        const fallbackMessage =
          "I apologize, but I'm having trouble responding right now. Please contact our team directly at your convenience, and we'll be happy to help with your construction project questions.";

        return NextResponse.json(
          successResponse({
            message: fallbackMessage,
            sessionId,
            tokensUsed: 0,
          })
        );
      }
    } catch (error: any) {
      console.error('Chat API error:', error);

      // Track API errors
      analyticsService
        .trackCustomEvent('chat_api_error', {
          error_type: error.constructor.name,
          error_message: error.message,
          ip: getClientIP(req),
        })
        .catch(console.error);

      // Re-throw to be handled by middleware
      throw error;
    }
  },
  {
    methods: ['POST'],
  }
);

// Handle preflight requests
export const OPTIONS = withApiMiddleware(
  async (req: NextRequest) => {
    return NextResponse.json(successResponse({ message: 'OK' }), { status: 200 });
  },
  { methods: ['OPTIONS'], skipRateLimit: true }
);
