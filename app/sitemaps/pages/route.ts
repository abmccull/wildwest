import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
  
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Supabase environment variables not configured");
      return new NextResponse(
        xml`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
        { headers: { "Content-Type": "application/xml; charset=utf-8" } }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Fetch all published pages from database
    const { data: pages, error } = await supabase
      .from("pages")
      .select("slug, updated_at, keyword, service")
      .eq("published", true)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching pages for sitemap:", error);
      return new NextResponse(
        xml`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
        { headers: { "Content-Type": "application/xml; charset=utf-8" } }
      );
    }

    const pageUrls: string[] = [];
    
    if (pages && pages.length > 0) {
      pages.forEach((page: { slug: string; updated_at: string; keyword?: string; service?: string }) => {
        // Determine priority based on page type
        let priority = 0.5; // Default priority
        
        // Higher priority for main service pages (no keyword)
        if (page.service && !page.keyword) {
          priority = 0.6;
        }
        // Lower priority for keyword-specific pages
        else if (page.keyword) {
          priority = 0.4;
        }
        
        pageUrls.push(
          `<url><loc>${base}/${page.slug}</loc><lastmod>${new Date(page.updated_at).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
        );
      });
    }

    const body = xml`
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pageUrls.join("")}
      </urlset>
    `;

    return new NextResponse(body, {
      headers: { 
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600" // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error generating pages sitemap:", error);
    return new NextResponse(
      xml`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { headers: { "Content-Type": "application/xml; charset=utf-8" } }
    );
  }
}