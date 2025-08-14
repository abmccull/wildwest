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
  const now = new Date().toISOString();

  let blogUrls: string[] = [];

  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Fetch all published blog posts
      const { data: blogPosts, error } = await supabase
        .from("blog_posts")
        .select("slug, updated_at")
        .eq("published", true)
        .order("updated_at", { ascending: false })
        .limit(1000); // Reasonable limit for blog posts

      if (!error && blogPosts && blogPosts.length > 0) {
        blogUrls = blogPosts.map(
          (post: { slug: string; updated_at: string }) =>
            `<url><loc>${base}/blog/${post.slug}</loc><lastmod>${new Date(post.updated_at).toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`
        );
      }
    }
  } catch (error) {
    console.error("Error generating blog sitemap:", error);
    // Continue with fallback
  }

  // Add main blog page
  const mainBlogUrl = `<url><loc>${base}/blog</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`;

  const body = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${mainBlogUrl}
      ${blogUrls.join("")}
    </urlset>
  `;

  return new NextResponse(body, {
    headers: { 
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600" // Cache for 1 hour
    },
  });
}