"use client";

import Link from "next/link";
import Image from "next/image";

interface BlogPostCardProps {
  post: {
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
  };
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const publishedDate = post.published_at || post.created_at;
  const formattedDate = new Date(publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Featured Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-red-100 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium">No Image</p>
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Link
            href={`/blog?category=${post.category_slug}`}
            className="bg-black/70 text-white px-2 py-1 text-xs font-semibold rounded-full hover:bg-black/80 transition-colors"
          >
            {post.category_name}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <time dateTime={publishedDate}>{formattedDate}</time>
          {post.reading_time && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {post.reading_time} min read
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-800 transition-colors">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-gray-400 text-xs py-1">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            {post.views.toLocaleString()} views
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors group-hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
