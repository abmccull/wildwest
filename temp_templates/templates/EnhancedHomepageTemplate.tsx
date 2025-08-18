'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceData, CityData } from '@/lib/data-parser';
import {
  Button,
  Card,
  Badge,
  TrustIndicator,
  ProgressiveForm,
  StickyMobileCTA,
} from '@/components/ui';
import { OptimizedImage } from '@/components/ui';

interface EnhancedHomepageTemplateProps {
  categories: string[];
  flooringServices: ServiceData[];
  demolitionServices: ServiceData[];
  junkServices: ServiceData[];
  cities: CityData[];
}

export const EnhancedHomepageTemplate: React.FC<EnhancedHomepageTemplateProps> = ({
  categories,
  flooringServices,
  demolitionServices,
  junkServices,
  cities,
}) => {
  const [recentActivity, setRecentActivity] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const activities = [
    { location: 'Sandy', action: 'requested a flooring quote', time: 2 },
    { location: 'Draper', action: 'booked a demolition consultation', time: 5 },
    { location: 'West Jordan', action: 'saved $500 on their renovation', time: 8 },
    { location: 'Salt Lake City', action: 'left a 5-star review', time: 12 },
    { location: 'Park City', action: 'completed junk removal', time: 15 },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Sandy, UT',
      rating: 5,
      text: 'Absolutely amazing service! They transformed our home with beautiful new flooring.',
      project: 'Hardwood Flooring',
      savings: '$1,200',
    },
    {
      name: 'Mike Thompson',
      location: 'Draper, UT',
      rating: 5,
      text: 'Professional demolition team. Completed the job faster than expected.',
      project: 'Kitchen Demolition',
      savings: '$800',
    },
    {
      name: 'Emily Chen',
      location: 'Park City, UT',
      rating: 5,
      text: 'Same-day junk removal service was a lifesaver during our move!',
      project: 'Estate Cleanout',
      savings: '$400',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const activity = activities[Math.floor(Math.random() * activities.length)];
      setRecentActivity(`${activity.location} ${activity.action}`);
    }, 5000);

    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const formSteps = [
    {
      id: 'service',
      title: 'What service do you need?',
      fields: [
        {
          name: 'service',
          label: 'Select Service',
          type: 'radio' as const,
          required: true,
          options: [
            { value: 'flooring', label: '🏠 Flooring Installation' },
            { value: 'demolition', label: '🔨 Demolition Services' },
            { value: 'junk', label: '🚛 Junk Removal' },
          ],
        },
      ],
    },
    {
      id: 'details',
      title: 'Project Details',
      fields: [
        {
          name: 'projectSize',
          label: 'Project Size',
          type: 'select' as const,
          required: true,
          options: [
            { value: 'small', label: 'Small (Under 500 sq ft)' },
            { value: 'medium', label: 'Medium (500-1000 sq ft)' },
            { value: 'large', label: 'Large (1000-2000 sq ft)' },
            { value: 'xlarge', label: 'Extra Large (Over 2000 sq ft)' },
          ],
        },
        {
          name: 'timeline',
          label: 'When do you need this done?',
          type: 'radio' as const,
          required: true,
          options: [
            { value: 'asap', label: 'ASAP / Emergency' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' },
            { value: 'planning', label: 'Just Planning' },
          ],
        },
      ],
    },
    {
      id: 'contact',
      title: 'Get Your Instant Quote',
      fields: [
        {
          name: 'name',
          label: 'Your Name',
          type: 'text' as const,
          placeholder: 'John Smith',
          required: true,
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'tel' as const,
          placeholder: '(555) 123-4567',
          required: true,
          validation: (value: string) => {
            const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            return phoneRegex.test(value) ? null : 'Please enter a valid phone number';
          },
        },
        {
          name: 'email',
          label: 'Email (Optional)',
          type: 'email' as const,
          placeholder: 'john@example.com',
          required: false,
        },
      ],
    },
  ];

  const handleFormSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lead_generated', {
        event_category: 'homepage',
        event_label: 'progressive_form',
        value: data.service,
      });
    }
  };

  return (
    <>
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA primaryPhone="18016914065" />

      {/* Hero Section with Enhanced Design */}
      <section className="min-h-screen relative overflow-hidden bg-hero-gradient">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-transparent to-brand-info opacity-50" />
        </div>

        <div className="container relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Enhanced Value Proposition */}
            <div className="text-white space-y-6">
              {/* Live Activity Badge */}
              <Badge variant="trust" pulse className="backdrop-blur-md">
                <span className="animate-pulse">●</span>
                Available Today • Same Day Service
              </Badge>

              {/* Main Headline */}
              <h1 className="text-4xl-responsive md:text-5xl-responsive lg:text-5xl-responsive font-bold leading-tight">
                Salt Lake County's
                <span className="block text-rating mt-2">#1 Rated Construction Team</span>
              </h1>

              {/* Trust Indicators Row */}
              <div className="flex flex-wrap gap-4">
                <TrustIndicator type="rating" value="4.9/5" label="(127 Reviews)" />
                <TrustIndicator type="license" value="Licensed" />
                <TrustIndicator type="warranty" value="2-Year" />
              </div>

              {/* Value Proposition */}
              <p className="text-xl-responsive opacity-90">
                Professional flooring, demolition, and junk removal services.
                <span className="block font-semibold text-rating mt-2">
                  💰 Save $500 on projects booked today!
                </span>
              </p>

              {/* Service Cards Preview */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '🏠', name: 'Flooring', price: 'From $2,500' },
                  { icon: '🔨', name: 'Demolition', price: 'From $1,500' },
                  { icon: '🚛', name: 'Junk Removal', price: 'From $299' },
                ].map((service) => (
                  <div
                    key={service.name}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <div className="text-2xl mb-1">{service.icon}</div>
                    <div className="text-sm font-medium">{service.name}</div>
                    <div className="text-xs opacity-80">{service.price}</div>
                  </div>
                ))}
              </div>

              {/* Trust Logos */}
              <div className="flex gap-6 items-center opacity-80">
                <img src="/badges/bbb.svg" alt="BBB" className="h-10" />
                <img src="/badges/google.svg" alt="Google" className="h-10" />
                <img src="/badges/nextdoor.svg" alt="Nextdoor" className="h-10" />
              </div>
            </div>

            {/* Right Column - Progressive Form */}
            <div className="relative">
              <ProgressiveForm
                steps={formSteps}
                onSubmit={handleFormSubmit}
                submitText="Get My Free Quote →"
              />

              {/* Urgency Timer */}
              <div className="absolute -top-4 right-4 bg-cta-urgent text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce-slow">
                🔥 Offer expires in 24:00:00
              </div>
            </div>
          </div>

          {/* Social Proof Ticker */}
          {recentActivity && (
            <div className="mt-12 flex justify-center">
              <Badge variant="success" pulse className="text-white bg-white/20 backdrop-blur-md">
                {recentActivity} • {Math.floor(Math.random() * 5) + 1} min ago
              </Badge>
            </div>
          )}
        </div>
      </section>

      {/* Services Section with Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl-responsive font-bold mb-4">Our Premium Services</h2>
            <p className="text-lg-responsive text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of construction services. All work is guaranteed
              and performed by licensed professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: 'Flooring',
                icon: '🏠',
                services: flooringServices.slice(0, 5),
                color: 'amber',
                features: ['Free Consultation', 'Material Options', '2-Year Warranty'],
              },
              {
                category: 'Demolition',
                icon: '🔨',
                services: demolitionServices.slice(0, 5),
                color: 'red',
                features: ['Safety First', 'Clean Removal', 'Same Day Service'],
              },
              {
                category: 'Junk Removal',
                icon: '🚛',
                services: junkServices.slice(0, 5),
                color: 'green',
                features: ['Eco-Friendly', 'Fast Pickup', 'Fair Pricing'],
              },
            ].map((service) => (
              <Card key={service.category} variant="elevated" hover className="group">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{service.category}</h3>
                  <Badge variant="info">Most Popular</Badge>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-cta flex-shrink-0"
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
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-600">Popular Services:</p>
                  {service.services.map((s, idx) => (
                    <div key={idx} className="text-sm text-gray-700 pl-4">
                      • {s.service}
                    </div>
                  ))}
                </div>

                <Button
                  href={`/${service.category.toLowerCase()}`}
                  variant="primary"
                  fullWidth
                  animate
                >
                  View {service.category} Services →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl-responsive font-bold mb-4">What Our Customers Say</h2>
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-8 h-8 text-rating"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-lg text-gray-600">4.9 out of 5 based on 127 reviews</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card variant="gradient" className="relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="success">Verified Customer</Badge>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold">
                    {testimonials[activeTestimonial].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonials[activeTestimonial].name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonials[activeTestimonial].location}
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-700 italic mb-4">
                  "{testimonials[activeTestimonial].text}"
                </p>

                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-gray-600">Project: </span>
                    <span className="font-semibold">{testimonials[activeTestimonial].project}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Saved: </span>
                    <span className="font-semibold text-cta">
                      {testimonials[activeTestimonial].savings}
                    </span>
                  </div>
                </div>
              </div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeTestimonial ? 'w-8 bg-brand-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl-responsive font-bold mb-4">Serving All of Salt Lake County</h2>
            <p className="text-lg-responsive text-gray-600 max-w-3xl mx-auto">
              We provide premium construction services to all cities in the greater Salt Lake area.
              Click your city for local pricing and availability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cities.slice(0, 18).map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="bg-white hover:bg-brand-primary hover:text-white rounded-lg p-4 text-center shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="font-medium">{city.name}</div>
                <div className="text-sm mt-1 text-brand-info group-hover:text-white/80">
                  View Services →
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button href="/cities" variant="outline" size="lg">
              View All Service Areas →
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-cta-gradient text-white">
        <div className="container text-center">
          <h2 className="text-3xl-responsive font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl-responsive mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Wild West Construction for all their
            home improvement needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="tel:18016914065"
              variant="urgent"
              size="xl"
              animate
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
            >
              Call Now: (801) 691-4065
            </Button>
            <Button
              onClick={() =>
                document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
              }
              variant="secondary"
              size="xl"
              className="bg-white text-brand-primary hover:bg-gray-100"
            >
              Get Online Quote →
            </Button>
          </div>

          <div className="mt-8 flex justify-center gap-8 text-sm opacity-80">
            <div>✓ Free Estimates</div>
            <div>✓ Licensed & Insured</div>
            <div>✓ 2-Year Warranty</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnhancedHomepageTemplate;
