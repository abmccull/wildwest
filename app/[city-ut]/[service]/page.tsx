import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  getServiceData,
  getServiceBySlug,
  ParsedServiceData,
  getCitiesForService,
  getServicesByCategory,
} from '@/lib/data-parser';
import { findServiceByUrl, findClosestServiceMatch } from '@/lib/service-url-mapper';
import { getPageBySlug, transformPageToServiceData, getRelatedPages } from '@/lib/get-page-data';
import {
  getServiceContent,
  getLocationSpecificContent,
  getRelatedServiceContent,
} from '@/lib/service-content';
import { findBestMatch } from '@/lib/service-slug-mapper';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NAPBlock } from '@/components/pages/NAPBlock';
import { FAQSection, generateFAQSchema } from '@/components/pages/FAQSection';
import { ServiceIcon } from '@/components/ui/ServiceIcon';

// Dynamically import the LeadFormSection to avoid SSR issues
const LeadFormSection = dynamic(() => import('@/components/forms/LeadFormSection'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-200 rounded-lg h-96 flex items-center justify-center">
      <p className="text-gray-500">Loading form...</p>
    </div>
  ),
});

interface ServicePageProps {
  params: {
    'city-ut': string;
    service: string;
  };
}

// Helper function to extract city name from slug
function getCityNameFromSlug(citySlug: string): string {
  const cityNames: Record<string, string> = {
    'salt-lake-city-ut': 'Salt Lake City',
    'west-valley-city-ut': 'West Valley City',
    'west-jordan-ut': 'West Jordan',
    'taylorsville-ut': 'Taylorsville',
    'south-jordan-ut': 'South Jordan',
    'sandy-ut': 'Sandy',
    'murray-ut': 'Murray',
    'draper-ut': 'Draper',
    'riverton-ut': 'Riverton',
    'midvale-ut': 'Midvale',
    'cottonwood-heights-ut': 'Cottonwood Heights',
    'herriman-ut': 'Herriman',
    'holladay-ut': 'Holladay',
    'millcreek-ut': 'Millcreek',
    'south-salt-lake-ut': 'South Salt Lake',
    'bluffdale-ut': 'Bluffdale',
    'magna-ut': 'Magna',
    'kearns-ut': 'Kearns',
    'brighton-ut': 'Brighton',
    'alta-ut': 'Alta',
    'emigration-canyon-ut': 'Emigration Canyon',
    'white-city-ut': 'White City',
    'copperton-ut': 'Copperton',
  };
  return (
    cityNames[citySlug] ||
    citySlug
      .replace('-ut', '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

// Helper function to normalize service slug for matching
function normalizeServiceSlug(slug: string): string {
  return slug.toLowerCase().replace(/-/g, ' ');
}

// Generate static params for a limited set of popular combinations
export async function generateStaticParams() {
  try {
    // Generate only a small subset of popular service pages to avoid build issues
    // The rest will be generated dynamically on-demand
    const popularParams = [
      { 'city-ut': 'salt-lake-city-ut', service: 'hardwood-floor-installation' },
      { 'city-ut': 'sandy-ut', service: 'laminate-installation' },
      { 'city-ut': 'draper-ut', service: 'interior-demolition' },
      { 'city-ut': 'west-jordan-ut', service: 'construction-debris-removal' },
      { 'city-ut': 'murray-ut', service: 'vinyl-plank-installation' },
    ];

    console.log(`Generated ${popularParams.length} static params for popular service pages`);
    return popularParams;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Enable dynamic generation for non-prebuilt pages
export const dynamicParams = true;

// Generate metadata for each service page
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const citySlug = params['city-ut'];
  const serviceSlug = params.service;

  // First try to get the page from the database
  const pageData = await getPageBySlug(citySlug, serviceSlug);

  let serviceData: ParsedServiceData | null = null;

  if (pageData) {
    // Transform database page to service data format
    serviceData = transformPageToServiceData(pageData);
  } else {
    // Fallback to CSV data if not in database
    serviceData = findServiceByUrl(citySlug, serviceSlug);
  }

  if (!serviceData) {
    return {
      title: 'Service Not Found',
      description: 'The requested service page could not be found.',
    };
  }

  const cityName = getCityNameFromSlug(citySlug);

  return {
    title: serviceData.seoTitle,
    description: serviceData.metaDescription,
    keywords: `${serviceData.keyword}, ${cityName}, ${serviceData.category}, Utah construction, Salt Lake County`,
    authors: [{ name: 'Wild West Construction' }],
    creator: 'Wild West Construction',
    publisher: 'Wild West Construction',
    alternates: {
      canonical: serviceData.urlSlug,
    },
    openGraph: {
      title: serviceData.seoTitle,
      description: serviceData.metaDescription,
      type: 'website',
      locale: 'en_US',
      siteName: 'Wild West Construction',
      url: serviceData.urlSlug,
    },
    twitter: {
      card: 'summary_large_image',
      title: serviceData.seoTitle,
      description: serviceData.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Lead form submission handler

export default async function ServicePage({ params }: ServicePageProps) {
  const citySlug = params['city-ut'];
  const serviceSlug = params.service;

  // First try to get the page from the database
  const pageData = await getPageBySlug(citySlug, serviceSlug);

  let serviceData: ParsedServiceData | null = null;

  if (pageData) {
    // Transform database page to service data format
    serviceData = transformPageToServiceData(pageData);
  } else {
    // Fallback to CSV data if not in database
    serviceData = findServiceByUrl(citySlug, serviceSlug);
  }

  if (!serviceData) {
    // Try to find similar services to suggest
    const { suggestions } = findClosestServiceMatch(citySlug, serviceSlug);

    // If we have suggestions, show a helpful error page
    if (suggestions.length > 0) {
      return (
        <ServiceNotFoundPage
          citySlug={citySlug}
          serviceSlug={serviceSlug}
          suggestions={suggestions}
        />
      );
    }

    // Otherwise, show 404
    notFound();
  }

  const cityName = getCityNameFromSlug(citySlug);

  // Get database content if available
  const databaseContent = (serviceData as any).databaseContent || {};
  const hasDbContent = Object.keys(databaseContent).length > 0;

  // Get enhanced content from the service content system as fallback
  // First try to find a best match using the slug mapper
  const mappedSlug = findBestMatch(serviceSlug);
  const enhancedContent = mappedSlug
    ? getLocationSpecificContent(mappedSlug, cityName) || getServiceContent(mappedSlug)
    : getLocationSpecificContent(serviceSlug, cityName) || getServiceContent(serviceSlug);

  // Get related service content
  const relatedServiceContent = enhancedContent?.slug
    ? getRelatedServiceContent(enhancedContent.slug)
    : [];

  // Get related services in the same category
  const relatedServices = getServicesByCategory(serviceData.category)
    .filter(
      (service) => service.city === serviceData.city && service.urlSlug !== serviceData.urlSlug
    )
    .slice(0, 5);

  // Get nearby cities offering the same service
  const nearbyCities = getCitiesForService(serviceData.keyword)
    .filter((city) => city !== serviceData.city)
    .slice(0, 8);

  // Generate breadcrumb data
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: `${cityName} Services`, href: `/${citySlug}` },
    { label: serviceData.h1, current: true },
  ];

  // Generate structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${process.env.NEXT_PUBLIC_SITE_URL}${item.href}` }),
    })),
  };

  // Parse and merge JSON-LD data
  let jsonLdData = {};
  if (serviceData.parsedJsonLd) {
    jsonLdData = {
      ...serviceData.parsedJsonLd,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${serviceData.urlSlug}`,
      provider: {
        '@type': 'LocalBusiness',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/#business`,
        name: 'Wild West Construction',
        telephone: '+18016914065',
        email: 'info@wildwestslc.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4097 S 420 W',
          addressLocality: 'Salt Lake City',
          addressRegion: 'UT',
          postalCode: '84123',
          addressCountry: 'US',
        },
      },
    };
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {serviceData.parsedJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData),
          }}
        />
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">{serviceData.h1}</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {serviceData.metaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+18016914065" className="btn-primary text-center">
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
                Call Now: (801) 691-4065
              </a>
              <a href="#quote-form" className="btn-secondary text-center">
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-text-dark mb-6">
                {databaseContent.hero_text || `Professional ${serviceData.keyword} in ${cityName}`}
              </h2>

              {/* Service Description from Database or Enhanced Content */}
              <div className="mb-8">
                {databaseContent.service_description ? (
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {databaseContent.service_description}
                  </p>
                ) : enhancedContent ? (
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        (enhancedContent.longDescription || '')
                          .replace(/Utah/g, cityName + ', Utah')
                          .substring(0, 800) +
                        ((enhancedContent.longDescription?.length || 0) > 800 ? '...' : ''),
                    }}
                  />
                ) : null}
              </div>

              {/* Database Content Sections */}
              {databaseContent.sections && databaseContent.sections.length > 0 && (
                <div className="space-y-8 mb-8">
                  {databaseContent.sections.map((section: any, index: number) => (
                    <div key={index} className="">
                      <h3 className="text-2xl font-bold text-text-dark mb-4">{section.title}</h3>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Features/Benefits Section - Database or Enhanced Content */}
              {(databaseContent.features || enhancedContent?.benefits) && (
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold text-text-dark mb-4">
                    {databaseContent.features
                      ? 'Key Features'
                      : `Benefits of Our ${serviceData.keyword} Services`}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(databaseContent.features || enhancedContent?.benefits?.slice(0, 6) || []).map(
                      (item: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                            <svg
                              className="w-3 h-3 text-primary"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {typeof item === 'string' ? item.replace(/Utah/g, cityName) : item}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Our Process Section */}
              {enhancedContent?.process && (
                <div className="bg-primary/5 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold text-text-dark mb-4">
                    Our {serviceData.keyword} Process
                  </h3>
                  <div className="space-y-4">
                    {enhancedContent.process.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-text-dark">{step.title}</h4>
                          <p className="text-gray-600 text-sm">
                            {step.description.replace(/Utah/g, cityName)}
                          </p>
                          {step.duration && (
                            <span className="text-xs text-primary font-medium">
                              Duration: {step.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Problems We Solve Section */}
              {enhancedContent?.problemsSolved && (
                <div className="bg-red-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold text-text-dark mb-4">Problems We Solve</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {enhancedContent.problemsSolved.slice(0, 6).map((problem, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg
                            className="w-3 h-3 text-red-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-600 text-sm">{problem}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose Wild West Section */}
              {enhancedContent?.whyChooseWildwest && (
                <div className="bg-green-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold text-text-dark mb-4">
                    Why Choose Wild West Construction?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {enhancedContent.whyChooseWildwest.map((reason, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg
                            className="w-3 h-3 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-600 text-sm">{reason.replace(/Utah/g, cityName)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Features */}
              {enhancedContent?.serviceFeatures && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {enhancedContent.serviceFeatures.map((feature, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <ServiceIcon icon={feature.icon} className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-text-dark mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Testimonials Section from Database */}
              {databaseContent.testimonials && databaseContent.testimonials.length > 0 && (
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold text-text-dark mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {databaseContent.testimonials.map((testimonial: any, index: number) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                              <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 font-semibold text-gray-700">
                            {testimonial.name}
                          </span>
                        </div>
                        <p className="text-gray-600 italic">"{testimonial.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* City Description from Database */}
              {databaseContent.city_description && (
                <div className="bg-green-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold text-text-dark mb-4">Serving {cityName}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {databaseContent.city_description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      {serviceData.internalLinkBlockHtml && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: serviceData.internalLinkBlockHtml }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">
                Related Services in {cityName}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((service) => (
                  <Link
                    key={service.urlSlug}
                    href={service.urlSlug}
                    className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all group"
                  >
                    <h3 className="text-lg font-semibold text-text-dark group-hover:text-primary mb-3">
                      {service.keyword}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.metaDescription}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">
                {serviceData.keyword} in Nearby Cities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nearbyCities.map((city) => {
                  const citySlugForLink = city.toLowerCase().replace(/\s+/g, '-') + '-ut';
                  return (
                    <Link
                      key={city}
                      href={`/${citySlugForLink}/${serviceSlug}`}
                      className="block bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-primary hover:shadow-md transition-all group"
                    >
                      <h3 className="font-semibold text-text-dark group-hover:text-primary">
                        {city}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{serviceData.keyword}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {databaseContent.faq && databaseContent.faq.length > 0 ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">
                    Frequently Asked Questions - {serviceData.keyword} in {cityName}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Get answers to common questions about {serviceData.keyword.toLowerCase()}{' '}
                    services in {cityName}.
                  </p>
                </div>
                <div className="space-y-4">
                  {databaseContent.faq.map((faq: any, index: number) => (
                    <details key={index} className="bg-gray-50 rounded-lg p-6 group">
                      <summary className="font-semibold text-text-dark cursor-pointer list-none flex justify-between items-center">
                        <span>{faq.question}</span>
                        <svg
                          className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="mt-4 text-gray-600">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </>
            ) : enhancedContent?.faqs ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">
                    Frequently Asked Questions - {serviceData.keyword} in {cityName}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Get answers to common questions about {serviceData.keyword.toLowerCase()}{' '}
                    services in {cityName}.
                  </p>
                </div>
                <div className="space-y-4">
                  {enhancedContent.faqs.map((faq, index) => (
                    <details key={index} className="bg-gray-50 rounded-lg p-6 group">
                      <summary className="font-semibold text-text-dark cursor-pointer list-none flex justify-between items-center">
                        <span>{faq.question.replace(/Utah/g, cityName)}</span>
                        <svg
                          className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="mt-4 text-gray-600">
                        <p>{faq.answer.replace(/Utah/g, cityName + ', Utah')}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </>
            ) : (
              <FAQSection variant="accordion" searchable={false} categorized={false} />
            )}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="quote-form" className="py-12 bg-primary/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-dark mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 text-lg">
                {databaseContent.cta_text ||
                  `Contact us today for your free ${serviceData.keyword.toLowerCase()} estimate in ${cityName}. We'll provide a detailed quote and answer any questions you have about your project.`}
              </p>

              {/* Enhanced Service Info */}
              {enhancedContent && (
                <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {enhancedContent.priceRange}
                    </div>
                    <div className="text-sm text-gray-600">Typical Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {enhancedContent.timeline}
                    </div>
                    <div className="text-sm text-gray-600">Project Timeline</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {enhancedContent.warranty}
                    </div>
                    <div className="text-sm text-gray-600">Warranty Coverage</div>
                  </div>
                </div>
              )}
            </div>
            <LeadFormSection cityDisplayName={cityName} />
          </div>
        </div>
      </section>

      {/* NAP Block Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <NAPBlock
              variant="card"
              showHours={true}
              showSchema={true}
              city={cityName}
              service={serviceData.keyword}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Transform Your Space with Professional {serviceData.keyword}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of satisfied customers who have trusted Wild West Construction with
              their {serviceData.keyword.toLowerCase()} projects in {cityName}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18016914065"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
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
                Call (801) 691-4065
              </a>
              <a
                href="#quote-form"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Get Free Estimate
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Service Not Found component
function ServiceNotFoundPage({
  citySlug,
  serviceSlug,
  suggestions,
}: {
  citySlug: string;
  serviceSlug: string;
  suggestions: ParsedServiceData[];
}) {
  const cityName = getCityNameFromSlug(citySlug);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            We couldn't find "{serviceSlug.replace(/-/g, ' ')}" in {cityName}.
          </p>

          {suggestions.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Did you mean one of these services?
              </h2>
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion.urlSlug}
                    href={suggestion.urlSlug}
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-primary mb-2">{suggestion.keyword}</h3>
                    <p className="text-gray-600 text-sm">{suggestion.metaDescription}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${citySlug}`} className="btn-primary text-center">
              View All {cityName} Services
            </Link>
            <Link href="/" className="btn-secondary text-center">
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
