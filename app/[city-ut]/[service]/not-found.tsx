import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default function ServiceNotFound() {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Service Not Found', current: true },
        ]}
      />

      {/* 404 Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <svg
                className="w-24 h-24 mx-auto mb-6 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-1v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <h1 className="text-4xl font-bold text-text-dark mb-4">Service Not Found</h1>

              <p className="text-xl text-gray-600 mb-8">
                We couldn't find the service you're looking for in this location. The page may have
                been moved or doesn't exist.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-text-dark mb-4">What can you do?</h2>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-text-dark">Check our service areas</h3>
                    <p className="text-gray-600 text-sm">
                      Browse all available services in your city
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-text-dark">Search for services</h3>
                    <p className="text-gray-600 text-sm">
                      Use our search to find the service you need
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary mt-1 flex-shrink-0"
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
                  <div>
                    <h3 className="font-semibold text-text-dark">Contact us directly</h3>
                    <p className="text-gray-600 text-sm">Call us to discuss your specific needs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary text-center">
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
                    d="M3 12l2-2m0 0l7-7 7 7m-9 0l9 0m-9 0v9a2 2 0 002 2h4a2 2 0 002-2v-9"
                  />
                </svg>
                Back to Home
              </Link>

              <a href="tel:+18015550123" className="btn-secondary text-center">
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
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Popular Services</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/flooring"
                className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="text-center">
                  <span className="text-4xl mb-4 block">🏠</span>
                  <h3 className="text-xl font-semibold text-text-dark group-hover:text-primary mb-2">
                    Flooring Services
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Professional flooring installation and refinishing services
                  </p>
                </div>
              </Link>

              <Link
                href="/demolition"
                className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="text-center">
                  <span className="text-4xl mb-4 block">🔨</span>
                  <h3 className="text-xl font-semibold text-text-dark group-hover:text-primary mb-2">
                    Demolition Services
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Safe and efficient demolition services for your renovation projects
                  </p>
                </div>
              </Link>

              <Link
                href="/junk-removal"
                className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="text-center">
                  <span className="text-4xl mb-4 block">🚛</span>
                  <h3 className="text-xl font-semibold text-text-dark group-hover:text-primary mb-2">
                    Junk Removal
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Fast and reliable junk removal and cleanup services
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
