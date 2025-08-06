# Wild West Construction SEO Platform - Deployment Guide

## Environment Variables

### Required Environment Variables

Create a `.env.local` file for local development and configure these in Vercel's dashboard for production:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://wildwestconstruction.com
NEXT_PUBLIC_SITE_NAME="Wild West Construction"
NEXT_PUBLIC_DEFAULT_META_DESCRIPTION="Professional construction services in your area"

# Analytics (Optional but Recommended)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_vercel_analytics_id
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Email Configuration (for lead notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
NOTIFICATION_EMAIL=leads@wildwestconstruction.com

# API Keys (if using external services)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## Vercel Deployment Steps

### 1. Initial Setup

1. **Install Vercel CLI** (optional but recommended):

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Link Project**:
   ```bash
   vercel link
   ```

### 2. Deploy to Vercel

#### Option A: Deploy via CLI

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Option B: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables in Vercel dashboard
5. Deploy

### 3. Configure Environment Variables in Vercel

1. Go to your project settings in Vercel Dashboard
2. Navigate to "Environment Variables"
3. Add all required variables for Production, Preview, and Development environments
4. Save changes

### 4. Configure Domain

1. Go to "Domains" in project settings
2. Add your custom domain (e.g., wildwestconstruction.com)
3. Configure DNS records as instructed by Vercel
4. Enable SSL (automatic with Vercel)

## Supabase Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Save your project URL and keys

### 2. Run Database Migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Or run SQL directly in Supabase dashboard
# Copy content from supabase/migrations/001_initial_schema.sql
```

### 3. Configure Row Level Security (RLS)

Enable RLS for all tables in Supabase dashboard:

```sql
-- Enable RLS on leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting leads (public can insert)
CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Create policy for reading leads (authenticated only)
CREATE POLICY "Authenticated users can read leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');
```

### 4. Set up Edge Functions (Optional)

For advanced lead processing:

```bash
supabase functions new process-lead
supabase functions deploy process-lead
```

## Performance Optimization Settings

### 1. Image Optimization

Configure Next.js image optimization in `next.config.ts`:

```typescript
const nextConfig = {
  images: {
    domains: ["your-cdn-domain.com"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### 2. Enable ISR (Incremental Static Regeneration)

In your pages, use:

```typescript
export const revalidate = 3600; // Revalidate every hour
```

### 3. Edge Runtime

For optimal performance, use Edge Runtime for API routes:

```typescript
export const runtime = "edge";
```

### 4. Monitoring and Analytics

1. **Enable Vercel Analytics**:
   - Go to project dashboard
   - Enable Analytics
   - Add `@vercel/analytics` to your project

2. **Enable Speed Insights**:
   - Enable in Vercel dashboard
   - Add `@vercel/speed-insights` to your project

3. **Set up Web Vitals monitoring**:

   ```typescript
   import { Analytics } from '@vercel/analytics/react';
   import { SpeedInsights } from '@vercel/speed-insights/next';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
           <SpeedInsights />
         </body>
       </html>
     );
   }
   ```

## Production Checklist

- [ ] All environment variables configured in Vercel
- [ ] Supabase database migrations completed
- [ ] RLS policies configured
- [ ] Custom domain configured and SSL enabled
- [ ] Analytics and monitoring enabled
- [ ] SEO meta tags configured
- [ ] Sitemap and robots.txt accessible
- [ ] CORS headers configured (if needed)
- [ ] Rate limiting configured for API routes
- [ ] Error tracking set up (e.g., Sentry)
- [ ] Backup strategy in place
- [ ] CDN caching rules optimized
- [ ] Security headers configured
- [ ] Performance budget defined
- [ ] Lighthouse score > 90 for all metrics

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors: `npm run build`

2. **Environment Variable Issues**:
   - Ensure all required variables are set
   - Check variable naming (NEXT*PUBLIC* prefix for client-side)
   - Redeploy after adding new variables

3. **Database Connection Issues**:
   - Verify Supabase URL and keys
   - Check network/firewall settings
   - Ensure RLS policies are correct

4. **Performance Issues**:
   - Review function configurations in vercel.json
   - Check for large bundle sizes
   - Enable caching headers
   - Use Edge Runtime where possible

## Support

For deployment issues:

- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Supabase Support: [supabase.com/support](https://supabase.com/support)
- Project Issues: [Create GitHub Issue]

## Version History

- v0.1.0 - Initial deployment configuration
- Last Updated: 2025-08-06
