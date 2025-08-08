import { MetadataRoute } from "next";

// Use Node.js runtime for better compatibility 
// export const runtime = 'edge'; // Removed due to compatibility issues
export const revalidate = 86400; // Revalidate once per day

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wildwestslc.com";

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
          "/*.json$",
          "/*?*utm_*",
          "/*?*fbclid*",
          "/*?*gclid*",
        ]
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
      },
      // Block common scraper bots
      {
        userAgent: "AhrefsBot",
        disallow: "/api/",
      },
      {
        userAgent: "SemrushBot",
        disallow: "/api/",
      },
      {
        userAgent: "MJ12bot",
        disallow: "/api/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
