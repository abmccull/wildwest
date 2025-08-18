'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ParsedServiceData } from '@/lib/data-parser';

interface ServicePageTemplateProps {
  service: ParsedServiceData;
  cityName: string;
  relatedServices: ParsedServiceData[];
  nearbyCities: string[];
}

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({
  service,
  cityName,
  relatedServices,
  nearbyCities,
}) => {
  const [urgencyTimer, setUrgencyTimer] = useState(15 * 60); // 15 minutes
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Urgency timer
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Show special offer after 30 seconds
    const offerTimer = setTimeout(() => {
      setShowSpecialOffer(true);
    }, 30000);

    return () => {
      clearInterval(timer);
      clearTimeout(offerTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 md:hidden">
        <div className="grid grid-cols-2 gap-2 p-3">
          <a
            href="tel:+18016914065"
            className="bg-green-600 text-white rounded-lg py-3 text-center font-medium"
          >
            📞 Call Now
          </a>
          <button
            onClick={() => document.getElementById('instant-quote')?.scrollIntoView()}
            className="bg-blue-600 text-white rounded-lg py-3 font-medium"
          >
            Get Quote
          </button>
        </div>
      </div>

      {/* Urgency Banner */}
      {urgencyTimer > 0 && (
        <div className="bg-red-600 text-white py-2 text-center sticky top-0 z-50">
          <div className="container flex items-center justify-center gap-2 text-sm md:text-base">
            <span className="animate-pulse">🔥</span>
            <span>Limited Time: Save $500 on {service.keyword}!</span>
            <span className="font-bold">{formatTime(urgencyTimer)}</span>
          </div>
        </div>
      )}

      {/* Service Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href={`/${service.city.toLowerCase().replace(' ', '-')}-ut`}
                className="text-gray-600 hover:text-gray-900"
              >
                {cityName}
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href={`/${service.category.toLowerCase()}`}
                className="text-gray-600 hover:text-gray-900"
              >
                {service.category}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{service.keyword}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {service.h1}
                </h1>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm">4.9★ (127 Reviews)</span>
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">Same Day Service</span>
                  </div>
                </div>

                <p className="text-lg text-gray-600 mb-8">{service.metaDescription}</p>

                {/* Price Range Box */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <div className="text-sm text-green-800 mb-1">Average Project Cost</div>
                  <div className="text-3xl font-bold text-green-900 mb-2">$2,500 - $4,500</div>
                  <div className="text-sm text-green-700">
                    Final price depends on project size and materials
                  </div>
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex flex-col gap-3">
                  <button className="cta-primary w-full text-lg">
                    Get Free {cityName} Quote →
                  </button>
                  <a
                    href="tel:+18016914065"
                    className="w-full text-center py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    📞 (801) 691-4065 - Speak to Expert
                  </a>
                </div>
              </div>

              {/* Service Image/Video */}
              <div className="relative">
                <div className="sticky top-24">
                  <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={`/images/services/${service.category.toLowerCase()}-${service.keyword.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                      alt={`${service.keyword} in ${cityName}`}
                      width={600}
                      height={450}
                      className="object-cover"
                    />
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg shadow-sm p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600">24/7</div>
                      <div className="text-xs text-gray-600">Emergency</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-3 text-center">
                      <div className="text-2xl font-bold text-green-600">2yr</div>
                      <div className="text-xs text-gray-600">Warranty</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-3 text-center">
                      <div className="text-2xl font-bold text-purple-600">$0</div>
                      <div className="text-xs text-gray-600">Callout Fee</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Quote Form */}
      <section id="instant-quote" className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Get Instant {service.keyword} Quote
            </h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number*</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Project Size</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Small (Under 500 sq ft)</option>
                  <option>Medium (500-1000 sq ft)</option>
                  <option>Large (1000-2000 sq ft)</option>
                  <option>Extra Large (Over 2000 sq ft)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  When do you need this done?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['ASAP', 'This Week', 'This Month', 'Planning Ahead'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      className="py-2 px-4 border rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full cta-primary text-lg">
                Get My Free Quote →
              </button>

              <p className="text-center text-xs text-gray-500">
                By submitting, you agree to receive calls/texts about your inquiry
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>
                Professional {service.keyword} in {cityName}
              </h2>

              <div dangerouslySetInnerHTML={{ __html: service.internalLinkBlockHtml }} />

              <h3>Why Choose Wild West Construction?</h3>
              <ul>
                <li>✓ Licensed and insured {service.category.toLowerCase()} contractors</li>
                <li>✓ Free, no-obligation quotes for {cityName} residents</li>
                <li>✓ Same-day service available for emergencies</li>
                <li>✓ 2-year warranty on all workmanship</li>
                <li>✓ Transparent pricing with no hidden fees</li>
              </ul>

              <h3>Our {service.keyword} Process</h3>
              <ol>
                <li>Schedule your free consultation</li>
                <li>Receive detailed quote with multiple options</li>
                <li>Professional installation by certified technicians</li>
                <li>Final inspection and warranty documentation</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">
            Related {service.category} Services in {cityName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedServices.map((related) => (
              <Link
                key={related.urlSlug}
                href={related.urlSlug}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold mb-2 text-blue-600 hover:text-blue-700">
                  {related.keyword}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{related.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Popup */}
      {showSpecialOffer && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-2xl p-6 max-w-sm z-50 animate-slide-up">
          <button
            onClick={() => setShowSpecialOffer(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          <div className="text-2xl mb-2">🎉 Special Offer!</div>
          <p className="font-semibold mb-2">Save $500 on {service.keyword}</p>
          <p className="text-sm text-gray-600 mb-4">
            Limited time offer for {cityName} residents. Call now!
          </p>
          <a
            href="tel:+18016914065"
            className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-medium"
          >
            Claim Offer Now
          </a>
        </div>
      )}
    </>
  );
};

export default ServicePageTemplate;
