import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import WebVitals from "@/components/WebVitals";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    default: "Wild West Construction | Utah's Premier Construction Experts",
    template: "%s | Wild West Construction",
  },
  description:
    "Wild West Construction provides professional flooring, demolition, and junk removal services throughout Utah. Licensed, insured, and locally owned construction contractors.",
  keywords:
    "construction services Utah, flooring installation Utah, demolition services Utah, junk removal Utah, contractors Salt Lake City, Murray construction",
  authors: [{ name: "Wild West Construction" }],
  creator: "Wild West Construction",
  publisher: "Wild West Construction",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://wildwestslc.com"),
  alternates: {
    canonical: "https://wildwestslc.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.webp",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wildwestslc.com",
    siteName: "Wild West Construction",
    title: "Wild West Construction | Utah's Premier Construction Experts",
    description:
      "Professional construction services throughout Utah. Licensed, insured contractors specializing in flooring, demolition, and junk removal.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wild West Construction - Utah Construction Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wild West Construction | Utah's Premier Construction Experts",
    description:
      "Professional construction services throughout Utah. Licensed, insured contractors specializing in flooring, demolition, and junk removal.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // TODO: Replace with actual Google Search Console verification code
    // Get your verification code from: https://search.google.com/search-console
    // google: "your-google-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${inter.variable}`}>
      <head>
        {/* Performance Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Wild West Construction"
        />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Icons for PWA */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/icon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/icon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/images/icon-180x180.png" />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#1e3a8a"
        />

        {/* Open Graph optimized images */}
        <link rel="preload" href="/images/og-image.jpg" as="image" />

        {/* Critical CSS for layout shift prevention */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .btn-primary{background:#dc2626;color:#fff;padding:.75rem 2rem;border-radius:.5rem}
          `,
          }}
        />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Wild West Construction",
              url: "https://wildwestslc.com",
              logo: "https://wildwestslc.com/images/logo.png",
              description:
                "Professional construction services throughout Utah. Licensed, insured contractors specializing in flooring, demolition, and junk removal.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "4097 S 420 W",
                addressLocality: "Murray",
                addressRegion: "UT",
                postalCode: "84123",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-801-691-4065",
                contactType: "customer service",
                email: "info@wildwestslc.com",
                availableLanguage: "English",
              },
              sameAs: [
                "https://www.facebook.com/wildwestflooringbrokers/",
                "https://www.instagram.com/wildwestflooring/",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
              },
              serviceArea: {
                "@type": "State",
                name: "Utah",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900">


        <ServiceWorkerRegistration />
        <WebVitals />
        <Analytics />
        {children}
        <VercelAnalytics />
        <SpeedInsights />

        {/* Schema markup for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Wild West Construction",
              url: "https://wildwestslc.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://wildwestslc.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
