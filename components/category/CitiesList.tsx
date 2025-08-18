'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CitiesListProps } from '../../lib/types/category.types';

const CitiesList: React.FC<CitiesListProps> = ({
  cities,
  categorySlug,
  maxDisplay = 15,
  showAll = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(showAll);

  // Sort cities alphabetically
  const sortedCities = [...cities].sort((a, b) => a.localeCompare(b));

  // Display logic
  const citiesToShow = isExpanded ? sortedCities : sortedCities.slice(0, maxDisplay);
  const hasMoreCities = sortedCities.length > maxDisplay;

  // Helper function to create city URL slug
  const createCitySlug = (cityName: string) => {
    return (
      cityName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') + '-ut'
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 font-serif">
            Service Areas
          </h2>
          <p className="text-lg md:text-xl text-text-dark/80 max-w-3xl mx-auto leading-relaxed">
            We provide professional {categorySlug.replace('-', ' ')} services throughout Utah.
            Contact us to see if we serve your area.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {citiesToShow.map((city, index) => {
              const citySlug = createCitySlug(city);

              return (
                <Link
                  key={index}
                  href={`/${citySlug}/${categorySlug}/`}
                  className="group bg-gray-50 hover:bg-primary hover:text-white rounded-lg p-4 transition-all duration-200 border border-gray-200 hover:border-primary hover:shadow-lg text-center"
                  aria-label={`${categorySlug.replace('-', ' ')} services in ${city}, Utah`}
                >
                  <div className="flex flex-col items-center">
                    {/* Location Icon */}
                    <svg
                      className="w-5 h-5 mb-2 text-secondary group-hover:text-accent transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
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

                    {/* City Name */}
                    <span className="text-sm font-medium text-text-dark group-hover:text-white transition-colors duration-200">
                      {city}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {hasMoreCities && !showAll && (
            <div className="text-center mt-8">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center bg-secondary hover:bg-primary text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 group"
                aria-label={isExpanded ? 'Show fewer cities' : 'Show all cities'}
              >
                {isExpanded ? (
                  <>
                    Show Less
                    <svg
                      className="w-4 h-4 ml-2 group-hover:-translate-y-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    Show All {sortedCities.length} Cities
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Call-to-Action for Non-Listed Areas */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif">Don't See Your City?</h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            We're always expanding our service areas throughout Utah. Contact us to see if we can
            help with your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-accent hover:bg-accent/90 text-primary font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
              aria-label="Request service in your area"
            >
              Request Service
            </Link>
            <a
              href="tel:+18016914065"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
              aria-label="Call to check service availability"
            >
              Call: (801) 691-4065
            </a>
          </div>
        </div>

        {/* Service Area Statistics */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-primary mb-2">{sortedCities.length}+</div>
            <div className="text-text-dark/80 font-medium">Cities Served</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-text-dark/80 font-medium">Licensed & Insured</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-text-dark/80 font-medium">Emergency Service</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitiesList;
