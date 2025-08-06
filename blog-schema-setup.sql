-- Wild West Construction Blog Setup
-- Run this in Supabase SQL Editor to create blog tables

-- Create blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Wild West Construction Team',
    category_id UUID NOT NULL REFERENCES blog_categories(id) ON DELETE RESTRICT,
    featured_image TEXT,
    meta_description TEXT NOT NULL,
    meta_keywords TEXT,
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    reading_time INTEGER,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
('Flooring', 'flooring', 'All about flooring installation, repair, and trends'),
('Demolition', 'demolition', 'Demolition services, permits, and best practices'),
('Junk Removal', 'junk-removal', 'Junk removal tips, services, and preparation guides'),
('Home Improvement', 'home-improvement', 'General home improvement tips and guides')
ON CONFLICT (slug) DO NOTHING;

-- Function to calculate reading time
CREATE OR REPLACE FUNCTION calculate_reading_time(content_text TEXT)
RETURNS INTEGER AS $$
BEGIN
    RETURN CEIL(array_length(string_to_array(content_text, ' '), 1) / 200.0);
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate reading time
CREATE OR REPLACE FUNCTION set_reading_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.reading_time = calculate_reading_time(NEW.content);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_blog_post_reading_time
    BEFORE INSERT OR UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION set_reading_time();

-- Function to get published blog posts with pagination
CREATE OR REPLACE FUNCTION get_blog_posts(
    page_num INTEGER DEFAULT 1,
    page_size INTEGER DEFAULT 10,
    filter_category_slug TEXT DEFAULT NULL,
    search_term TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    slug TEXT,
    excerpt TEXT,
    author TEXT,
    category_name TEXT,
    category_slug TEXT,
    featured_image TEXT,
    tags TEXT[],
    published BOOLEAN,
    featured BOOLEAN,
    views INTEGER,
    reading_time INTEGER,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        p.author,
        c.name as category_name,
        c.slug as category_slug,
        p.featured_image,
        p.tags,
        p.published,
        p.featured,
        p.views,
        p.reading_time,
        p.published_at,
        p.created_at
    FROM blog_posts p
    JOIN blog_categories c ON p.category_id = c.id
    WHERE p.published = true
    AND (filter_category_slug IS NULL OR c.slug = filter_category_slug)
    AND (search_term IS NULL OR 
         p.title ILIKE '%' || search_term || '%' OR 
         p.excerpt ILIKE '%' || search_term || '%' OR 
         search_term = ANY(p.tags))
    ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC
    LIMIT page_size
    OFFSET (page_num - 1) * page_size;
END;
$$ LANGUAGE plpgsql;

-- Function to get blog post count for pagination
CREATE OR REPLACE FUNCTION get_blog_posts_count(
    filter_category_slug TEXT DEFAULT NULL,
    search_term TEXT DEFAULT NULL
)
RETURNS BIGINT AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM blog_posts p
        JOIN blog_categories c ON p.category_id = c.id
        WHERE p.published = true
        AND (filter_category_slug IS NULL OR c.slug = filter_category_slug)
        AND (search_term IS NULL OR 
             p.title ILIKE '%' || search_term || '%' OR 
             p.excerpt ILIKE '%' || search_term || '%' OR 
             search_term = ANY(p.tags))
    );
END;
$$ LANGUAGE plpgsql;

-- Enable RLS and create policies
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public to read published content
CREATE POLICY "Public users can view categories" ON blog_categories
    FOR SELECT USING (true);

CREATE POLICY "Public users can view published posts" ON blog_posts
    FOR SELECT USING (published = true);

-- Allow authenticated users to manage content
CREATE POLICY "Authenticated users can manage categories" ON blog_categories
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can manage posts" ON blog_posts
    FOR ALL TO authenticated USING (true) WITH CHECK (true);