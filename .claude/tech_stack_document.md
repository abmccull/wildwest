# Tech Stack Document for Wild West Construction Lead-Gen Website

This document explains in everyday language the technology choices behind the Wild West Construction lead-generation site. It’s designed to help non-technical readers understand why we picked each tool and how they work together to meet our goals.

## 1. Frontend Technologies

We want a fast, responsive, and easy-to-use interface that feels modern and carries a western twist. Here’s what we chose:

- **Next.js (Server-Side Rendering)**
  - Renders pages on the server for snappy first loads and better SEO.
  - Builds all city and service pages from our CSV data at deployment time, so content is always up to date.
- **React**
  - Powers our interactive components (forms, chat widget, calendar) with a familiar, reliable library.
- **Styling**
  - We’ll use built-in CSS modules or a lightweight CSS-in-JS approach to keep styles scoped to each component.
  - A modern “western” look will be created around the existing logo and color palette.
- **Image Optimization**
  - AVIF and WebP formats with responsive `srcset` ensure crisp visuals without slowing down the page.
  - Lazy-load images below the fold to speed up initial rendering.
- **Accessibility & UX Enhancements**
  - AA-level color contrast, visible focus outlines, and 44 px tap targets for mobile.
  - ARIA live regions for form error messages and keyboard-accessible booking/chat flows.
  - Inline critical CSS and deferred third-party scripts to hit Core Web Vitals targets (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1).

## 2. Backend Technologies

Our backend stack stores leads and drives key features like form submissions, scheduling, and chat:

- **Node.js**
  - The runtime for all our custom server code, from form handling to scheduling endpoints.
- **Supabase**
  - Acts as our database for leads, contacts, and scheduling data.
  - Provides secure object storage for uploaded photos and videos from the lead form.
- **Custom CRM Backend**
  - A simple API written in Node.js that receives new lead data and stores it in our own CRM tables.
- **Custom Scheduling/Calendar Solution**
  - A dedicated service that offers inline embeds, floating widgets, and site-wide booking flows.
  - Handles event types (Estimate, Measurement, Site Visit, Junk Pickup) with travel buffers.
- **CSV-Driven Content**
  - City hubs and service pages are generated at build time by reading master CSV files stored in Git.
  - Ensures a single source of truth for SEO titles, slugs, meta descriptions, and structured data.

## 3. Infrastructure and Deployment

We aim for a reliable, automatic deployment process that scales with traffic and keeps downtime at zero:

- **Version Control: Git & GitHub**
  - All code, CSV data, and content templates live in a Git repository.
- **CI/CD with GitHub Actions**
  - Runs tests, validates slugs, checks for missing SEO fields, and then triggers a deployment on merge to main.
- **Hosting on Vercel**
  - Provides global edge deployment for our Next.js site, guaranteeing fast page loads across Salt Lake County and beyond.
  - Automatic rollbacks if a deployment fails.

## 4. Third-Party Integrations

To extend functionality without reinventing the wheel, we integrate a handful of proven services:

- **OpenAI (GPT-4o Mini)**
  - Powers our AI chatbot, loaded with company policies and service details to answer FAQs and book appointments.
- **Cloudflare Turnstile & reCAPTCHA v3**
  - Protects lead forms from spam and abuse with invisible, friction-free challenges.
- **Slack API**
  - Sends real-time alerts to a #lead-notifications channel with new lead details (name, service, city, contact method).
- **Resend (Email Service)**
  - Handles transactional emails for form confirmations and booking notifications with reliable delivery.

## 5. Security and Performance Considerations

We prioritize both data protection and a smooth user experience:

- **Form Security**
  - Server-side verification of Turnstile or reCAPTCHA tokens.
  - Rate limiting and disposable-email filters to prevent abuse.
- **Data Protection**
  - HTTPS everywhere via Vercel.
  - Supabase row-level security policies to restrict direct database access.
  - Explicit opt-in language and timestamp/IP logging for SMS/WhatsApp compliance.
- **Performance Optimizations**
  - Asset budgets on each service page (HTML ≤ 35 KB gz, JS ≤ 120 KB gz, CSS ≤ 80 KB gz).
  - Inline critical CSS, defer non-critical scripts, and lazy-load images and chat widget until user interaction.
  - Responsive image handling and explicit width/height attributes to avoid layout shifts.

## 6. Conclusion and Overall Tech Stack Summary

By combining these technologies, Wild West Construction’s website will be:

- **Fast and Reliable**: Next.js on Vercel with edge deployments and tight performance budgets.
- **User-Friendly**: React-driven components, accessible design, and clear CTAs for calls, chat, forms, and booking.
- **Data-Driven**: CSV-driven page generation and structured JSON-LD ensure SEO consistency and easy content updates.
- **Secure and Compliant**: Spam protection, explicit consent for messaging, and secure handling of uploads and personal data.
- **Scalable and Maintainable**: GitHub Actions CI/CD, a custom CRM, and scheduling services built on Node.js and Supabase.

These choices align closely with our goals of capturing 250+ leads, booking half of them within 90 days, and maintaining top-tier user performance and SEO standards across Salt Lake County.
