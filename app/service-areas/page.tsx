import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCities } from '@/lib/data-parser';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
// Icons will be rendered inline as SVG

export const metadata: Metadata = {
  title: 'Service Areas | Wild West Construction - Salt Lake County Coverage',
  description:
    'Wild West Construction serves all of Salt Lake County, Utah. Find professional flooring, demolition, and junk removal services in your city.',
  keywords:
    'service areas, Salt Lake County, Utah construction services, local contractors, service coverage',
  openGraph: {
    title: 'Service Areas - Wild West Construction',
    description:
      'Professional construction services throughout Salt Lake County. Find us in your city.',
    url: 'https://wildwestslc.com/service-areas',
    siteName: 'Wild West Construction',
    locale: 'en_US',
    type: 'website',
  },
};

// Group cities by population for better organization
function groupCitiesBySize(cities: any[]) {
  const majorCities = cities.filter((city) => city.population > 50000);
  const mediumCities = cities.filter((city) => city.population > 20000 && city.population <= 50000);
  const smallerCities = cities.filter((city) => city.population <= 20000);

  return { majorCities, mediumCities, smallerCities };
}

export default function ServiceAreasPage() {
  const cities = getAllCities();
  const { majorCities, mediumCities, smallerCities } = groupCitiesBySize(cities);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Service Areas', href: '/service-areas' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Serving All of Salt Lake County</h1>
            <p className="text-xl mb-8 text-gray-100">
              Professional construction services delivered to your doorstep. From flooring
              installation to demolition and junk removal, we&apos;ve got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Schedule Service
              </Link>
              <a
                href="tel:385-355-0398"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition duration-300"
              >
                Call 385-355-0398
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Coverage Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Full County Coverage</h3>
                <p className="text-gray-600">
                  We service all cities and neighborhoods throughout Salt Lake County
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Response Time</h3>
                <p className="text-gray-600">
                  Same-day estimates and quick scheduling available in most areas
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                <p className="text-gray-600">
                  Familiar with local building codes and community requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities List */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Cities We Serve</h2>

            {/* Major Cities */}
            {majorCities.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Major Cities</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {majorCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                      <h4 className="text-xl font-semibold mb-2 text-gray-900">{city.name}</h4>
                      <p className="text-gray-600 mb-3">{city.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Population: {city.population.toLocaleString()}
                        </span>
                        <span className="text-primary font-medium">View Services →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Medium Cities */}
            {mediumCities.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Growing Communities</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mediumCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                      <h4 className="text-xl font-semibold mb-2 text-gray-900">{city.name}</h4>
                      <p className="text-gray-600 mb-3">{city.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Population: {city.population.toLocaleString()}
                        </span>
                        <span className="text-primary font-medium">View Services →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Smaller Cities */}
            {smallerCities.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Local Communities</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {smallerCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                      <h4 className="text-xl font-semibold mb-2 text-gray-900">{city.name}</h4>
                      <p className="text-gray-600 mb-3">{city.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {city.nearbyAreas && city.nearbyAreas.length > 0
                            ? `Near: ${city.nearbyAreas[0]}`
                            : `Population: ${city.population.toLocaleString()}`}
                        </span>
                        <span className="text-primary font-medium">View Services →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              No matter where you are in Salt Lake County, we&apos;re ready to help with your
              construction needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Schedule a Consultation
              </Link>
              <a
                href="tel:385-355-0398"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition duration-300"
              >
                Call Now: 385-355-0398
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
