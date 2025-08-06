# Wild West Construction - SEO Optimized Website

[![Deployed on Vercel](https://vercel.com/button)](https://vercel.com/abmcculls-projects/wildwest-seo)

A high-performance, SEO-optimized Next.js website for Wild West Construction, a premier construction company serving the Greater Salt Lake City area.

## Project Overview

This is a modern, fully-optimized website built with Next.js 15 and deployed on Vercel. The site features:

- **Dynamic location-based pages** for local SEO optimization
- **Service-specific landing pages** targeting construction keywords
- **Lead generation system** with Supabase backend
- **Admin dashboard** for lead management
- **Edge runtime** for optimal performance
- **Advanced caching strategies** for fast page loads
- **Security headers** and best practices implementation

### Business Information

- **Company**: Wild West Construction
- **Address**: 4097 S 420 W Murray, UT 84123
- **Phone**: (801) 691-4065
- **Email**: info@wildwestslc.com
- **Website**: https://wildwestslc.com

## Tech Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Runtime**: Edge Runtime for optimal performance
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics & Speed Insights
- **Language**: TypeScript

## Project Structure

```
wildwest-seo/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── locations/         # Dynamic location pages
│   └── ...
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── scripts/              # Build and seed scripts
├── supabase/             # Database migrations and seeds
├── public/               # Static assets
└── vercel.json           # Vercel deployment configuration
```

## Setup Instructions

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Supabase account (for database)
- Vercel account (for deployment)

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wildwest-seo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your actual values:
   - Supabase credentials
   - Admin credentials
   - Analytics IDs
   - SMTP settings (optional)

4. **Set up the database**

   ```bash
   # Run migrations
   npm run seed

   # Generate test data (optional)
   npm run seed:test
   ```

5. **Generate location pages**

   ```bash
   npm run generate:pages
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with initial data
- `npm run seed:clear` - Clear and reseed database
- `npm run seed:test` - Generate test data
- `npm run generate:pages` - Generate location-based pages

## Deployment Guide

### Deploying to Vercel

1. **Connect your GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure environment variables in Vercel Dashboard**
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.example`
   - Set appropriate values for each environment:
     - Production
     - Preview
     - Development

3. **Deploy**

   ```bash
   # Automatic deployment on push to main branch
   git push origin main

   # Manual deployment via CLI
   vercel --prod
   ```

### Deployment Configuration

The `vercel.json` file includes:

- **Function configurations** - Optimized memory and duration limits
- **Security headers** - CSP, HSTS, XSS protection
- **Caching rules** - Aggressive caching for static assets
- **SEO redirects** - Handle common URL patterns
- **Edge runtime** - Enabled for location pages
- **Regional deployment** - Deployed to US East (iad1)

### Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test lead form submission
- [ ] Check admin dashboard access
- [ ] Verify sitemap generation at `/sitemap.xml`
- [ ] Test robots.txt at `/robots.txt`
- [ ] Monitor Vercel Analytics dashboard
- [ ] Set up custom domain and SSL
- [ ] Configure DNS records
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics and GTM

## Environment Variables

### Required Variables

| Variable                        | Description               | Example                   |
| ------------------------------- | ------------------------- | ------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL      | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key    | `eyJhbGc...`              |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key | `eyJhbGc...`              |
| `ADMIN_USERNAME`                | Admin dashboard username  | `admin`                   |
| `ADMIN_PASSWORD`                | Admin dashboard password  | `SecurePass123!`          |

### Optional Variables

| Variable                     | Description           | Default |
| ---------------------------- | --------------------- | ------- |
| `NEXT_PUBLIC_GA_ID`          | Google Analytics ID   | -       |
| `NEXT_PUBLIC_GTM_ID`         | Google Tag Manager ID | -       |
| `SMTP_HOST`                  | Email SMTP host       | -       |
| `SMTP_PORT`                  | Email SMTP port       | `587`   |
| `RATE_LIMIT_API_CALLS`       | API rate limit        | `100`   |
| `CACHE_REVALIDATION_SECONDS` | ISR revalidation time | `3600`  |

See `.env.example` for complete list.

## SEO Optimization Features

### Technical SEO

- **Dynamic Meta Tags** - Location and service-specific metadata
- **Structured Data** - JSON-LD schema for local business
- **XML Sitemap** - Auto-generated with all pages
- **Robots.txt** - Properly configured crawl directives
- **Canonical URLs** - Preventing duplicate content
- **Open Graph Tags** - Social media optimization

### Performance Optimization

- **Edge Runtime** - Reduced latency for dynamic pages
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Prefetching** - Smart link prefetching
- **Compression** - Brotli/gzip compression
- **CDN Caching** - Vercel Edge Network

### Core Web Vitals

- **LCP** < 2.5s (Largest Contentful Paint)
- **FID** < 100ms (First Input Delay)
- **CLS** < 0.1 (Cumulative Layout Shift)
- **TTFB** < 600ms (Time to First Byte)

## Security Features

- **Content Security Policy** - XSS protection
- **HTTPS Enforcement** - HSTS headers
- **Rate Limiting** - API endpoint protection
- **Input Validation** - Form and API validation
- **SQL Injection Prevention** - Parameterized queries
- **Authentication** - Secure admin access
- **Environment Variables** - Secrets management

## Admin Dashboard

Access the admin dashboard at `/admin` with configured credentials.

Features:

- View and manage leads
- Export leads to CSV
- Analytics dashboard
- Real-time lead notifications

## API Endpoints

| Endpoint                  | Method | Description                         |
| ------------------------- | ------ | ----------------------------------- |
| `/api/lead`               | POST   | Submit new lead                     |
| `/api/health`             | GET    | Health check                        |
| `/api/admin/leads`        | GET    | Get all leads (auth required)       |
| `/api/admin/leads/export` | GET    | Export leads as CSV (auth required) |
| `/api/admin/dashboard`    | GET    | Dashboard stats (auth required)     |

## Monitoring & Analytics

- **Vercel Analytics** - Real-time performance metrics
- **Speed Insights** - Core Web Vitals monitoring
- **Error Tracking** - Automatic error reporting
- **Uptime Monitoring** - Health check cron job
- **Custom Events** - Lead tracking and conversions

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (>= 18.x)
   - Verify all environment variables are set
   - Clear `.next` folder and rebuild

2. **Database Connection**
   - Verify Supabase credentials
   - Check network connectivity
   - Review Supabase dashboard for errors

3. **Lead Form Not Working**
   - Check API route configuration
   - Verify CORS settings
   - Review browser console for errors

4. **Slow Performance**
   - Enable Edge Runtime for pages
   - Review caching headers
   - Optimize images and assets

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally and build
4. Submit a pull request
5. Deploy to preview environment

## Support

For technical support or questions:

- Email: info@wildwestslc.com
- Phone: (801) 691-4065

## License

© 2024 Wild West Construction. All rights reserved.

---

Built with Next.js and deployed on Vercel for optimal performance and SEO.
