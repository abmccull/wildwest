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
  title: 'Professional Flooring Installation & Services in Utah | Wild West Construction',
  description:
    'Expert flooring installation services including hardwood, laminate, luxury vinyl plank, and engineered flooring. Licensed professionals serving Utah communities with quality craftsmanship.',
  keywords: [
    'flooring installation Utah',
    'hardwood floor installation',
    'laminate flooring',
    'luxury vinyl plank',
    'engineered hardwood',
    'floor installation contractors',
    'Utah flooring services',
    'professional floor installation',
  ],
  authors: [{ name: 'Wild West Construction' }],
  creator: 'Wild West Construction',
  publisher: 'Wild West Construction',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com'),
  alternates: {
    canonical: '/flooring',
  },
  openGraph: {
    title: 'Professional Flooring Installation & Services in Utah | Wild West Construction',
    description:
      'Expert flooring installation services including hardwood, laminate, luxury vinyl plank, and engineered flooring throughout Utah.',
    type: 'website',
    locale: 'en_US',
    url: '/flooring',
    siteName: 'Wild West Construction',
    images: [
      {
        url: '/images/flooring-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional flooring installation services by Wild West Construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Flooring Installation & Services in Utah | Wild West Construction',
    description:
      'Expert flooring installation services including hardwood, laminate, luxury vinyl plank, and engineered flooring throughout Utah.',
    images: ['/images/flooring-hero.jpg'],
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
const flooringCategory: CategoryData = {
  name: 'Flooring',
  slug: 'flooring',
  title: 'Professional Flooring Installation Services',
  description:
    'Transform your space with expert flooring installation. From hardwood to luxury vinyl, we deliver quality craftsmanship and lasting beauty for your home or business.',
};

// Service Highlights
const flooringServices: ServiceHighlight[] = [
  {
    name: 'Hardwood Floor Installation',
    description:
      'Premium hardwood flooring installation with precision craftsmanship. We work with all wood species and grades to create stunning, durable floors that add value to your property.',
    benefits: [
      'Professional subfloor preparation',
      'Expert acclimation and installation',
      'Custom staining and finishing',
      'Lifetime craftsmanship warranty',
    ],
    icon: '🌳',
  },
  {
    name: 'Engineered Hardwood Installation',
    description:
      'Engineered hardwood combines the beauty of real wood with enhanced stability. Perfect for areas with moisture concerns while maintaining the authentic hardwood appearance.',
    benefits: [
      'Superior moisture resistance',
      'Compatible with radiant heating',
      'Multiple installation methods',
      'Wide plank options available',
    ],
    icon: '🏗️',
  },
  {
    name: 'Luxury Vinyl Plank (LVP)',
    description:
      'Modern luxury vinyl plank flooring offers incredible durability and realistic wood-look designs. Waterproof and perfect for high-traffic areas and busy households.',
    benefits: [
      '100% waterproof protection',
      'Easy maintenance and cleaning',
      'Comfortable underfoot',
      'Pet and child-friendly',
    ],
    icon: '💎',
  },
  {
    name: 'Laminate Flooring Installation',
    description:
      'Cost-effective laminate flooring that delivers beautiful wood-look aesthetics with exceptional durability. Quick installation with minimal disruption to your daily routine.',
    benefits: [
      'Budget-friendly option',
      'Scratch and fade resistant',
      'Fast floating installation',
      'Wide variety of styles',
    ],
    icon: '🔨',
  },
  {
    name: 'Tile & Natural Stone',
    description:
      'Professional tile and natural stone installation for kitchens, bathrooms, and living spaces. Expert handling of ceramic, porcelain, marble, and granite materials.',
    benefits: [
      'Precision cutting and fitting',
      'Waterproofing expertise',
      'Custom pattern layouts',
      'Grout and sealing services',
    ],
    icon: '🪨',
  },
  {
    name: 'Carpet & Area Rug Installation',
    description:
      'Professional carpet installation with proper padding and seamless transitions. We handle everything from wall-to-wall carpeting to custom area rug placement.',
    benefits: [
      'Quality padding installation',
      'Seamless room transitions',
      'Furniture moving included',
      'Carpet stretching and finishing',
    ],
    icon: '🏡',
  },
];

// Cities served for flooring
const flooringCities: string[] = [
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
const flooringCTA: CallToActionData = {
  title: 'Ready to Transform Your Floors?',
  description:
    'Get a free consultation and quote for your flooring project. Our experienced team will help you choose the perfect flooring solution for your space and budget.',
  primaryButton: {
    text: 'Get Free Quote',
    href: '/booking',
    ariaLabel: 'Get a free quote for flooring installation services',
  },
  secondaryButton: {
    text: 'Call: (801) 691-4065',
    href: 'tel:+18016914065',
    ariaLabel: 'Call Wild West Construction for flooring consultation',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://wildwestconstruction.com/flooring#service',
  name: 'Professional Flooring Installation Services',
  description:
    'Expert flooring installation services including hardwood, laminate, luxury vinyl plank, and engineered flooring throughout Utah.',
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
  areaServed: flooringCities.map((city) => ({
    '@type': 'City',
    name: `${city}, Utah`,
  })),
  serviceType: [
    'Hardwood Floor Installation',
    'Engineered Hardwood Installation',
    'Luxury Vinyl Plank Installation',
    'Laminate Flooring Installation',
    'Tile Installation',
    'Carpet Installation',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Flooring Installation Services',
    itemListElement: flooringServices.map((service, index) => ({
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

export default function FlooringPage() {
  return (
    <main className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <CategoryHero category={flooringCategory} />

      {/* Service Highlights */}
      <ServiceHighlights services={flooringServices} categoryName={flooringCategory.name} />

      {/* Cities List */}
      <CitiesList cities={flooringCities} categorySlug={flooringCategory.slug} maxDisplay={15} />

      {/* Call to Action */}
      <CallToAction data={flooringCTA} variant="primary" />

      {/* Additional SEO Content */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-primary mb-6 font-serif">
              Why Choose Wild West Construction for Your Flooring Project?
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Expert Craftsmanship</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  Our experienced flooring professionals bring years of expertise to every
                  installation. We understand the unique challenges of Utah's climate and ensure
                  your floors are installed to last for decades.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Quality Materials</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  We partner with leading flooring manufacturers to provide you with the highest
                  quality materials. From domestic hardwoods to imported luxury vinyl, we source
                  only the best products for your project.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Comprehensive Service</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  From initial consultation to final cleanup, we handle every aspect of your
                  flooring project. Our team manages subfloor preparation, material delivery,
                  installation, and finishing touches.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Licensed & Insured</h3>
                <p className="text-text-dark/80 leading-relaxed">
                  Wild West Construction is fully licensed and insured for your protection. We stand
                  behind our work with comprehensive warranties and ongoing customer support.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-6 font-serif">
              Flooring Installation Process
            </h3>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Consultation & Design</h4>
                    <p className="text-text-dark/80">
                      We meet with you to discuss your vision, assess your space, and help you
                      select the perfect flooring materials.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Measurement & Quote</h4>
                    <p className="text-text-dark/80">
                      Precise measurements are taken and a detailed quote is provided with material
                      and labor costs clearly outlined.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Preparation & Delivery</h4>
                    <p className="text-text-dark/80">
                      We prepare the subfloor, handle material delivery, and ensure proper
                      acclimation for wood products.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Professional Installation</h4>
                    <p className="text-text-dark/80">
                      Expert installation using industry-best practices and professional-grade tools
                      and equipment.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Finishing & Cleanup</h4>
                    <p className="text-text-dark/80">
                      Final touches including trim work, transitions, and thorough cleanup leaving
                      your space ready to enjoy.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
