import type { Metadata } from 'next';
import { Roboto, Roboto_Slab } from 'next/font/google';
import Layout from '../components/layout/Layout';
import { Analytics } from '../components/analytics';
import dynamic from 'next/dynamic';
import { getHreflangAlternatives } from '../lib/translations';
import { useLanguage } from '../components/seo/LanguageSwitcher';
import './globals.css';

// Temporarily disable WebVitalsReporter to isolate module loading issue
// const WebVitalsReporter = dynamic(
//   () => import('../components/performance/WebVitalsReporter').then((mod) => mod.default || mod),
//   { ssr: false }
// );

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true,
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto-slab',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Wild West Construction - Professional Building Services Utah',
  description:
    'Wild West Construction provides professional construction services including flooring, demolition, and junk removal across 23+ Utah cities. Licensed, insured, and trusted by thousands. Free estimates available.',
  keywords:
    'Utah construction company, Salt Lake City contractor, flooring installation Utah, demolition services Utah, junk removal Utah, residential construction, commercial construction, licensed contractor Utah, Wild West Construction',
  authors: [{ name: 'Wild West Construction' }],
  creator: 'Wild West Construction',
  publisher: 'Wild West Construction',
  category: 'Construction Services',
  classification: 'Construction Company',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'es-US': '/es/',
    },
  },
  openGraph: {
    title: "Wild West Construction - Utah's Premier Construction Company",
    description:
      'Professional flooring, demolition, and junk removal services across Salt Lake County and surrounding areas. Licensed, insured, and locally owned since 2014.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Wild West Construction',
    url: 'https://wildwestconstruction.com',
    images: [
      {
        url: '/images/og-wildwest-construction.jpg',
        width: 1200,
        height: 630,
        alt: "Wild West Construction - Utah's Trusted Construction Experts serving 23+ cities",
        type: 'image/jpeg',
      },
      {
        url: '/images/wildwest-team-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Wild West Construction professional team at work in Utah',
        type: 'image/jpeg',
      },
    ],
    countryName: 'United States',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wild West Construction - Utah's Premier Construction Company",
    description:
      'Professional flooring, demolition, and junk removal services across 23+ Utah cities. Licensed, insured, and locally trusted.',
    site: '@wildwestconstr',
    creator: '@wildwestconstr',
    images: ['/images/og-wildwest-construction.jpg'],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'google-site-verification-code',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || 'yandex-verification-code',
  },
  other: {
    'geo.region': 'US-UT',
    'geo.placename': 'Salt Lake City, Utah',
    'geo.position': '40.7608;-111.8910',
    ICBM: '40.7608, -111.8910',
    'DC.title': 'Wild West Construction - Utah Construction Services',
    'DC.creator': 'Wild West Construction',
    'DC.subject': 'Construction Services, Flooring, Demolition, Junk Removal',
    'DC.description':
      'Professional construction services across Utah including flooring installation, demolition, and junk removal',
    'DC.publisher': 'Wild West Construction',
    'DC.contributor': 'Wild West Construction Team',
    'DC.date': '2014',
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.identifier': process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com',
    'DC.source': process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com',
    'DC.language': 'en-US',
    'DC.coverage': 'Salt Lake County, Utah County, Davis County, Weber County',
    'DC.rights': 'Copyright Wild West Construction LLC',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoSlab.variable}`}>
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#7C5035" />
        <meta name="theme-color" content="#7C5035" />

        {/* DNS Prefetch and Preconnect for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Resource hints for API endpoints and third-party services */}
        <link rel="dns-prefetch" href="//api.wildwestconstruction.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />

        {/* Critical CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS - Above the fold styles */
            .critical-header {
              background-color: var(--primary);
              color: var(--text-light);
              position: sticky;
              top: 0;
              z-index: 50;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .critical-hero {
              background: linear-gradient(to right, rgba(124, 80, 53, 0.1), rgba(124, 80, 53, 0.05));
              padding: 4rem 0 6rem;
            }
            
            @media (min-width: 1024px) {
              .critical-hero {
                padding: 6rem 0;
              }
            }
            
            .critical-btn-primary {
              background-color: var(--primary);
              color: var(--text-light);
              padding: 1rem 2rem;
              border-radius: 0.375rem;
              font-weight: 500;
              transition: all 0.2s;
              display: inline-block;
              text-decoration: none;
            }
            
            .critical-btn-primary:hover {
              background-color: rgba(124, 80, 53, 0.9);
            }
          `,
          }}
        />

        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Hreflang tags for language alternatives */}
        <link
          rel="alternate"
          hrefLang="en-US"
          href={process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com'}
        />
        <link
          rel="alternate"
          hrefLang="es-US"
          href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com'}/es`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestconstruction.com'}
        />

        {/* Local Business structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#organization`,
              name: 'Wild West Construction',
              alternateName: 'Wild West Construction LLC',
              description:
                'Professional construction services including flooring, demolition, and junk removal across Utah',
              url: process.env.NEXT_PUBLIC_SITE_URL,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/wildwest-logo.png`,
              image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/wildwest-construction-team.jpg`,
              telephone: '+18015550123',
              email: 'info@wildwestconstruction.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Construction Blvd',
                addressLocality: 'Salt Lake City',
                addressRegion: 'UT',
                postalCode: '84101',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.7608,
                longitude: -111.891,
              },
              areaServed: [
                {
                  '@type': 'State',
                  name: 'Utah',
                  '@id': 'https://en.wikipedia.org/wiki/Utah',
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Salt Lake County',
                  containedInPlace: {
                    '@type': 'State',
                    name: 'Utah',
                  },
                },
              ],
              serviceType: ['Construction', 'Flooring Installation', 'Demolition', 'Junk Removal'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Construction Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Flooring Installation',
                      description: 'Professional flooring installation services',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Demolition Services',
                      description: 'Safe and efficient demolition services',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Junk Removal',
                      description: 'Fast and reliable junk removal services',
                    },
                  },
                ],
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '07:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '08:00',
                  closes: '16:00',
                },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '127',
                bestRating: '5',
              },
              founder: {
                '@type': 'Person',
                name: 'John Smith',
              },
              foundingDate: '2014',
              numberOfEmployees: '15-25',
              paymentAccepted: 'Cash, Check, Credit Card',
              priceRange: '$$',
              slogan: "Building Utah's Future, One Project at a Time",
              sameAs: [
                'https://www.facebook.com/wildwestconstruction',
                'https://www.linkedin.com/company/wild-west-construction',
                'https://www.yelp.com/biz/wild-west-construction',
                'https://www.bbb.org/us/ut/profile/general-contractor/wild-west-construction',
              ],
            }),
          }}
        />

        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#organization`,
              name: 'Wild West Construction',
              url: process.env.NEXT_PUBLIC_SITE_URL,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/wildwest-logo.png`,
              description:
                "Utah's premier construction company specializing in flooring, demolition, and junk removal services",
              foundingDate: '2014',
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+18015550123',
                  contactType: 'customer service',
                  areaServed: 'US-UT',
                  availableLanguage: ['English', 'Spanish'],
                },
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Construction Blvd',
                addressLocality: 'Salt Lake City',
                addressRegion: 'UT',
                postalCode: '84101',
                addressCountry: 'US',
              },
              sameAs: [
                'https://www.facebook.com/wildwestconstruction',
                'https://www.linkedin.com/company/wild-west-construction',
              ],
            }),
          }}
        />

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#website`,
              name: 'Wild West Construction',
              alternateName: 'Wild West Construction Utah',
              url: process.env.NEXT_PUBLIC_SITE_URL,
              description:
                'Professional construction services across Utah including flooring, demolition, and junk removal',
              publisher: {
                '@type': 'Organization',
                '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#organization`,
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
              inLanguage: ['en-US', 'es-US'],
            }),
          }}
        />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#7C5035" />
        <meta name="msapplication-TileColor" content="#7C5035" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <Layout>{children}</Layout>

        {/* Optimized Analytics with Web Vitals tracking */}
        <Analytics
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          gtmId={process.env.NEXT_PUBLIC_GTM_ID}
          enableWebVitals={true}
        />

        {/* Performance monitoring - temporarily disabled */}
        {/* <WebVitalsReporter /> */}
      </body>
    </html>
  );
}
