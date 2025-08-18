# Wild West Construction - Production Deployment Guide

## Prerequisites

1. **Vercel Account**: Create an account at https://vercel.com
2. **GitHub Repository**: Push your code to a GitHub repository
3. **Environment Variables**: Have all required API keys and credentials ready

## Environment Variables Required

The following environment variables must be configured in Vercel:

### Supabase Configuration

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (server-side only)

### Third-Party Services

- `OPENAI_API_KEY` - OpenAI API key for chat functionality
- `SLACK_WEBHOOK_URL` - Slack webhook for lead notifications
- `RESEND_API_KEY` - Resend API key for email services
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 measurement ID
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key

### Additional Configuration

- `NEXT_PUBLIC_SITE_URL` - Set to `https://wildwestslc.com`

## Deployment Steps

### 1. Initial Vercel Setup

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### 2. Configure Environment Variables

1. In Vercel project settings, go to "Environment Variables"
2. Add each required environment variable
3. Select appropriate environments (Production/Preview/Development)
4. Save all variables

### 3. Configure Domain

1. Go to project settings → Domains
2. Add custom domain: `wildwestslc.com`
3. Add www subdomain: `www.wildwestslc.com`
4. Configure DNS records with your domain provider:
   ```
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com.
   ```

### 4. Deploy from GitHub

#### Option A: Automatic Deployment (Recommended)

1. Push code to main branch
2. Vercel automatically builds and deploys
3. Monitor deployment in Vercel dashboard

#### Option B: Manual Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### 5. Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test lead form submission
- [ ] Verify WhatsApp integration
- [ ] Test AI chat functionality
- [ ] Check booking system
- [ ] Verify email notifications
- [ ] Test Slack notifications
- [ ] Check Google Analytics tracking
- [ ] Verify sitemap.xml generation
- [ ] Test performance (Lighthouse score)

## GitHub Actions Secrets

For CI/CD pipeline, add these secrets to GitHub repository:

1. Go to Repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `VERCEL_TOKEN` - Get from Vercel account settings
   - `VERCEL_ORG_ID` - Found in Vercel project settings
   - `VERCEL_PROJECT_ID` - Found in Vercel project settings
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Monitoring & Maintenance

### Performance Monitoring

- Vercel Analytics (built-in)
- Google Analytics 4
- Lighthouse CI reports

### Error Tracking

- Check Vercel Functions logs
- Monitor Supabase logs
- Review Slack notifications

### Regular Maintenance

- Update dependencies monthly
- Review and optimize database queries
- Monitor API usage and costs
- Check SSL certificate renewal

## Troubleshooting

### Build Failures

1. Check build logs in Vercel
2. Verify all environment variables are set
3. Ensure TypeScript errors are resolved
4. Check for missing dependencies

### Runtime Errors

1. Check Vercel Functions logs
2. Verify API endpoints are accessible
3. Check Supabase connection
4. Review browser console errors

### Performance Issues

1. Enable ISR for dynamic pages
2. Optimize images with next/image
3. Review bundle size
4. Check API response times

## Rollback Procedure

If issues occur after deployment:

1. Go to Vercel dashboard → Deployments
2. Find the last working deployment
3. Click "..." menu → "Promote to Production"
4. Investigate and fix issues
5. Deploy fix through normal process

## Support

For deployment issues:

- Vercel Support: https://vercel.com/support
- Next.js Documentation: https://nextjs.org/docs
- Project Issues: Create GitHub issue
