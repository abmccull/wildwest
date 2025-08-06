import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    // Removed optimizePackageImports due to RSC chunk issues (see troubleshooting)
    scrollRestoration: true,
  },
  
  // Compiler configuration for modern browsers - reduces polyfills
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
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
          // Performance headers
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Enable HTTP/2 Server Push hints
          {
            key: "Link",
            value: "</images/logo.webp>; rel=preload; as=image, </manifest.json>; rel=preload; as=fetch",
          },
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
      // Font caching (1 year)
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
      // HTML pages - stale-while-revalidate
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
            value: "public, s-maxage=10, stale-while-revalidate=59",
          },
        ],
      },
      // API routes - no cache
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
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
    ];
  },

  // Webpack optimizations for bundle size
  webpack: (config, { dev, isServer }) => {
    // Disable unnecessary polyfills for modern browsers
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Disable polyfills for modern browsers
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
      };

      // Configure modern browser targets to reduce polyfills
      config.resolve.alias = {
        ...config.resolve.alias,
        // Point core-js to empty module since we target modern browsers
        'core-js/modules': false,
        'core-js': false,
      };

      // Add more aggressive polyfill exclusions using webpack's DefinePlugin
      const webpack = require('webpack');
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.SKIP_POLYFILLS': JSON.stringify('true'),
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

      // Configure externals to exclude polyfill libraries
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push(
          // Exclude common polyfill modules
          /^core-js/,
          /^regenerator-runtime/,
          /^@babel\/runtime/,
          // Additional polyfill exclusions for ES2022+ features
          /^whatwg-fetch/,
          /^url-polyfill/,
          /^intersection-observer/,
          /^resize-observer-polyfill/,
        );
      }

      // Advanced CSS optimization for render-blocking elimination
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // Critical CSS bundle
          critical: {
            name: "critical",
            test: /\.(css|scss|sass)$/,
            chunks: "initial",
            enforce: true,
            priority: 30,
            minSize: 0,
          },
          // Non-critical CSS bundle
          styles: {
            name: "styles",
            test: /\.(css|scss|sass)$/,
            chunks: "async",
            enforce: true,
            priority: 20,
            minSize: 1000,
          },
        },
      };

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