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
  title: 'Professional Junk Removal Services in Utah | Wild West Construction',
  description:
    'Fast, eco-friendly junk removal services including same-day pickup, bulk trash removal, and construction debris cleanup. Licensed junk hauling throughout Utah.',
  keywords: [
    'junk removal Utah',
    'junk hauling services',
    'same day junk removal',
    'bulk trash pickup',
    'construction debris removal',
    'eco-friendly junk removal',
    'Utah junk removal company',
    'residential junk removal',
    'commercial junk removal',
  ],
  authors: [{ name: 'Wild West Construction' }],
  creator: 'Wild West Construction',
  publisher: 'Wild West Construction',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com'),
  alternates: {
    canonical: '/junk-removal',
  },
  openGraph: {
    title: 'Professional Junk Removal Services in Utah | Wild West Construction',
    description:
      'Fast, eco-friendly junk removal services including same-day pickup, bulk trash removal, and construction debris cleanup throughout Utah.',
    type: 'website',
    locale: 'en_US',
    url: '/junk-removal',
    siteName: 'Wild West Construction',
    images: [
      {
        url: '/images/junk-removal-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional junk removal services by Wild West Construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Junk Removal Services in Utah | Wild West Construction',
    description:
      'Fast, eco-friendly junk removal services including same-day pickup, bulk trash removal, and construction debris cleanup throughout Utah.',
    images: ['/images/junk-removal-hero.jpg'],
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
const junkRemovalCategory: CategoryData = {
  name: 'Junk Removal',
  slug: 'junk-removal',
  title: 'Professional Junk Removal Services',
  description:
    'Fast, reliable, and eco-friendly junk removal services. From household cleanouts to construction debris, we handle all your hauling needs with professional service and environmental responsibility.',
};

// Service Highlights
const junkRemovalServices: ServiceHighlight[] = [
  {
    name: 'Same-Day Junk Removal',
    description:
      'Need junk removed today? Our same-day service gets your space cleared quickly and efficiently. Perfect for urgent cleanouts and time-sensitive projects.',
    benefits: [
      'Available 7 days a week',
      'Fast response times',
      'Flexible scheduling',
      'Emergency cleanout service',
    ],
    icon: '⚡',
  },
  {
    name: 'Residential Junk Hauling',
    description:
      'Complete household junk removal including furniture, appliances, electronics, and general clutter. We handle everything from single items to full home cleanouts.',
    benefits: [
      'Furniture and appliance removal',
      'Electronics recycling',
      'Basement and attic cleanouts',
      'Estate sale cleanup',
    ],
    icon: '🏠',
  },
  {
    name: 'Construction Debris Removal',
    description:
      'Professional removal of construction and renovation debris. We handle drywall, lumber, fixtures, and other construction materials safely and efficiently.',
    benefits: [
      'Drywall and lumber removal',
      'Fixture and appliance disposal',
      'Flooring material hauling',
      'Job site cleanup',
    ],
    icon: '🏗️',
  },
  {
    name: 'Bulk Trash Pickup',
    description:
      "Large item removal for items that won't fit in regular trash pickup. We handle oversized furniture, appliances, and bulk household items.",
    benefits: [
      'Large furniture removal',
      'Mattress and box spring disposal',
      'Appliance pickup and recycling',
      'Bulk household item removal',
    ],
    icon: '🚛',
  },
  {
    name: 'Office & Commercial Cleanouts',
    description:
      'Professional commercial junk removal for offices, retail spaces, and businesses. We handle furniture, equipment, and commercial waste efficiently.',
    benefits: [
      'Office furniture removal',
      'Equipment and electronics disposal',
      'Document shredding coordination',
      'Retail space cleanouts',
    ],
    icon: '🏢',
  },
  {
    name: 'Eco-Friendly Disposal',
    description:
      'Environmentally responsible junk removal with focus on recycling, donation, and proper disposal. We minimize landfill waste through sustainable practices.',
    benefits: [
      'Material recycling and sorting',
      'Donation coordination',
      'Proper hazardous waste disposal',
      'Environmental compliance',
    ],
    icon: '♻️',
  },
];

// Cities served for junk removal
const junkRemovalCities: string[] = [
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
const junkRemovalCTA: CallToActionData = {
  title: 'Ready to Clear Out Your Space?',
  description:
    'Get fast, professional junk removal with upfront pricing and eco-friendly disposal. Book your service today and reclaim your space tomorrow.',
  primaryButton: {
    text: 'Schedule Pickup',
    href: '/booking',
    ariaLabel: 'Schedule junk removal pickup service',
  },
  secondaryButton: {
    text: 'Call: (801) 691-4065',
    href: 'tel:+18016914065',
    ariaLabel: 'Call Wild West Construction for junk removal service',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://wildwestconstruction.com/junk-removal#service',
  name: 'Professional Junk Removal Services',
  description:
    'Fast, eco-friendly junk removal services including same-day pickup, bulk trash removal, and construction debris cleanup throughout Utah.',
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
  areaServed: junkRemovalCities.map((city) => ({
    '@type': 'City',
    name: `${city}, Utah`,
  })),
  serviceType: [
    'Same-Day Junk Removal',
    'Residential Junk Hauling',
    'Construction Debris Removal',
    'Bulk Trash Pickup',
    'Commercial Cleanouts',
    'Eco-Friendly Disposal',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Junk Removal Services',
    itemListElement: junkRemovalServices.map((service, index) => ({
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

export default function JunkRemovalPage() {
  return (
    <main className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <CategoryHero category={junkRemovalCategory} />

      {/* Service Highlights */}
      <ServiceHighlights services={junkRemovalServices} categoryName={junkRemovalCategory.name} />

      {/* Cities List */}
      <CitiesList
        cities={junkRemovalCities}
        categorySlug={junkRemovalCategory.slug}
        maxDisplay={15}
      />

      {/* Call to Action */}
      <CallToAction data={junkRemovalCTA} variant="accent" />

      {/* Additional SEO Content */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-primary mb-6 font-serif">
              Why Choose Wild West Construction for Junk Removal?
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Fast & Reliable Service</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  We understand that junk removal is often time-sensitive. Our team provides fast,
                  reliable service with same-day availability and flexible scheduling to meet your
                  needs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Upfront Pricing</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  No hidden fees or surprise charges. We provide clear, upfront pricing based on the
                  volume of junk removed. You'll know the exact cost before we start.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Eco-Friendly Practices</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  We prioritize environmental responsibility by recycling, donating, and properly
                  disposing of items. We work to minimize landfill waste and maximize reuse.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Full-Service Removal</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  Our team handles all the heavy lifting. We'll come to your location, load
                  everything onto our trucks, and clean up the area when we're done.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-6 font-serif">
              Our Junk Removal Process
            </h3>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Schedule Your Service</h4>
                    <p className="text-text-dark/80">
                      Contact us by phone or online to schedule your junk removal. We offer flexible
                      scheduling including same-day service.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Free On-Site Estimate</h4>
                    <p className="text-text-dark/80">
                      Our team arrives and provides a no-obligation estimate based on the volume and
                      type of items to be removed.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">We Do the Heavy Lifting</h4>
                    <p className="text-text-dark/80">
                      Once you approve the estimate, our professional team handles all the loading
                      and removal from your property.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Responsible Disposal</h4>
                    <p className="text-text-dark/80">
                      We sort, recycle, donate, and dispose of your items responsibly, minimizing
                      environmental impact.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Final Cleanup</h4>
                    <p className="text-text-dark/80">
                      We clean up the area where items were removed, leaving your space clean and
                      ready to use.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-6 font-serif">
              What We Accept & Don't Accept
            </h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  We Accept
                </h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Furniture and home furnishings</li>
                  <li>• Appliances (refrigerators, washers, etc.)</li>
                  <li>• Electronics and computer equipment</li>
                  <li>• Construction and renovation debris</li>
                  <li>• Yard waste and landscaping materials</li>
                  <li>• Office furniture and equipment</li>
                  <li>• Mattresses and box springs</li>
                  <li>• General household clutter</li>
                  <li>• Exercise equipment</li>
                  <li>• Hot tubs and pool equipment</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <h4 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  We Don't Accept
                </h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Hazardous materials (paint, chemicals)</li>
                  <li>• Asbestos-containing materials</li>
                  <li>• Medical waste or biohazards</li>
                  <li>• Radioactive materials</li>
                  <li>• Propane tanks and fuel</li>
                  <li>• Car batteries and automotive fluids</li>
                  <li>• Contaminated soil or materials</li>
                  <li>• Dead animals or food waste</li>
                </ul>
                <p className="text-xs text-red-600 mt-4">
                  For hazardous materials, we can refer you to appropriate disposal facilities.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-6 font-serif">
              Environmental Commitment
            </h3>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-text-dark/80 leading-relaxed mb-6">
                At Wild West Construction, we're committed to environmental responsibility. We
                believe in doing our part to protect Utah's natural beauty through sustainable junk
                removal practices.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Recycling First</h4>
                  <p className="text-sm text-text-dark/80">
                    We recycle up to 60% of items we collect, including metals, electronics, and
                    appliances.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Donation Partners</h4>
                  <p className="text-sm text-text-dark/80">
                    We work with local charities to donate usable furniture, clothing, and household
                    items.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Responsible Disposal</h4>
                  <p className="text-sm text-text-dark/80">
                    Items that can't be recycled or donated are disposed of at licensed facilities
                    following all regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
