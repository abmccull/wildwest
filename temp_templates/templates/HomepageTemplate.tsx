'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceData, CityData } from '@/lib/data-parser';

interface HomepageTemplateProps {
  categories: string[];
  flooringServices: ServiceData[];
  demolitionServices: ServiceData[];
  junkServices: ServiceData[];
  cities: CityData[];
}

export const HomepageTemplate: React.FC<HomepageTemplateProps> = ({
  categories,
  flooringServices,
  demolitionServices,
  junkServices,
  cities,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showEstimate, setShowEstimate] = useState(false);
  const [recentActivity, setRecentActivity] = useState('');

  // Simulate real-time activity
  useEffect(() => {
    const activities = [
      'Sarah from Sandy just requested a flooring quote',
      'Mike in Draper booked a demolition consultation',
      'The Johnson family saved $500 on their renovation',
      'New 5-star review from West Jordan customer',
    ];

    const interval = setInterval(() => {
      setRecentActivity(activities[Math.floor(Math.random() * activities.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleInstantQuote = () => {
    if (phoneNumber && selectedService) {
      setShowEstimate(true);
      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'micro_conversion', {
          event_category: 'lead_generation',
          event_label: 'instant_quote_requested',
        });
      }
    }
  };

  return (
    <>
      {/* Hero Section - Above the Fold */}
      <section className="hero-gradient min-h-screen relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Value Proposition */}
            <div className="text-white">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 trust-badge px-4 py-2 rounded-full mb-6">
                <span className="animate-pulse w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm font-medium">Available Today • Same Day Service</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Salt Lake County's
                <span className="block text-yellow-400">#1 Rated Construction Team</span>
              </h1>

              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">4.9/5</span>
                  <span className="opacity-80">(127 Reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-400"
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
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-400"
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
                  <span>2-Year Warranty</span>
                </div>
              </div>

              <p className="text-xl opacity-90 mb-8">
                Professional flooring, demolition, and junk removal services.
                <span className="font-semibold"> Save $500 on projects booked today!</span>
              </p>

              {/* Mobile Trust Logos */}
              <div className="flex gap-6 mb-8 opacity-80">
                <Image src="/badges/bbb.svg" alt="BBB Accredited" width={60} height={40} />
                <Image src="/badges/google.svg" alt="Google Reviews" width={80} height={40} />
                <Image src="/badges/nextdoor.svg" alt="Nextdoor Favorite" width={80} height={40} />
              </div>
            </div>

            {/* Right Column - Instant Quote Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Your Free Quote in 30 Seconds
                </h2>
                <p className="text-gray-600">No obligations • No spam • Instant pricing</p>
              </div>

              {!showEstimate ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleInstantQuote();
                  }}
                  className="space-y-4"
                >
                  {/* Service Selection - Visual Cards */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      What service do you need?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Flooring', 'Demolition', 'Junk Removal'].map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => setSelectedService(service)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            selectedService === service
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">
                            {service === 'Flooring' && '🏠'}
                            {service === 'Demolition' && '🔨'}
                            {service === 'Junk Removal' && '🚛'}
                          </div>
                          <div className="text-sm font-medium">{service}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Your phone number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* CTA Button */}
                  <button
                    type="submit"
                    className="w-full cta-primary text-white font-semibold py-4 rounded-lg transform transition-all hover:scale-105"
                  >
                    Get Instant Quote →
                  </button>

                  {/* Trust Indicators */}
                  <div className="text-center text-xs text-gray-500 pt-2">
                    <p>🔒 Your information is 100% secure</p>
                    <p className="mt-1">✓ We'll call you within 15 minutes</p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Great News!</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Your {selectedService.toLowerCase()} project qualifies for our special pricing:
                  </p>
                  <div className="text-4xl font-bold text-green-600 mb-4">$2,500 - $4,500*</div>
                  <p className="text-sm text-gray-600 mb-6">
                    *Final price depends on project size and materials
                  </p>
                  <button className="cta-urgent text-white px-8 py-3 rounded-lg">
                    📞 Call Now to Lock In This Price
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Social Proof Ticker */}
          {recentActivity && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {recentActivity} • {Math.floor(Math.random() * 5) + 1} min ago
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Rest of homepage sections would continue here... */}
    </>
  );
};

export default HomepageTemplate;
