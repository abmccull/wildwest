'use client';

import React from 'react';
import Link from 'next/link';
import { ServiceHighlightsProps } from '../../lib/types/category.types';

const ServiceHighlights: React.FC<ServiceHighlightsProps> = ({ services, categoryName }) => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 font-serif">
            Our {categoryName} Services
          </h2>
          <p className="text-lg md:text-xl text-text-dark/80 max-w-3xl mx-auto leading-relaxed">
            Professional, reliable, and efficient {categoryName.toLowerCase()} services delivered
            with the quality craftsmanship you expect from Wild West Construction.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 group hover:scale-105 border border-gray-100"
            >
              {/* Service Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon ? (
                    <div
                      className="text-2xl text-white"
                      dangerouslySetInnerHTML={{ __html: service.icon }}
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-white"
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
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Service Content */}
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 font-serif">
                  {service.name}
                </h3>
                <p className="text-text-dark/80 leading-relaxed mb-6">{service.description}</p>
              </div>

              {/* Benefits List */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-secondary mb-3 uppercase tracking-wide">
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {service.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-start gap-2 text-sm text-text-dark/80"
                      >
                        <svg
                          className="w-4 h-4 text-accent mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 group-hover:bg-secondary"
                  aria-label={`Get a quote for ${service.name.toLowerCase()}`}
                >
                  Get Quote
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 font-serif">
              Need a Custom Solution?
            </h3>
            <p className="text-text-dark/80 mb-6 leading-relaxed">
              Every project is unique. Contact us to discuss your specific{' '}
              {categoryName.toLowerCase()} needs and get a personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-accent hover:bg-accent/90 text-primary font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                aria-label="Get a custom quote"
              >
                Get Custom Quote
              </Link>
              <a
                href="tel:+18016914065"
                className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                aria-label="Call for immediate consultation"
              >
                Call: (801) 691-4065
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
