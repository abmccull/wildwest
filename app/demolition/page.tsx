import React from 'react';
import type { Metadata } from 'next';
import {
  CategoryHero,
  ServiceHighlights,
  CitiesList,
  CallToAction,
  CategoryData,
  ServiceHighlight,
  CallToActionData,
} from '../../components/category';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Professional Demolition Services in Utah | Wild West Construction',
  description:
    'Expert demolition services including interior, kitchen, bathroom, basement, and selective demolition. Safe, efficient, and fully insured demolition contractors serving Utah.',
  keywords: [
    'demolition services Utah',
    'interior demolition',
    'kitchen demolition',
    'bathroom demolition',
    'basement demolition',
    'selective demolition',
    'demolition contractors',
    'Utah demolition company',
    'safe demolition services',
  ],
  authors: [{ name: 'Wild West Construction' }],
  creator: 'Wild West Construction',
  publisher: 'Wild West Construction',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com'),
  alternates: {
    canonical: '/demolition',
  },
  openGraph: {
    title: 'Professional Demolition Services in Utah | Wild West Construction',
    description:
      'Expert demolition services including interior, kitchen, bathroom, basement, and selective demolition throughout Utah.',
    type: 'website',
    locale: 'en_US',
    url: '/demolition',
    siteName: 'Wild West Construction',
    images: [
      {
        url: '/images/demolition-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional demolition services by Wild West Construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Demolition Services in Utah | Wild West Construction',
    description:
      'Expert demolition services including interior, kitchen, bathroom, basement, and selective demolition throughout Utah.',
    images: ['/images/demolition-hero.jpg'],
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

// Category Data
const demolitionCategory: CategoryData = {
  name: 'Demolition',
  slug: 'demolition',
  title: 'Professional Demolition Services',
  description:
    'Safe, efficient, and precise demolition services for residential and commercial projects. From selective tear-outs to complete interior demolition, we handle it all with professional expertise.',
};

// Service Highlights
const demolitionServices: ServiceHighlight[] = [
  {
    name: 'Interior Demolition',
    description:
      'Complete interior demolition services for homes and commercial spaces. We safely remove walls, ceilings, flooring, and fixtures while protecting structural elements.',
    benefits: [
      'Structural integrity preservation',
      'Dust containment systems',
      'Safe electrical & plumbing handling',
      'Complete debris removal',
    ],
    icon: '🏠',
  },
  {
    name: 'Kitchen Demolition',
    description:
      'Specialized kitchen demolition for renovation projects. Expert removal of cabinets, countertops, appliances, and flooring with careful attention to plumbing and electrical systems.',
    benefits: [
      'Cabinet and countertop removal',
      'Appliance disconnection & removal',
      'Flooring and backsplash removal',
      'Plumbing and electrical protection',
    ],
    icon: '🔨',
  },
  {
    name: 'Bathroom Demolition',
    description:
      'Complete bathroom demolition services including tile removal, fixture removal, and plumbing preparation. We handle everything from powder rooms to master bath suites.',
    benefits: [
      'Tile and fixture removal',
      'Tub and shower demolition',
      'Vanity and mirror removal',
      'Waterproofing assessment',
    ],
    icon: '🚿',
  },
  {
    name: 'Basement Demolition',
    description:
      'Basement demolition and renovation preparation services. Safe removal of finished basement elements while maintaining structural support and foundation integrity.',
    benefits: [
      'Finished wall removal',
      'Drop ceiling demolition',
      'Foundation protection',
      'Moisture control planning',
    ],
    icon: '🏘️',
  },
  {
    name: 'Selective Demolition',
    description:
      'Precision selective demolition to remove specific elements while preserving surrounding structures. Perfect for targeted renovations and remodeling projects.',
    benefits: [
      'Targeted structural removal',
      'Minimal surrounding damage',
      'Precision cutting techniques',
      'Structural engineering consultation',
    ],
    icon: '🎯',
  },
  {
    name: 'Floor Demolition & Removal',
    description:
      'Professional floor demolition and removal services for all flooring types. From hardwood to tile to carpet, we remove flooring efficiently and prepare for new installation.',
    benefits: [
      'All flooring type removal',
      'Subfloor assessment',
      'Adhesive and nail removal',
      'Surface preparation',
    ],
    icon: '🔧',
  },
];

// Cities served for demolition
const demolitionCities: string[] = [
  'Alta',
  'Bluffdale',
  'Brighton',
  'Copperton',
  'Cottonwood Heights',
  'Draper',
  'Emigration Canyon',
  'Herriman',
  'Holladay',
  'Kearns',
  'Magna',
  'Midvale',
  'Millcreek',
  'Murray',
  'Riverton',
  'Salt Lake City',
  'Sandy',
  'South Jordan',
  'South Salt Lake',
  'Taylorsville',
  'West Jordan',
  'West Valley City',
  'White City',
];

// Call-to-Action Data
const demolitionCTA: CallToActionData = {
  title: 'Ready to Begin Your Demolition Project?',
  description:
    'Get a free assessment and quote for your demolition project. Our experienced team will evaluate your space and provide a detailed plan for safe, efficient demolition.',
  primaryButton: {
    text: 'Get Free Assessment',
    href: '/booking',
    ariaLabel: 'Get a free assessment for demolition services',
  },
  secondaryButton: {
    text: 'Call: (801) 691-4065',
    href: 'tel:+18016914065',
    ariaLabel: 'Call Wild West Construction for demolition consultation',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://wildwestconstruction.com/demolition#service',
  name: 'Professional Demolition Services',
  description:
    'Expert demolition services including interior, kitchen, bathroom, basement, and selective demolition throughout Utah.',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://wildwestconstruction.com/#business',
    name: 'Wild West Construction',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'UT',
      addressCountry: 'US',
    },
    telephone: '+18016914065',
    url: 'https://wildwestconstruction.com',
  },
  areaServed: demolitionCities.map((city) => ({
    '@type': 'City',
    name: `${city}, Utah`,
  })),
  serviceType: [
    'Interior Demolition',
    'Kitchen Demolition',
    'Bathroom Demolition',
    'Basement Demolition',
    'Selective Demolition',
    'Floor Demolition and Removal',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Demolition Services',
    itemListElement: demolitionServices.map((service, index) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
      },
      position: index + 1,
    })),
  },
};

export default function DemolitionPage() {
  return (
    <main className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <CategoryHero category={demolitionCategory} />

      {/* Service Highlights */}
      <ServiceHighlights services={demolitionServices} categoryName={demolitionCategory.name} />

      {/* Cities List */}
      <CitiesList
        cities={demolitionCities}
        categorySlug={demolitionCategory.slug}
        maxDisplay={15}
      />

      {/* Call to Action */}
      <CallToAction data={demolitionCTA} variant="secondary" />

      {/* Additional SEO Content */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-primary mb-6 font-serif">
              Why Choose Wild West Construction for Demolition Services?
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Safety First Approach</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  Our team prioritizes safety in every demolition project. We follow strict safety
                  protocols, use proper protective equipment, and ensure all utilities are safely
                  disconnected before beginning work.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Structural Expertise</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  We understand building structures and know what can and cannot be removed safely.
                  Our experience helps preserve structural integrity while achieving your renovation
                  goals.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Clean & Efficient</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  Our demolition process includes dust containment, debris management, and thorough
                  cleanup. We minimize disruption to your daily life and leave your space ready for
                  the next phase of construction.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Permit & Code Compliance
                </h3>
                <p className="text-text-dark/80 leading-relaxed">
                  We handle all necessary permits and ensure our demolition work complies with local
                  building codes and regulations. You can trust that your project meets all legal
                  requirements.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-6 font-serif">
              Our Demolition Process
            </h3>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Site Assessment & Planning</h4>
                    <p className="text-text-dark/80">
                      We evaluate the structure, identify utilities, and create a detailed
                      demolition plan prioritizing safety and efficiency.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Permit Acquisition</h4>
                    <p className="text-text-dark/80">
                      We obtain all necessary permits and approvals from local authorities to ensure
                      your project is fully compliant.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Utility Disconnection</h4>
                    <p className="text-text-dark/80">
                      Safe disconnection of electrical, plumbing, and HVAC systems to prevent damage
                      and ensure worker safety.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Controlled Demolition</h4>
                    <p className="text-text-dark/80">
                      Systematic demolition using appropriate tools and techniques, with dust
                      containment and debris management.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Cleanup & Disposal</h4>
                    <p className="text-text-dark/80">
                      Complete debris removal, proper disposal and recycling, and thorough site
                      cleanup ready for the next construction phase.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-6 font-serif">
              Safety & Environmental Considerations
            </h3>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-4">Safety Protocols</h4>
                  <ul className="space-y-2 text-text-dark/80">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-accent mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Comprehensive safety equipment for all workers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-accent mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Dust containment and air quality control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-accent mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Structural support assessment and protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-accent mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Hazardous material identification and handling</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-primary mb-4">
                    Environmental Responsibility
                  </h4>
                  <ul className="space-y-2 text-text-dark/80">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-accent mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Material recycling and sustainable disposal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-accent mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Proper disposal of construction debris</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-accent mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Minimized environmental impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-accent mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Compliance with environmental regulations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
