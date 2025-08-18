# Implementation plan

## Phase 1: Environment Setup

1.  **Prevalidation:** Verify current directory is a Next.js project by checking for `package.json` with a `next` dependency; if present, skip initialization. (Project Overview: Project Goal)
2.  Install Node.js v20.2.1. (Key Technologies)
3.  **Validation:** Run `node -v` and confirm output is `v20.2.1`. (Key Technologies)
4.  Initialize a Next.js 14 project by running:

`npx create-next-app@14 . --use-npm `_Note: Use Next.js 14 per Tech Stack recommendation._ (Build Plan: Stack)

1.  **Validation:** Run `npx next --version` and confirm it reports `14.x`. (Build Plan: Stack)
2.  Initialize a Git repository (if not exists) and push to GitHub. (Answers to Questions: Hosting and Deployment)
3.  Create GitHub Actions workflow at `.github/workflows/deploy.yml` to deploy on push to `main` using Vercel’s GitHub Action. (Answers to Questions: Hosting and Deployment)
4.  Create an `.env.local` file at project root and add placeholders:

`NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url> NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key> `Ask user to obtain the connection string and anon key from the Supabase dashboard. (Photo/Video Uploads)

## Phase 2: Frontend Development

1.  Create `/components/Layout.js` with header containing phone link (`tel:+18016914065`), WhatsApp CTA (`wa.me/18016914065`), and “Book Now” button. (Build Plan: Templates)
2.  **Validation:** Import `Layout` in `pages/_app.js` and confirm header renders site-wide. (Page Types and Modules)
3.  Create `/components/MobileFooter.js` with sticky mobile footer featuring Call, Chat, Book, and Quote buttons. (Build Plan: Templates)
4.  **Validation:** Emulate mobile viewport (`npm run dev`) and confirm footer tap targets ≥44px. (Performance and UX)
5.  Create page file `/pages/[city-ut]/index.js` for City Hubs using `getStaticPaths` and `getStaticProps`. (Build Plan: Routing)
6.  In `/lib/data.js`, implement CSV parsing for City Hubs CSV to supply `getStaticPaths` slugs. (Information Architecture and URLs)
7.  In `/pages/[city-ut]/index.js`, load data via `getStaticProps` from City Hubs CSV (H1, intro, services list, etc.). (Data Sources)
8.  Create `/components/CityHub.js` rendering H1, unique intro, local notes, recent jobs, services list HTML, nearby cities HTML, breadcrumbs (`<BreadcrumbList>` JSON-LD), CTA, and NAP. (Page Types and Modules)
9.  **Validation:** Run `npm run build` and confirm no errors on `/salt-lake-city/`. (QA Checklist)
10. Create page file `/pages/[city-ut]/[keyword]/index.js` for Service Pages using `getStaticPaths` and `getStaticProps`. (Build Plan: Routing)
11. In `/lib/data.js`, implement CSV parsing for Master Service Matrix CSV to supply service slugs. (Information Architecture and URLs)
12. In `/pages/[city-ut]/[keyword]/index.js`, load SEO Title, H1, body copy, FAQs, internal link block HTML, JSON-LD service data. (Data Sources)
13. Create `/components/ServicePage.js` rendering SEO `<Head>` tags, H1, 300–700 words copy, 3–5 related services, nearby cities, 2–4 FAQs, CTA, NAP, Service JSON-LD (`areaServed`, `@id`), and BreadcrumbList JSON-LD. (Page Types and Modules)
14. **Validation:** Paste generated JSON-LD into [Google’s Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool) and confirm no errors. (Technical SEO)
15. Create `/components/LeadForm.js` with Name, Mobile, Email, City selector, Address, Service type, Date/time pickers, Details textarea, Photo/video upload, SMS/WhatsApp consent checkboxes. (Lead Capture System)
16. Integrate Cloudflare Turnstile widget in `LeadForm.js` for anti-spam. (Lead Capture System)
17. Add client-side validation using React Hook Form and regex patterns for email/mobile. (Lead Capture System)
18. **Validation:** Write Cypress test at `/cypress/integration/lead_form.spec.js` to assert form error messages and successful validation. (QA Checklist)

## Phase 3: Backend Development

1.  Create API route `/pages/api/leads.js` to receive POST submissions from `LeadForm`. (Lead Capture System)
2.  In `/api/leads.js`, verify Turnstile token server-side by calling Cloudflare’s API. (Lead Capture System)
3.  Insert validated lead data (including UTM params, page path) into Supabase `leads` table. (Lead Capture System)
4.  Upload photos/videos to Supabase Storage and store file URLs in `lead_attachments` table. (Photo/Video Uploads)
5.  **Schema Definition:**

`-- leads table CREATE TABLE leads ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT, mobile TEXT, email TEXT, city TEXT, address TEXT, service_type TEXT, preferred_datetime TIMESTAMP, details TEXT, utm_params JSON, page_path TEXT, created_at TIMESTAMP DEFAULT now() ); -- lead_attachments table CREATE TABLE lead_attachments ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), lead_id UUID REFERENCES leads(id), file_url TEXT ); `(Backend Development)

1.  Apply schema via Supabase CLI: `supabase db push`. (Backend Development)
2.  In `/api/leads.js`, send a Slack notification to `#lead-notifications` with lead details using Slack SDK. (Lead Capture System)
3.  Trigger an email alert via Resend API with lead summary. (Answers to Questions: Email Service)
4.  Send a GA4 `form_submit_success` event to Measurement Protocol with parameters: city, service, source. (Analytics and Attribution)
5.  Create API route `/pages/api/whatsapp.js` to record WhatsApp opt-in clicks (store timestamp, IP). (WhatsApp Integration)
6.  Create API route `/pages/api/bookings.js` to handle scheduling requests, insert into Supabase `bookings` table, fire webhooks to CRM, send ICS via Resend, post Slack alert, send GA4 `booking_success`. (Calendar Booking)
7.  Create API route `/pages/api/chatbot.js` that proxies user messages to OpenAI GPT-4o Mini, enforces guardrails, logs transcripts in `chat_transcripts` table with source URL. (AI Chatbot)
8.  Add Next.js middleware at `/middleware.js` to rate-limit API routes (e.g., 5 req/min per IP). (Form Engineering)
9.  **Validation:** For each API (`/api/leads`, `/api/whatsapp`, `/api/bookings`, `/api/chatbot`), run `curl` tests and verify expected status codes and database writes. (QA Checklist)

## Phase 4: Integration

1.  In `LeadForm.js`, connect form submission to `POST /api/leads` using `fetch` and handle responses. (Integration)
2.  Add sitewide WhatsApp deep-link (`wa.me/18016914065?text=`) in header/footer components and track clicks via GA4 `whatsapp_click`. (Integration)
3.  Embed booking widget inline on thank-you page and as floating widget in `components/BookingWidget.js`, defer loading until user clicks “Book Now.” (Integration)
4.  In `next.config.js`, configure CORS headers for API routes to allow origin `https://wildwestslc.com`. (Integration)
5.  **Validation:** Write end-to-end Cypress test at `/cypress/integration/full_flow.spec.js` simulating lead form, WhatsApp click, booking flow, and confirm database entries. (QA Checklist)

## Phase 5: Deployment

1.  Ensure `.env` variables (`NEXT_PUBLIC_SUPABASE_URL`, etc.) are set in Vercel project settings for the `main` branch. (Answers to Questions: Hosting and Deployment)
2.  Push code to `main` branch and confirm GitHub Actions triggers deployment to Vercel and site is live at `https://wildwestslc.com`. (Answers to Questions: Hosting and Deployment)
3.  Create `/scripts/generate-sitemap.js` to read CSVs and output `/public/sitemap.xml` listing hubs and service pages. (Sitemaps and Robots)
4.  Update `/public/robots.txt` to reference `sitemap.xml` and block any non-indexable paths; then submit sitemap in Google Search Console. (Sitemaps and Robots)
5.  **Validation:** Run PageSpeed Insights on mobile homepage and verify Core Web Vitals: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1; monitor Search Console for crawl errors weekly. (Performance and UX)

_All steps are ready for execution. Please ensure environment variables and Supabase credentials are provided before proceeding._
