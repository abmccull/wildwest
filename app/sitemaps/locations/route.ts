import { NextResponse } from "next/server";

// Simple XML builder
function xml(strings: TemplateStringsArray, ...values: Array<string | number>) {
  let out = "";
  strings.forEach((s, i) => {
    out += s + (values[i] ?? "");
  });
  return out.trim();
}

// City slugs - these should match the CITY_DISPLAY_NAMES from lib/seo.ts
const CITIES = [
  "salt-lake-city",
  "west-valley-city", 
  "west-jordan",
  "sandy",
  "south-jordan",
  "orem",
  "ogden",
  "layton",
  "taylorsville",
  "murray",
  "bountiful",
  "draper",
  "riverton",
  "herriman",
  "midvale",
  "holladay",
  "south-salt-lake",
  "bluffdale",
  "roy",
  "pleasant-grove",
  "cottonwood-heights",
];

// Service slugs
const SERVICES = ["flooring", "demolition", "junk-removal"];

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://wildwestslc.com";
  const now = new Date().toISOString();

  // Generate city hub pages and city-service combination pages
  const locationUrls: string[] = [];

  // City hub pages (e.g., /locations/salt-lake-city)
  CITIES.forEach((city) => {
    locationUrls.push(
      `<url><loc>${base}/locations/${city}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    );

    // City-service combination pages (e.g., /locations/salt-lake-city/flooring)
    SERVICES.forEach((service) => {
      locationUrls.push(
        `<url><loc>${base}/locations/${city}/${service}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
      );
    });
  });

  const body = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locationUrls.join("")}
    </urlset>
  `;

  return new NextResponse(body, {
    headers: { 
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400" // Cache for 24 hours
    },
  });
}