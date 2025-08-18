/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Temporarily disable strict mode
  swcMinify: false, // Disable SWC minification temporarily
  images: {
    domains: ['localhost', 'wildwestconstruction.com'],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  // Minimal configuration to avoid conflicts
  experimental: {
    appDir: true, // Explicitly enable app directory
  },
};

module.exports = nextConfig;