import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getUniqueCities,
  getServicesForCity,
  getCityBySlug,
  getAllCities,
} from '@/lib/data-parser';
import { getCityContent, getCityTestimonials } from '@/lib/city-content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { RecentJobs } from '@/components/pages/RecentJobs';
import { NearbyCities } from '@/components/pages/NearbyCities';
import { NAPBlock } from '@/components/pages/NAPBlock';
import LocalSchemaMarkup from '@/components/seo/LocalSchemaMarkup';
import ReviewDisplay from '@/components/reviews/ReviewDisplay';
import dynamic from 'next/dynamic';

// Dynamically import the LeadFormSection to avoid SSR issues
const LeadFormSection = dynamic(() => import('@/components/forms/LeadFormSection'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-200 rounded-lg h-96 flex items-center justify-center">
      <p className="text-gray-500">Loading form...</p>
    </div>
  ),
});

interface CityPageProps {
  params: {
    'city-ut': string;
  };
}

// Define all cities from CSV data
const ALL_CITIES = [
  'alta-ut',
  'bluffdale-ut',
  'brighton-ut',
  'cottonwood-heights-ut',
  'draper-ut',
  'herriman-ut',
  'holladay-ut',
  'midvale-ut',
  'millcreek-ut',
  'murray-ut',
  'riverton-ut',
  'sandy-ut',
  'salt-lake-city-ut',
  'south-jordan-ut',
  'south-salt-lake-ut',
  'taylorsville-ut',
  'west-jordan-ut',
  'west-valley-city-ut',
  'copperton-ut',
  'emigration-canyon-ut',
  'kearns-ut',
  'magna-ut',
  'white-city-ut',
];

// City display names mapping
const CITY_NAMES: Record<string, string> = {
  'salt-lake-city-ut': 'Salt Lake City',
  'west-valley-city-ut': 'West Valley City',
  'west-jordan-ut': 'West Jordan',
  'taylorsville-ut': 'Taylorsville',
  'south-jordan-ut': 'South Jordan',
  'sandy-ut': 'Sandy',
  'murray-ut': 'Murray',
  'draper-ut': 'Draper',
  'riverton-ut': 'Riverton',
  'midvale-ut': 'Midvale',
  'cottonwood-heights-ut': 'Cottonwood Heights',
  'herriman-ut': 'Herriman',
  'holladay-ut': 'Holladay',
  'millcreek-ut': 'Millcreek',
  'south-salt-lake-ut': 'South Salt Lake',
  'bluffdale-ut': 'Bluffdale',
  'magna-ut': 'Magna',
  'kearns-ut': 'Kearns',
  'brighton-ut': 'Brighton',
  'alta-ut': 'Alta',
  'emigration-canyon-ut': 'Emigration Canyon',
  'white-city-ut': 'White City',
  'copperton-ut': 'Copperton',
};

// Generate static params for all cities
export async function generateStaticParams() {
  return ALL_CITIES.map((citySlug) => ({
    'city-ut': citySlug,
  }));
}

// Enable dynamic generation for safety
export const dynamicParams = true;

// Generate metadata for each city page
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const citySlug = params['city-ut'];
  const cityName = CITY_NAMES[citySlug];

  if (!cityName) {
    return {
      title: 'City Not Found',
      description: 'The requested city page could not be found.',
    };
  }

  const title = `${cityName} Construction Services | Wild West Construction Utah`;
  const description = `Professional construction services in ${cityName}, Utah. Wild West Construction provides expert flooring, demolition, and junk removal services. Licensed, insured, and locally trusted with 200+ completed projects. Get your free quote today!`;

  return {
    title,
    description,
    keywords: `${cityName} construction, ${cityName} contractor, ${cityName} flooring installation, ${cityName} demolition services, ${cityName} junk removal, ${cityName} home improvement, Utah construction company, Salt Lake County contractor, licensed contractor ${cityName}`,
    authors: [{ name: 'Wild West Construction' }],
    creator: 'Wild West Construction',
    publisher: 'Wild West Construction',
    category: 'Construction Services',
    alternates: {
      canonical: `/${citySlug}`,
      languages: {
        'en-US': `/${citySlug}`,
        'es-US': `/es/${citySlug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      siteName: 'Wild West Construction',
      url: `/${citySlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Service categories configuration
const SERVICE_CATEGORIES = [
  {
    category: 'Flooring',
    slug: 'flooring',
    icon: '🏠',
    description: 'Professional flooring installation and refinishing services',
    services: [
      'Hardwood Installation',
      'Laminate Installation',
      'Vinyl Plank Installation',
      'Tile Installation',
      'Carpet Installation',
    ],
  },
  {
    category: 'Demolition',
    slug: 'demolition',
    icon: '🔨',
    description: 'Safe and efficient demolition services for your renovation projects',
    services: [
      'Interior Demolition',
      'Kitchen Demolition',
      'Bathroom Demolition',
      'Concrete Removal',
    ],
  },
  {
    category: 'Junk Removal',
    slug: 'junk-removal',
    icon: '🚛',
    description: 'Fast and reliable junk removal and cleanup services',
    services: [
      'Construction Debris',
      'Furniture Removal',
      'Appliance Removal',
      'Basement Cleanout',
    ],
  },
];

// Lead form submission handler

export default function CityPage({ params }: CityPageProps) {
  const citySlug = params['city-ut'];
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  // Get city-specific services
  const cityServices = getServicesForCity(city.name);

  // Get all cities for nearby cities component
  const allCities = getAllCities();
  const nearbyCities = allCities.filter((c) => c.slug !== city.slug);

  // Get enhanced city content
  const cityContent = getCityContent(citySlug);
  const cityTestimonials = getCityTestimonials(citySlug);

  // Generate city-specific content
  const cityDisplayName = city.name;
  const countyName = city.county;

  // Generate JSON-LD structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${cityDisplayName} Construction Services`,
      },
    ],
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${citySlug}#business`,
    name: 'Wild West Construction',
    description: `Professional construction services in ${cityDisplayName}, Utah`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${citySlug}`,
    telephone: '+18015550123',
    email: 'info@wildwestconstruction.com',
    areaServed: {
      '@type': 'City',
      name: cityDisplayName,
      addressRegion: 'UT',
      addressCountry: 'US',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Construction Blvd',
      addressLocality: 'Salt Lake City',
      addressRegion: 'UT',
      postalCode: '84101',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.latitude,
      longitude: city.longitude,
    },
    openingHours: ['Mo-Fr 07:00-18:00', 'Sa 08:00-16:00'],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Construction Services in ${cityDisplayName}`,
      itemListElement: SERVICE_CATEGORIES.map((category) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: category.category,
          description: category.description,
          areaServed: {
            '@type': 'City',
            name: cityDisplayName,
          },
        },
      })),
    },
  };

  return (
    <>
      {/* Enhanced Local SEO Schema Markup */}
      <LocalSchemaMarkup city={city} showNeighborhoods={true} showReviews={true} />

      {/* Legacy Structured Data (keeping for compatibility) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: `${cityDisplayName} Construction Services`, current: true },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              Professional Construction Services in {cityDisplayName}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {cityContent?.overview ||
                `Wild West Construction is your trusted partner for quality flooring, demolition, and
              junk removal services in ${cityDisplayName}, Utah. With years of experience serving ${countyName}, we deliver exceptional craftsmanship and reliable service you can count on.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+18015550123" className="btn-primary text-center">
                <svg
                  className="w-5 h-5 inline-block mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Now: (801) 555-0123
              </a>
              <a href="#quote-form" className="btn-secondary text-center">
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local Notes Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text-dark mb-6 text-center">
              Why Choose Wild West Construction in {cityDisplayName}?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-text-dark mb-4">Local Expertise</h3>
                <p className="text-gray-600 leading-relaxed">
                  We understand the unique construction needs of {cityDisplayName} residents. From
                  the local building codes to the climate considerations, our team has the knowledge
                  and experience to handle any project in {countyName}.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-text-dark mb-4">Fast Response Times</h3>
                <p className="text-gray-600 leading-relaxed">
                  Located nearby, we can quickly respond to your construction needs in{' '}
                  {cityDisplayName}. Our local presence means faster project starts, better
                  communication, and more personalized service for every customer.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-text-dark mb-4">Quality Craftsmanship</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every project in {cityDisplayName} is completed with attention to detail and
                  quality materials. We take pride in our work and stand behind every installation,
                  demolition, and cleanup service we provide.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-text-dark mb-4">Licensed & Insured</h3>
                <p className="text-gray-600 leading-relaxed">
                  Wild West Construction is fully licensed and insured to work in {cityDisplayName}{' '}
                  and throughout Utah. You can trust that your property and investment are protected
                  when you choose our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">
              Our Construction Services in {cityDisplayName}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {SERVICE_CATEGORIES.map((category) => (
                <div
                  key={category.slug}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-center mb-4">
                    <span className="text-4xl">{category.icon}</span>
                    <h3 className="text-xl font-semibold text-text-dark mt-2">
                      {category.category}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-center">{category.description}</p>
                  <ul className="space-y-2 mb-6">
                    {category.services.map((service) => (
                      <li key={service} className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-primary mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                  <div className="text-center">
                    <Link href={`/${citySlug}/${category.slug}`} className="btn-primary btn-sm">
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <RecentJobs city={cityDisplayName} limit={6} showImages={true} variant="grid" />
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="quote-form" className="py-12 bg-primary/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-dark mb-4">Get Your Free Quote Today</h2>
              <p className="text-gray-600 text-lg">
                Ready to start your construction project in {cityDisplayName}? Contact us for a
                free, no-obligation estimate. We'll work with you to find the perfect solution for
                your needs and budget.
              </p>
            </div>
            <LeadFormSection cityDisplayName={cityDisplayName} />
          </div>
        </div>
      </section>

      {/* Nearby Cities Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <NearbyCities
            currentCity={city}
            nearbyCities={nearbyCities}
            limit={8}
            variant="grid"
            showDistance={true}
          />
        </div>
      </section>

      {/* NAP Block Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <NAPBlock
              variant="card"
              showHours={true}
              showSchema={true}
              city={cityDisplayName}
              service="Construction Services"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Space in {cityDisplayName}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of satisfied customers who have trusted Wild West Construction with
              their projects. Contact us today to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18015550123"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 inline-block mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call (801) 555-0123
              </a>
              <a
                href="#quote-form"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Get Free Estimate
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
