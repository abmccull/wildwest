import { NextResponse } from "next/server";

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

  // Core company and informational pages
  const coreUrls = [
    // Homepage - highest priority
    `<url><loc>${base}/</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    
    // Main company pages - high priority
    `<url><loc>${base}/about</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/team</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/contact</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
    
    // Content pages - medium priority  
    `<url><loc>${base}/faq</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${base}/testimonials</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${base}/gallery</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${base}/careers</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    
    // Legal pages - lower priority
    `<url><loc>${base}/privacy-policy</loc><lastmod>${now}</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>`,
    `<url><loc>${base}/terms</loc><lastmod>${now}</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>`,
    `<url><loc>${base}/license</loc><lastmod>${now}</lastmod><changefreq>yearly</changefreq><priority>0.4</priority></url>`,
  ];

  const body = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${coreUrls.join("")}
    </urlset>
  `;
  
  return new NextResponse(body, {
    headers: { 
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400" // Cache for 24 hours
    },
  });
}


