import { createClient } from "@supabase/supabase-js";
import { CITY_DISPLAY_NAMES } from "@/lib/seo";
import { SERVICES } from "@/types/database";
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
        url: `${baseUrl}/team`,
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
    ];

    // Add dynamic pages from database with intelligent prioritization
    if (pages && pages.length > 0) {
      const toSlug = (value: string): string => {
        return String(value || "")
          .toLowerCase()
          .replace(/[_\s]+/g, "-")
          .replace(/[^a-z0-9-]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$|\.$/g, "");
      };
      pages.forEach((page: PageData) => {
        // Determine if it's a city hub or city+service page
        const isServicePage = page.service && page.service !== "hub";
        // Normalize/slugify to kebab-case to match route structure
        const citySlug = toSlug(page.city);
        const serviceSlug = toSlug(page.service);
        const pageUrl = isServicePage
          ? `${baseUrl}/locations/${citySlug}/${serviceSlug}`
          : `${baseUrl}/locations/${citySlug}`;

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

    // Add full static coverage for city/service URLs
    for (const city of Object.keys(CITY_DISPLAY_NAMES)) {
      sitemapEntries.push({
        url: `${baseUrl}/locations/${city}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.75,
      });
      for (const service of SERVICES) {
        const serviceUrl = service.replace(/_/g, "-");
        sitemapEntries.push({
          url: `${baseUrl}/locations/${city}/${serviceUrl}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }

    // Dedupe URLs and sort by priority (highest first)
    const seen = new Set<string>();
    const deduped = sitemapEntries.filter((entry) => {
      if (!entry.url) return false;
      if (seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    });
    return deduped.sort((a, b) => (b.priority || 0) - (a.priority || 0));
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
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Dedupe and sort by priority
  const seen = new Set<string>();
  const deduped = sitemapEntries.filter((entry) => {
    if (!entry.url) return false;
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
  return deduped.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}
