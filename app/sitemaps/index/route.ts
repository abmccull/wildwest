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
  
  const body = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${base}/sitemaps/core</loc>
        <lastmod>${now}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${base}/sitemaps/locations</loc>
        <lastmod>${now}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${base}/sitemaps/services</loc>
        <lastmod>${now}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${base}/sitemaps/blog</loc>
        <lastmod>${now}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${base}/sitemaps/pages</loc>
        <lastmod>${now}</lastmod>
      </sitemap>
    </sitemapindex>
  `;
  return new NextResponse(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}


