import { createClient } from "@supabase/supabase-js";
import { MetadataRoute } from "next";

interface PageData {
  slug: string;
  city: string;
  service: string;
  updated_at: string;
  published: boolean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wildwestslc.com";

  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Supabase environment variables not configured - using fallback sitemap");
      return getEnhancedBasicSitemap(baseUrl);
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Fetch all published pages from Supabase
    const { data: pages, error: pagesError } = await supabase
      .from("pages")
      .select("slug, city, service, updated_at, published")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    // Fetch all published blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    if (pagesError) {
      console.error("Error fetching pages for sitemap:", pagesError);
      // Continue without pages data but don't fail completely
    }

    if (blogError) {
      console.error("Error fetching blog posts for sitemap:", blogError);
      // Continue without blog data but don't fail completely
    }

    // Create sitemap entries with enhanced priorities (core pages only)
    const sitemapEntries: MetadataRoute.Sitemap = [
      // Homepage - highest priority
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      // Main service pages - high priority
      {
        url: `${baseUrl}/services/flooring`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/services/demolition`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/services/junk-removal`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      // Company pages - important for trust
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/team`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      // Content and support pages
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/faq`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/testimonials`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/gallery`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/careers`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      // Footer pages - lower priority but important for completeness
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: `${baseUrl}/license`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.4,
      },
    ];

    // Add city/service combination pages from routes (not database pages)
    // Only include cities that are properly mapped in the routing system
    const mappedCities = [
      "salt-lake-city", "west-valley-city", "west-jordan", "sandy",
      "south-jordan", "orem", "ogden", "layton", "taylorsville", 
      "murray", "bountiful", "draper", "riverton", "herriman",
      "midvale", "holladay", "south-salt-lake", "bluffdale",
      "roy", "pleasant-grove", "cottonwood-heights"
    ];
    
    const services = ["flooring", "demolition", "junk-removal"];
    
    // Add city hub pages
    mappedCities.forEach(city => {
      sitemapEntries.push({
        url: `${baseUrl}/locations/${city}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.75,
      });
      
      // Add city-service pages
      services.forEach(service => {
        sitemapEntries.push({
          url: `${baseUrl}/locations/${city}/${service}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
    });

    // Add database pages with conflict resolution
    if (pages && pages.length > 0) {
      const processedUrls = new Set<string>();
      
      pages.forEach((page: PageData) => {
        // Check if this database page conflicts with location routes
        const citySlug = mappedCities.find(city => {
          const displayName = city.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ').replace('Salt Lake City', 'Salt Lake City');
          return displayName.toLowerCase().replace(/\s+/g, '-') === page.city.toLowerCase().replace(/\s+/g, '-');
        });
        
        const serviceSlug = page.service.replace(/_/g, "-");
        const conflictsWithLocation = citySlug && services.includes(serviceSlug);
        
        if (conflictsWithLocation) {
          // Skip database page if it conflicts with location route
          // The location route is already included above with higher priority
          console.log(`Skipping conflicting database page: ${page.slug} (conflicts with /locations/${citySlug}/${serviceSlug})`);
          return;
        }
        
        // Add unique database page
        const pageUrl = `${baseUrl}/${page.slug}`;
        if (!processedUrls.has(pageUrl)) {
          processedUrls.add(pageUrl);
          sitemapEntries.push({
            url: pageUrl,
            lastModified: new Date(page.updated_at),
            changeFrequency: "weekly",
            priority: 0.7, // Lower than location routes for non-conflicting pages
          });
        }
      });
    }

    // Add blog posts from database
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach((post: { slug: string; updated_at: string }) => {
        sitemapEntries.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      });
    }

    // Sort by priority (highest first) for better crawling
    return sitemapEntries.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return enhanced basic sitemap if any error occurs
    return getEnhancedBasicSitemap(baseUrl);
  }
}

// Enhanced fallback sitemap with Utah locations in case of errors
function getEnhancedBasicSitemap(baseUrl: string): MetadataRoute.Sitemap {
  const utahCities = [
    "salt-lake-city",
    "west-valley-city",
    "west-jordan",
    "sandy",
    "orem",
    "murray",
    "taylorsville",
    "draper",
    "riverton",
    "cottonwood-heights",
    "bountiful",
    "layton",
    "ogden",
    "pleasant-grove",
    "roy",
  ];

  const services = ["flooring", "demolition", "junk-removal"];

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Main service pages
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Major Utah city hubs
    ...utahCities.slice(0, 8).map((city) => ({
      url: `${baseUrl}/locations/${city}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    // Footer pages
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/license`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  return sitemapEntries.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}
