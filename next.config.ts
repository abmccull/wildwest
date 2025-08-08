import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  // Compiler configuration for modern browsers - reduces polyfills
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
    // Use SWC for faster builds and smaller bundles
    styledComponents: false,
    // Remove React DevTools in production
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },

  // External packages for server components
  serverExternalPackages: [],

  // Experimental features for better performance  
  experimental: {
    // Removed optimizePackageImports due to RSC chunk issues (see troubleshooting)
    scrollRestoration: true,
  },

  
  // Disable ESLint during builds for now
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Image optimization for Core Web Vitals
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
        pathname: "/tr**",
      },
    ],
  },

  // Compression and bundle optimization
  compress: true,

  // Headers for performance and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://vercel.live https://vitals.vercel-insights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https: http:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net https://vitals.vercel-insights.com https://vercel.live https://*.supabase.co wss://*.supabase.co; frame-src 'none'; object-src 'none'; base-uri 'self';",
          },
          // Performance headers
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Enable HTTP/2 Server Push hints
          // Remove HTTP/2 Push-like Link hints that can hurt mobile LCP
        ],
      },
      // Cache static assets aggressively (1 year)
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "ETag",
            value: "W/\"static-asset\"",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Font caching (1 year) with CORS headers
      {
        source: "/(.*)\\.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Accept, Origin, User-Agent",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
      {
        source: "/(.*)\\.woff",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Accept, Origin, User-Agent",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
      // CSS and JS files with versioning (1 year)
      {
        source: "/(.*)\\.css",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // HTML pages - aggressive edge caching with stale-while-revalidate
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "accept",
            value: ".*text/html.*",
          },
        ],
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300, max-age=0",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
      // API routes - no cache but with security headers
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'none'; script-src 'none'; style-src 'none';",
          },
        ],
      },
      // Service worker - no cache
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      // Manifest file - moderate caching
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      // Favicon - 1 day cache
      {
        source: "/favicon.(ico|png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
        ],
      },
      // Third-party script proxy caching optimization
      {
        source: "/_next/static/chunks/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Webpack optimizations for bundle size - aggressive polyfill removal
  webpack: (config, { dev, isServer }) => {
    // Disable unnecessary polyfills for modern browsers
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Disable all polyfills for modern browsers - ES2022+ support assumed
        stream: false,
        crypto: false,
        http: false,
        https: false,
        os: false,
        url: false,
        zlib: false,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        buffer: false,
        assert: false,
        path: false,
        util: false,
        events: false,
        querystring: false,
        string_decoder: false,
      };

      // Configure modern browser targets to reduce polyfills
      config.resolve.alias = {
        ...config.resolve.alias,
        // Point core-js to empty module since we target modern browsers
        'core-js/modules': false,
        'core-js/stable': false,
        'core-js/es': false,
        'core-js': false,
        'regenerator-runtime': false,
        '@babel/runtime': false,
        // Exclude polyfills for ES2022+ features we can assume exist
        'es6-promise': false,
        'whatwg-fetch': false,
        'url-polyfill': false,
        'intersection-observer': false,
        'resize-observer-polyfill': false,
        'abortcontroller-polyfill': false,
      };

      // Add more aggressive polyfill exclusions using webpack's DefinePlugin
      const webpack = require('webpack');
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.SKIP_POLYFILLS': JSON.stringify('true'),
          'process.env.MODERN_BROWSERS_ONLY': JSON.stringify('true'),
        })
      );

      // Configure to ignore polyfill modules during build
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /(core-js|regenerator-runtime|@babel\/runtime)/,
        })
      );
    }

    // Production optimizations
    if (!dev) {
      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // More aggressive polyfill removal
      config.resolve.mainFields = ['browser', 'module', 'main'];
      
      // Skip specific polyfill entries for modern browsers
      if (config.entry && typeof config.entry === 'object') {
        // Remove polyfills entry if it exists
        delete config.entry.polyfills;
      }

      // Configure externals to exclude polyfill libraries - comprehensive exclusion
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push(
          // Exclude all core-js polyfills (Array.at, flat, flatMap, Object.fromEntries, etc.)
          /^core-js/,
          /^core-js\//,
          /^regenerator-runtime/,
          /^@babel\/runtime/,
          /^@babel\/polyfill/,
          // Modern browser feature polyfills we don't need
          /^es6-promise/,
          /^whatwg-fetch/,
          /^url-polyfill/,
          /^intersection-observer/,
          /^resize-observer-polyfill/,
          /^abortcontroller-polyfill/,
          /^custom-event-polyfill/,
          /^element-closest/,
          /^classlist-polyfill/,
          // String/Array method polyfills - not needed for modern browsers
          /^array-from/,
          /^array-includes/,
          /^object-assign/,
          /^promise-polyfill/,
        );
      }

      // Let Next handle CSS chunking to avoid extra CSS request on critical path for mobile

      // Enhanced CSS optimization (relies on PostCSS config for minification)

      // Bundle analyzer in development
      if (process.env.ANALYZE === "true") {
        try {
          const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: "static",
              openAnalyzer: false,
            }),
          );
        } catch (e) {
          console.log("Bundle analyzer not available, skipping...");
        }
      }
    }

    return config;
  },

  // PWA and offline support
  async rewrites() {
    return [
      {
        source: "/service-worker.js",
        destination: "/_next/static/service-worker.js",
      },
    ];
  },

  // Generate static pages for better performance
  output: "standalone",

  // Optimize fonts and external resources
  async redirects() {
    return [
      // Force HTTPS
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://wildwestslc.com/:path*",
        permanent: true,
      },
    ];
  },

  // Enable static optimization
  trailingSlash: false,
  generateEtags: true,

  // Optimize build output
  poweredByHeader: false,
};

export default nextConfig;