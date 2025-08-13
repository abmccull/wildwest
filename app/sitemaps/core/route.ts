import { NextResponse } from "next/server";

function xml(strings: TemplateStringsArray, ...values: Array<string | number>) {
  let out = "";
  strings.forEach((s, i) => {
    out += s + (values[i] ?? "");
  });
  return out.trim();
}

export async function GET() {
  const base = "https://wildwestslc.com";
  const now = new Date().toISOString();
  const urls = [
    `${base}/`,
    `${base}/about`,
    `${base}/services/flooring`,
    `${base}/services/demolition`,
    `${base}/services/junk-removal`,
    `${base}/blog`,
    `${base}/faq`,
    `${base}/privacy-policy`,
    `${base}/terms`,
  ];

  const body = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (u) => `<url><loc>${u}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
        )
        .join("")}
    </urlset>
  `;
  return new NextResponse(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}


