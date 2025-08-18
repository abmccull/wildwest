'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ParsedServiceData } from '@/lib/data-parser';
import { Button, Card, Badge, TrustIndicator, ProgressiveForm, StickyMobileCTA } from '@/components/ui';

interface EnhancedServicePageTemplateProps {
  service: ParsedServiceData;
  cityName: string;
  relatedServices: ParsedServiceData[];
  nearbyCities: string[];
}

export const EnhancedServicePageTemplate: React.FC<EnhancedServicePageTemplateProps> = ({
  service,
  cityName,
  relatedServices,
  nearbyCities,
}) => {
  const [urgencyTimer, setUrgencyTimer] = useState(900); // 15 minutes
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const exitIntentShown = useRef(false);

  // Urgency timer countdown
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

    return () => clearInterval(timer);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Show special offer at 50% scroll
      if (scrolled > 50 && !showSpecialOffer) {
        setShowSpecialOffer(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSpecialOffer]);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown.current && scrollProgress < 80) {
        setShowExitIntent(true);
        exitIntentShown.current = true;
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [scrollProgress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mock gallery images
  const galleryImages = [
    { url: '/gallery/before-1.jpg', caption: 'Before renovation' },
    { url: '/gallery/after-1.jpg', caption: 'After renovation' },
    { url: '/gallery/progress-1.jpg', caption: 'Work in progress' },
    { url: '/gallery/complete-1.jpg', caption: 'Completed project' },
  ];

  // FAQ data
  const faqs = [
    {
      question: `How much does ${service.keyword} cost in ${cityName}?`,
      answer: `${service.keyword} in ${cityName} typically costs between $${((service as any).averagePrice * 0.8 || 100).toLocaleString()} and $${((service as any).averagePrice * 1.2 || 500).toLocaleString()}, depending on project size and materials. We offer free quotes to provide exact pricing.`,
    },
    {
      question: `How long does ${service.keyword} take?`,
      answer: `Most ${service.keyword} projects in ${cityName} are completed within ${(service as any).duration || '2-5 days'}. Emergency services are available for urgent needs.`,
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Yes, Wild West Construction is fully licensed, bonded, and insured in Utah. We carry comprehensive liability insurance and all our work comes with a 2-year warranty.',
    },
    {
      question: 'Do you offer financing?',
      answer: 'Yes, we offer flexible financing options with approved credit. Many customers qualify for 0% interest for 12 months on projects over $2,500.',
    },
  ];

  return (
    <>
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA primaryPhone="18016914065" />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-cta to-cta-hover transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Urgency Banner */}
      {urgencyTimer > 0 && (
        <div className="bg-urgent-gradient text-white py-3 text-center sticky top-1 z-40">
          <div className="container flex items-center justify-center gap-3">
            <span className="animate-pulse text-xl">🔥</span>
            <span className="font-semibold">Limited Offer: Save $500 on {service.keyword}!</span>
            <Badge variant="warning" className="bg-white text-cta-urgent font-bold">
              {formatTime(urgencyTimer)}
            </Badge>
          </div>
        </div>
      )}

      {/* Service Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white pt-20 pb-16">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${service.city.toLowerCase().replace(' ', '-')}-ut`} className="text-gray-600 hover:text-gray-900">
              {cityName}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${service.category.toLowerCase()}`} className="text-gray-600 hover:text-gray-900">
              {service.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{service.keyword}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-3xl-responsive md:text-4xl-responsive lg:text-5xl-responsive font-bold text-gray-900 mb-4">
                {service.h1}
              </h1>

              {/* Trust Indicators Row */}
              <div className="flex flex-wrap gap-4 mb-6">
                <TrustIndicator type="rating" value="4.9★" label="(127 Reviews)" />
                <TrustIndicator type="license" value="Licensed" />
                <TrustIndicator type="warranty" value="2-Year" />
                <TrustIndicator type="availability" value="24/7" />
              </div>

              {/* Service Description */}
              <p className="text-lg text-gray-600 mb-8">
                {service.metaDescription}
              </p>

              {/* Price & Value Box */}
              <Card variant="gradient" className="mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Average Investment</div>
                    <div className="text-3xl font-bold text-brand-primary">
                      ${(service as any).averagePrice?.toLocaleString() || '2,999'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Save $500 today!
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Timeline</div>
                    <div className="text-3xl font-bold text-cta">
                      {(service as any).duration || '2-3 days'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Same-day start available
                    </div>
                  </div>
                </div>
              </Card>

              {/* Desktop CTAs */}
              <div className="hidden md:flex flex-col gap-3">
                <Button
                  onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="urgent"
                  size="lg"
                  fullWidth
                  animate
                  icon={<span>💰</span>}
                >
                  Get Free {cityName} Quote →
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    href="tel:18016914065"
                    variant="outline"
                    fullWidth
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                  >
                    Call Now
                  </Button>
                  <Button
                    onClick={() => setShowVideoModal(true)}
                    variant="outline"
                    fullWidth
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  >
                    Watch Video
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Media & Trust */}
            <div className="space-y-6">
              {/* Image Gallery */}
              <Card variant="elevated" className="p-0 overflow-hidden">
                <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                  <div className="flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🖼️</div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {service.keyword} Gallery
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveGalleryImage(idx)}
                        className={`aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-80 transition-opacity ${
                          activeGalleryImage === idx ? 'ring-2 ring-cta' : ''
                        }`}
                      >
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          {idx + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="text-center">
                  <div className="text-2xl font-bold text-brand-primary">24/7</div>
                  <div className="text-xs text-gray-600">Emergency</div>
                </Card>
                <Card className="text-center">
                  <div className="text-2xl font-bold text-cta">$0</div>
                  <div className="text-xs text-gray-600">Callout Fee</div>
                </Card>
                <Card className="text-center">
                  <div className="text-2xl font-bold text-trust">100%</div>
                  <div className="text-xs text-gray-600">Guaranteed</div>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card variant="gradient">
                <div className="flex items-center gap-2 mb-3">
                  <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm font-medium">Recent Activity in {cityName}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Quote requested</span>
                    <span className="font-medium">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Project completed</span>
                    <span className="font-medium">1 hour ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">5★ review posted</span>
                    <span className="font-medium">3 hours ago</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features & Benefits */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl-responsive font-bold text-center mb-12">
              Why Choose Wild West for {service.keyword}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <Card variant="bordered">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  Service Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professional {service.category.toLowerCase()} experts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Premium materials and equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Clean, efficient work process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Detailed project documentation</span>
                  </li>
                </ul>
              </Card>

              {/* Benefits */}
              <Card variant="bordered">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Customer Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save up to $500 on your project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>2-year warranty on all work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Flexible scheduling options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>100% satisfaction guarantee</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Process Timeline */}
            <Card variant="gradient" className="mt-8">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Our {service.keyword} Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: 'Free Quote', desc: 'Get instant pricing', time: '30 seconds' },
                  { step: 2, title: 'Schedule', desc: 'Pick convenient time', time: 'Same day' },
                  { step: 3, title: 'Service', desc: 'Professional work', time: (service as any).duration || '2-3 days' },
                  { step: 4, title: 'Guarantee', desc: '2-year warranty', time: 'Ongoing' },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                      {item.step}
                    </div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{item.desc}</p>
                    <Badge variant="info" size="sm">{item.time}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card variant="elevated">
              <div className="text-center mb-8">
                <h2 className="text-3xl-responsive font-bold mb-2">
                  Get Your Free {service.keyword} Quote
                </h2>
                <p className="text-gray-600">
                  Takes 30 seconds • No obligations • {cityName} pricing
                </p>
              </div>

              <ProgressiveForm
                steps={[
                  {
                    id: 'project',
                    title: 'Project Details',
                    fields: [
                      {
                        name: 'projectSize',
                        label: 'Project Size',
                        type: 'select',
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
                        type: 'radio',
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
                    title: 'Contact Information',
                    fields: [
                      {
                        name: 'name',
                        label: 'Your Name',
                        type: 'text',
                        placeholder: 'John Smith',
                        required: true,
                      },
                      {
                        name: 'phone',
                        label: 'Phone Number',
                        type: 'tel',
                        placeholder: '(801) 555-0123',
                        required: true,
                      },
                      {
                        name: 'address',
                        label: 'Service Address',
                        type: 'text',
                        placeholder: `123 Main St, ${cityName}, UT`,
                        required: false,
                      },
                    ],
                  },
                ]}
                onSubmit={(data) => {
                  console.log('Quote form submitted:', data);
                  // Handle form submission
                }}
                submitText="Get My Free Quote →"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl-responsive font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <Card key={idx} variant="bordered">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                      <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-4 text-gray-600">{faq.answer}</p>
                  </details>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">
            Related {service.category} Services in {cityName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedServices.slice(0, 3).map((related) => (
              <Card
                key={related.urlSlug}
                variant="bordered"
                hover
                className="cursor-pointer"
                onClick={() => window.location.href = related.urlSlug}
              >
                <h3 className="font-semibold mb-2 text-brand-primary">
                  {related.keyword}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {related.metaDescription}
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Learn More →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Popup */}
      {showSpecialOffer && !showExitIntent && (
        <div className="fixed bottom-20 right-4 max-w-sm z-40 animate-slide-up">
          <Card variant="elevated" className="relative">
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
            <Button
              href="tel:18016914065"
              variant="urgent"
              fullWidth
              animate
            >
              Claim Offer Now
            </Button>
          </Card>
        </div>
      )}

      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card variant="elevated" className="max-w-md w-full">
            <div className="text-center">
              <div className="text-5xl mb-4">👋</div>
              <h3 className="text-2xl font-bold mb-2">Wait! Don't Miss Out</h3>
              <p className="text-gray-600 mb-6">
                Get an instant $250 discount on your {service.keyword} project!
              </p>
              
              <div className="bg-cta/10 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600 mb-1">Your Exclusive Discount</div>
                <div className="text-3xl font-bold text-cta">$250 OFF</div>
                <div className="text-sm text-gray-600 mt-1">Valid for 24 hours</div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setShowExitIntent(false);
                    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="urgent"
                  fullWidth
                  size="lg"
                  animate
                >
                  Claim My $250 Discount →
                </Button>
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  No thanks, I'll pay full price
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-w-16 aspect-h-9">
                <div className="flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white p-8">
                    <div className="text-6xl mb-4">▶️</div>
                    <p>Video player would be embedded here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedServicePageTemplate;