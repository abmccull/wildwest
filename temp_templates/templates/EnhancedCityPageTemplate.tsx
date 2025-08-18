'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ServiceData, CityData } from '@/lib/data-parser';
import { Button, Card, Badge, TrustIndicator, ProgressiveForm, StickyMobileCTA } from '@/components/ui';
import { OptimizedImage } from '@/components/ui';

interface EnhancedCityPageTemplateProps {
  city: CityData;
  services: ServiceData[];
  categories: string[];
  nearbyCities: CityData[];
  population?: number;
  established?: string;
}

export const EnhancedCityPageTemplate: React.FC<EnhancedCityPageTemplateProps> = ({
  city,
  services,
  categories,
  nearbyCities,
  population = 35000,
  established = '2010',
}) => {
  const [showEmergencyBanner, setShowEmergencyBanner] = useState(false);
  const [localActivity, setLocalActivity] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // Local activity simulator
  useEffect(() => {
    const activities = [
      `Completed flooring project on Main Street`,
      `Emergency demolition service in progress`,
      `5-star review from ${city.name} resident`,
      `Same-day junk removal completed`,
      `New customer saved $500 on renovation`,
    ];

    const interval = setInterval(() => {
      setLocalActivity(activities[Math.floor(Math.random() * activities.length)]);
    }, 6000);

    // Show emergency banner after 10 seconds
    const bannerTimer = setTimeout(() => {
      setShowEmergencyBanner(true);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(bannerTimer);
    };
  }, [city.name]);

  // Group services by category
  const servicesByCategory = categories.reduce((acc, category) => {
    acc[category] = services.filter(s => s.category === category).slice(0, 6);
    return acc;
  }, {} as Record<string, ServiceData[]>);

  // Local business schema data
  const businessHours = {
    monday: '7:00 AM - 7:00 PM',
    tuesday: '7:00 AM - 7:00 PM',
    wednesday: '7:00 AM - 7:00 PM',
    thursday: '7:00 AM - 7:00 PM',
    friday: '7:00 AM - 7:00 PM',
    saturday: '8:00 AM - 5:00 PM',
    sunday: 'Emergency Service Only',
  };

  const localStats = {
    projectsCompleted: Math.floor(population / 100),
    yearsServing: new Date().getFullYear() - parseInt(established),
    averageRating: 4.9,
    reviewCount: Math.floor(population / 250),
  };

  return (
    <>
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA primaryPhone="18016914065" />

      {/* Emergency Service Banner */}
      {showEmergencyBanner && (
        <div className="bg-cta-urgent text-white py-3 text-center sticky top-0 z-50 animate-slide-down">
          <div className="container flex items-center justify-center gap-3">
            <span className="animate-pulse">🚨</span>
            <span className="font-semibold">24/7 Emergency Service Available in {city.name}</span>
            <Button
              href="tel:18016914065"
              variant="secondary"
              size="sm"
              className="bg-white text-cta-urgent hover:bg-gray-100"
            >
              Call Now
            </Button>
            <button
              onClick={() => setShowEmergencyBanner(false)}
              className="text-white/80 hover:text-white ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Local Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-info text-white">
        <div className="container pt-20 pb-16">
          {/* Breadcrumbs for SEO */}
          <nav className="flex items-center gap-2 text-sm mb-6 text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/utah" className="hover:text-white">Utah</Link>
            <span>/</span>
            <span className="text-white font-medium">{city.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Local Trust Badge */}
              <Badge variant="trust" className="mb-4 text-white border-white/30">
                <span className="animate-pulse">●</span>
                Serving {city.name} for {localStats.yearsServing}+ Years
              </Badge>

              <h1 className="text-4xl-responsive md:text-5xl-responsive font-bold mb-4">
                {city.name} Construction Services
              </h1>
              
              <p className="text-xl-responsive opacity-90 mb-6">
                Your trusted local contractor for flooring, demolition, and junk removal. 
                Licensed, insured, and proudly serving {population.toLocaleString()} {city.name} residents.
              </p>

              {/* Local Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{localStats.projectsCompleted}+</div>
                  <div className="text-sm opacity-80">Projects Done</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{localStats.yearsServing}+</div>
                  <div className="text-sm opacity-80">Years Local</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{localStats.averageRating}★</div>
                  <div className="text-sm opacity-80">Avg Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Emergency</div>
                </div>
              </div>

              {/* Local CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="tel:18016914065"
                  variant="urgent"
                  size="lg"
                  animate
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                >
                  Call {city.name} Office
                </Button>
                <Button
                  onClick={() => document.getElementById('local-quote')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="secondary"
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                >
                  Get Local Quote →
                </Button>
              </div>

              {/* Local Activity Ticker */}
              {localActivity && (
                <div className="mt-6">
                  <Badge variant="success" className="bg-white/20 text-white border-white/30">
                    <span className="animate-pulse">●</span>
                    {city.name}: {localActivity}
                  </Badge>
                </div>
              )}
            </div>

            {/* Local Map/Image Area */}
            <div className="relative">
              <Card variant="elevated" className="p-0 overflow-hidden">
                <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                  {/* Map placeholder - would integrate with actual map */}
                  <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">📍</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Proudly Serving {city.name}
                      </h3>
                      <p className="text-gray-600">
                        Fast response times • Local crews • Same-day service
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Business Hours */}
                <div className="p-6 bg-white">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {city.name} Office Hours
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Mon-Fri:</div>
                    <div className="font-medium">7:00 AM - 7:00 PM</div>
                    <div>Saturday:</div>
                    <div className="font-medium">8:00 AM - 5:00 PM</div>
                    <div>Sunday:</div>
                    <div className="font-medium text-cta">Emergency Only</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services by Category Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl-responsive font-bold mb-4">
              {city.name} Construction Services
            </h2>
            <p className="text-lg-responsive text-gray-600 max-w-3xl mx-auto">
              Complete home improvement solutions for {city.name} residents. 
              All work performed by licensed local contractors with guaranteed satisfaction.
            </p>
          </div>

          {/* Service Category Tabs */}
          <div className="space-y-12">
            {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category} Services in {city.name}
                  </h3>
                  <Link
                    href={`/${city.slug}/${category.toLowerCase()}`}
                    className="text-brand-primary hover:text-brand-primary/80 font-medium"
                  >
                    View All {category} →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service, idx) => (
                    <Card
                      key={idx}
                      variant="bordered"
                      hover
                      className="group cursor-pointer"
                      onClick={() => window.location.href = `/${city.slug}/${service.slug}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-lg group-hover:text-brand-primary transition-colors">
                          {service.service}
                        </h4>
                        {(service as any).popular && <Badge variant="warning" size="sm">Popular</Badge>}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Starting at</span>
                        <span className="font-bold text-lg text-cta">
                          ${service.averagePrice?.toLocaleString() || '299'}
                        </span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        className="mt-4 group-hover:border-brand-primary group-hover:text-brand-primary"
                      >
                        Get {city.name} Quote →
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Quote Form */}
      <section id="local-quote" className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl-responsive font-bold mb-4">
                Get Your Free {city.name} Quote
              </h2>
              <p className="text-lg text-gray-600">
                Local pricing • Fast response • {city.name} crews ready today
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card variant="elevated">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Service Needed</label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                        >
                          <option value="">Select Service</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Project Timeline</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent">
                          <option>ASAP / Emergency</option>
                          <option>Within a Week</option>
                          <option>Within a Month</option>
                          <option>Planning Ahead</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Property Address</label>
                      <input
                        type="text"
                        placeholder={`123 Main St, ${city.name}, UT`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Your Name</label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="(801) 555-0123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Project Details (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your project..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      animate
                    >
                      Get My Free {city.name} Quote →
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Local Info Sidebar */}
              <div className="space-y-6">
                {/* Why Choose Local */}
                <Card variant="gradient">
                  <h3 className="font-semibold mb-3">Why Choose Local?</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-cta mt-0.5">✓</span>
                      <span>Faster response times in {city.name}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cta mt-0.5">✓</span>
                      <span>Local crews know {city.name} regulations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cta mt-0.5">✓</span>
                      <span>Supporting {city.name} economy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cta mt-0.5">✓</span>
                      <span>Established local reputation</span>
                    </li>
                  </ul>
                </Card>

                {/* Local Guarantee */}
                <Card variant="bordered" className="border-cta bg-cta/5">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🛡️</div>
                    <h3 className="font-semibold mb-2">{city.name} Guarantee</h3>
                    <p className="text-sm text-gray-600">
                      100% satisfaction guaranteed for all {city.name} projects. 
                      2-year warranty on workmanship.
                    </p>
                  </div>
                </Card>

                {/* Contact Info */}
                <Card>
                  <h3 className="font-semibold mb-3">Contact {city.name} Office</h3>
                  <div className="space-y-2 text-sm">
                    <a href="tel:18016914065" className="flex items-center gap-2 text-brand-primary hover:text-brand-primary/80">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      (801) 691-4065
                    </a>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Serving all of {city.name}, UT
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">
            Also Serving Nearby Cities
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {nearbyCities.slice(0, 12).map((nearbyCity) => (
              <Link
                key={nearbyCity.slug}
                href={`/${nearbyCity.slug}`}
                className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:text-brand-primary transition-all"
              >
                {nearbyCity.name} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local SEO Footer Content */}
      <section className="py-12 bg-white border-t">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-gray">
            <h2>Professional Construction Services in {city.name}, Utah</h2>
            <p>
              Wild West Construction has been proudly serving {city.name} and surrounding areas 
              for over {localStats.yearsServing} years. As a locally owned and operated business, 
              we understand the unique needs of {city.name} homeowners and businesses.
            </p>
            
            <h3>Why {city.name} Residents Choose Wild West Construction</h3>
            <p>
              With {localStats.projectsCompleted}+ completed projects in {city.name}, we've built 
              a reputation for excellence, reliability, and fair pricing. Our {localStats.averageRating}-star 
              rating from {localStats.reviewCount}+ local reviews speaks to our commitment to quality.
            </p>
            
            <h3>Services We Provide in {city.name}</h3>
            <p>
              From emergency repairs to major renovations, our {city.name} team handles it all. 
              We specialize in flooring installation, demolition services, and junk removal for 
              both residential and commercial properties throughout {city.name} and Salt Lake County.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnhancedCityPageTemplate;