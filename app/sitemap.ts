import { createClient } from "@supabase/supabase-js";
import { MetadataRoute } from "next";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface PageData {
  slug: string;
  city: string;
  service: string;
  updated_at: string;
  published: boolean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://wildwestconstruction.com";

  try {
    // Fetch all published pages from Supabase
    const { data: pages, error } = await supabase
      .from("pages")
      .select("slug, city, service, updated_at, published")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching pages for sitemap:", error);
      // Return basic sitemap if database query fails
      return getBasicSitemap(baseUrl);
    }

    // Create sitemap entries
    const sitemapEntries: MetadataRoute.Sitemap = [
      // Homepage - highest priority
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      // About page
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      // Contact page
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];

    // Add dynamic pages from database
    if (pages && pages.length > 0) {
      pages.forEach((page: PageData) => {
        const pageUrl = `${baseUrl}/locations/${page.slug}`;

        // Set priority and change frequency based on page structure
        let priority = 0.7;
        let changeFrequency:
          | "always"
          | "hourly"
          | "daily"
          | "weekly"
          | "monthly"
          | "yearly"
          | "never" = "weekly";

        // All city/service pages get similar priority
        priority = 0.7;
        changeFrequency = "monthly";

        sitemapEntries.push({
          url: pageUrl,
          lastModified: new Date(page.updated_at),
          changeFrequency,
          priority,
        });
      });
    }

    return sitemapEntries;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return basic sitemap if any error occurs
    return getBasicSitemap(baseUrl);
  }
}

// Fallback basic sitemap in case of errors
function getBasicSitemap(baseUrl: string): MetadataRoute.Sitemap {
  return [
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
    // Add common service pages as fallback
    {
      url: `${baseUrl}/services/roofing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/siding`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/windows`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
