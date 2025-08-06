-- Wild West Construction SEO Platform Database Schema
-- Migration: 001_initial_schema
-- Description: Initial database setup with pages and leads tables for hub-and-spoke SEO model

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUM TYPES
-- ============================================

-- Service categories enum
CREATE TYPE service_type AS ENUM (
    'flooring',
    'demolition',
    'junk_removal'
);

-- Lead status enum
CREATE TYPE lead_status AS ENUM (
    'new',
    'contacted',
    'qualified',
    'converted',
    'lost'
);

-- ============================================
-- PAGES TABLE
-- ============================================

-- Main table for SEO landing pages
CREATE TABLE pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    city TEXT NOT NULL,
    service service_type NOT NULL,
    keyword TEXT NOT NULL,
    meta_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    h1 TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}',
    published BOOLEAN NOT NULL DEFAULT false,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Constraints
    CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
    CONSTRAINT meta_title_length CHECK (char_length(meta_title) <= 60),
    CONSTRAINT meta_description_length CHECK (char_length(meta_description) <= 160)
);

-- Create indexes for performance
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_city ON pages(city);
CREATE INDEX idx_pages_service ON pages(service);
CREATE INDEX idx_pages_published ON pages(published);
CREATE INDEX idx_pages_city_service ON pages(city, service);
CREATE INDEX idx_pages_created_at ON pages(created_at DESC);

-- Add comment to table
COMMENT ON TABLE pages IS 'SEO landing pages for hub-and-spoke model covering 15 cities and 3 services';

-- ============================================
-- LEADS TABLE
-- ============================================

-- Table for storing form submissions and leads
CREATE TABLE leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_id UUID REFERENCES pages(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    city TEXT NOT NULL,
    service service_type NOT NULL,
    message TEXT,
    source_url TEXT,
    ip_address INET,
    user_agent TEXT,
    status lead_status DEFAULT 'new' NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Constraints
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT phone_format CHECK (phone IS NULL OR phone ~ '^\+?[1-9]\d{1,14}$')
);

-- Create indexes for performance
CREATE INDEX idx_leads_page_id ON leads(page_id);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_city_service ON leads(city, service);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Add comment to table
COMMENT ON TABLE leads IS 'Customer leads and form submissions from landing pages';

-- ============================================
-- ANALYTICS TABLE (Optional - for tracking)
-- ============================================

-- Table for page view analytics
CREATE TABLE page_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    visitor_id TEXT,
    session_id TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    device_type TEXT,
    browser TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    ip_address INET,
    duration INTEGER, -- Time spent on page in seconds
    bounce BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for analytics queries
CREATE INDEX idx_analytics_page_id ON page_analytics(page_id);
CREATE INDEX idx_analytics_created_at ON page_analytics(created_at DESC);
CREATE INDEX idx_analytics_visitor ON page_analytics(visitor_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to pages table
CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply updated_at trigger to leads table
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to increment page views
CREATE OR REPLACE FUNCTION increment_page_views(page_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE pages 
    SET views = views + 1 
    WHERE id = page_uuid;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;

-- Pages policies
-- Public users can read published pages
CREATE POLICY "Public users can view published pages" ON pages
    FOR SELECT
    USING (published = true);

-- Authenticated users can manage all pages
CREATE POLICY "Authenticated users can insert pages" ON pages
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update pages" ON pages
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pages" ON pages
    FOR DELETE
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can view all pages" ON pages
    FOR SELECT
    TO authenticated
    USING (true);

-- Leads policies
-- Public users can insert leads (form submissions)
CREATE POLICY "Public users can submit leads" ON leads
    FOR INSERT
    WITH CHECK (true);

-- Authenticated users can manage all leads
CREATE POLICY "Authenticated users can view leads" ON leads
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can update leads" ON leads
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete leads" ON leads
    FOR DELETE
    TO authenticated
    USING (true);

-- Analytics policies
-- Public users can insert analytics events
CREATE POLICY "Public users can insert analytics" ON page_analytics
    FOR INSERT
    WITH CHECK (true);

-- Authenticated users can view analytics
CREATE POLICY "Authenticated users can view analytics" ON page_analytics
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================
-- SEED DATA (Optional - for 15 cities)
-- ============================================

-- Insert initial city-service combinations for testing
-- Uncomment to seed initial pages

/*
DO $$
DECLARE
    cities TEXT[] := ARRAY[
        'Denver', 'Aurora', 'Lakewood', 'Thornton', 'Arvada',
        'Westminster', 'Centennial', 'Parker', 'Castle Rock', 'Littleton',
        'Englewood', 'Wheat Ridge', 'Northglenn', 'Commerce City', 'Greenwood Village'
    ];
    services service_type[] := ARRAY['flooring', 'demolition', 'junk_removal'];
    city TEXT;
    svc service_type;
BEGIN
    FOREACH city IN ARRAY cities
    LOOP
        FOREACH svc IN ARRAY services
        LOOP
            INSERT INTO pages (
                slug,
                city,
                service,
                keyword,
                meta_title,
                meta_description,
                h1,
                content,
                published
            ) VALUES (
                lower(replace(city, ' ', '-')) || '-' || svc::text,
                city,
                svc,
                city || ' ' || replace(svc::text, '_', ' '),
                replace(svc::text, '_', ' ') || ' Services in ' || city || ' | Wild West Construction',
                'Professional ' || replace(svc::text, '_', ' ') || ' services in ' || city || ', CO. Licensed, insured, and experienced contractors. Free estimates available.',
                'Expert ' || replace(svc::text, '_', ' ') || ' Services in ' || city,
                jsonb_build_object(
                    'hero_text', 'Welcome to Wild West Construction',
                    'service_description', 'Professional ' || replace(svc::text, '_', ' ') || ' services',
                    'city_description', 'Serving ' || city || ' and surrounding areas'
                ),
                false
            );
        END LOOP;
    END LOOP;
END $$;
*/

-- ============================================
-- FUNCTIONS FOR API OPERATIONS
-- ============================================

-- Function to get page by slug
CREATE OR REPLACE FUNCTION get_page_by_slug(page_slug TEXT)
RETURNS TABLE (
    id UUID,
    slug TEXT,
    city TEXT,
    service service_type,
    keyword TEXT,
    meta_title TEXT,
    meta_description TEXT,
    h1 TEXT,
    content JSONB,
    published BOOLEAN,
    views INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.*
    FROM pages p
    WHERE p.slug = page_slug
    AND p.published = true;
END;
$$ LANGUAGE plpgsql;

-- Function to get leads summary
CREATE OR REPLACE FUNCTION get_leads_summary()
RETURNS TABLE (
    city TEXT,
    service service_type,
    total_leads BIGINT,
    new_leads BIGINT,
    converted_leads BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.city,
        l.service,
        COUNT(*) as total_leads,
        COUNT(*) FILTER (WHERE l.status = 'new') as new_leads,
        COUNT(*) FILTER (WHERE l.status = 'converted') as converted_leads
    FROM leads l
    GROUP BY l.city, l.service
    ORDER BY total_leads DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- GRANTS (if needed for specific roles)
-- ============================================

-- Grant usage on schema to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant limited access to anon users
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON pages TO anon;
GRANT INSERT ON leads TO anon;
GRANT INSERT ON page_analytics TO anon;
GRANT EXECUTE ON FUNCTION get_page_by_slug(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION increment_page_views(UUID) TO anon;