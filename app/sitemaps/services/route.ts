import { NextResponse } from "next/server";

// Simple XML builder
function xml(strings: TemplateStringsArray, ...values: Array<string | number>) {
  let out = "";
  strings.forEach((s, i) => {
    out += s + (values[i] ?? "");
  });
  return out.trim();
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://wildwestslc.com";
  const now = new Date().toISOString();

  // Main service pages
  const serviceUrls = [
    `<url><loc>${base}/services/flooring</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    `<url><loc>${base}/services/demolition</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    `<url><loc>${base}/services/junk-removal</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
  ];

  const body = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${serviceUrls.join("")}
    </urlset>
  `;

  return new NextResponse(body, {
    headers: { 
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400" // Cache for 24 hours
    },
  });
}