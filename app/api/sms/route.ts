import { NextRequest, NextResponse } from 'next/server';
import {
  withApiMiddleware,
  smsRequestSchema,
  smsTrackingSchema,
  successResponse,
  ValidationError,
  getClientIP,
  getUserAgent,
  sanitizeInput,
  validatePhone,
} from '@/lib/api-middleware';
import { slackService, analyticsService, twilioService } from '@/lib/services';

// POST endpoint for sending SMS messages
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
      const validationResult = smsRequestSchema.safeParse(requestData);
      if (!validationResult.success) {
        const errors = validationResult.error.issues
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        throw new ValidationError(`Validation failed: ${errors}`);
      }

      const validatedData = validationResult.data;

      // Additional phone number validation
      if (!validatePhone(validatedData.phone_number)) {
        throw new ValidationError('Invalid phone number format');
      }

      // Check consent
      if (!validatedData.consent) {
        throw new ValidationError('SMS consent is required');
      }

      // Sanitize message text
      const sanitizedMessage = sanitizeInput(validatedData.message);
      if (sanitizedMessage.length === 0) {
        throw new ValidationError('Message cannot be empty after sanitization');
      }

      // Get client information
      const ip = getClientIP(req);
      const userAgent = getUserAgent(req);
      const timestamp = new Date().toISOString();

      // Extract UTM parameters
      const utmParams = analyticsService.extractUtmParams(validatedData.utm_params || {});

      // Generate message based on type and template data
      let finalMessage = sanitizedMessage;
      if (validatedData.message_type !== 'custom') {
        finalMessage = twilioService.generateMessageTemplate(
          validatedData.message_type,
          validatedData.template_data || {}
        );
      }

      // Send SMS via Twilio service
      const smsResult = await twilioService.sendSms({
        phoneNumber: validatedData.phone_number,
        message: finalMessage,
        leadId: validatedData.lead_id,
        utmParams: validatedData.utm_params,
        pagePath: validatedData.page_path,
        consentGiven: validatedData.consent,
      });

      // Track analytics (fire and forget)
      const promises = [];

      // Track SMS analytics
      promises.push(
        analyticsService
          .trackSmsSent(
            {
              phone_number: validatedData.phone_number,
              message_length: finalMessage.length,
              page_path: validatedData.page_path,
              utm_source: utmParams.utm_source,
              utm_medium: utmParams.utm_medium,
              utm_campaign: utmParams.utm_campaign,
              utm_term: utmParams.utm_term,
              utm_content: utmParams.utm_content,
              success: smsResult.success,
              error_type: smsResult.success ? undefined : 'sms_send_failed',
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('SMS analytics tracking failed:', error);
          })
      );

      // Track custom engagement event
      promises.push(
        analyticsService
          .trackCustomEvent(
            'sms_engagement',
            {
              event_category: 'engagement',
              event_label: 'sms_sent',
              page_location: validatedData.page_path || 'unknown',
              engagement_type: 'sms',
              message_type: validatedData.message_type,
              consent_given: validatedData.consent,
              success: smsResult.success,
              source: utmParams.utm_source || 'direct',
              medium: utmParams.utm_medium || 'website',
              campaign: utmParams.utm_campaign || 'organic',
              phone_number_hash: validatedData.phone_number.slice(-4), // Last 4 digits only for privacy
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('SMS engagement tracking failed:', error);
          })
      );

      // Slack notification for successful SMS
      if (smsResult.success) {
        promises.push(
          slackService
            .notifyError(`SMS sent successfully to ${validatedData.phone_number.slice(-4)}`, {
              endpoint: '/api/sms',
              details: {
                phone: `***-***-${validatedData.phone_number.slice(-4)}`,
                message_type: validatedData.message_type,
                message_length: finalMessage.length,
                lead_id: validatedData.lead_id,
                twilio_sid: smsResult.twilioSid,
                ip,
                utm_params: utmParams,
              },
            })
            .catch((error) => {
              console.error('Slack SMS notification failed:', error);
            })
        );
      } else {
        // Slack notification for failed SMS
        promises.push(
          slackService
            .notifyError(`SMS failed to send: ${smsResult.error}`, {
              endpoint: '/api/sms',
              details: {
                phone: `***-***-${validatedData.phone_number.slice(-4)}`,
                error: smsResult.error,
                message_type: validatedData.message_type,
                lead_id: validatedData.lead_id,
                ip,
                utm_params: utmParams,
              },
            })
            .catch((error) => {
              console.error('Slack SMS error notification failed:', error);
            })
        );
      }

      // Execute all promises without waiting
      Promise.allSettled(promises);

      // Log the SMS attempt for internal tracking
      console.log('SMS request processed:', {
        success: smsResult.success,
        phone: `***-***-${validatedData.phone_number.slice(-4)}`,
        message_type: validatedData.message_type,
        message_length: finalMessage.length,
        lead_id: validatedData.lead_id,
        interaction_id: smsResult.interactionId,
        twilio_sid: smsResult.twilioSid,
        ip,
        userAgent: userAgent.substring(0, 100),
        utm_params: utmParams,
        timestamp,
      });

      // Return response based on SMS result
      if (smsResult.success) {
        const responseData = {
          message: 'SMS sent successfully',
          messageId: smsResult.messageId,
          interactionId: smsResult.interactionId,
          timestamp,
        };

        return NextResponse.json(successResponse(responseData), { status: 200 });
      } else {
        // Return error but don't throw to avoid middleware error handling
        const errorData = {
          message: 'Failed to send SMS',
          error: smsResult.error,
          interactionId: smsResult.interactionId,
          timestamp,
        };

        return NextResponse.json({ success: false, ...errorData }, { status: 400 });
      }
    } catch (error: any) {
      console.error('SMS API error:', error);

      // Track error in analytics
      analyticsService
        .trackApiError(
          '/api/sms',
          error.constructor.name,
          error.message,
          req.headers.get('x-client-id') || undefined
        )
        .catch(console.error);

      // Send error to Slack (but don't spam for validation errors)
      if (!(error instanceof ValidationError)) {
        slackService
          .notifyError(`SMS API failed: ${error.message}`, {
            endpoint: '/api/sms',
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

// PUT endpoint for tracking SMS button clicks (similar to WhatsApp)
export const PUT = withApiMiddleware(
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
      const validationResult = smsTrackingSchema.safeParse(requestData);
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

      // Track analytics (fire and forget)
      const promises = [];

      // Track SMS click analytics
      promises.push(
        analyticsService
          .trackSmsClick(
            {
              phone_number: validatedData.phone_number,
              page_path: validatedData.page_path,
              utm_source: utmParams.utm_source,
              utm_medium: utmParams.utm_medium,
              utm_campaign: utmParams.utm_campaign,
              utm_term: utmParams.utm_term,
              utm_content: utmParams.utm_content,
              success: true,
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('SMS click analytics tracking failed:', error);
          })
      );

      // Track custom engagement event
      promises.push(
        analyticsService
          .trackCustomEvent(
            'sms_click',
            {
              event_category: 'engagement',
              event_label: 'sms_button_click',
              page_location: validatedData.page_path || 'unknown',
              engagement_type: 'sms',
              consent_given: validatedData.consent,
              source: utmParams.utm_source || 'direct',
              medium: utmParams.utm_medium || 'website',
              campaign: utmParams.utm_campaign || 'organic',
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('SMS click engagement tracking failed:', error);
          })
      );

      // Execute all promises without waiting
      Promise.allSettled(promises);

      // Log the SMS click for internal tracking
      console.log('SMS click tracked:', {
        ip,
        userAgent: userAgent.substring(0, 100),
        page_path: validatedData.page_path,
        utm_params: utmParams,
        consent: validatedData.consent,
        timestamp,
      });

      // Return success response
      const responseData = {
        message: 'SMS click tracked successfully',
        timestamp,
        tracked: true,
      };

      return NextResponse.json(successResponse(responseData), { status: 200 });
    } catch (error: any) {
      console.error('SMS tracking error:', error);

      // Track error in analytics
      analyticsService
        .trackApiError(
          '/api/sms/track',
          error.constructor.name,
          error.message,
          req.headers.get('x-client-id') || undefined
        )
        .catch(console.error);

      // Re-throw to be handled by middleware
      throw error;
    }
  },
  { methods: ['PUT'] }
);

// Handle preflight requests
export const OPTIONS = withApiMiddleware(
  async (req: NextRequest) => {
    return NextResponse.json(successResponse({ message: 'OK' }), { status: 200 });
  },
  { methods: ['OPTIONS'], skipRateLimit: true }
);
