# Project Requirements Document (PRD)

## 1. Project Overview

Wild West Construction is commissioning a fast, SEO-optimized lead-generation website to drive qualified traffic for its three core departments—Flooring, Demolition, and Junk Removal—across Salt Lake County, Utah. By building a data-driven static site with city-specific hubs and service pages, the project aims to make it effortless for local homeowners and businesses to find the exact service they need, request estimates, and book appointments with minimal friction.

The website will combine a unified lead form, “Chat on WhatsApp” deep links, an AI-powered chatbot, and an inline/floating calendar booking widget to cover every user preference for contact. Success will be measured by capturing at least 250 leads in 90 days, converting 50% of those into scheduled appointments, keeping form abandonment below 10%, responding to 25% of WhatsApp inquiries within five minutes, and passing Core Web Vitals on mobile (LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1).

## 2. In-Scope vs. Out-of-Scope

**In-Scope (v1):**

- Data-driven static site generation from two Git-stored CSVs and JSON-LD files
- Homepage, three category hubs (`/flooring/`, `/demolition/`, `/junk-removal/`)
- 23 city hub pages (`/{city-ut}/`) with unique intros, local notes, recent jobs, services list, nearby cities, breadcrumbs, CTA, NAP block
- ~2,700 service pages (`/{city-ut}/{keyword}/`) with SEO Title, H1, 300–700 words, related services, FAQs, CTA, structured data
- Unified lead form (name, mobile, email, city, address, service type, date/time, details, photo/video upload, opt-in checkboxes)
- Cloudflare Turnstile or reCAPTCHA v3 for anti-spam
- Slack (#lead-notifications) and Resend email alerts on form submit
- GA4 events (`form_start`, `form_submit_success`, etc.)
- “Chat on WhatsApp” persistent button with wa.me deep link and compliance logging
- Custom inline/floating calendar booking (Estimate, Measurement, Site Visit, Junk Pickup Window) with webhooks to custom CRM, ICS email/SMS, Slack alerts
- AI chatbot using OpenAI GPT-4o Mini for FAQs, area verification, lead capture, booking hand-off, transcript logging
- Technical SEO: unique titles, metas, JSON-LD (BreadcrumbList, Service, LocalBusiness), server-rendered internal link blocks, sitemap, robots.txt
- Performance budgets, lazy-loading, critical CSS inlining, deferred third-party scripts
- Accessibility (WCAG AA, ARIA live regions, 44 px tap targets, keyboard access)
- GitHub Actions → Vercel CI/CD deployment

**Out-of-Scope (Phase 1):**

- Headless CMS integration
- Multi-language support
- Built-in blogging platform (beyond monthly authority posts post-launch)
- Advanced marketing automations (beyond GA4 experiments)
- Payment or e-commerce functionality

## 3. User Flow

First, a visitor lands on the homepage via organic search, ad, or direct link. They see a clear header with the phone number, a “Chat on WhatsApp” button, and a “Book Now” CTA. A mobile sticky footer offers one-touch “Call,” “Chat,” or “Book.” Scrolling reveals three department hubs (Flooring, Demolition, Junk Removal) and a lead form with city dropdown. The visitor either selects a department (navigating to `/flooring/`) or jumps directly to their city hub (e.g., `/provo-ut/`). On the city hub, they read a unique intro, view local project photos, explore services, and see nearby cities—always guided by visible breadcrumbs.

Next, the user clicks a specific service (e.g., `/provo-ut/flooring-installation/`). They land on a page with an SEO-friendly Title, clear H1, and 300–700 words of city-tailored content. Related services and FAQs help answer questions. Above the fold, the unified lead form awaits; below, the NAP block and “Book Now” button reside. The user can fill out the form (including media upload), tap “Chat on WhatsApp,” or open the embedded/floating calendar widget to pick a time slot. Each action triggers analytics, Slack/email alerts, CRM upserts, and (for bookings) ICS confirmations. At any point, the AI chatbot can jump in, answer FAQs, verify service area, capture leads with opt-in, or schedule via the booking API.

## 4. Core Features

- **Static Site Generation**
  - Build ~2,700 service pages + 23 city hubs + 3 category hubs from Git-stored CSVs and JSON-LD.

- **Homepage & Navigation**
  - Header: phone, WhatsApp, Book Now
  - Sticky mobile footer: Call, Chat, Book

- **Category Hubs**
  - `/flooring/`, `/demolition/`, `/junk-removal/` with summaries, proof points, and links to city-service pages.

- **City Hub Pages**
  - Unique H1, intro, local notes, recent jobs (photos + blurbs), services list, nearby cities, breadcrumbs, CTA, NAP block.

- **Service Pages**
  - SEO Title & H1, 300–700 words, 3–5 related services, 2–4 FAQs, CTA, NAP, Service JSON-LD (department @id, areaServed), BreadcrumbList JSON-LD.

- **Unified Lead Form**
  - Fields: name, mobile, email, city, address, service type, date/time, details, media upload
  - Anti-spam: Cloudflare Turnstile / reCAPTCHA v3
  - Server-side validation, Supabase storage, UTM capture, Slack + Resend alerts, GA4 events.

- **WhatsApp Integration**
  - Persistent wa.me link (+1-801-691-4065), prefilled text, explicit opt-in text, timestamp & IP logging, 24-hour template compliance.

- **Calendar Booking**
  - Four event types, 30/60/120 min durations with buffers, inline embed, floating widget, header CTA
  - Webhooks: CRM upsert, email/SMS with ICS, Slack notification, GA4 events.

- **AI Chatbot**
  - GPT-4o Mini trained on service docs and policies
  - FAQs, service area check, lead capture with opt-in, booking via API, escalation guardrails, transcript logging.

- **Technical SEO & Structured Data**
  - Unique `<title>`, `<meta description>`, one H1 per page
  - JSON-LD: BreadcrumbList, Service, LocalBusiness with departments
  - Server-rendered internal link blocks with descriptive anchors.

- **Performance & UX**
  - Budgets: HTML ≤35 KB gz, JS ≤120 KB gz, CSS ≤80 KB gz
  - Core Web Vitals: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1
  - Lazy-load media, inline critical CSS, defer third-party scripts.

- **Accessibility**
  - WCAG AA contrast, focus outlines, ARIA live for errors, 44 px tap targets, alt text, keyboard booking/chat.

- **Analytics & Attribution**
  - GA4 events with properties: city, service, source, device, experiment_id
  - Deduplication logic: merge leads within 30 min by email/phone hash; booked appointment wins.

## 5. Tech Stack & Tools

- Frontend: Next.js (SSR), React
- Backend/API: Node.js serverless functions on Vercel
- Database & Storage: Supabase (Postgres + object storage)
- CI/CD: GitHub Actions → Vercel auto-deploy
- Data Sources: CSVs & JSON-LD in Git
- AI Chatbot: OpenAI GPT-4o Mini via OpenAI API
- Anti-spam: Cloudflare Turnstile or Google reCAPTCHA v3
- Email Service: Resend
- Chat Alerts: Slack API (`#lead-notifications`)
- Custom CRM & Scheduling: Node.js on Vercel
- Analytics: Google Analytics 4
- Code Assistance: Claude Code

## 6. Non-Functional Requirements

- Performance:
  - LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 on mobile
  - Asset budgets (HTML ≤35 KB gz, JS ≤120 KB gz, CSS ≤80 KB gz)

- Security & Compliance:
  - OWASP top 10 protections, server-side validation, CSRF/XSS mitigations
  - Store opt-in consents with timestamp & IP, adhere to WhatsApp Business policy, basic GDPR/CCPA readiness

- Usability:
  - ≤10% form abandonment, 25% WhatsApp 5-min SLAs
  - ARIA live regions, visible focus, 44 px tap targets, keyboard support

- Scalability & Availability:
  - Support ~2,700 pages, 99.9% uptime via Vercel
  - API response <200 ms

## 7. Constraints & Assumptions

- Custom CRM and scheduling solutions to be built from scratch.
- CSVs maintained manually in Git; no CMS v1.
- Single-language (English), US-only, timezone America/Denver.
- Only OpenAI GPT-4o Mini is available for chatbot.
- Visual style guide to be developed—use existing logo, “Western modern” theme.

## 8. Known Issues & Potential Pitfalls

- **Build Time & Memory**: Generating ~2,700 pages may slow builds.
  - Mitigation: Incremental Static Regeneration or split builds.

- **CSV Data Quality**: Duplicate slugs or missing fields could break templates.
  - Mitigation: Create CI validation scripts to lint CSVs before deploy.

- **Anti-Spam UX**: Turnstile vs reCAPTCHA trade-offs.
  - Mitigation: A/B test both and fallback gracefully.

- **WhatsApp Deep Link Behavior**: Desktop vs mobile differences.
  - Mitigation: Provide fallback “Send SMS” link or prompt.

- **Booking Edge Cases**: Timezone misalignment, travel buffer calculation errors.
  - Mitigation: Thorough unit/integration tests, clear error handling.

- **Chatbot Context Limits**: Token constraints and guardrail enforcement.
  - Mitigation: Summarize long docs, set strict prompt templates, allow human handoff.

- **Performance Budgets**: Third-party scripts may push budgets over.
  - Mitigation: Defer all non-critical scripts, monitor real-time with PageSpeed Insights.

- **Large Sitemap**: May exceed size limits.
  - Mitigation: Split sitemap into multiple files, index them in `robots.txt`.

This document serves as the single source of truth for building Wild West Construction’s lead-gen website. All subsequent technical specs, architectural diagrams, style guides, and implementation plans should align with the requirements, scopes, and constraints defined here. Continuous validation against these criteria will ensure the project meets its performance, UX, SEO, and conversion goals.
