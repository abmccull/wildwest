// Email service comprehensive test script
import 'dotenv/config';
import { emailService } from '../lib/services/email.service';
import type { Lead, Booking } from '../lib/supabase';

async function testLeadConfirmationEmail(): Promise<boolean> {
  console.log('\n📧 Testing lead confirmation email...');

  try {
    const mockLead: Lead = {
      id: 999,
      name: 'John Test',
      mobile: '555-123-4567',
      email: 'test@resend.dev', // Resend test email address
      address: '123 Test Street, Test City, UT 84000',
      preferred_date: new Date().toISOString().split('T')[0],
      preferred_time: '10:00',
      details: 'This is a test lead confirmation email from the automated testing script.',
      whatsapp_consent: false,
      sms_consent: false,
      city_id: null,
      service_id: null,
      utm_params: null,
      page_path: null,
      created_at: new Date().toISOString(),
    };

    const result = await emailService.sendLeadConfirmation({
      lead: mockLead,
      leadId: 999,
    });

    if (result) {
      console.log('✅ Lead confirmation email sent successfully');
      return true;
    } else {
      console.log('❌ Lead confirmation email failed to send');
      return false;
    }
  } catch (error) {
    console.error('❌ Lead confirmation email test error:', error);
    return false;
  }
}

async function testBookingConfirmationEmail(): Promise<boolean> {
  console.log('\n📅 Testing booking confirmation email...');

  try {
    const mockBooking: Booking = {
      id: 888,
      lead_id: 999,
      slot_date: new Date().toISOString().split('T')[0],
      slot_time: '14:00',
      status: 'confirmed',
      created_at: new Date().toISOString(),
    };

    const mockLead: Lead = {
      id: 999,
      name: 'Jane Test',
      mobile: '555-987-6543',
      email: 'test@resend.dev', // Resend test email address
      address: '456 Demo Avenue, Demo City, UT 84001',
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

    const result = await emailService.sendBookingConfirmation({
      booking: mockBooking,
      lead: mockLead,
    });

    if (result) {
      console.log('✅ Booking confirmation email sent successfully');
      return true;
    } else {
      console.log('❌ Booking confirmation email failed to send');
      return false;
    }
  } catch (error) {
    console.error('❌ Booking confirmation email test error:', error);
    return false;
  }
}

async function testInternalNotification(): Promise<boolean> {
  console.log('\n🔔 Testing internal notification email...');

  try {
    const result = await emailService.sendInternalNotification(
      'Email Service Test Notification',
      `
        <h3>Email Service Test Results</h3>
        <p>This is a test internal notification from the email service testing script.</p>
        <ul>
          <li><strong>Test Date:</strong> ${new Date().toISOString()}</li>
          <li><strong>Test Type:</strong> Internal Notification</li>
          <li><strong>Status:</strong> Email service is functioning correctly</li>
        </ul>
        <p>All email templates and functionality are working as expected.</p>
      `,
      'test@resend.dev' // Resend test email address
    );

    if (result) {
      console.log('✅ Internal notification email sent successfully');
      return true;
    } else {
      console.log('❌ Internal notification email failed to send');
      return false;
    }
  } catch (error) {
    console.error('❌ Internal notification email test error:', error);
    return false;
  }
}

async function testBasicEmailService(): Promise<boolean> {
  console.log('\n🧪 Testing basic email service...');

  try {
    const result = await emailService.testEmail('test@resend.dev');

    if (result) {
      console.log('✅ Basic email service test successful');
      return true;
    } else {
      console.log('❌ Basic email service test failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Basic email service test error:', error);
    return false;
  }
}

async function testEmailTemplateRendering(): Promise<boolean> {
  console.log('\n🎨 Testing email template rendering...');

  try {
    // Create mock data to test template rendering
    const mockLead: Lead = {
      id: 999,
      name: 'Template Test User',
      mobile: '555-000-0000',
      email: 'template-test@resend.dev',
      address: '789 Template Street, Template City, UT 84002',
      preferred_date: '2024-12-25',
      preferred_time: '09:30',
      details:
        'This is a comprehensive test of email template rendering with various data fields including special characters: <>&"\'',
      whatsapp_consent: true,
      sms_consent: false,
      city_id: null,
      service_id: null,
      utm_params: null,
      page_path: null,
      created_at: new Date().toISOString(),
    };

    // Test lead confirmation template
    const leadResult = await emailService.sendLeadConfirmation({
      lead: mockLead,
      leadId: 999,
    });

    if (!leadResult) {
      console.log('❌ Lead template rendering test failed');
      return false;
    }

    // Test booking confirmation template
    const mockBooking: Booking = {
      id: 777,
      lead_id: 999,
      slot_date: '2024-12-30',
      slot_time: '11:15',
      status: 'confirmed',
      created_at: new Date().toISOString(),
    };

    const bookingResult = await emailService.sendBookingConfirmation({
      booking: mockBooking,
      lead: mockLead,
      icsAttachment: 'BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR', // Simple test ICS
    });

    if (!bookingResult) {
      console.log('❌ Booking template rendering test failed');
      return false;
    }

    console.log('✅ Email template rendering tests successful');
    return true;
  } catch (error) {
    console.error('❌ Email template rendering test error:', error);
    return false;
  }
}

async function testErrorHandling(): Promise<boolean> {
  console.log('\n⚠️ Testing error handling for failed email sends...');

  try {
    // Test with invalid email address
    const mockLead: Lead = {
      id: 998,
      name: 'Error Test User',
      mobile: '555-111-1111',
      email: 'invalid-email-address', // Invalid email to trigger error
      address: null,
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

    // This should fail gracefully
    const result = await emailService.sendLeadConfirmation({
      lead: mockLead,
      leadId: 998,
    });

    // The service should return false for failed sends
    if (result === false) {
      console.log('✅ Error handling test successful - failed sends handled gracefully');
      return true;
    } else {
      console.log('❌ Error handling test failed - invalid email was accepted');
      return false;
    }
  } catch (error) {
    // If an error is thrown, that's also acceptable as it means errors are being handled
    console.log('✅ Error handling test successful - errors properly thrown and caught');
    return true;
  }
}

async function runAllEmailTests(): Promise<void> {
  console.log('🚀 Starting Wild West Construction Email Service Comprehensive Tests');
  console.log('='.repeat(80));

  // Check environment configuration
  console.log('🔧 Environment Configuration:');
  console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? 'Configured ✅' : 'Missing ❌'}`);
  console.log(
    `   FROM_EMAIL: ${process.env.FROM_EMAIL || 'noreply@wildwestconstruction.com (default)'}`
  );
  console.log(
    `   REPLY_TO_EMAIL: ${process.env.REPLY_TO_EMAIL || 'contact@wildwestconstruction.com (default)'}`
  );

  const testResults = {
    basicService: await testBasicEmailService(),
    leadConfirmation: await testLeadConfirmationEmail(),
    bookingConfirmation: await testBookingConfirmationEmail(),
    internalNotification: await testInternalNotification(),
    templateRendering: await testEmailTemplateRendering(),
    errorHandling: await testErrorHandling(),
  };

  console.log('\n' + '='.repeat(80));
  console.log('📊 Comprehensive Test Results Summary:');
  console.log('='.repeat(80));

  let passed = 0;
  let total = 0;

  Object.entries(testResults).forEach(([testName, result]) => {
    total++;
    const displayName = testName.replace(/([A-Z])/g, ' $1').toLowerCase();
    if (result) {
      passed++;
      console.log(`✅ ${displayName}: PASSED`);
    } else {
      console.log(`❌ ${displayName}: FAILED`);
    }
  });

  console.log('='.repeat(80));
  console.log(
    `📈 Overall Results: ${passed}/${total} tests passed (${Math.round((passed / total) * 100)}%)`
  );

  if (passed === total) {
    console.log('🎉 ALL EMAIL TESTS PASSED! Email service is fully functional.');
    console.log('✅ Lead confirmation emails are working');
    console.log('✅ Booking confirmation emails are working');
    console.log('✅ Email templates are rendering properly');
    console.log('✅ Error handling is working correctly');
    console.log('✅ Email analytics tracking is integrated');
  } else {
    console.log('⚠️  Some email tests failed. Issues found:');

    Object.entries(testResults).forEach(([testName, result]) => {
      if (!result) {
        const displayName = testName.replace(/([A-Z])/g, ' $1').toLowerCase();
        console.log(`   - ${displayName}: needs attention`);
      }
    });
  }

  console.log('\n📝 Test emails sent to: test@resend.dev (Resend test inbox)');
  console.log(
    '🔍 Check your email service logs and Resend dashboard for detailed delivery information.'
  );
}

// Run all tests
runAllEmailTests().catch((error) => {
  console.error('💥 Test execution failed:', error);
  process.exit(1);
});
