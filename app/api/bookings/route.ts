import { NextRequest, NextResponse } from 'next/server';
import { createServerServiceClient } from '@/lib/supabase-server';
import {
  withApiMiddleware,
  bookingValidationSchema,
  successResponse,
  ValidationError,
  DatabaseError,
  getClientIP,
  getUserAgent,
} from '@/lib/api-middleware';
import { slackService, emailService, analyticsService } from '@/lib/services';
import { createEvent } from 'ics';
import type { BookingInsert, Lead } from '@/lib/supabase';

// Helper function to check slot availability
async function isSlotAvailable(supabase: any, date: string, time: string): Promise<boolean> {
  const { data: existingBookings, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('slot_date', date)
    .eq('slot_time', time)
    .neq('status', 'cancelled');

  if (error) {
    throw new DatabaseError('Failed to check slot availability');
  }

  return existingBookings.length === 0;
}

// Helper function to generate ICS calendar invite
function generateICSFile(booking: any, lead?: Lead): string | null {
  try {
    const startDate = new Date(`${booking.slot_date}T${booking.slot_time}:00`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour appointment

    const event = {
      start: [
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
      ] as [number, number, number, number, number],
      end: [
        endDate.getFullYear(),
        endDate.getMonth() + 1,
        endDate.getDate(),
        endDate.getHours(),
        endDate.getMinutes(),
      ] as [number, number, number, number, number],
      title: 'Wild West Construction Appointment',
      description: lead
        ? `Appointment with Wild West Construction\n\nContact: ${lead.name}\nPhone: ${lead.mobile}${lead.email ? `\nEmail: ${lead.email}` : ''}${lead.address ? `\nAddress: ${lead.address}` : ''}`
        : 'Appointment with Wild West Construction',
      location: lead?.address || 'TBD',
      organizer: { name: 'Wild West Construction', email: 'appointments@wildwestconstruction.com' },
      attendees: lead?.email ? [{ name: lead.name, email: lead.email }] : [],
      status: 'CONFIRMED' as const,
      busyStatus: 'BUSY' as const,
      productId: 'Wild West Construction/Booking System',
    };

    const { error, value } = createEvent(event);

    if (error) {
      console.error('ICS generation error:', error);
      return null;
    }

    return value || null;
  } catch (error) {
    console.error('Failed to generate ICS file:', error);
    return null;
  }
}

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
      const validationResult = bookingValidationSchema.safeParse(requestData);
      if (!validationResult.success) {
        const errors = validationResult.error.issues
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        throw new ValidationError(`Validation failed: ${errors}`);
      }

      const validatedData = validationResult.data;

      // Validate date is not in the past
      const bookingDateTime = new Date(`${validatedData.slot_date}T${validatedData.slot_time}:00`);
      const now = new Date();

      if (bookingDateTime <= now) {
        throw new ValidationError('Cannot book appointments in the past');
      }

      // Check if the slot is available
      const slotAvailable = await isSlotAvailable(
        supabase,
        validatedData.slot_date,
        validatedData.slot_time
      );
      if (!slotAvailable) {
        throw new ValidationError('The selected time slot is no longer available');
      }

      // Get client information
      const ip = getClientIP(req);
      const userAgent = getUserAgent(req);

      // Prepare booking data for insertion
      const bookingData: BookingInsert = {
        lead_id: validatedData.lead_id || null,
        slot_date: validatedData.slot_date,
        slot_time: validatedData.slot_time,
        status: validatedData.status || 'pending',
      };

      // Insert booking into database
      const { data: insertedBooking, error: insertError } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select('*')
        .single();

      if (insertError) {
        console.error('Database error inserting booking:', insertError);
        throw new DatabaseError('Failed to create booking');
      }

      const bookingId = insertedBooking.id;

      // Get lead information if lead_id is provided
      let leadData: Lead | null = null;
      if (validatedData.lead_id) {
        const { data: lead, error: leadError } = await supabase
          .from('leads')
          .select('*')
          .eq('id', validatedData.lead_id)
          .single();

        if (!leadError && lead) {
          leadData = lead;
        }
      }

      // Generate ICS calendar file
      const icsContent = generateICSFile(insertedBooking, leadData || undefined);

      // Send notifications (fire and forget)
      const promises = [];

      // Slack notification
      promises.push(
        slackService
          .notifyNewBooking({
            booking: insertedBooking,
            type: 'booking',
            metadata: {
              leadData: leadData
                ? {
                    name: leadData.name,
                    email: leadData.email,
                    mobile: leadData.mobile,
                  }
                : undefined,
              ip,
              userAgent,
            },
          })
          .catch((error) => {
            console.error('Slack booking notification failed:', error);
          })
      );

      // Email confirmation
      if (leadData && leadData.email) {
        promises.push(
          emailService
            .sendBookingConfirmation({
              booking: insertedBooking,
              lead: leadData,
              icsAttachment: icsContent || undefined,
            })
            .catch((error) => {
              console.error('Booking email confirmation failed:', error);
            })
        );
      }

      // Analytics tracking
      promises.push(
        analyticsService
          .trackBooking(
            {
              bookingId: bookingId,
              leadId: validatedData.lead_id,
              date: validatedData.slot_date,
              time: validatedData.slot_time,
              status: insertedBooking.status,
              value: 250, // Default booking value
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('Booking analytics tracking failed:', error);
          })
      );

      // Track custom booking event
      promises.push(
        analyticsService
          .trackCustomEvent(
            'appointment_booked',
            {
              event_category: 'booking',
              event_label: `${validatedData.slot_date}_${validatedData.slot_time}`,
              booking_id: bookingId.toString(),
              lead_id: validatedData.lead_id?.toString(),
              appointment_date: validatedData.slot_date,
              appointment_time: validatedData.slot_time,
              booking_status: insertedBooking.status,
              has_lead: !!validatedData.lead_id,
              has_email: !!(leadData && leadData.email),
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('Booking event tracking failed:', error);
          })
      );

      // Execute all promises without waiting
      Promise.allSettled(promises);

      // Return success response
      const responseData = {
        bookingId: bookingId,
        message: 'Booking created successfully',
        appointment: {
          date: insertedBooking.slot_date,
          time: insertedBooking.slot_time,
          status: insertedBooking.status,
        },
        confirmationSent: !!(leadData && leadData.email),
        calendarInvite: !!icsContent,
      };

      return NextResponse.json(successResponse(responseData), { status: 201 });
    } catch (error: any) {
      console.error('Booking creation error:', error);

      // Track error in analytics
      analyticsService
        .trackApiError(
          '/api/bookings',
          error.constructor.name,
          error.message,
          req.headers.get('x-client-id') || undefined
        )
        .catch(console.error);

      // Send error to Slack
      slackService
        .notifyError(`Booking creation failed: ${error.message}`, {
          endpoint: '/api/bookings',
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

// GET endpoint to check slot availability
export const GET = withApiMiddleware(
  async (req: NextRequest) => {
    const supabase = createServerServiceClient();

    try {
      const { searchParams } = new URL(req.url);
      const date = searchParams.get('date');
      const time = searchParams.get('time');

      if (!date || !time) {
        throw new ValidationError('Date and time parameters are required');
      }

      // Validate date format (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new ValidationError('Invalid date format. Use YYYY-MM-DD');
      }

      // Validate time format (HH:MM)
      if (!/^\d{2}:\d{2}$/.test(time)) {
        throw new ValidationError('Invalid time format. Use HH:MM');
      }

      const available = await isSlotAvailable(supabase, date, time);

      const responseData = {
        date,
        time,
        available,
        message: available ? 'Slot is available' : 'Slot is not available',
      };

      return NextResponse.json(successResponse(responseData), { status: 200 });
    } catch (error: any) {
      console.error('Slot availability check error:', error);
      throw error;
    }
  },
  { methods: ['GET'], skipRateLimit: true }
); // Skip rate limit for availability checks
