import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
// Removed Vercel analytics on initial load to improve mobile TBT; can be re-added lazily if needed
import "./globals.css";
import WebVitals from "@/components/WebVitals";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import Analytics from "@/components/AnalyticsOptimized";
import PerformanceMonitor from "@/components/PerformanceMonitor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
        {/* Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Removed external font preload to avoid 404s; rely on next/font */}
        
        {/* Avoid extra sockets on mobile by not preconnecting analytics domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Removed aggressive CSS mutation script to prevent forced reflows/CLS */}

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

        {/* Fallback meta description to satisfy SEO audit; page-level metadata may override */}
        <meta
          name="description"
          content="Wild West Construction provides professional flooring, demolition, and junk removal services throughout Utah. Licensed, insured, and locally owned construction contractors."
        />

        {/* Icons for PWA (use existing public assets) */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* Preload critical above-the-fold images */}
        <link
          rel="preload"
          href="/logo.webp"
          as="image"
          type="image/webp"
        />

        {/* CSS loading optimization will be handled by CSSOptimizer component */}

        {/* Enhanced critical CSS with layout stability fixes to prevent CLS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Reset and base styles with layout stability */
            *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
            html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;scroll-behavior:smooth}
            body{margin:0;line-height:inherit;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#ffffff;color:#111827;min-height:100vh}
            
            /* Prevent layout shifts with explicit dimensions */
            img,video,canvas,svg{display:block;max-width:100%;height:auto}
            img[width][height]{aspect-ratio:attr(width)/attr(height)}
            
            /* Font loading handled by next/font; external @font-face removed */

            /* Header critical styles with explicit height to prevent CLS */
            header{min-height:64px}
            .sticky{position:-webkit-sticky;position:sticky}
            .top-0{top:0px}
            .z-50{z-index:50}
            .z-10{z-index:10}
            .bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}
            .shadow-construction{--tw-shadow:0 10px 15px -3px rgb(38 70 83 / 0.1), 0 4px 6px -2px rgb(38 70 83 / 0.05);box-shadow:var(--tw-shadow)}
            .h-16{height:4rem}
            
            /* Layout utilities */
            .max-w-7xl{max-width:80rem}
            .max-w-4xl{max-width:56rem}
            .max-w-3xl{max-width:48rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            .px-4{padding-left:1rem;padding-right:1rem}
            .py-2{padding-top:0.5rem;padding-bottom:0.5rem}
            .py-16{padding-top:4rem;padding-bottom:4rem}
            .flex{display:flex}
            .flex-col{flex-direction:column}
            .flex-wrap{flex-wrap:wrap}
            .items-center{align-items:center}
            .items-start{align-items:flex-start}
            .justify-between{justify-content:space-between}
            .justify-center{justify-content:center}
            .space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}
            .space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}
            .space-x-8>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(2rem * var(--tw-space-x-reverse));margin-left:calc(2rem * calc(1 - var(--tw-space-x-reverse)))}
            .space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}
            
            /* Hero gradient background */
            .bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}
            .from-blue-900{--tw-gradient-from:#1e3a8a;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to,rgb(30 58 138 / 0))}
            .to-blue-700{--tw-gradient-to:#1d4ed8}
            .text-white{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}
            .text-blue-100{color:#dbeafe}
            .text-blue-200{color:#bfdbfe}
            .text-red-400{color:#f87171}
            .text-green-400{color:#4ade80}
            .text-yellow-400{color:#facc15}
            .text-blue-400{color:#60a5fa}
            .text-blue-600{color:#2563eb}
            .text-gray-900{color:#111827}
            .py-20{padding-top:5rem;padding-bottom:5rem}
            
            /* Typography */
            .text-sm{font-size:.875rem;line-height:1.25rem}
            .text-lg{font-size:1.125rem;line-height:1.75rem}
            .text-xl{font-size:1.25rem;line-height:1.75rem}
            .text-2xl{font-size:1.5rem;line-height:2rem}
            .text-4xl{font-size:2.25rem;line-height:2.5rem}
            .text-5xl{font-size:3rem;line-height:1}
            .font-medium{font-weight:500}
            .font-semibold{font-weight:600}
            .font-bold{font-weight:700}
            .mb-4{margin-bottom:1rem}
            .mb-6{margin-bottom:1.5rem}
            .mb-8{margin-bottom:2rem}
            .mt-8{margin-top:2rem}
            .leading-tight{line-height:1.25}
            .leading-relaxed{line-height:1.625}
            
            /* Button styles */
            .btn-primary,.inline-block{display:inline-block}
            .px-6{padding-left:1.5rem;padding-right:1.5rem}
            .px-8{padding-left:2rem;padding-right:2rem}
            .py-4{padding-top:1rem;padding-bottom:1rem}
            .bg-red-600{--tw-bg-opacity:1;background-color:rgb(220 38 38 / var(--tw-bg-opacity))}
            .hover\\:bg-red-700:hover{background-color:#b91c1c}
            .bg-blue-600{background-color:#2563eb}
            .border-2{border-width:2px}
            .border-white{border-color:#ffffff}
            .hover\\:bg-white:hover{background-color:#ffffff}
            .hover\\:text-blue-900:hover{color:#1e3a8a}
            .hover\\:text-red-600:hover{color:#dc2626}
            .rounded{border-radius:.25rem}
            .rounded-lg{border-radius:.5rem}
            .text-center{text-align:center}
            .transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}
            .duration-200{transition-duration:.2s}
            
            /* Grid system */
            .grid{display:grid}
            .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
            .gap-12{gap:3rem}
            
            /* SVG and icons */
            .w-5{width:1.25rem}
            .w-6{width:1.5rem}
            .h-5{height:1.25rem}
            .h-6{height:1.5rem}
            
            /* Form and container styles */
            .shadow-2xl{--tw-shadow:0 25px 50px -12px rgb(0 0 0 / 0.25);box-shadow:var(--tw-shadow)}
            .p-1{padding:.25rem}
            .relative{position:relative}
            
            /* Skip link for accessibility */
            .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}
            .focus\\:not-sr-only:focus{position:static;width:auto;height:auto;padding:inherit;margin:inherit;overflow:visible;clip:auto;white-space:normal}
            .focus\\:absolute:focus{position:absolute}
            .focus\\:top-4:focus{top:1rem}
            .focus\\:left-4:focus{left:1rem}
            
            /* WhatsApp button styles */
            .btn-whatsapp{background-color:#0d5016;color:#ffffff;transition:background-color 0.2s ease}
            .btn-whatsapp:hover{background-color:#0a3f12}
            
            /* Responsive design */
            @media (min-width:640px){
              .sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}
              .sm\\:flex-row{flex-direction:row}
              .sm\\:space-y-0>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0px * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0px * var(--tw-space-y-reverse))}
              .sm\\:space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}
            }
            @media (min-width:768px){
              .md\\:text-6xl{font-size:3.75rem;line-height:1}
            }
            @media (min-width:1024px){
              .lg\\:px-8{padding-left:2rem;padding-right:2rem}
              .lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
            }
            
            /* Anti-aliasing */
            .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            
            /* Animation placeholder for forms */
            .animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}
            @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
            
            /* Layout stability and skeleton screens */
            .bg-gray-200{background-color:#e5e7eb}
            .service-cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;min-height:400px}
            
            /* Prevent CLS for dynamic content */
            [data-lazy-component]{min-height:200px}
            .component-loaded{min-height:auto}
            
            /* Skeleton loading states */
            .skeleton{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:skeleton-loading 1.5s ease-in-out infinite}
            @keyframes skeleton-loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
            
            /* Prevent button layout shifts */
            a[href^="tel:"],a[href^="https://wa.me/"]{min-width:160px;display:inline-flex;align-items:center;justify-content:center}
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
        {/* Skip to content link for keyboard navigation accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium z-50 focus:z-50"
        >
          Skip to main content
        </a>

        {/* Removed CSSOptimizer and ResourceLoader to avoid DOM/style thrashing that caused forced reflows */}
        <ServiceWorkerRegistration />
        <WebVitals />
        <Analytics />
        <PerformanceMonitor />
        {children}
        {/* Analytics tools removed from critical path */}

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
