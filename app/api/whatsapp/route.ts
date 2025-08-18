import { NextRequest, NextResponse } from 'next/server';
import {
  withApiMiddleware,
  whatsappTrackingSchema,
  successResponse,
  ValidationError,
  getClientIP,
  getUserAgent,
} from '@/lib/api-middleware';
import { slackService, analyticsService } from '@/lib/services';

export const POST = withApiMiddleware(
  async (req: NextRequest) => {
    try {
      // Parse request body
      let requestData;
      try {
        requestData = await req.json();
      } catch (error) {
        throw new ValidationError('Invalid JSON in request body');
      }

      // Validate request data
      const validationResult = whatsappTrackingSchema.safeParse(requestData);
      if (!validationResult.success) {
        const errors = validationResult.error.issues
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        throw new ValidationError(`Validation failed: ${errors}`);
      }

      const validatedData = validationResult.data;

      // Get client information
      const ip = getClientIP(req);
      const userAgent = getUserAgent(req);
      const timestamp = new Date().toISOString();

      // Extract UTM parameters
      const utmParams = analyticsService.extractUtmParams(validatedData.utm_params || {});

      // Send notifications (fire and forget)
      const promises = [];

      // Slack notification
      promises.push(
        slackService
          .notifyWhatsAppClick({
            type: 'whatsapp_click',
            metadata: {
              ip,
              userAgent,
              page_path: validatedData.page_path,
              utm_params: utmParams,
              consent: validatedData.consent,
              timestamp,
            },
          })
          .catch((error) => {
            console.error('Slack WhatsApp notification failed:', error);
          })
      );

      // Analytics tracking
      promises.push(
        analyticsService
          .trackWhatsAppClick(
            {
              page_path: validatedData.page_path,
              utm_source: utmParams.utm_source,
              utm_medium: utmParams.utm_medium,
              utm_campaign: utmParams.utm_campaign,
              utm_term: utmParams.utm_term,
              utm_content: utmParams.utm_content,
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('WhatsApp click analytics tracking failed:', error);
          })
      );

      // Track custom engagement event
      promises.push(
        analyticsService
          .trackCustomEvent(
            'whatsapp_engagement',
            {
              event_category: 'engagement',
              event_label: 'whatsapp_click',
              page_location: validatedData.page_path || 'unknown',
              engagement_type: 'whatsapp',
              consent_given: validatedData.consent,
              source: utmParams.utm_source || 'direct',
              medium: utmParams.utm_medium || 'website',
              campaign: utmParams.utm_campaign || 'organic',
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('WhatsApp engagement tracking failed:', error);
          })
      );

      // Execute all promises without waiting
      Promise.allSettled(promises);

      // Log the WhatsApp click for internal tracking
      console.log('WhatsApp click tracked:', {
        ip,
        userAgent: userAgent.substring(0, 100), // Truncate for logging
        page_path: validatedData.page_path,
        utm_params: utmParams,
        consent: validatedData.consent,
        timestamp,
      });

      // Return success response
      const responseData = {
        message: 'WhatsApp click tracked successfully',
        timestamp,
        tracked: true,
      };

      return NextResponse.json(successResponse(responseData), { status: 200 });
    } catch (error: any) {
      console.error('WhatsApp tracking error:', error);

      // Track error in analytics
      analyticsService
        .trackApiError(
          '/api/whatsapp',
          error.constructor.name,
          error.message,
          req.headers.get('x-client-id') || undefined
        )
        .catch(console.error);

      // Send error to Slack (but don't spam for tracking errors)
      if (!(error instanceof ValidationError)) {
        slackService
          .notifyError(`WhatsApp tracking failed: ${error.message}`, {
            endpoint: '/api/whatsapp',
            ip: getClientIP(req),
            userAgent: getUserAgent(req),
            error: error.stack,
          })
          .catch(console.error);
      }

      // Re-throw to be handled by middleware
      throw error;
    }
  },
  { methods: ['POST'] }
);

// Handle preflight requests
export const OPTIONS = withApiMiddleware(
  async (req: NextRequest) => {
    return NextResponse.json(successResponse({ message: 'OK' }), { status: 200 });
  },
  { methods: ['OPTIONS'], skipRateLimit: true }
);
