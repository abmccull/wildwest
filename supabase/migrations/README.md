# Wild West Construction Database Schema

## Overview

This directory contains the database migrations for the Wild West Construction lead-generation website.

## Tables Created

### 1. **services**

- Stores the available services (Flooring, Demolition, Junk Removal)
- Fields: id, name, slug

### 2. **cities**

- Contains all 23 Salt Lake County cities
- Fields: id, name, slug

### 3. **leads**

- Main table for storing customer inquiries
- Includes contact info, service/location preferences, consent flags, and tracking data
- Fields: id, name, email, mobile, city_id, address, service_id, preferred_date, preferred_time, details, sms_consent, whatsapp_consent, utm_params, page_path, created_at

### 4. **bookings**

- Tracks appointment slots for leads
- Fields: id, lead_id, slot_date, slot_time, status (pending/confirmed/cancelled), created_at

### 5. **attachments**

- Stores photos/videos uploaded by customers or showcased in jobs
- Can be linked to either a lead OR a job (not both)
- Fields: id, lead_id, job_id, url, type (photo/video), uploaded_at

### 6. **jobs**

- Recent completed jobs for showcase purposes
- Fields: id, service_id, city_id, title, description, image_url, created_at

### 7. **chat_sessions**

- Stores AI chat conversations that may capture leads
- Fields: id, conversation (JSONB), captured_lead_id, created_at

## Security Features

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **Public Read Access**: services, cities, jobs, job attachments
- **Anonymous Insert**: leads, bookings, lead attachments, chat_sessions
- **Admin Access**: Full access for service_role on all tables

### Storage

- Created 'attachments' bucket with 10MB file size limit
- Supports common image and video formats
- Private bucket with signed URL access

## Performance Optimizations

### Indexes Created

- Foreign key indexes on all reference columns
- Slug indexes for URL-based lookups
- Date/timestamp indexes for sorting
- Conditional indexes where appropriate (e.g., email WHERE NOT NULL)

## Migration Order

1. `20250805000001_create_initial_schema.sql` - Creates all tables and indexes
2. `20250805000002_create_rls_policies.sql` - Sets up security policies
3. `20250805000003_insert_initial_data.sql` - Populates services and cities
4. `20250805000004_create_storage_bucket.sql` - Creates storage bucket and policies

## Running Migrations

To apply these migrations to your Supabase project:

```bash
supabase db push
```

Or apply them individually in the Supabase dashboard SQL editor.
