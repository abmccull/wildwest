import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import {
  withApiMiddleware,
  successResponse,
  errorResponse,
  ValidationError,
  getClientIP,
  getUserAgent,
} from '@/lib/api-middleware';
import { analyticsService } from '@/lib/services';
import { z } from 'zod';

// Validation schema for availability check
const availabilityRequestSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  eventType: z.enum(['estimate', 'measurement', 'site_visit', 'junk_pickup']).optional(),
  duration: z.number().min(30).max(240).optional(), // 30 minutes to 4 hours
});

const BUSINESS_HOURS = {
  start: 8, // 8 AM
  end: 18, // 6 PM
  days: [1, 2, 3, 4, 5, 6], // Monday to Saturday (0 = Sunday)
};

const EVENT_DURATIONS = {
  estimate: 60,
  measurement: 30,
  site_visit: 120,
  junk_pickup: 120,
};

const TRAVEL_BUFFER = 30; // 30 minutes buffer between appointments

export const POST = withApiMiddleware(
  async (req: NextRequest) => {
    const supabase = createServiceClient();

    try {
      // Parse request body
      let requestData;
      try {
        requestData = await req.json();
      } catch (error) {
        throw new ValidationError('Invalid JSON in request body');
      }

      // Validate request data
      const validationResult = availabilityRequestSchema.safeParse(requestData);
      if (!validationResult.success) {
        const errors = validationResult.error.issues
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        throw new ValidationError(`Validation failed: ${errors}`);
      }

      const { date, eventType = 'estimate', duration } = validationResult.data;
      const eventDuration = duration || EVENT_DURATIONS[eventType];

      // Validate date is not in the past
      const requestedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (requestedDate < today) {
        throw new ValidationError('Cannot check availability for past dates');
      }

      // Check if requested date is a business day
      const dayOfWeek = requestedDate.getDay();
      if (!BUSINESS_HOURS.days.includes(dayOfWeek)) {
        return NextResponse.json(
          successResponse({
            date,
            eventType,
            duration: eventDuration,
            availableSlots: [],
            businessDay: false,
            totalSlots: 0,
            existingBookings: 0,
            message: 'We are closed on this day. Please select Monday through Saturday.',
            businessHours: {
              start: `${BUSINESS_HOURS.start}:00`,
              end: `${BUSINESS_HOURS.end}:00`,
              days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            },
          })
        );
      }

      // Get existing bookings for the date
      const { data: existingBookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('slot_time, status')
        .eq('slot_date', date)
        .in('status', ['pending', 'confirmed']);

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        throw new Error('Failed to check existing bookings');
      }

      // Generate all possible time slots for the day
      const generateTimeSlots = () => {
        const slots = [];

        for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
          // Generate 30-minute slots
          for (let minute = 0; minute < 60; minute += 30) {
            const slotStart = new Date(requestedDate);
            slotStart.setHours(hour, minute, 0, 0);

            const slotEnd = new Date(slotStart);
            slotEnd.setMinutes(slotEnd.getMinutes() + eventDuration);

            // Check if slot fits within business hours
            if (
              slotEnd.getHours() <= BUSINESS_HOURS.end ||
              (slotEnd.getHours() === BUSINESS_HOURS.end && slotEnd.getMinutes() === 0)
            ) {
              slots.push({
                time: slotStart.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                }),
                start: slotStart,
                end: slotEnd,
              });
            }
          }
        }

        return slots;
      };

      const allSlots = generateTimeSlots();

      // Filter out unavailable slots
      const availableSlots = allSlots.filter((slot) => {
        // Check against existing bookings
        for (const booking of existingBookings || []) {
          const bookingTime = booking.slot_time;
          const bookingStart = new Date(`${date}T${bookingTime}`);

          // Assume each booking has a default duration if not specified
          const bookingEnd = new Date(bookingStart);
          bookingEnd.setMinutes(bookingEnd.getMinutes() + 60); // Default 1 hour

          // Add travel buffer
          const bufferStart = new Date(bookingStart);
          bufferStart.setMinutes(bufferStart.getMinutes() - TRAVEL_BUFFER);

          const bufferEnd = new Date(bookingEnd);
          bufferEnd.setMinutes(bufferEnd.getMinutes() + TRAVEL_BUFFER);

          // Check for overlap
          if (slot.start < bufferEnd && slot.end > bufferStart) {
            return false; // Slot conflicts with existing booking
          }
        }

        return true; // Slot is available
      });

      // Format available slots for response
      const availableTimeStrings = availableSlots.map((slot) => slot.time);

      // Track availability check
      analyticsService
        .trackCustomEvent('booking_availability_checked', {
          date,
          event_type: eventType,
          duration: eventDuration,
          total_slots: allSlots.length,
          available_slots: availableSlots.length,
          existing_bookings: existingBookings?.length || 0,
        })
        .catch(console.error);

      const responseData = {
        date,
        eventType,
        duration: eventDuration,
        businessDay: true,
        availableSlots: availableTimeStrings,
        totalSlots: allSlots.length,
        existingBookings: existingBookings?.length || 0,
        message:
          availableTimeStrings.length > 0
            ? `Found ${availableTimeStrings.length} available time slots`
            : 'No available time slots for this date',
        businessHours: {
          start: `${BUSINESS_HOURS.start}:00`,
          end: `${BUSINESS_HOURS.end}:00`,
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
      };

      return NextResponse.json(successResponse(responseData));
    } catch (error: any) {
      console.error('Booking availability error:', error);

      // Track error in analytics
      analyticsService
        .trackCustomEvent('booking_availability_error', {
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

// Also support GET requests for simple date checks
export const GET = withApiMiddleware(
  async (req: NextRequest) => {
    try {
      const { searchParams } = new URL(req.url);
      const date = searchParams.get('date');
      const eventType =
        (searchParams.get('eventType') as keyof typeof EVENT_DURATIONS) || 'estimate';

      if (!date) {
        throw new ValidationError('Date parameter is required');
      }

      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new ValidationError('Date must be in YYYY-MM-DD format');
      }

      // Create a minimal request object for the POST handler
      const mockRequest = {
        json: async () => ({ date, eventType }),
      } as NextRequest;

      // Reuse POST logic
      return await POST(mockRequest);
    } catch (error: any) {
      console.error('Booking availability GET error:', error);
      throw error;
    }
  },
  {
    methods: ['GET'],
  }
);

// Handle preflight requests
export const OPTIONS = withApiMiddleware(
  async (req: NextRequest) => {
    return NextResponse.json({ success: true }, { status: 200 });
  },
  { methods: ['OPTIONS'], skipRateLimit: true }
);
