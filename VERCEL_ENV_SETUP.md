# Vercel Environment Variables Setup

## Critical Security Update
The old Supabase service role key has been exposed and must be replaced immediately.

## Required Environment Variables for Vercel

### 1. Go to your Vercel project dashboard
Navigate to: Settings > Environment Variables

### 2. Add the following environment variables:

#### Supabase Configuration (REQUIRED)
```
NEXT_PUBLIC_SUPABASE_URL = https://kbzhaqavljuvmyfltfqn.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = [Copy from Supabase API Keys > Publishable key]
SUPABASE_SECRET_KEY = [Copy from Supabase API Keys > Secret keys > default]
```

⚠️ **IMPORTANT SECURITY NOTES:**
- The `SUPABASE_SECRET_KEY` should ONLY be added to Production and Preview environments
- NEVER add the secret key to Development environment if you're sharing the project
- The publishable key is safe to expose in client-side code
- The secret key must NEVER be exposed in client-side code

#### Site Configuration
```
NEXT_PUBLIC_SITE_URL = https://wildwestslc.com
```

#### Optional Services
```
# Twilio (if using SMS features)
TWILIO_ACCOUNT_SID = [Your Twilio Account SID]
TWILIO_AUTH_TOKEN = [Your Twilio Auth Token]
TWILIO_PHONE_NUMBER = [Your Twilio Phone Number]
TWILIO_WHATSAPP_NUMBER = [Your Twilio WhatsApp Number]

# Email Service
EMAIL_HOST = [Your SMTP Host]
EMAIL_PORT = [Your SMTP Port]
EMAIL_SECURE = [true/false]
EMAIL_USER = [Your Email Username]
EMAIL_PASS = [Your Email Password]
EMAIL_FROM = noreply@wildwestslc.com

# Slack Notifications
SLACK_WEBHOOK_URL = [Your Slack Webhook URL]

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID = [Your Google Analytics ID]
NEXT_PUBLIC_FACEBOOK_PIXEL_ID = [Your Facebook Pixel ID]

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY = [Your Turnstile Site Key]
TURNSTILE_SECRET_KEY = [Your Turnstile Secret Key]
```

### 3. Environment Variable Scopes
For each variable, select the appropriate scope:
- **Production**: Live website
- **Preview**: Pull request previews
- **Development**: Local development (be careful with secrets here)

### 4. After Adding Variables
1. Trigger a new deployment for changes to take effect
2. Check the deployment logs for any environment variable errors
3. Test the functionality that depends on these variables

## Local Development Setup

1. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Fill in the actual values in `.env.local`

3. Never commit `.env.local` to version control

## Verification Checklist
- [ ] Old service role key has been disabled in Supabase
- [ ] New API keys have been generated in Supabase
- [ ] Environment variables updated in Vercel
- [ ] Local `.env.local` file updated
- [ ] Deployment successful with new keys
- [ ] Application functionality tested

## Getting the Keys from Supabase

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Under "API Keys" tab:
   - Copy the "Publishable key" for `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - Copy the "Secret key" (default) for `SUPABASE_SECRET_KEY`
4. The Project URL is shown at the top of the API settings page

## Security Best Practices

1. **Rotate keys regularly** - Every 90 days minimum
2. **Use different keys for different environments** - Don't share production keys with development
3. **Monitor key usage** - Check Supabase logs for unusual activity
4. **Limit key permissions** - Use RLS policies to restrict data access
5. **Never commit keys to Git** - Always use environment variables

## Troubleshooting

If you encounter errors after updating:
1. Check Vercel deployment logs for missing environment variables
2. Verify the keys are correctly copied (no extra spaces)
3. Ensure the old keys are fully removed from the codebase
4. Clear browser cache and cookies
5. Check Supabase logs for authentication errors