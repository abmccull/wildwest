import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '../../../../lib/services/email.service';
import type { Lead, Booking } from '../../../../lib/supabase';

// Test endpoint for email functionality
export async function POST(request: NextRequest) {
  try {
    const { testType, email, ...testData } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email address is required for testing' }, { status: 400 });
    }

    let result: boolean = false;
    let message: string = '';

    switch (testType) {
      case 'basic':
        result = await emailService.testEmail(email);
        message = 'Basic email test';
        break;

      case 'lead_confirmation':
        const mockLead: Lead = {
          id: 999,
          name: testData.name || 'John Doe',
          mobile: testData.mobile || '555-123-4567',
          email: email,
          address: testData.address || '123 Test Street, Test City, UT 84000',
          preferred_date: testData.preferred_date || new Date().toISOString().split('T')[0],
          preferred_time: testData.preferred_time || '10:00',
          details: testData.details || 'This is a test lead confirmation email.',
          whatsapp_consent: testData.whatsapp_consent || false,
          sms_consent: false,
          city_id: null,
          service_id: null,
          utm_params: null,
          page_path: null,
          created_at: new Date().toISOString(),
        };

        result = await emailService.sendLeadConfirmation({
          lead: mockLead,
          leadId: 999,
        });
        message = 'Lead confirmation email test';
        break;

      case 'booking_confirmation':
        const mockBooking: Booking = {
          id: 888,
          lead_id: 999,
          slot_date: testData.slot_date || new Date().toISOString().split('T')[0],
          slot_time: testData.slot_time || '14:00',
          status: 'confirmed',
          created_at: new Date().toISOString(),
        } as Booking;

        const mockLeadForBooking: Lead = {
          id: 999,
          name: testData.name || 'Jane Smith',
          mobile: testData.mobile || '555-987-6543',
          email: email,
          address: testData.address || '456 Demo Avenue, Demo City, UT 84001',
          preferred_date: null,
          preferred_time: null,
          details: null,
          whatsapp_consent: false,
          sms_consent: false,
          city_id: null,
          service_id: null,
          utm_params: null,
          page_path: null,
          created_at: new Date().toISOString(),
        };

        result = await emailService.sendBookingConfirmation({
          booking: mockBooking,
          lead: mockLeadForBooking,
        });
        message = 'Booking confirmation email test';
        break;

      case 'internal_notification':
        result = await emailService.sendInternalNotification(
          'Test Internal Notification',
          `<p>This is a test internal notification sent to: ${email}</p>
           <p>Generated at: ${new Date().toISOString()}</p>
           <p>Test data: ${JSON.stringify(testData, null, 2)}</p>`,
          email
        );
        message = 'Internal notification email test';
        break;

      default:
        return NextResponse.json(
          {
            error:
              'Invalid test type. Supported types: basic, lead_confirmation, booking_confirmation, internal_notification',
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: result,
      message: `${message} ${result ? 'completed successfully' : 'failed'}`,
      testType,
      email,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json(
      {
        error: 'Email test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// GET endpoint to show available test types and usage
export async function GET() {
  return NextResponse.json({
    message: 'Wild West Construction Email Service Test Endpoint',
    usage: {
      method: 'POST',
      endpoint: '/api/email/test',
      required_fields: ['testType', 'email'],
      test_types: {
        basic: 'Send a simple test email',
        lead_confirmation: 'Test lead confirmation email with mock data',
        booking_confirmation: 'Test booking confirmation email with mock data',
        internal_notification: 'Test internal notification email',
      },
      optional_fields: {
        name: 'Customer name for mock data',
        mobile: 'Phone number for mock data',
        address: 'Address for mock data',
        preferred_date: 'Preferred date (YYYY-MM-DD)',
        preferred_time: 'Preferred time (HH:MM)',
        details: 'Additional details',
        slot_date: 'Booking slot date (YYYY-MM-DD)',
        slot_time: 'Booking slot time (HH:MM)',
        whatsapp_consent: 'WhatsApp consent (boolean)',
      },
      examples: {
        basic_test: {
          testType: 'basic',
          email: 'test@example.com',
        },
        lead_test: {
          testType: 'lead_confirmation',
          email: 'test@example.com',
          name: 'John Doe',
          mobile: '555-123-4567',
          address: '123 Main St, Salt Lake City, UT 84000',
          preferred_date: new Date().toISOString().split('T')[0],
          preferred_time: '10:00',
          details: 'Test lead submission',
        },
        booking_test: {
          testType: 'booking_confirmation',
          email: 'test@example.com',
          name: 'Jane Smith',
          mobile: '555-987-6543',
          slot_date: new Date().toISOString().split('T')[0],
          slot_time: '14:00',
        },
      },
    },
    service_status: 'Email service initialized and ready for testing',
    timestamp: new Date().toISOString(),
  });
}
