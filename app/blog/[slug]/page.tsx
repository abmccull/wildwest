import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createServerClient } from '@/lib/supabase-server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialShare from '@/components/SocialShare';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string) {
  const supabase = await createServerClient();

  try {
    const { data: posts, error } = await supabase.rpc('get_blog_post_with_related', {
      post_slug: slug,
    });

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    return posts && posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error in getBlogPost:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Wild West Construction',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  const publishedDate = post.published_at || post.created_at;

  return {
    title: `${post.title} | Wild West Construction Blog`,
    description: post.meta_description || post.excerpt,
    keywords: post.meta_keywords || post.tags?.join(', ') || '',
    authors: [{ name: post.author }],
    publishedTime: publishedDate,
    modifiedTime: post.created_at,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://wildwestslc.com/blog/${post.slug}`,
      publishedTime: publishedDate,
      modifiedTime: post.created_at,
      authors: [post.author],
      images: post.featured_image
        ? [
            {
              url: post.featured_image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
      tags: post.tags || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const publishedDate = post.published_at || post.created_at;
  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Parse related posts from JSON
  const relatedPosts = post.related_posts ? JSON.parse(post.related_posts as string) : [];

  // Increment view count (fire and forget)
  const supabase = await createServerClient();
  supabase.rpc('increment_blog_post_views', { post_uuid: post.id }).catch(console.error);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="text-sm">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                  <svg className="fill-current w-3 h-3 mx-3" viewBox="0 0 320 512">
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                </li>
                <li className="flex items-center">
                  <Link href="/blog" className="text-gray-500 hover:text-gray-700">
                    Blog
                  </Link>
                  <svg className="fill-current w-3 h-3 mx-3" viewBox="0 0 320 512">
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                </li>
                <li>
                  <Link
                    href={`/blog?category=${post.category_slug}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {post.category_name}
                  </Link>
                  <svg className="fill-current w-3 h-3 mx-3" viewBox="0 0 320 512">
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                </li>
                <li className="text-gray-700 truncate">{post.title}</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="mb-8">
              {/* Category Badge */}
              <div className="mb-4">
                <Link
                  href={`/blog?category=${post.category_slug}`}
                  className="inline-block bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-full hover:bg-red-700 transition-colors"
                >
                  {post.category_name}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-gray-600 border-b border-gray-200 pb-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <time dateTime={publishedDate}>{formattedDate}</time>
                  </div>

                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{post.author}</span>
                  </div>

                  {post.reading_time && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{post.reading_time} min read</span>
                    </div>
                  )}

                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                </div>

                <SocialShare
                  url={`https://wildwestslc.com/blog/${post.slug}`}
                  title={post.title}
                  description={post.excerpt}
                />
              </div>
            </header>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="mb-8">
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Excerpt */}
            <div className="mb-8 p-6 bg-gray-50 border-l-4 border-red-600 rounded-r-lg">
              <p className="text-lg text-gray-700 font-medium leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, '<br />'),
                }}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-600 font-medium mr-2">Tags:</span>
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-800 px-3 py-1 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Need Expert Construction Services?</h3>
              <p className="text-blue-100 mb-6">
                Our professional team is ready to help with all your flooring, demolition, and junk removal needs throughout Utah.
              </p>
              <div className="space-x-4">
                <Link
                  href="/locations/murray/flooring"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Get Free Quote
                </Link>
                <Link
                  href="/locations"
                  className="inline-block border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost: {
                  id: string;
                  title: string;
                  slug: string;
                  excerpt: string;
                  published_at: string;
                }) => (
                  <div key={relatedPost.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">
                        <Link 
                          href={`/blog/${relatedPost.slug}`}
                          className="text-gray-900 hover:text-blue-800 transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="text-sm text-gray-500">
                        {new Date(relatedPost.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.featured_image || 'https://wildwestslc.com/images/og-image.jpg',
            author: {
              '@type': 'Organization',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Wild West Construction',
              logo: {
                '@type': 'ImageObject',
                url: 'https://wildwestslc.com/images/logo.png',
              },
            },
            datePublished: publishedDate,
            dateModified: post.created_at,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://wildwestslc.com/blog/${post.slug}`,
            },
            articleSection: post.category_name,
            keywords: post.tags?.join(', ') || '',
          }),
        }}
      />
    </div>
  );
}