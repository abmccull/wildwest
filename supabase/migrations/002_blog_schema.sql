-- Wild West Construction Blog System Database Schema
-- Migration: 002_blog_schema
-- Description: Add blog functionality with posts, categories, and tags

-- ============================================
-- BLOG CATEGORIES TABLE
-- ============================================

CREATE TABLE blog_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Constraints
    CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$')
);

-- Create indexes
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
('Flooring', 'flooring', 'All about flooring installation, repair, and trends'),
('Demolition', 'demolition', 'Demolition services, permits, and best practices'),
('Junk Removal', 'junk-removal', 'Junk removal tips, services, and preparation guides'),
('Home Improvement', 'home-improvement', 'General home improvement tips and guides');

-- ============================================
-- BLOG POSTS TABLE
-- ============================================

CREATE TABLE blog_posts (
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
    reading_time INTEGER, -- Estimated reading time in minutes
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Constraints
    CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
    CONSTRAINT title_length CHECK (char_length(title) <= 100),
    CONSTRAINT excerpt_length CHECK (char_length(excerpt) <= 300),
    CONSTRAINT meta_description_length CHECK (char_length(meta_description) <= 160),
    CONSTRAINT content_not_empty CHECK (char_length(content) > 0)
);

-- Create indexes for performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_views ON blog_posts(views DESC);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Add comments
COMMENT ON TABLE blog_posts IS 'Blog posts for Wild West Construction website';
COMMENT ON COLUMN blog_posts.reading_time IS 'Estimated reading time in minutes';
COMMENT ON COLUMN blog_posts.tags IS 'Array of tags for categorization and filtering';

-- ============================================
-- BLOG ANALYTICS TABLE
-- ============================================

CREATE TABLE blog_post_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
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
    duration INTEGER, -- Time spent reading in seconds
    scroll_depth FLOAT, -- Percentage of page scrolled (0-100)
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for analytics
CREATE INDEX idx_blog_analytics_post_id ON blog_post_analytics(post_id);
CREATE INDEX idx_blog_analytics_created_at ON blog_post_analytics(created_at DESC);
CREATE INDEX idx_blog_analytics_visitor ON blog_post_analytics(visitor_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Apply updated_at trigger to blog tables
CREATE TRIGGER update_blog_categories_updated_at
    BEFORE UPDATE ON blog_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to increment blog post views
CREATE OR REPLACE FUNCTION increment_blog_post_views(post_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE blog_posts 
    SET views = views + 1 
    WHERE id = post_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate reading time based on content length
CREATE OR REPLACE FUNCTION calculate_reading_time(content_text TEXT)
RETURNS INTEGER AS $$
BEGIN
    -- Assuming average reading speed of 200 words per minute
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

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on blog tables
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_analytics ENABLE ROW LEVEL SECURITY;

-- Blog categories policies (public read access)
CREATE POLICY "Public users can view categories" ON blog_categories
    FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage categories" ON blog_categories
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Blog posts policies
-- Public users can read published posts
CREATE POLICY "Public users can view published posts" ON blog_posts
    FOR SELECT
    USING (published = true);

-- Authenticated users can manage all posts
CREATE POLICY "Authenticated users can manage posts" ON blog_posts
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Blog analytics policies
-- Public users can insert analytics
CREATE POLICY "Public users can insert blog analytics" ON blog_post_analytics
    FOR INSERT
    WITH CHECK (true);

-- Authenticated users can view analytics
CREATE POLICY "Authenticated users can view blog analytics" ON blog_post_analytics
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================
-- FUNCTIONS FOR BLOG API OPERATIONS
-- ============================================

-- Function to get published blog posts with pagination
CREATE OR REPLACE FUNCTION get_blog_posts(
    page_num INTEGER DEFAULT 1,
    page_size INTEGER DEFAULT 10,
    category_slug TEXT DEFAULT NULL,
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
    AND (category_slug IS NULL OR c.slug = category_slug)
    AND (search_term IS NULL OR 
         p.title ILIKE '%' || search_term || '%' OR 
         p.excerpt ILIKE '%' || search_term || '%' OR 
         search_term = ANY(p.tags))
    ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC
    LIMIT page_size
    OFFSET (page_num - 1) * page_size;
END;
$$ LANGUAGE plpgsql;

-- Function to get a single blog post by slug with related posts
CREATE OR REPLACE FUNCTION get_blog_post_with_related(post_slug TEXT)
RETURNS TABLE (
    id UUID,
    title TEXT,
    slug TEXT,
    excerpt TEXT,
    content TEXT,
    author TEXT,
    category_name TEXT,
    category_slug TEXT,
    featured_image TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    tags TEXT[],
    published BOOLEAN,
    featured BOOLEAN,
    views INTEGER,
    reading_time INTEGER,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ,
    related_posts JSONB
) AS $$
DECLARE
    current_post_id UUID;
    current_category_id UUID;
BEGIN
    -- Get the current post's ID and category
    SELECT p.id, p.category_id INTO current_post_id, current_category_id
    FROM blog_posts p
    WHERE p.slug = post_slug AND p.published = true;
    
    -- If post not found, return empty result
    IF current_post_id IS NULL THEN
        RETURN;
    END IF;
    
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        p.content,
        p.author,
        c.name as category_name,
        c.slug as category_slug,
        p.featured_image,
        p.meta_description,
        p.meta_keywords,
        p.tags,
        p.published,
        p.featured,
        p.views,
        p.reading_time,
        p.published_at,
        p.created_at,
        (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id', rp.id,
                    'title', rp.title,
                    'slug', rp.slug,
                    'excerpt', rp.excerpt,
                    'featured_image', rp.featured_image,
                    'published_at', rp.published_at
                )
            )
            FROM blog_posts rp
            WHERE rp.id != current_post_id 
            AND rp.published = true
            AND rp.category_id = current_category_id
            ORDER BY rp.published_at DESC
            LIMIT 3
        ) as related_posts
    FROM blog_posts p
    JOIN blog_categories c ON p.category_id = c.id
    WHERE p.id = current_post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get blog post count for pagination
CREATE OR REPLACE FUNCTION get_blog_posts_count(
    category_slug TEXT DEFAULT NULL,
    search_term TEXT DEFAULT NULL
)
RETURNS BIGINT AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM blog_posts p
        JOIN blog_categories c ON p.category_id = c.id
        WHERE p.published = true
        AND (category_slug IS NULL OR c.slug = category_slug)
        AND (search_term IS NULL OR 
             p.title ILIKE '%' || search_term || '%' OR 
             p.excerpt ILIKE '%' || search_term || '%' OR 
             search_term = ANY(p.tags))
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- GRANTS
-- ============================================

-- Grant permissions to authenticated users
GRANT ALL ON blog_categories TO authenticated;
GRANT ALL ON blog_posts TO authenticated;
GRANT ALL ON blog_post_analytics TO authenticated;

-- Grant limited access to anon users
GRANT SELECT ON blog_categories TO anon;
GRANT SELECT ON blog_posts TO anon;
GRANT INSERT ON blog_post_analytics TO anon;
GRANT EXECUTE ON FUNCTION get_blog_posts(INTEGER, INTEGER, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION get_blog_post_with_related(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION get_blog_posts_count(TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION increment_blog_post_views(UUID) TO anon;