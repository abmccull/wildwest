import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase-server";
import BlogPostCard from "@/components/BlogPostCard";
import BlogPagination from "@/components/BlogPagination";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category_name: string;
  category_slug: string;
  featured_image: string | null;
  tags: string[];
  published: boolean;
  featured: boolean;
  views: number;
  reading_time: number | null;
  published_at: string | null;
  created_at: string;
}

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Construction Blog | Wild West Construction",
  description:
    "Expert tips, insights, and guides on flooring, demolition, junk removal, and home improvement from Utah's trusted construction professionals.",
  keywords:
    "construction blog, flooring tips, demolition guide, junk removal, home improvement Utah, construction advice Salt Lake City",
  openGraph: {
    title: "Construction Blog | Wild West Construction",
    description:
      "Expert tips, insights, and guides on flooring, demolition, junk removal, and home improvement from Utah's trusted construction professionals.",
    type: "website",
    url: "https://wildwestslc.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Blog | Wild West Construction",
    description:
      "Expert tips, insights, and guides on flooring, demolition, junk removal, and home improvement from Utah's trusted construction professionals.",
  },
};

async function getBlogPosts(page = 1, category?: string, search?: string) {
  const supabase = await createServerClient();

  try {
    const { data: posts, error } = await supabase.rpc("get_blog_posts", {
      page_num: page,
      page_size: 12,
      category_slug: category || null,
      search_term: search || null,
    });

    if (error) {
      console.error("Error fetching blog posts:", error);
      return { posts: [], totalCount: 0 };
    }

    // Get total count for pagination
    const { data: totalCount } = await supabase.rpc("get_blog_posts_count", {
      category_slug: category || null,
      search_term: search || null,
    });

    return { posts: posts || [], totalCount: totalCount || 0 };
  } catch (error) {
    console.error("Error in getBlogPosts:", error);
    return { posts: [], totalCount: 0 };
  }
}

async function getCategories() {
  const supabase = await createServerClient();

  try {
    const { data: categories, error } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

    return categories || [];
  } catch (error) {
    console.error("Error in getCategories:", error);
    return [];
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const category = params.category;
  const search = params.search;

  const [{ posts, totalCount }, categories] = await Promise.all([
    getBlogPosts(page, category, search),
    getCategories(),
  ]);

  const totalPages = Math.ceil(totalCount / 12);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Construction Blog</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Expert insights, tips, and guides from Utah&apos;s trusted
                construction professionals. Learn about flooring, demolition,
                junk removal, and home improvement.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Categories Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  href="/blog"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !category
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Posts
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog?category=${cat.slug}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      category === cat.slug
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Results Info */}
            {(category || search) && (
              <div className="mb-8 text-center">
                <p className="text-gray-600">
                  {search
                    ? `Search results for "${search}"`
                    : `Showing ${categories.find((c) => c.slug === category)?.name || category} posts`}
                  {totalCount > 0 &&
                    ` (${totalCount} ${totalCount === 1 ? "post" : "posts"})`}
                </p>
              </div>
            )}

            {/* Blog Posts Grid */}
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {posts.map((post: BlogPost) => (
                    <Suspense
                      key={post.id}
                      fallback={
                        <div className="bg-gray-100 rounded-lg h-96 animate-pulse" />
                      }
                    >
                      <BlogPostCard post={post} />
                    </Suspense>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <BlogPagination
                    currentPage={page}
                    totalPages={totalPages}
                    basePath="/blog"
                    searchParams={{ category, search }}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  No posts found
                </h2>
                <p className="text-gray-600 mb-8">
                  {search || category
                    ? "Try adjusting your search or browse all posts."
                    : "Check back soon for new content!"}
                </p>
                {(search || category) && (
                  <Link href="/blog" className="btn-primary inline-block">
                    View All Posts
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Construction Services?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our expert team is ready to help with all your flooring,
              demolition, and junk removal needs throughout Utah.
            </p>
            <div className="space-x-4">
              <Link href="/locations/murray/flooring" className="btn-primary">
                Get Free Quote
              </Link>
              <Link href="/locations" className="btn-outline">
                View Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Wild West Construction Blog",
            description:
              "Expert construction insights, tips, and guides from Utah's trusted professionals.",
            url: "https://wildwestslc.com/blog",
            publisher: {
              "@type": "Organization",
              name: "Wild West Construction",
              logo: {
                "@type": "ImageObject",
                url: "https://wildwestslc.com/images/logo.png",
              },
            },
            blogPost: posts.map((post: BlogPost) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              url: `https://wildwestslc.com/blog/${post.slug}`,
              datePublished: post.published_at,
              dateModified: post.created_at,
              author: {
                "@type": "Organization",
                name: post.author,
              },
              publisher: {
                "@type": "Organization",
                name: "Wild West Construction",
              },
            })),
          }),
        }}
      />
    </div>
  );
}
