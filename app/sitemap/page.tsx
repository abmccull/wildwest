import Link from "next/link";

export const revalidate = 3600;

export default function HtmlSitemap() {
  const sections = [
    { title: "Core", links: [
      { href: "/", label: "Home" },
      { href: "/services/flooring", label: "Flooring" },
      { href: "/services/demolition", label: "Demolition" },
      { href: "/services/junk-removal", label: "Junk Removal" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
    ]},
    { title: "Sitemaps", links: [
      { href: "/sitemap-index.xml", label: "Sitemap Index (XML)" },
      { href: "/sitemaps/core.xml", label: "Core Sitemap (XML)" },
      { href: "/sitemaps/pages-1.xml", label: "Pages 1 (XML)" },
    ]},
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">HTML Sitemap</h1>
      <p className="mb-8 text-gray-600">
        Quick access to core pages and XML sitemaps. This page aids discovery and internal linking.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((s) => (
          <section key={s.title} className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{s.title}</h2>
            <ul className="space-y-2">
              {s.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-blue-600 hover:text-red-600">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}


