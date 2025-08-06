# Deployment Guide - Wild West Construction SEO Site

## Build Configuration Issues and Fixes

### Problem Identified
The Next.js build was failing with Invalid URL errors related to Supabase configuration. The error indicated that the URL had an improper format with newline characters embedded in the environment variables.

### Root Causes
1. **Environment Variable Formatting**: Environment variables may contain hidden newline characters or whitespace
2. **Build vs Runtime Variables**: Next.js handles environment variables differently at build time vs runtime
3. **URL Validation**: Supabase URLs weren't being validated before use

### Solutions Implemented

#### 1. Environment Variable Sanitization
Updated both `lib/supabase.ts` and `lib/supabase-server.ts` to clean environment variables:
- Remove trailing whitespace
- Strip newline characters
- Validate URL format before creating clients

#### 2. Build-Time Validation
Added validation in `next.config.ts` to check for:
- Missing required environment variables
- Malformed variables containing newlines
- Early warning during build process

#### 3. Proper Environment File Structure
Created `.env.production.local` with proper formatting:
- No trailing newlines on values
- Proper URL formats
- All required variables defined

## Environment Variable Setup

### Required Variables
```bash
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Business Information (Required)
NEXT_PUBLIC_BUSINESS_NAME=Wild West Construction
NEXT_PUBLIC_BUSINESS_PHONE=(801) 691-4065
NEXT_PUBLIC_BUSINESS_EMAIL=info@wildwestslc.com
NEXT_PUBLIC_BUSINESS_ADDRESS=4097 S 420 W Murray, UT 84123
NEXT_PUBLIC_WHATSAPP_LINK=https://wa.me/18016914065

# Optional Services
RESEND_API_KEY=your-resend-api-key  # For email notifications
ADMIN_USERNAME=admin  # For admin panel
ADMIN_PASSWORD=your-secure-password  # For admin panel
```

## Vercel Deployment Setup

### 1. Environment Variables in Vercel Dashboard

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add each variable individually:
   - **DO NOT** copy-paste entire blocks
   - **DO NOT** include quotes around values
   - **DO NOT** add trailing spaces or newlines
   - Ensure each value is on a single line

### 2. Variable Scope Settings
- Set all `NEXT_PUBLIC_*` variables for: Production, Preview, Development
- Set sensitive variables (SERVICE_ROLE_KEY, API keys) for: Production only

### 3. Build Settings
In `vercel.json`, the following settings are configured:
- Build command: `npm run build`
- Output directory: `.next`
- Node.js version: 18.x or higher
- Framework preset: Next.js

## Local Development Setup

### 1. Create Environment Files
```bash
# Copy example files
cp .env.local.example .env.local
cp .env.production.local .env.production.local

# Edit with your values
nano .env.local
```

### 2. Test Build Locally
```bash
# Clean previous builds
rm -rf .next node_modules/.cache

# Install dependencies
npm install

# Test production build
npm run build

# Start production server
npm start
```

### 3. Verify Environment Variables
```bash
# Check for newlines in env file
cat -e .env.production.local | grep '\$'

# Validate format (should show clean lines)
od -c .env.production.local | head -20
```

## Common Issues and Solutions

### Issue 1: Invalid URL Error
**Symptom**: `TypeError: Invalid URL` during build
**Solution**: 
- Check for newlines in SUPABASE_URL variable
- Ensure URL starts with `https://` not `http://`
- No trailing slashes or spaces

### Issue 2: Missing Environment Variables
**Symptom**: Build succeeds but runtime errors occur
**Solution**:
- Ensure all `NEXT_PUBLIC_*` variables are available at build time
- Redeploy after adding new environment variables
- Clear build cache in Vercel

### Issue 3: Authentication Failures
**Symptom**: Supabase operations fail with auth errors
**Solution**:
- Verify SERVICE_ROLE_KEY is correct
- Check key hasn't expired
- Ensure proper key scope (anon vs service_role)

## Production Build Checklist

- [ ] All environment variables set in Vercel dashboard
- [ ] No newlines or special characters in variable values
- [ ] URLs properly formatted with protocol
- [ ] Build completes without warnings
- [ ] Test database connection works
- [ ] API routes respond correctly
- [ ] Static pages generate successfully
- [ ] No console errors in production

## Monitoring and Debugging

### Build Logs
Check Vercel build logs for:
- Environment variable warnings
- Failed static page generation
- API route compilation errors

### Runtime Logs
Monitor Vercel Functions logs for:
- Database connection errors
- API authentication failures
- Unhandled promise rejections

### Performance Metrics
Track in Vercel Analytics:
- Build times
- Function execution duration
- Error rates
- Core Web Vitals

## CI/CD Pipeline Configuration

### GitHub Actions Workflow
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
        
      - name: Build project
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Security Best Practices

1. **Never commit sensitive keys**: Use `.gitignore` for all `.env` files
2. **Rotate keys regularly**: Update SERVICE_ROLE_KEY quarterly
3. **Use environment-specific keys**: Different keys for dev/staging/prod
4. **Enable Row Level Security**: Configure RLS in Supabase
5. **Audit access logs**: Monitor Supabase dashboard for unusual activity

## Rollback Procedures

If deployment fails:
1. Revert to previous deployment in Vercel dashboard
2. Check environment variable changes
3. Review recent code changes
4. Test locally with production environment variables
5. Deploy fix or rollback code changes

## Support and Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Supabase Client Libraries](https://supabase.com/docs/reference/javascript/introduction)
- [Troubleshooting Guide](https://vercel.com/docs/troubleshooting)