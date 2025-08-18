import React from 'react';
import Link from 'next/link';
import { ServiceData, ParsedServiceData } from '@/lib/data-parser';

interface ServiceCardProps {
  service: ServiceData | ParsedServiceData;
  city?: string;
  showPrice?: boolean;
  showDuration?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  city,
  showPrice = true,
  showDuration = true,
  variant = 'default',
  className = '',
}) => {
  // Determine if this is a ServiceData or ParsedServiceData
  const isServiceData = 'averagePrice' in service;
  const isParsedServiceData = 'urlSlug' in service;

  // Create the appropriate link
  const getServiceLink = () => {
    if (isParsedServiceData) {
      return (service as ParsedServiceData).urlSlug;
    }
    if (city && isServiceData) {
      const citySlug = city
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      return `/${citySlug}-ut/${(service as ServiceData).slug}`;
    }
    return `#`;
  };

  const getTitle = () => {
    if (isParsedServiceData) {
      return (service as ParsedServiceData).seoTitle || (service as ParsedServiceData).keyword;
    }
    return (service as ServiceData).service;
  };

  const getDescription = () => {
    if (isParsedServiceData) {
      return (service as ParsedServiceData).metaDescription;
    }
    return (service as ServiceData).description;
  };

  const getPrice = () => {
    if (isServiceData) {
      const price = (service as ServiceData).averagePrice;
      return price > 0 ? `Starting at $${price.toLocaleString()}` : 'Contact for pricing';
    }
    return 'Contact for pricing';
  };

  const getDuration = () => {
    if (isServiceData) {
      return (service as ServiceData).duration;
    }
    return null;
  };

  const getPopularity = () => {
    if (isServiceData) {
      return (service as ServiceData).popularity;
    }
    return null;
  };

  const baseClasses =
    'bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary/20';

  const variantClasses = {
    default: 'p-6',
    compact: 'p-4',
    featured: 'p-8 border-2 border-primary/20 relative',
  };

  const popularity = getPopularity();
  const isPopular = popularity && popularity >= 85;

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {variant === 'featured' && isPopular && (
        <div className="absolute -top-3 left-6 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          Popular Choice
        </div>
      )}

      <Link href={getServiceLink()} className="block group">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-text-dark group-hover:text-primary transition-colors duration-200 mb-2">
            {getTitle()}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{getDescription()}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            {showPrice && <div className="text-lg font-semibold text-primary">{getPrice()}</div>}
            {showDuration && getDuration() && (
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {getDuration()}
              </div>
            )}
          </div>

          <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
            <span className="text-sm mr-2">Learn More</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {isServiceData && (
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {popularity}% Popular
            </span>
            <span>•</span>
            <span>{(service as ServiceData).difficulty} Difficulty</span>
            <span>•</span>
            <span>{(service as ServiceData).seasonality}</span>
          </div>
        )}
      </Link>
    </div>
  );
};
