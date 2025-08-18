/**
 * Review Display Component
 * Displays customer reviews with proper schema markup and local SEO optimization
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { CityTestimonial } from '@/lib/city-content';

interface ReviewDisplayProps {
  reviews: CityTestimonial[];
  variant?: 'grid' | 'carousel' | 'list';
  showAll?: boolean;
  limit?: number;
  showSchemaMarkup?: boolean;
  city?: string;
  className?: string;
}

export function ReviewDisplay({
  reviews,
  variant = 'grid',
  showAll = false,
  limit = 6,
  showSchemaMarkup = true,
  city,
  className = '',
}: ReviewDisplayProps) {
  const displayedReviews = showAll ? reviews : reviews.slice(0, limit);

  if (!displayedReviews.length) {
    return null;
  }

  // Star rating component
  const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`${sizeClasses[size]} ${
              index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-sm text-gray-600 ml-2">({rating}.0)</span>
      </div>
    );
  };

  // Individual review card
  const ReviewCard = ({ review, index }: { review: CityTestimonial; index: number }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
            {review.customerName.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
            <p className="text-sm text-gray-600">{review.neighborhood}</p>
          </div>
        </div>
        <div className="text-right">
          <StarRating rating={review.rating} />
          <p className="text-xs text-gray-500 mt-1">
            {new Date(review.completionDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <blockquote className="text-gray-700 italic mb-4">"{review.quote}"</blockquote>

      <div className="border-t pt-4 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span className="font-medium">{review.service}</span>
          <span className="text-green-600 font-semibold">
            ${review.projectValue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Individual review schema markup */}
      {showSchemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Review',
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/review-${index}`,
              itemReviewed: {
                '@type': 'LocalBusiness',
                name: 'Wild West Construction',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: city || 'Salt Lake City',
                  addressRegion: 'UT',
                },
              },
              reviewRating: {
                '@type': 'Rating',
                ratingValue: review.rating,
                bestRating: 5,
                worstRating: 1,
              },
              author: {
                '@type': 'Person',
                name: review.customerName,
              },
              reviewBody: review.quote,
              datePublished: review.completionDate,
              publisher: {
                '@type': 'LocalBusiness',
                name: 'Wild West Construction',
              },
            }),
          }}
        />
      )}
    </div>
  );

  // Grid layout
  if (variant === 'grid') {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Customer Reviews {city && `in ${city}`}
          </h2>
          <p className="text-lg text-gray-600">
            See what our satisfied customers have to say about our work
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        {!showAll && reviews.length > limit && (
          <div className="text-center">
            <button className="btn-secondary">View All Reviews ({reviews.length})</button>
          </div>
        )}

        {/* Aggregate review schema markup */}
        {showSchemaMarkup && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Wild West Construction',
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: (
                    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
                  ).toFixed(1),
                  reviewCount: reviews.length,
                  bestRating: 5,
                  worstRating: 1,
                },
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: city || 'Salt Lake City',
                  addressRegion: 'UT',
                  addressCountry: 'US',
                },
              }),
            }}
          />
        )}
      </div>
    );
  }

  // List layout
  if (variant === 'list') {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Customer Testimonials {city && `from ${city}`}
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <StarRating
              rating={Math.round(
                reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
              )}
              size="md"
            />
            <span className="text-gray-600">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="space-y-4">
          {displayedReviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                  <p className="text-sm text-gray-600">
                    {review.neighborhood} • {review.service}
                  </p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-700 italic">"{review.quote}"</p>
              <div className="mt-3 text-sm text-gray-500 flex justify-between">
                <span>Project Value: ${review.projectValue.toLocaleString()}</span>
                <span>Completed: {new Date(review.completionDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Carousel layout (simplified for now)
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Our Customers Say {city && `in ${city}`}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <div
          className="flex space-x-6 pb-4"
          style={{ width: `${displayedReviews.length * 320}px` }}
        >
          {displayedReviews.map((review, index) => (
            <div key={index} className="flex-shrink-0 w-80">
              <ReviewCard review={review} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewDisplay;
