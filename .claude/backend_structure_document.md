# Backend Structure Document

This document outlines the backend architecture, hosting solutions, and infrastructure components for the Wild West Construction Lead-Gen Website. It is written in everyday language so that anyone—even without a deep technical background—can understand how the backend is set up and why.

## 1. Backend Architecture

**Overview**

- The backend is built with **Node.js** using **serverless functions** on **Vercel**. We use Next.js API routes as our primary framework for handling requests.
- We’ve organized code in a **modular**, **service-oriented** pattern: each feature (leads, bookings, chat, etc.) lives in its own folder with clear boundaries.

**Design Patterns & Frameworks**

- **Next.js API Routes** for serverless endpoints.
- **Modular Service Layer**: separate modules for CRM logic, scheduling/calendar, notifications, and AI chat.
- **Middleware** approach for common tasks (logging, error handling, input validation).

**Scalability, Maintainability & Performance**

- **Scalability**: Functions spin up on demand and auto-scale with traffic spikes. The database (Supabase Postgres) is managed and scales vertically and horizontally.
- **Maintainability**: Clear folder structure, shared utilities, code reviews, and CI/CD keep code quality high.
- **Performance**: Cold-start times are minimized via Vercel’s edge network. Static assets and pages use incremental static regeneration (ISR) for speedy loads.

## 2. Database Management

**Technologies Used**

- **SQL Database**: Supabase (Postgres) for all structured data (leads, bookings, services, cities).
- **Object Storage**: Supabase Storage for photo/video uploads.

**Data Structuring & Access**

- Data is organized in tables (relational model) with clear relationships: leads link to cities and service types; bookings link to leads.
- We use an ORM-like layer (Supabase client) for safe queries and migrations.
- **Version Control**: All schema changes are managed via migration scripts stored in Git.

**Data Management Practices**

- Regular automated backups (daily) provided by Supabase.
- Schema migrations are run automatically in CI before deploying to production.
- Access control via Supabase roles and row-level security to protect data.

## 3. Database Schema

### Human-Readable Overview

Tables and their key columns:

- **leads**: stores each form submission with contact info, chosen service, city, address, consent flags, timestamp.
- **bookings**: holds scheduled appointments linked to a lead, date/time, status.
- **services**: lists available service types (Flooring, Demolition, Junk Removal).
- **cities**: 23 Salt Lake County cities, including URL slug and display name.
- **attachments**: references uploaded photos/videos, linked to leads or jobs.
- **jobs**: "recent jobs" entries with image, description, and service category.
- **chat_sessions**: logs AI chatbot conversations and any leads captured via chat.

### SQL Schema (PostgreSQL)

```sql
-- 1. Services Table
CREATE TABLE services (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL
);

-- 2. Cities Table
CREATE TABLE cities (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL
);

-- 3. Leads Table
CREATE TABLE leads (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  email           TEXT,
  mobile          TEXT NOT NULL,
  city_id         INTEGER REFERENCES cities(id),
  address         TEXT,
  service_id      INTEGER REFERENCES services(id),
  preferred_date  DATE,
  preferred_time  TIME,
  details         TEXT,
  sms_consent     BOOLEAN DEFAULT FALSE,
  whatsapp_consent BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Bookings Table
CREATE TABLE bookings (
  id              SERIAL PRIMARY KEY,
  lead_id         INTEGER REFERENCES leads(id),
  slot_date       DATE NOT NULL,
  slot_time       TIME NOT NULL,
  status          TEXT CHECK (status IN ('pending','confirmed','cancelled')) DEFAULT 'pending',
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Attachments Table
CREATE TABLE attachments (
  id              SERIAL PRIMARY KEY,
  lead_id         INTEGER REFERENCES leads(id),
  job_id          INTEGER REFERENCES jobs(id),
  url             TEXT NOT NULL,
  type            TEXT CHECK (type IN ('photo','video')),
  uploaded_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Jobs Table (Recent Jobs)
CREATE TABLE jobs (
  id              SERIAL PRIMARY KEY,
  service_id      INTEGER REFERENCES services(id),
  city_id         INTEGER REFERENCES cities(id),
  title           TEXT,
  description     TEXT,
  image_url       TEXT,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Chat Sessions Table
CREATE TABLE chat_sessions (
  id              SERIAL PRIMARY KEY,
  conversation    JSONB,
  captured_lead_id INTEGER REFERENCES leads(id),
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. API Design and Endpoints

We follow a **RESTful** approach using Next.js API routes. All endpoints live under `/api/`.

**Key Endpoints**

- **POST /api/leads**
  - Purpose: Receive and store new lead submissions from the unified form.
  - Returns: Lead ID and confirmation.

- **POST /api/bookings**
  - Purpose: Schedule a booking for an existing lead.
  - Returns: Booking details and calendar invite link.

- **GET /api/services**
  - Purpose: List available service types.
  - Parameters: none

- **GET /api/cities**
  - Purpose: List city hubs and slugs.

- **POST /api/uploads**
  - Purpose: Securely upload photos/videos to Supabase Storage.
  - Returns: Signed URL(s).

- **POST /api/chat**
  - Purpose: Forward messages to OpenAI GPT-4o Mini, handle responses, and optionally create leads.
  - Returns: AI response payload.

- **POST /api/webhooks/calendar**
  - Purpose: Receive booking confirmations or cancellations from the calendar system.
  - Action: Update `bookings` table and notify via Slack/Email.

- **POST /api/webhooks/turnstile**
  - Purpose: Validate Turnstile/reCAPTCHA tokens to prevent spam.

**Integration Points**

- **Slack Notifications**: After lead or booking creation, call Slack API to post to `#lead-notifications`.
- **Email Service (Resend)**: Send confirmation emails and ICS calendar invites.

## 5. Hosting Solutions

- **Vercel**
  - Hosts both frontend (Next.js SSR and static) and backend (serverless API routes).
  - Benefits: Global edge network, instant deployments, auto-scaling functions.

- **Supabase**
  - Managed Postgres database and object storage.
  - Benefits: Built-in auth, row-level security, backups, and easy client libraries.

- **GitHub Actions**
  - CI/CD pipeline: runs tests, applies DB migrations, and deploys to Vercel on every push to main.

## 6. Infrastructure Components

- **Global Load Balancer & CDN**
  - Vercel’s built-in edge network acts as our CDN, caching static assets and API responses.

- **Caching**
  - Next.js Incremental Static Regeneration (ISR) for service and city pages.
  - Cloudflare caching for images and static files stored in Supabase.

- **Content Delivery (CDN)**
  - Edge caching at points of presence around the world reduces latency for end users.

- **Object Storage**
  - Supabase Storage buckets handle user uploads (photos/videos) with ACLs.

- **Load Distribution**
  - Serverless functions auto-scale horizontally with demand.

## 7. Security Measures

- **Authentication & Authorization**
  - Supabase Auth (JWTs) secures any administrative or internal endpoints.
  - Public endpoints (lead form) are protected by Turnstile or reCAPTCHA v3.

- **Data Encryption**
  - All traffic over HTTPS (TLS).
  - Supabase encrypts data at rest.

- **Spam Protection**
  - Cloudflare Turnstile and reCAPTCHA v3 on lead form.

- **API Keys & Secrets**
  - Stored securely in Vercel Environment Variables.
  - Rotated regularly.

- **Compliance & Logging**
  - Consent flags (SMS/WhatsApp) are stored per lead.
  - Audit logs for data changes (via Supabase).

## 8. Monitoring and Maintenance

- **Monitoring Tools**
  - Vercel Usage & Latency dashboards.
  - Supabase Metrics (query performance, error rates).
  - Sentry (or a similar error-tracking tool) for runtime exceptions.

- **Alerts & Notifications**
  - Critical errors alert the team via Slack.
  - High error rates or latency spikes trigger PagerDuty or email alerts.

- **Maintenance Strategies**
  - **Automated Backups**: Daily DB backups with 7-day retention.
  - **Dependency Updates**: Weekly dependency checks via GitHub Dependabot.
  - **Schema Migrations**: Run in CI before deploy; reviews required.

## 9. Conclusion and Overall Backend Summary

The backend for Wild West Construction is a modern, serverless setup designed around scalability, reliability, and ease of maintenance. Key components include:

- **Node.js serverless functions** on **Vercel** for zero-maintenance scaling.
- **Supabase** as a managed SQL database with object storage for uploads.
- A **modular codebase** organizing CRM, scheduling, and chat functionalities.
- **CI/CD** via GitHub Actions for smooth, automated deployments.
- **Third-party integrations**: OpenAI GPT-4o Mini for AI chat, Slack for alerts, Resend for email, and Cloudflare Turnstile/reCAPTCHA for spam protection.

This structure ensures we can meet performance targets (Core Web Vitals), capture and convert leads efficiently, and keep everything secure and maintainable. Any developer or stakeholder reviewing this document will have a clear picture of how the backend works and how it supports the project’s goals.
