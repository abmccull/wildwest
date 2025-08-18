# Implementation Plan for Wild West Construction Website

This step-by-step plan outlines phases, tasks, and security considerations to build the lead-generation site on Next.js, Vercel, Supabase, and custom services.

---

## Phase 1: Project Setup & Infrastructure

### 1.1 Repository & CI/CD

- Initialize monorepo on GitHub.
- Configure GitHub Actions:
  - Lint (ESLint), formatting (Prettier), type checks (TypeScript).
  - Build & test jobs.
  - Preview deployments to Vercel on pull requests.
- Enforce branch protection & required reviews.

### 1.2 Secrets & Configuration Management

- Provision secrets in Vercel & GitHub Secrets (DB URI, API keys, OAuth credentials).
- Integrate a secrets manager if scaling (e.g., AWS Secrets Manager, Vault).
- Validate at runtime: fail securely if secrets missing.

### 1.3 Infrastructure Hardening

- Enforce HTTPS everywhere via Vercel TLS.
- Enable HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy in Next.js custom server headers.
- Restrictive CORS policy for custom CRM and webhook endpoints.
- Disable server-side debugging in production.

---

## Phase 2: Data Ingestion & Page Generation

### 2.1 CSV & JSON-LD Parsing

- Write robust parsers to read:
  - Master service matrix CSV.
  - City hubs CSV.
  - Global entity JSON-LD.
- Validate inputs: required fields, proper formats, no control characters.
- Build TypeScript interfaces for data shape; fail build on missing/invalid data.

### 2.2 Dynamic Route Configuration

- Configure `[city]/[service]` and hub routes in Next.js `getStaticPaths`.
- Limit build concurrency to avoid resource exhaustion.

### 2.3 Page Templates & Components

- Create reusable React components:
  - `<Seo>`: title, meta, JSON-LD injection.
  - `<Breadcrumb>`: server-rendered links + JSON-LD.
  - `<InternalLinks>`, `<ServiceList>`, `<NearbyCities>`, `<FaqAccordion>`.
- Implement server-side rendering (SSR) or static generation (SSG) as per data volatility.
- Inline critical CSS via CSS Modules or Tailwind’s critical-inlining plugin.

---

## Phase 3: Lead Capture Form & Anti-Spam

### 3.1 Form Component & Validation

- Build unified `<LeadForm>` with fields: name, mobile, email, city, address, service, date/time, details, file upload, opt-ins.
- Client-side validation (Zod or Yup) + server-side validation in API routes.
- Sanitize text & filenames to prevent XSS/path traversal.

### 3.2 Anti-Spam Integration

- Integrate Cloudflare Turnstile or reCAPTCHA v3:
  - Client: render widget/deferred script.
  - Server: verify token with provider’s API.
- Rate-limit submissions by IP/session (e.g., 5/minute).

### 3.3 Lead Persistence & Notifications

- API route:
  - Validate & sanitize inputs.
  - Create lead in custom CRM via secure webhook with HMAC signature.
  - Store lead in Supabase (for deduplication & analytics).
- Send Slack alert via signed request.
- Send email via Resend API.
- Dispatch GA4 event server-side or client-side.

Security Considerations:

- Use parameterized queries or Supabase client to prevent injection.
- Store PII encrypted at rest or hashed as needed.
- Log events without sensitive data; mask PII in logs.

---

## Phase 4: WhatsApp Integration

### 4.1 Chat Button & Deep Link

- Implement persistent “Chat on WhatsApp” button:
  - `wa.me` link with URL-encoded prefill.
  - Accessible & keyboard-navigable.

### 4.2 Compliance & Logging

- On click, record timestamp, IP, user agent, opt-in consent.
- Store logs in Supabase with retention policy.

---

## Phase 5: Calendar Booking System

### 5.1 Embed & Widget

- Inline booking on Thank You page; floating widget; header CTA.
- Secure widget with origin-check token to prevent clickjacking.

### 5.2 Webhooks & CRM Sync

- Implement booking API route:
  - Authenticate webhook requests via signature.
  - Update custom CRM & Supabase.
  - Send confirmation email/SMS with ICS attachment.
- Post Slack notification.

### 5.3 Timezone, Buffer & Travel Logic

- Encapsulate scheduling logic in backend:
  - Apply travel buffers between appointments.
  - Normalize time zones.
- Validate date/time to prevent invalid or past bookings.

---

## Phase 6: AI Chatbot Integration

### 6.1 Setup & Security

- Deploy GPT-4o Mini via secure serverless function.
- Enforce rate limiting & authentication for chatbot API.

### 6.2 Prompt Engineering & Guardrails

- Load service docs, policies into retrieval-augmented generation (RAG) pipeline.
- Block price commitments; detect escalation triggers.
- Perform opt-in before capturing personal info.

### 6.3 Lead Capture & Booking via Chat

- On intent, escalate to lead form or booking API.
- Log transcripts (redact PII) with source URLs in Supabase.

Security Considerations:

- Sanitize user messages to prevent prompt injection.
- Monitor logs for anomalies.

---

## Phase 7: SEO, Performance & Accessibility

### 7.1 Technical SEO

- Generate unique `<title>` & `<meta description>` per page from CSV.
- Render JSON-LD server-side.
- Build XML sitemap dynamically; add to robots.txt.

### 7.2 Core Web Vitals

- Measure budgets (HTML ≤35 KB, JS ≤120 KB, CSS ≤80 KB gz).
- Lazy-load images/videos; use responsive `srcset`.
- Defer third-party scripts; inline critical CSS; preconnect to APIs.

### 7.3 Accessibility (WCAG 2.1 AA)

- Ensure 4.5:1 contrast; labels associated with inputs; ARIA live for errors.
- 44 px touch targets; keyboard navigation for chatbot & booking.
- Alt text on all images; semantic HTML.

---

## Phase 8: Testing & QA

### 8.1 Automated Tests

- Unit tests for parsers, form validation, booking logic.
- Integration tests for API routes (mock CRM & Twilio).
- E2E tests (Playwright) simulating form submission, booking, WhatsApp click.

### 8.2 Performance & Security Scans

- Run Lighthouse CI on key routes; enforce CWV thresholds.
- SCA scan dependencies for vulnerabilities.
- Pentest or code review for injection, XSS, CSRF.

### 8.3 Manual QA

- Verify unique titles, metas, JSON-LD validity.
- Test lead-to-booking flows: form, WhatsApp, calendar, chatbot.
- Review consent capture & storage.
- Confirm sitemap & robots.txt correctness.

---

## Phase 9: Launch & Monitoring

### 9.1 Production Cutover

- Final DNS switch to Vercel.
- Submit sitemap to Google Search Console.
- Verify GA4 & Slack alerts.

### 9.2 Ongoing Monitoring

- Real-time alerts for form errors, failed webhooks.
- Monitor CWV and uptime (ULRs).
- Monthly dependency updates & vulnerability reviews.

---

**By following this structured plan and applying secure-by-design principles throughout, we ensure a performant, SEO-optimized, accessible, and resilient lead-generation site for Wild West Construction.**
