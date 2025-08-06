-- Seed data for Wild West Construction SEO Platform
-- This script populates the database with initial pages for all city-service combinations

-- Clear existing data (optional - comment out if you want to preserve existing data)
-- TRUNCATE pages CASCADE;
-- TRUNCATE leads CASCADE;

-- Insert pages for all city-service combinations
DO $$
DECLARE
    cities TEXT[] := ARRAY[
        'Denver', 'Aurora', 'Lakewood', 'Thornton', 'Arvada',
        'Westminster', 'Centennial', 'Parker', 'Castle Rock', 'Littleton',
        'Englewood', 'Wheat Ridge', 'Northglenn', 'Commerce City', 'Greenwood Village'
    ];
    services TEXT[] := ARRAY['flooring', 'demolition', 'junk_removal'];
    city TEXT;
    svc TEXT;
    service_display TEXT;
BEGIN
    FOREACH city IN ARRAY cities
    LOOP
        FOREACH svc IN ARRAY services
        LOOP
            -- Convert service name for display
            service_display := CASE 
                WHEN svc = 'junk_removal' THEN 'Junk Removal'
                WHEN svc = 'demolition' THEN 'Demolition'
                WHEN svc = 'flooring' THEN 'Flooring'
            END;
            
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
                lower(replace(city, ' ', '-')) || '-' || replace(svc, '_', '-'),
                city,
                svc::service_type,
                city || ' ' || service_display,
                service_display || ' Services in ' || city || ' | Wild West Construction',
                'Professional ' || lower(service_display) || ' services in ' || city || ', CO. Licensed, insured, and experienced contractors. Free estimates available.',
                'Expert ' || service_display || ' Services in ' || city,
                jsonb_build_object(
                    'hero_text', 'Welcome to Wild West Construction - Your Trusted ' || service_display || ' Experts',
                    'service_description', CASE 
                        WHEN svc = 'flooring' THEN 'From hardwood installation to tile replacement, we handle all your flooring needs with precision and care. Our experienced team ensures beautiful, long-lasting results for both residential and commercial properties.'
                        WHEN svc = 'demolition' THEN 'Safe and efficient demolition services for residential and commercial projects. We handle everything from small interior demos to complete structure removal, always prioritizing safety and environmental responsibility.'
                        WHEN svc = 'junk_removal' THEN 'Fast and reliable junk removal services to clear your space. Whether it''s construction debris, old furniture, or general clutter, we handle the heavy lifting and proper disposal for you.'
                    END,
                    'city_description', 'Proudly serving ' || city || ' and surrounding areas in Colorado. We''re local contractors who understand the unique needs of our community.',
                    'features', ARRAY[
                        'Licensed and Insured',
                        'Free Estimates',
                        'Same-Day Service Available',
                        'Competitive Pricing',
                        'Satisfaction Guaranteed'
                    ],
                    'process', jsonb_build_array(
                        jsonb_build_object('step', 1, 'title', 'Free Consultation', 'description', 'Contact us for a free, no-obligation estimate'),
                        jsonb_build_object('step', 2, 'title', 'Project Planning', 'description', 'We''ll create a detailed plan and timeline for your project'),
                        jsonb_build_object('step', 3, 'title', 'Professional Execution', 'description', 'Our skilled team completes the work efficiently and safely'),
                        jsonb_build_object('step', 4, 'title', 'Final Inspection', 'description', 'We ensure everything meets our high standards and your satisfaction')
                    ),
                    'service_areas', jsonb_build_object(
                        'primary', city,
                        'nearby', CASE 
                            WHEN city = 'Denver' THEN ARRAY['Aurora', 'Lakewood', 'Englewood', 'Wheat Ridge']
                            WHEN city = 'Aurora' THEN ARRAY['Denver', 'Centennial', 'Parker', 'Commerce City']
                            WHEN city = 'Lakewood' THEN ARRAY['Denver', 'Wheat Ridge', 'Littleton', 'Arvada']
                            WHEN city = 'Thornton' THEN ARRAY['Westminster', 'Northglenn', 'Commerce City', 'Denver']
                            WHEN city = 'Arvada' THEN ARRAY['Westminster', 'Wheat Ridge', 'Lakewood', 'Denver']
                            WHEN city = 'Westminster' THEN ARRAY['Arvada', 'Thornton', 'Northglenn', 'Denver']
                            WHEN city = 'Centennial' THEN ARRAY['Aurora', 'Littleton', 'Greenwood Village', 'Parker']
                            WHEN city = 'Parker' THEN ARRAY['Aurora', 'Centennial', 'Castle Rock', 'Littleton']
                            WHEN city = 'Castle Rock' THEN ARRAY['Parker', 'Littleton', 'Lone Tree', 'Highlands Ranch']
                            WHEN city = 'Littleton' THEN ARRAY['Centennial', 'Englewood', 'Lakewood', 'Greenwood Village']
                            WHEN city = 'Englewood' THEN ARRAY['Denver', 'Littleton', 'Sheridan', 'Cherry Hills Village']
                            WHEN city = 'Wheat Ridge' THEN ARRAY['Arvada', 'Lakewood', 'Denver', 'Edgewater']
                            WHEN city = 'Northglenn' THEN ARRAY['Thornton', 'Westminster', 'Commerce City', 'Federal Heights']
                            WHEN city = 'Commerce City' THEN ARRAY['Thornton', 'Aurora', 'Northglenn', 'Denver']
                            WHEN city = 'Greenwood Village' THEN ARRAY['Centennial', 'Littleton', 'Cherry Hills Village', 'Aurora']
                            ELSE ARRAY[]::TEXT[]
                        END
                    ),
                    'faq', jsonb_build_array(
                        jsonb_build_object(
                            'question', 'How quickly can you start my ' || lower(service_display) || ' project?',
                            'answer', 'We typically can schedule an initial consultation within 24-48 hours and begin work within a week, depending on the project scope and current workload.'
                        ),
                        jsonb_build_object(
                            'question', 'Are you licensed and insured?',
                            'answer', 'Yes, Wild West Construction is fully licensed and insured in Colorado. We carry comprehensive liability insurance and all necessary permits for our work.'
                        ),
                        jsonb_build_object(
                            'question', 'Do you offer free estimates?',
                            'answer', 'Absolutely! We provide free, no-obligation estimates for all ' || lower(service_display) || ' projects in ' || city || ' and surrounding areas.'
                        ),
                        jsonb_build_object(
                            'question', 'What areas do you serve?',
                            'answer', 'We primarily serve ' || city || ' and the greater Denver metro area, including all surrounding communities within a 25-mile radius.'
                        )
                    ),
                    'cta_text', 'Ready to get started? Contact Wild West Construction today for your free ' || lower(service_display) || ' estimate in ' || city || '!',
                    'phone', '(303) 555-0100',
                    'email', 'info@wildwestconstruction.com',
                    'business_hours', 'Monday-Friday: 7:00 AM - 6:00 PM, Saturday: 8:00 AM - 4:00 PM'
                ),
                true -- Set to published
            )
            ON CONFLICT (slug) DO UPDATE
            SET 
                keyword = EXCLUDED.keyword,
                meta_title = EXCLUDED.meta_title,
                meta_description = EXCLUDED.meta_description,
                h1 = EXCLUDED.h1,
                content = EXCLUDED.content,
                updated_at = NOW();
        END LOOP;
    END LOOP;
END $$;

-- Insert some sample leads for testing (optional)
INSERT INTO leads (
    name,
    email,
    phone,
    city,
    service,
    message,
    source_url,
    status
) VALUES 
    ('John Smith', 'john.smith@example.com', '303-555-0101', 'Denver', 'flooring', 'I need new hardwood floors installed in my living room.', '/denver-flooring', 'new'),
    ('Jane Doe', 'jane.doe@example.com', '303-555-0102', 'Aurora', 'demolition', 'Looking for a quote on kitchen demolition before renovation.', '/aurora-demolition', 'new'),
    ('Bob Johnson', 'bob.j@example.com', '303-555-0103', 'Lakewood', 'junk_removal', 'Have construction debris that needs to be removed ASAP.', '/lakewood-junk-removal', 'contacted'),
    ('Alice Brown', 'alice.b@example.com', '303-555-0104', 'Thornton', 'flooring', 'Need tile installation in two bathrooms.', '/thornton-flooring', 'qualified'),
    ('Charlie Wilson', 'charlie.w@example.com', '303-555-0105', 'Westminster', 'junk_removal', 'Moving out and need help clearing old furniture.', '/westminster-junk-removal', 'converted')
ON CONFLICT DO NOTHING;

-- Output summary
DO $$
DECLARE
    page_count INTEGER;
    lead_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO page_count FROM pages;
    SELECT COUNT(*) INTO lead_count FROM leads;
    
    RAISE NOTICE 'Seed completed successfully!';
    RAISE NOTICE 'Total pages created: %', page_count;
    RAISE NOTICE 'Total leads created: %', lead_count;
    RAISE NOTICE '';
    RAISE NOTICE 'Pages should be available at the following URL pattern:';
    RAISE NOTICE '/{city-slug}-{service-slug}';
    RAISE NOTICE '';
    RAISE NOTICE 'Example URLs:';
    RAISE NOTICE '- /denver-flooring';
    RAISE NOTICE '- /aurora-demolition';
    RAISE NOTICE '- /lakewood-junk-removal';
END $$;