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
    const { data: pages, error } = await supabase
      .from("pages")
      .select("slug, city, service, updated_at, published")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching pages for sitemap:", error);
      // Return enhanced basic sitemap if database query fails
      return getEnhancedBasicSitemap(baseUrl);
    }

    // Create sitemap entries with enhanced priorities
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
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      // Blog/content pages
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      // Footer pages - lower priority but important for completeness
      {
        url: `${baseUrl}/privacy`,
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

    // Add dynamic pages from database with intelligent prioritization
    if (pages && pages.length > 0) {
      pages.forEach((page: PageData) => {
        // Determine if it's a city hub or city+service page
        const isServicePage = page.service && page.service !== "hub";
        const pageUrl = isServicePage
          ? `${baseUrl}/locations/${page.city}/${page.service}`
          : `${baseUrl}/locations/${page.city}`;

        // Smart priority based on city population and service type
        let priority = 0.7;
        let changeFrequency:
          | "always"
          | "hourly"
          | "daily"
          | "weekly"
          | "monthly"
          | "yearly"
          | "never" = "monthly";

        // Higher priority for major Utah cities
        const majorCities = [
          "salt-lake-city",
          "west-valley-city",
          "west-jordan",
          "sandy",
          "orem",
        ];
        if (majorCities.includes(page.city)) {
          priority = isServicePage ? 0.8 : 0.75;
        } else {
          priority = isServicePage ? 0.7 : 0.65;
        }

        // More frequent updates for service pages
        if (isServicePage) {
          changeFrequency = "monthly";
        } else {
          changeFrequency = "monthly";
        }

        sitemapEntries.push({
          url: pageUrl,
          lastModified: new Date(page.updated_at),
          changeFrequency,
          priority,
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
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
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
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
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
