import React from 'react';
import Link from 'next/link';
import { ServiceCard, RecentJobs } from '@/components/pages';
import { LeadFormSection } from '@/components/forms';
import { getServiceCategories, getServiceCatalogByCategory, getAllCities } from '@/lib/data-parser';
import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/seo/SEOHead';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Wild West Construction',
  description:
    'Professional construction services for residential and commercial projects in Salt Lake County, Utah.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Construction Blvd',
    addressLocality: 'Salt Lake City',
    addressRegion: 'UT',
    postalCode: '84101',
    addressCountry: 'US',
  },
  telephone: '+18015550123',
  url: 'https://wildwestconstruction.com',
  areaServed: [
    { '@type': 'City', name: 'Salt Lake City', addressRegion: 'UT', addressCountry: 'US' },
    { '@type': 'City', name: 'Sandy', addressRegion: 'UT', addressCountry: 'US' },
    { '@type': 'City', name: 'West Jordan', addressRegion: 'UT', addressCountry: 'US' },
    { '@type': 'City', name: 'Draper', addressRegion: 'UT', addressCountry: 'US' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Flooring Installation',
          description:
            'Professional flooring installation services including hardwood, laminate, vinyl, and tile.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Demolition Services',
          description:
            'Safe interior and exterior demolition services for residential and commercial properties.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Junk Removal',
          description: 'Professional junk removal and debris cleanup services.',
        },
      },
    ],
  },
  openingHours: ['Mo-Fr 07:00-18:00', 'Sa 08:00-16:00'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
  },
};

export const metadata: Metadata = generateSEOMetadata({
  title: 'Wild West Construction - Professional Building Services in Salt Lake County',
  description:
    'Leading construction company in Salt Lake County offering flooring, demolition, and junk removal services. Licensed, insured, and trusted by homeowners across Utah.',
  keywords:
    'construction Salt Lake City, flooring installation Utah, demolition services, junk removal, home improvement, renovation contractor',
  canonical: '/',
  structuredData: structuredData,
  ogImage: '/images/hero-construction.jpg',
  ogImageAlt: 'Wild West Construction team working on a home renovation project',
});

export default function Home() {
  // Get service categories for display
  const categories = getServiceCategories();
  const flooringServices = getServiceCatalogByCategory('Flooring').slice(0, 3);
  const demolitionServices = getServiceCatalogByCategory('Demolition').slice(0, 3);
  const junkServices = getServiceCatalogByCategory('Junk Removal').slice(0, 3);
  const cities = getAllCities();

  return (
    <main className="min-h-screen">
        {/* Hero Section - Critical above-the-fold content */}
        <section className="critical-hero">
          <div className="container-custom w-full">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-6 text-balance">
                Utah's Trusted
                <span className="text-primary block mt-2">Construction Experts</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed optimize-legibility">
                Professional construction services for Salt Lake County homeowners. From flooring
                installation to demolition and cleanup – we handle it all with quality craftsmanship
                you can trust.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="#quote" className="critical-btn-primary text-lg px-8 py-4">
                  Get Free Quote
                </Link>
                <Link href="#services" className="btn-secondary text-lg px-8 py-4 gpu-accelerated">
                  View Our Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.259.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Licensed & Insured
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.9/5 Stars (127 Reviews)
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  2-Year Warranty
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Serving Salt Lake County
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section id="services" className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                Our Construction Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From beautiful flooring installations to complete demolition projects, we're your
                one-stop shop for quality construction services.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Flooring Services */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl border border-amber-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark mb-2">Flooring Services</h3>
                  <p className="text-gray-600 mb-6">
                    Expert installation of hardwood, laminate, vinyl, tile, and carpet flooring.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {flooringServices.map((service) => (
                    <div key={service.slug} className="flex items-center gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{service.service}</span>
                    </div>
                  ))}
                </div>

                <Link href="/flooring" className="btn-primary w-full text-center">
                  View Flooring Services
                </Link>
              </div>

              {/* Demolition Services */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-xl border border-red-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark mb-2">Demolition Services</h3>
                  <p className="text-gray-600 mb-6">
                    Safe and efficient demolition for interior and exterior projects.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {demolitionServices.map((service) => (
                    <div key={service.slug} className="flex items-center gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{service.service}</span>
                    </div>
                  ))}
                </div>

                <Link href="/demolition" className="btn-primary w-full text-center">
                  View Demolition Services
                </Link>
              </div>

              {/* Junk Removal Services */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15a2 2 0 110 4M5 8v10a2 2 0 002 2h8a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark mb-2">Junk Removal</h3>
                  <p className="text-gray-600 mb-6">
                    Fast and eco-friendly removal of construction debris and household junk.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {junkServices.map((service) => (
                    <div key={service.slug} className="flex items-center gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{service.service}</span>
                    </div>
                  ))}
                </div>

                <Link href="/junk-removal" className="btn-primary w-full text-center">
                  View Junk Removal Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Jobs Showcase - Lazy Loaded */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <RecentJobs limit={6} variant="grid" />
          </div>
        </section>

        {/* Lead Form Section - Lazy Loaded */}
        <section id="quote" className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get a free, no-obligation quote for your construction project. We'll contact you
                within 24 hours to discuss your needs and provide an accurate estimate.
              </p>
            </div>

            <LeadFormSection />
          </div>
        </section>

        {/* Service Areas - Lazy Loaded */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-dark mb-4">Serving Salt Lake County</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Wild West Construction proudly serves homeowners throughout Salt Lake County.
                Professional construction services delivered to your neighborhood.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cities.slice(0, 15).map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 text-center group"
                >
                  <h3 className="font-medium text-text-dark group-hover:text-primary transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {city.population.toLocaleString()} residents
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/service-areas" className="btn-secondary">
                View All Service Areas
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
