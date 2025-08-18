// This component is deprecated in favor of using the Metadata API in App Router
// Use generateMetadata function in your page.tsx files instead

import { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'article' | 'service';
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: object | object[];
  noindex?: boolean;
  nofollow?: boolean;
  city?: string;
  service?: string;
  alternateUrls?: { href: string; hreflang: string }[];
}

// Helper function to generate metadata for App Router pages
export function generateSEOMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/images/og-default.jpg',
  ogImageAlt = 'Wild West Construction - Professional Construction Services',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  noindex = false,
  nofollow = false,
  city,
  service,
  alternateUrls = [],
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com';
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Enhanced title for better SEO
  const enhancedTitle = title.includes('Wild West Construction')
    ? title
    : `${title} | Wild West Construction`;

  // Enhanced description with location and service context
  const getEnhancedDescription = () => {
    let desc = description;

    if (city && service && !desc.includes(city) && !desc.includes(service)) {
      desc = `${service} services in ${city}. ${desc}`;
    } else if (city && !desc.includes(city)) {
      desc = `${desc} Serving ${city} and surrounding areas.`;
    } else if (service && !desc.includes(service)) {
      desc = `Professional ${service} services. ${desc}`;
    }

    return desc.length > 160 ? desc.substring(0, 157) + '...' : desc;
  };

  const enhancedDescription = getEnhancedDescription();

  // Generate keywords with location and service context
  const getGeneratedKeywords = () => {
    const baseKeywords = keywords || 'construction, home improvement, renovation, contractor';
    const keywordArray = baseKeywords.split(',').map((k) => k.trim());

    if (city) {
      keywordArray.push(`${city} construction`, `construction ${city}`, `contractor ${city}`);
    }

    if (service) {
      keywordArray.push(`${service}`, `${service} contractor`, `${service} services`);

      if (city) {
        keywordArray.push(`${service} ${city}`, `${city} ${service}`);
      }
    }

    // Add Salt Lake County variations
    keywordArray.push(
      'Salt Lake County construction',
      'Utah construction',
      'Salt Lake construction'
    );

    return Array.from(new Set(keywordArray)).join(', ');
  };

  const generatedKeywords = getGeneratedKeywords();

  // Build alternates object
  const alternates: Metadata['alternates'] = {
    canonical: canonical ? `${siteUrl}${canonical}` : undefined,
    languages: alternateUrls.reduce(
      (acc, alt) => {
        acc[alt.hreflang] = `${siteUrl}${alt.href}`;
        return acc;
      },
      {} as Record<string, string>
    ),
  };

  // Build metadata object
  const metadata: Metadata = {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: generatedKeywords,
    authors: [{ name: 'Wild West Construction' }],
    creator: 'Wild West Construction',
    publisher: 'Wild West Construction',
    metadataBase: new URL(siteUrl),
    alternates,
    openGraph: {
      type: ogType as any,
      siteName: 'Wild West Construction',
      title: enhancedTitle,
      description: enhancedDescription,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: twitterCard,
      site: '@wildwestconstr',
      creator: '@wildwestconstr',
      title: enhancedTitle,
      description: enhancedDescription,
      images: [fullOgImage],
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large' as any,
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/site.webmanifest',
    other: {
      'theme-color': '#D97706',
      'msapplication-TileColor': '#D97706',
      'msapplication-config': '/browserconfig.xml',
      ...(city && { 'business:contact_data:locality': city }),
      'business:contact_data:region': 'Utah',
      'business:contact_data:country_name': 'United States',
      'geo.region': 'US-UT',
      'geo.position': '40.7608;-111.8910',
      ICBM: '40.7608, -111.8910',
    },
  };

  return metadata;
}

// Legacy component for gradual migration
// This is kept for backward compatibility but should not be used in new code
export const SEOHead: React.FC<SEOProps> = (props) => {
  if (typeof window !== 'undefined') {
    console.warn(
      'SEOHead component is deprecated. Use generateSEOMetadata function with generateMetadata in your page.tsx files instead.'
    );
  }
  return null;
};

// Script injection helper for structured data
export function generateStructuredDataScript(data: object | object[]): string {
  return `<script type="application/ld+json">${JSON.stringify(
    Array.isArray(data) ? data : [data]
  )}</script>`;
}
