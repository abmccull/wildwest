'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CityData, ParsedServiceData } from '@/lib/data-parser';

interface CityPageTemplateProps {
  city: CityData;
  services: ParsedServiceData[];
  nearbyCities: CityData[];
}

export const CityPageTemplate: React.FC<CityPageTemplateProps> = ({
  city,
  services,
  nearbyCities,
}) => {
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Group services by category
  const servicesByCategory = services.reduce(
    (acc, service) => {
      if (!acc[service.category]) acc[service.category] = [];
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, ParsedServiceData[]>
  );

  const categories = ['all', ...Object.keys(servicesByCategory)];

  return (
    <>
      {/* City Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container pt-20 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Local Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span className="font-medium">Serving {city.name} & Surrounding Areas</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {city.name} Construction Services
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Trusted by {Math.floor(city.population / 1000)}+ residents • Licensed contractors •
              Same-day service available • Free quotes for all {city.name} homeowners
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Emergency Service</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-3xl font-bold text-green-600">127+</div>
                <div className="text-sm text-gray-600">Projects in {city.name}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-3xl font-bold text-yellow-600">4.9★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-3xl font-bold text-purple-600">$500</div>
                <div className="text-sm text-gray-600">Average Savings</div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowPhoneForm(true)}
                className="cta-primary px-8 py-4 text-lg"
              >
                Get Free {city.name} Quote →
              </button>
              <a
                href="tel:+18016914065"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call (801) 691-4065
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Our {city.name} Services</h2>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Professional construction services tailored for {city.name} homes and businesses
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat === 'all' ? 'All Services' : cat}
                {cat !== 'all' && (
                  <span className="ml-1 text-xs opacity-75">
                    ({servicesByCategory[cat].length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(servicesByCategory).map(([category, categoryServices]) => {
              if (selectedCategory !== 'all' && selectedCategory !== category) return null;

              return categoryServices.slice(0, 3).map((service) => (
                <Link
                  key={service.urlSlug}
                  href={service.urlSlug}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all p-6 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">
                      {category === 'Flooring' && '🏠'}
                      {category === 'Demolition' && '🔨'}
                      {category === 'Junk Removal' && '🚛'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {service.keyword}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {service.metaDescription}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600 font-medium">Available in {city.name}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-blue-600">Get Quote →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ));
            })}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Link
              href={`/${city.slug}/services`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All {services.length} Services in {city.name}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Local Trust Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why {city.name} Residents Choose Wild West Construction
              </h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
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
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Local {city.name} Contractors</h3>
                    <p className="text-gray-600">
                      Our team lives and works in {city.county}. We understand local building codes
                      and community standards.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                  <div>
                    <h3 className="font-semibold mb-1">Same-Day Service</h3>
                    <p className="text-gray-600">
                      Emergency? We offer same-day service for {city.name} residents. Call before 2
                      PM for today's appointment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Trusted by Your Neighbors</h3>
                    <p className="text-gray-600">
                      Over 127 five-star reviews from {city.name} homeowners. Check our references
                      on Google and Nextdoor.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="#quote" className="cta-primary inline-flex items-center gap-2">
                  Get Your {city.name} Quote
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Local Map/Image */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={`/images/cities/${city.slug}-map.jpg`}
                  alt={`${city.name} service area map`}
                  width={600}
                  height={450}
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
                <div className="font-semibold">{city.name} Service Area</div>
                <div className="text-sm text-gray-600">
                  {city.zipCodes.slice(0, 3).join(', ')}...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">We Also Serve Nearby Cities</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {nearbyCities.slice(0, 12).map((nearbyCity) => (
              <Link
                key={nearbyCity.slug}
                href={`/${nearbyCity.slug}`}
                className="bg-white px-4 py-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {nearbyCity.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Phone Form Modal */}
      {showPhoneForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Get Your Free {city.name} Quote</h3>
            {/* Quick phone form here */}
          </div>
        </div>
      )}
    </>
  );
};

export default CityPageTemplate;
