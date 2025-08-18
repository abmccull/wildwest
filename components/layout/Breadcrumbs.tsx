import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  city?: string;
  service?: string;
  category?: string;
  showHome?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  city,
  service,
  category,
  showHome = true,
  className = '',
}) => {
  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const breadcrumbs: BreadcrumbItem[] = [];

    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        href: '/',
      });
    }

    // Add category breadcrumb
    if (category) {
      breadcrumbs.push({
        label:
          category === 'flooring'
            ? 'Flooring Services'
            : category === 'demolition'
              ? 'Demolition Services'
              : category === 'junk-removal'
                ? 'Junk Removal Services'
                : `${category} Services`,
        href: `/${category}`,
      });
    }

    // Add city breadcrumb
    if (city) {
      const cityDisplay = city
        .replace(/-ut$/, '')
        .replace(/-/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label: `${cityDisplay} Services`,
        href: category ? `/${city}` : `/${city}`,
      });
    }

    // Add service breadcrumb
    if (service && city) {
      const serviceDisplay = service
        .replace(/-/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label: serviceDisplay,
        current: true,
      });
    } else if (service) {
      const serviceDisplay = service
        .replace(/-/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label: serviceDisplay,
        current: true,
      });
    } else if (city) {
      // Mark city as current if no service
      breadcrumbs[breadcrumbs.length - 1].current = true;
    } else if (category) {
      // Mark category as current if no city or service
      breadcrumbs[breadcrumbs.length - 1].current = true;
    }

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  // Generate structured data for breadcrumbs
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: {
          '@type': 'WebPage',
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com'}${item.href}`,
        },
      }),
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className={`bg-gray-50 border-b border-gray-200 ${className}`}>
        <div className="container-custom py-3">
          <ol
            className="flex items-center space-x-2 text-sm"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Separator */}
                {index > 0 && (
                  <svg
                    className="w-4 h-4 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}

                {/* Breadcrumb Item */}
                {item.current || !item.href ? (
                  <span
                    className="text-gray-600 font-medium truncate max-w-xs sm:max-w-none"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-primary hover:text-primary/80 transition-colors truncate max-w-xs sm:max-w-none"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}

                {/* Hidden position for structured data */}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
