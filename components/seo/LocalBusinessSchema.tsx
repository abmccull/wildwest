export interface LocalBusinessSchemaProps {
  city?: string;
  service?: string;
  reviews?: {
    rating: number;
    count: number;
  };
}

export function generateLocalBusinessSchema({
  city,
  service,
  reviews = { rating: 4.9, count: 127 },
}: LocalBusinessSchemaProps = {}) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://wildwestslc.com/#business',
    name: 'Wild West Construction',
    image: [
      'https://wildwestslc.com/images/logo.png',
      'https://wildwestslc.com/images/hero-construction.jpg',
      'https://wildwestslc.com/images/team.jpg',
    ],
    logo: {
      '@type': 'ImageObject',
      url: 'https://wildwestslc.com/images/logo.png',
      width: 600,
      height: 200,
    },
    url: 'https://wildwestslc.com',
    telephone: '+1-801-555-0123',
    email: 'info@wildwestconstruction.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Construction Blvd',
      addressLocality: city || 'Salt Lake City',
      addressRegion: 'UT',
      postalCode: '84101',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7608,
      longitude: -111.891,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Debit Card', 'Visa', 'MasterCard', 'American Express', 'Discover'],
    currenciesAccepted: 'USD',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.rating.toString(),
      reviewCount: reviews.count.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        author: {
          '@type': 'Person',
          name: 'John Smith',
        },
        datePublished: '2025-01-15',
        reviewBody: 'Excellent flooring installation! The team was professional, on time, and the quality exceeded expectations.',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Sarah Johnson',
        },
        datePublished: '2025-01-10',
        reviewBody: 'Wild West Construction did an amazing job with our demolition project. Clean, efficient, and fairly priced.',
      },
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Salt Lake City',
        '@id': 'https://www.wikidata.org/wiki/Q23337',
      },
      {
        '@type': 'City',
        name: 'Sandy',
        '@id': 'https://www.wikidata.org/wiki/Q482878',
      },
      {
        '@type': 'City',
        name: 'West Jordan',
        '@id': 'https://www.wikidata.org/wiki/Q482629',
      },
      {
        '@type': 'City',
        name: 'Draper',
        '@id': 'https://www.wikidata.org/wiki/Q963816',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Salt Lake County',
        '@id': 'https://www.wikidata.org/wiki/Q488698',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Construction Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service || 'Flooring Installation',
            description: 'Professional flooring installation including hardwood, laminate, vinyl, and tile',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Wild West Construction',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Demolition Services',
            description: 'Safe and efficient demolition for residential and commercial properties',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Wild West Construction',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Junk Removal',
            description: 'Fast and eco-friendly junk removal and debris cleanup',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Wild West Construction',
            },
          },
        },
      ],
    },
    sameAs: [
      'https://www.facebook.com/wildwestconstruction',
      'https://www.instagram.com/wildwestconstruction',
      'https://www.linkedin.com/company/wildwestconstruction',
      'https://www.youtube.com/@wildwestconstruction',
      'https://nextdoor.com/pages/wildwestconstruction',
    ],
    knowsAbout: [
      'Flooring Installation',
      'Hardwood Flooring',
      'Laminate Flooring',
      'Vinyl Flooring',
      'Tile Installation',
      'Demolition',
      'Interior Demolition',
      'Junk Removal',
      'Construction Debris Removal',
      'Home Renovation',
      'Commercial Construction',
    ],
    slogan: 'Quality Construction You Can Trust',
    founder: {
      '@type': 'Person',
      name: 'Wild West Construction Team',
    },
    foundingDate: '2010',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50,
    },
  };

  // Add city-specific information if provided
  if (city) {
    baseSchema.address.addressLocality = city;
    baseSchema.name = `Wild West Construction - ${city}`;
  }

  return baseSchema;
}

export const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = (props) => {
  const schema = generateLocalBusinessSchema(props);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};