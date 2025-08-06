import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://wildwestslc.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/temp/",
          "/test/",
          "*.json",
          "*.xml$", // Allow sitemap.xml but block other XML files
          "*?*utm_*", // Block tracking parameters
          "*?*fbclid*", // Block Facebook click IDs
          "*?*gclid*", // Block Google click IDs
        ],
        crawlDelay: 1, // Be respectful to search engines
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/temp/",
          "/test/",
        ],
        crawlDelay: 0, // No delay for Google
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/temp/",
          "/test/",
        ],
        crawlDelay: 1,
      },
      // Block AI training bots from scraping content
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
        crawlDelay: 2,
      },
      // Block common scraper bots
      {
        userAgent: "AhrefsBot",
        crawlDelay: 10,
        disallow: "/api/",
      },
      {
        userAgent: "SemrushBot",
        crawlDelay: 10,
        disallow: "/api/",
      },
      {
        userAgent: "MJ12bot",
        crawlDelay: 10,
        disallow: "/api/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
