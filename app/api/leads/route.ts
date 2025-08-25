import { NextRequest, NextResponse } from 'next/server';
import { createServerServiceClient } from '@/lib/supabase-server';
import {
  withApiMiddleware,
  leadValidationSchema,
  successResponse,
  errorResponse,
  ValidationError,
  DatabaseError,
  getClientIP,
  getUserAgent,
} from '@/lib/api-middleware';
import { slackService, emailService, analyticsService, storageService } from '@/lib/services';
import type { LeadInsert, AttachmentInsert } from '@/lib/supabase';

export const POST = withApiMiddleware(
  async (req: NextRequest) => {
    const supabase = createServerServiceClient();

    try {
      // Parse request body
      let requestData;
      try {
        requestData = await req.json();
      } catch (error) {
        throw new ValidationError('Invalid JSON in request body');
      }

      // Validate request data
      const validationResult = leadValidationSchema.safeParse(requestData);
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

      // Prepare lead data for insertion
      const leadData: LeadInsert = {
        name: validatedData.name.trim(),
        email: validatedData.email?.trim() || null,
        mobile: validatedData.mobile.replace(/\D/g, ''), // Remove non-digits
        city_id: validatedData.city_id || null,
        address: validatedData.address?.trim() || null,
        service_id: validatedData.service_id || null,
        preferred_date: validatedData.preferred_date || null,
        preferred_time: validatedData.preferred_time || null,
        details: validatedData.details?.trim() || null,
        sms_consent: validatedData.sms_consent || false,
        whatsapp_consent: validatedData.whatsapp_consent || false,
        utm_params: (validatedData.utm_params || null) as any,
        page_path: validatedData.page_path || null,
      };

      // Insert lead into database
      const { data: insertedLead, error: insertError } = await supabase
        .from('leads')
        .insert(leadData)
        .select('*')
        .single();

      if (insertError) {
        console.error('Database error inserting lead:', insertError);
        throw new DatabaseError('Failed to save lead information');
      }

      const leadId = insertedLead.id;

      // Handle file attachments if present
      let attachmentUrls: string[] = [];
      if (requestData.attachments && Array.isArray(requestData.attachments)) {
        for (const attachment of requestData.attachments) {
          try {
            // Assume attachments are base64 encoded with metadata
            const { filename, contentType, data: base64Data } = attachment;

            if (filename && contentType && base64Data) {
              // Convert base64 to buffer
              const buffer = Buffer.from(base64Data, 'base64');

              // Upload to storage
              const uploadResult = await storageService.uploadBuffer(
                buffer,
                filename,
                contentType,
                leadId
              );

              if (uploadResult.success && uploadResult.url) {
                // Save attachment record
                const attachmentData: AttachmentInsert = {
                  lead_id: leadId,
                  url: uploadResult.url,
                  type: contentType.startsWith('image/')
                    ? 'photo'
                    : contentType.startsWith('video/')
                      ? 'video'
                      : null,
                };

                const { error: attachmentError } = await supabase
                  .from('attachments')
                  .insert(attachmentData);

                if (attachmentError) {
                  console.error('Failed to save attachment record:', attachmentError);
                } else {
                  attachmentUrls.push(uploadResult.url);
                }

                // Track file upload analytics
                await analyticsService.trackFileUpload(
                  contentType,
                  buffer.length,
                  true,
                  req.headers.get('x-client-id') || undefined
                );
              }
            }
          } catch (attachmentError) {
            console.error('Error processing attachment:', attachmentError);
            // Continue processing other attachments
          }
        }
      }

      // Get related data for notifications
      let serviceName = 'Unknown Service';
      let cityName = 'Unknown City';

      if (validatedData.service_id) {
        const { data: service } = await supabase
          .from('services')
          .select('name')
          .eq('id', validatedData.service_id)
          .single();

        if (service) {
          serviceName = service.name;
        }
      }

      if (validatedData.city_id) {
        const { data: city } = await supabase
          .from('cities')
          .select('name')
          .eq('id', validatedData.city_id)
          .single();

        if (city) {
          cityName = city.name;
        }
      }

      // Send notifications (fire and forget)
      const promises = [];

      // Slack notification
      promises.push(
        slackService
          .notifyNewLead({
            lead: insertedLead,
            type: 'lead',
            metadata: {
              serviceName,
              cityName,
              attachmentCount: attachmentUrls.length,
              ip,
              userAgent,
            },
          })
          .catch((error) => {
            console.error('Slack notification failed:', error);
          })
      );

      // Email confirmation
      if (insertedLead.email) {
        promises.push(
          emailService
            .sendLeadConfirmation({
              lead: insertedLead,
              leadId: leadId,
            })
            .catch((error) => {
              console.error('Email confirmation failed:', error);
            })
        );
      }

      // Analytics tracking
      const utmParams = analyticsService.extractUtmParams(validatedData.utm_params || {});
      promises.push(
        analyticsService
          .trackLead(
            {
              leadId: leadId,
              name: insertedLead.name,
              email: insertedLead.email || undefined,
              mobile: insertedLead.mobile,
              service: serviceName,
              city: cityName,
              source: utmParams.utm_source,
              campaign: utmParams.utm_campaign,
              medium: utmParams.utm_medium,
              value: 100, // Default lead value
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('Analytics tracking failed:', error);
          })
      );

      // Track form submission
      promises.push(
        analyticsService
          .trackFormSubmission(
            'lead_form',
            true,
            {
              form_id: 'main_lead_form',
              has_email: !!insertedLead.email,
              has_service: !!validatedData.service_id,
              has_city: !!validatedData.city_id,
              has_attachments: attachmentUrls.length > 0,
              consent_sms: validatedData.sms_consent,
              consent_whatsapp: validatedData.whatsapp_consent,
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('Form tracking failed:', error);
          })
      );

      // Execute all promises without waiting
      Promise.allSettled(promises);

      // Return success response
      const responseData = {
        leadId: leadId,
        message: 'Lead submitted successfully',
        attachments: attachmentUrls.length > 0 ? attachmentUrls : undefined,
        confirmationSent: !!insertedLead.email,
      };

      return NextResponse.json(successResponse(responseData), { status: 201 });
    } catch (error: any) {
      console.error('Lead submission error:', error);

      // Track error in analytics
      analyticsService
        .trackApiError(
          '/api/leads',
          error.constructor.name,
          error.message,
          req.headers.get('x-client-id') || undefined
        )
        .catch(console.error);

      // Send error to Slack
      slackService
        .notifyError(`Lead submission failed: ${error.message}`, {
          endpoint: '/api/leads',
          ip: getClientIP(req),
          userAgent: getUserAgent(req),
          error: error.stack,
        })
        .catch(console.error);

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
