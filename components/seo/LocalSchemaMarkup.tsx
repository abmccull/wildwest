/**
 * Local SEO Schema Markup Component
 * Generates comprehensive structured data for local business optimization
 */

import React from 'react';
import { CityData } from '@/lib/data-parser';
import { getCityContent, CityContent } from '@/lib/city-content';

interface LocalSchemaMarkupProps {
  city: CityData;
  service?: string;
  showNeighborhoods?: boolean;
  showReviews?: boolean;
}

export function LocalSchemaMarkup({ 
  city, 
  service = 'Construction Services',
  showNeighborhoods = true,
  showReviews = true 
}: LocalSchemaMarkupProps) {
  const cityContent = getCityContent(city.slug);
  
  if (!cityContent) return null;

  // Main Local Business Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${city.slug}#business`,
    name: 'Wild West Construction',
    description: `Professional construction services in ${city.name}, Utah. Specializing in flooring, demolition, and junk removal with over 10 years of local experience.`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${city.slug}`,
    telephone: cityContent.localPhoneNumbers.main,
    email: 'info@wildwestconstruction.com',
    image: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/images/wildwest-construction-logo.jpg`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/images/construction-work-${city.slug}.jpg`
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Check, Credit Card, Financing Available',
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressRegion: 'UT',
      addressCountry: 'US'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Construction Blvd',
      addressLocality: 'Salt Lake City',
      addressRegion: 'UT',
      postalCode: '84101',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.latitude,
      longitude: city.longitude
    },
    openingHours: [
      'Mo-Fr 07:00-18:00',
      'Sa 08:00-16:00'
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: cityContent.testimonials.length + 127,
      bestRating: '5',
      worstRating: '1'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Construction Services in ${city.name}`,
      itemListElement: cityContent.popularServices.map((service, index) => ({
        '@type': 'Offer',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${city.slug}/${service.service.toLowerCase().replace(/\s+/g, '-')}#offer`,
        itemOffered: {
          '@type': 'Service',
          name: service.service,
          description: service.description,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Wild West Construction'
          },
          areaServed: {
            '@type': 'City',
            name: city.name,
            addressRegion: 'UT'
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: service.averageProject,
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              price: service.averageProject,
              valueAddedTaxIncluded: false
            },
            availability: 'InStock',
            itemCondition: 'NewCondition'
          }
        },
        position: index + 1
      }))
    },
    sameAs: [
      'https://www.facebook.com/wildwestconstruction',
      'https://www.linkedin.com/company/wild-west-construction',
      'https://www.yelp.com/biz/wild-west-construction-salt-lake-city',
      'https://www.bbb.org/us/ut/salt-lake-city/profile/general-contractor/wild-west-construction'
    ],
    founder: {
      '@type': 'Person',
      name: 'John Smith',
      jobTitle: 'Owner & General Contractor'
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '15-25'
    },
    yearEstablished: '2014',
    slogan: 'Building Utah\'s Future, One Project at a Time'
  };

  // Service Area Schema
  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'ServiceArea',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${city.slug}#servicearea`,
    areaServed: [
      {
        '@type': 'City',
        name: city.name,
        addressRegion: 'UT',
        addressCountry: 'US'
      },
      ...cityContent.neighborhoods.map(neighborhood => ({
        '@type': 'Place',
        name: `${neighborhood.name}, ${city.name}`,
        containedInPlace: {
          '@type': 'City',
          name: city.name,
          addressRegion: 'UT'
        }
      }))
    ],
    availableService: cityContent.popularServices.map(service => ({
      '@type': 'Service',
      name: service.service,
      description: service.description,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Wild West Construction'
      }
    }))
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#organization`,
    name: 'Wild West Construction',
    alternateName: 'Wild West Construction LLC',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/wildwest-logo.png`,
      width: 300,
      height: 100
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: cityContent.localPhoneNumbers.main,
        contactType: 'customer service',
        areaServed: 'UT',
        availableLanguage: ['English', 'Spanish']
      },
      {
        '@type': 'ContactPoint',
        telephone: cityContent.localPhoneNumbers.emergency,
        contactType: 'emergency',
        areaServed: city.name,
        availableLanguage: 'English'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Construction Blvd',
      addressLocality: 'Salt Lake City',
      addressRegion: 'UT',
      postalCode: '84101',
      addressCountry: 'US'
    },
    sameAs: [
      'https://www.facebook.com/wildwestconstruction',
      'https://www.linkedin.com/company/wild-west-construction'
    ]
  };

  // Reviews Schema (if enabled)
  const reviewsSchema = showReviews && cityContent.testimonials.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${city.slug}#reviews`,
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Wild West Construction',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${city.slug}#business`
    },
    reviewBody: cityContent.testimonials.map(testimonial => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating,
        bestRating: 5
      },
      author: {
        '@type': 'Person',
        name: testimonial.customerName
      },
      reviewBody: testimonial.quote,
      datePublished: testimonial.completionDate,
      publisher: {
        '@type': 'LocalBusiness',
        name: 'Wild West Construction'
      }
    }))
  } : null;

  // FAQ Schema for common city-specific questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${city.slug}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: `Do you provide construction services in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, Wild West Construction provides comprehensive construction services throughout ${city.name}, Utah. We serve all neighborhoods including ${cityContent.neighborhoods.map(n => n.name).join(', ')}.`
        }
      },
      {
        '@type': 'Question',
        name: `What's your response time in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Our typical response time in ${city.name} is ${cityContent.emergencyResponse.responseTime}. We offer ${cityContent.emergencyResponse.coverage24_7 ? '24/7 emergency services' : 'emergency services during business hours'}.`
        }
      },
      {
        '@type': 'Question',
        name: `Do you handle permits in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, we handle all permit requirements through the ${cityContent.buildingCodes.permitOffice}. Average permit processing time is ${cityContent.buildingCodes.averagePermitTime}.`
        }
      },
      {
        '@type': 'Question',
        name: `What are the most popular services in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Our most popular services in ${city.name} include ${cityContent.popularServices.slice(0, 3).map(s => s.service).join(', ')}. We customize our services based on local needs and preferences.`
        }
      }
    ]
  };

  return (
    <>
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />

      {/* Service Area Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceAreaSchema)
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      {/* Reviews Schema */}
      {reviewsSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewsSchema)
          }}
        />
      )}

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
    </>
  );
}

export default LocalSchemaMarkup;