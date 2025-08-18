// Analytics service test script to verify email tracking
import 'dotenv/config';
import { analyticsService } from '../lib/services/analytics.service';

async function testEmailAnalyticsTracking(): Promise<boolean> {
  console.log('🔍 Testing email analytics tracking...');

  try {
    // Test tracking email confirmation events
    const emailConfirmationResult = await analyticsService.trackCustomEvent(
      'email_confirmation_sent',
      {
        event_category: 'email',
        event_label: 'lead_confirmation',
        email_type: 'lead_confirmation',
        recipient_id: '999',
        recipient_email: 'test@resend.dev',
        template_used: 'lead_confirmation_html',
        confirmation_type: 'lead',
      }
    );

    if (!emailConfirmationResult) {
      console.log('❌ Email confirmation tracking failed');
      return false;
    }

    // Test tracking booking email events
    const bookingEmailResult = await analyticsService.trackCustomEvent('email_confirmation_sent', {
      event_category: 'email',
      event_label: 'booking_confirmation',
      email_type: 'booking_confirmation',
      recipient_id: '888',
      recipient_email: 'test@resend.dev',
      template_used: 'booking_confirmation_html',
      confirmation_type: 'booking',
      booking_date: new Date().toISOString().split('T')[0],
      booking_time: '14:00',
    });

    if (!bookingEmailResult) {
      console.log('❌ Booking email tracking failed');
      return false;
    }

    // Test tracking email delivery failures
    const emailErrorResult = await analyticsService.trackCustomEvent('email_delivery_failed', {
      event_category: 'email_error',
      event_label: 'invalid_email_format',
      error_type: 'validation_error',
      attempted_recipient: 'invalid-email-address',
      email_type: 'lead_confirmation',
    });

    if (!emailErrorResult) {
      console.log('❌ Email error tracking failed');
      return false;
    }

    console.log('✅ Email analytics tracking tests successful');
    return true;
  } catch (error) {
    console.error('❌ Email analytics tracking test error:', error);
    return false;
  }
}

async function testFormSubmissionTracking(): Promise<boolean> {
  console.log('📝 Testing form submission analytics...');

  try {
    const result = await analyticsService.trackFormSubmission('lead_form', true, {
      form_id: 'main_lead_form',
      has_email: true,
      email_confirmation_sent: true,
      has_service: true,
      has_city: true,
      has_attachments: false,
      consent_sms: false,
      consent_whatsapp: true,
    });

    if (result) {
      console.log('✅ Form submission tracking successful');
      return true;
    } else {
      console.log('❌ Form submission tracking failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Form submission tracking test error:', error);
    return false;
  }
}

async function runAnalyticsTests(): Promise<void> {
  console.log('📊 Starting Email Analytics Verification Tests');
  console.log('='.repeat(60));

  // Check environment configuration for analytics
  console.log('🔧 Analytics Configuration:');
  console.log(
    `   GA4_MEASUREMENT_ID: ${process.env.GA4_MEASUREMENT_ID ? 'Configured ✅' : 'Missing ❌'}`
  );
  console.log(`   GA4_API_SECRET: ${process.env.GA4_API_SECRET ? 'Configured ✅' : 'Missing ❌'}`);

  const testResults = {
    emailTracking: await testEmailAnalyticsTracking(),
    formTracking: await testFormSubmissionTracking(),
  };

  console.log('\n' + '='.repeat(60));
  console.log('📈 Analytics Test Results:');
  console.log('='.repeat(60));

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

  console.log('='.repeat(60));
  console.log(
    `📊 Analytics Results: ${passed}/${total} tests passed (${Math.round((passed / total) * 100)}%)`
  );

  if (passed === total) {
    console.log('🎉 All analytics tests passed! Email analytics tracking is working.');
  } else {
    console.log('⚠️  Some analytics tests failed. Check configuration above.');
  }
}

// Run the analytics tests
runAnalyticsTests().catch((error) => {
  console.error('💥 Analytics test execution failed:', error);
  process.exit(1);
});
