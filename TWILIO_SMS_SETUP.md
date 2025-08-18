# Twilio SMS Integration Setup

This document outlines the setup and configuration for Twilio SMS integration in the Wild West Construction website.

## Overview

The SMS integration allows customers to send text messages directly to Wild West Construction through a user-friendly interface on the website. The system includes proper consent handling, analytics tracking, rate limiting, and comprehensive error handling.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
TWILIO_TEST_PHONE_NUMBER=your_test_phone_number_here (optional, for testing)
```

### Getting Twilio Credentials

1. **Create a Twilio Account**
   - Go to [Twilio Console](https://console.twilio.com/)
   - Sign up for a new account or log in to existing account

2. **Get Account SID and Auth Token**
   - In the Twilio Console dashboard, find your Account SID and Auth Token
   - Copy these values to your environment variables

3. **Purchase a Phone Number**
   - Go to Phone Numbers > Manage > Buy a number
   - Purchase a phone number that supports SMS
   - Copy the phone number to `TWILIO_PHONE_NUMBER` (include the +1 country code)

4. **Configure Messaging Settings** (Optional)
   - Go to Messaging > Settings > WhatsApp sandbox (if using WhatsApp)
   - Configure webhook URLs for delivery status updates

## Database Migration

The SMS functionality requires a database table to track SMS interactions. Run the migration:

```bash
# If using Supabase CLI
supabase migration up

# Or apply the migration manually in your database
# File: supabase/migrations/20250805120000_create_sms_interactions_table.sql
```

## Features

### 1. SMS Button Component

- **Consent Modal**: TCPA-compliant consent collection
- **Custom Message Input**: Users can customize their message
- **Phone Number Input**: Users provide their own phone number
- **Real-time Validation**: Input validation and error handling
- **Multiple Variants**: Floating, inline, and icon button styles

### 2. API Endpoint

- **Rate Limiting**: 5 requests per minute per IP
- **Input Validation**: Comprehensive validation using Zod schemas
- **Error Handling**: Detailed error responses and logging
- **Analytics Integration**: Automatic event tracking
- **Slack Notifications**: Success/failure notifications

### 3. Analytics Tracking

- **Button Clicks**: Track when users click the SMS button
- **Message Sends**: Track successful and failed SMS sends
- **Consent Events**: Track consent given/declined
- **UTM Parameters**: Capture marketing attribution data

### 4. Database Storage

- **SMS Interactions**: Complete record of all SMS communications
- **Status Tracking**: Pending, sent, delivered, failed statuses
- **Cost Tracking**: SMS cost tracking for analytics
- **Error Logging**: Detailed error messages for troubleshooting

## Usage Examples

### Basic SMS Button (Floating)

```tsx
import { SmsButton } from '@/components/sms';

export default function Page() {
  return (
    <div>
      {/* Floating SMS button - appears fixed on page */}
      <SmsButton variant="floating" />
    </div>
  );
}
```

### Inline SMS Button

```tsx
import { SmsButton } from '@/components/sms';

export default function ContactSection() {
  return (
    <div className="contact-options">
      <SmsButton
        variant="inline"
        showText={true}
        message="I'm interested in your construction services. Please text me back with more information."
      />
    </div>
  );
}
```

### SMS Button with Lead Context

```tsx
import { SmsButton } from '@/components/sms';

export default function LeadConfirmation({ leadId }: { leadId: number }) {
  return (
    <div>
      <SmsButton
        variant="inline"
        leadId={leadId}
        messageType="quote_request"
        templateData={{ name: 'John Doe', service: 'Concrete Work' }}
        message="Thanks for the quote request! I'd like to get more details about the concrete work."
      />
    </div>
  );
}
```

### Custom SMS Integration

```tsx
import { twilioService } from '@/lib/services';

// Send SMS programmatically
const sendCustomSms = async () => {
  const result = await twilioService.sendSms({
    phoneNumber: '+15551234567',
    message: 'Your appointment is confirmed for tomorrow at 2 PM.',
    leadId: 123,
    utmParams: { utm_source: 'website', utm_campaign: 'booking_confirmation' },
    pagePath: '/booking/confirmation',
    consentGiven: true,
  });

  if (result.success) {
    console.log('SMS sent successfully:', result.messageId);
  } else {
    console.error('SMS failed:', result.error);
  }
};
```

## Message Templates

The system includes predefined message templates:

1. **Quote Request**: For customers requesting quotes
2. **Booking Confirmation**: For appointment confirmations
3. **Reminder**: For appointment reminders
4. **Custom**: For custom messages

Templates automatically include opt-out instructions as required by TCPA regulations.

## Compliance & Best Practices

### TCPA Compliance

- ✅ Express written consent collection
- ✅ Clear opt-out instructions in every message
- ✅ Consent storage and tracking
- ✅ Proper disclosures about message/data rates

### Rate Limiting

- 5 SMS requests per minute per IP address
- Additional rate limiting at Twilio level
- Proper error messages for rate limit exceeded

### Privacy & Security

- Phone numbers are masked in logs (show only last 4 digits)
- Input sanitization to prevent XSS attacks
- Secure environment variable storage
- CORS protection for API endpoints

### Error Handling

- Network failures: Graceful degradation
- Twilio API errors: Detailed error messages
- Validation errors: Clear user feedback
- Database errors: Proper logging and fallbacks

## Monitoring & Analytics

### Key Metrics Tracked

- SMS button clicks
- Consent acceptance/decline rates
- Message send success rates
- Response times
- Cost per message
- User engagement by traffic source

### Slack Notifications

The system sends Slack notifications for:

- Successful SMS sends
- Failed SMS attempts
- System errors
- Rate limit violations

### Database Analytics

Query the `sms_interactions` table for:

- Message volume by date/time
- Success/failure rates
- Cost analysis
- UTM source performance
- Lead conversion tracking

## Testing

### Test SMS Configuration

```bash
# Add test phone number to environment
TWILIO_TEST_PHONE_NUMBER=+15551234567

# Test SMS functionality
curl -X POST http://localhost:3000/api/sms \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "+15551234567",
    "message": "Test message from Wild West Construction",
    "consent": true,
    "message_type": "custom"
  }'
```

### Manual Testing Checklist

- [ ] SMS button appears correctly on all pages
- [ ] Consent modal shows on first click
- [ ] Phone number validation works
- [ ] Message character counter works
- [ ] SMS sends successfully
- [ ] Error handling displays properly
- [ ] Analytics events are tracked
- [ ] Database records are created
- [ ] Slack notifications are sent

## Troubleshooting

### Common Issues

1. **SMS Not Sending**
   - Check Twilio credentials in environment variables
   - Verify phone number format includes country code (+1)
   - Check Twilio account balance
   - Review Twilio console for API errors

2. **Consent Modal Not Showing**
   - Clear localStorage: `localStorage.removeItem('sms_consent')`
   - Check browser console for JavaScript errors

3. **Database Errors**
   - Ensure migration has been applied
   - Check Supabase connection and permissions
   - Review database logs for constraint violations

4. **Rate Limiting Issues**
   - Default limit is 5 requests per minute per IP
   - Check IP extraction in middleware
   - Consider adjusting rate limits for development

### Logs to Check

- Browser console for client-side errors
- Next.js server logs for API errors
- Supabase logs for database errors
- Twilio console for SMS delivery status
- Slack channel for system notifications

## Cost Optimization

### SMS Pricing

- Twilio charges per SMS sent (typically $0.0075 per message in US)
- Failed messages may still incur charges
- Consider implementing message queuing for high volume

### Best Practices

- Use message templates to reduce errors
- Implement proper validation to prevent spam
- Monitor usage with Twilio webhooks
- Set up billing alerts in Twilio console

## Security Considerations

1. **Environment Variables**: Never commit credentials to version control
2. **Input Validation**: All inputs are sanitized and validated
3. **Rate Limiting**: Prevents spam and abuse
4. **CORS**: Properly configured for production domains
5. **Phone Number Privacy**: Logs only show last 4 digits
6. **Consent Tracking**: Full audit trail of user consent

## Support

For issues with the SMS integration:

1. Check this documentation first
2. Review error logs and console output
3. Test with Twilio's API explorer
4. Contact development team with specific error messages and steps to reproduce
