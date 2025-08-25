import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { findLegacyServiceMapping } from './lib/legacy-url-redirects';
import { REDIRECT_MAP } from './lib/generated-redirects';

// Service name redirects map - only include actual redirects needed for old URLs
const SERVICE_REDIRECTS: Record<string, string> = {
  'hardwood-flooring': 'hardwood-floor-installation',
  'vinyl-flooring': 'vinyl-plank-installation',
  'laminate-flooring': 'laminate-installation',
  'construction-cleanup': 'construction-debris-removal',
  'bathroom-remodel': 'bathroom-remodeling',
  'kitchen-remodel': 'kitchen-remodeling',
  // Removed these as they cause redirect loops:
  // 'junk-removal': 'junk-removal-service', // Already using junk-removal-service in URLs
  // demolition: 'interior-demolition', // Already using interior-demolition in URLs
  // flooring: 'flooring-installation', // Already using flooring-installation in URLs
};

// Valid city slugs that should have -ut appended
const VALID_CITIES = [
  'west-valley-city',
  'south-salt-lake',
  'draper',
  'south-jordan',
  'midvale',
  'millcreek',
  'cottonwood-heights',
  'taylorsville',
  'sandy',
  'riverton',
  'holladay',
  'murray',
  'west-jordan',
  'herriman',
  'bluffdale',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.headers.get('host') || '';

  // Redirect www to non-www
  if (hostname.startsWith('www.')) {
    const newUrl = new URL(request.url);
    newUrl.hostname = hostname.replace('www.', '');
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Redirect HTTP to HTTPS in production (except localhost)
  if (
    process.env.NODE_ENV === 'production' &&
    !hostname.includes('localhost') &&
    request.headers.get('x-forwarded-proto') === 'http'
  ) {
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl, { status: 301 });
  }

  // Check for generated redirects first (handles old Google-indexed URLs)
  const generatedRedirect = REDIRECT_MAP.get(pathname);
  if (generatedRedirect) {
    const newUrl = new URL(request.url);
    newUrl.pathname = generatedRedirect;
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Handle old /locations/ URLs
  const locationsMatch = pathname.match(/^\/locations\/([a-z-]+)\/([a-z-]+)\/?$/);
  if (locationsMatch) {
    const [, city, service] = locationsMatch;
    const newUrl = new URL(request.url);

    // Map city names to city-ut format
    const citySlug = city + '-ut';
    // Don't add trailing slash - let Next.js handle it
    newUrl.pathname = `/${citySlug}/${service}`;
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // First, check if this is a malformed city URL without -ut suffix
  // Pattern: /city-name-service-name (all combined without proper separation)
  const malformedMatch = pathname.match(/^\/([a-z-]+)\/?$/);

  if (malformedMatch) {
    const fullSlug = malformedMatch[1];

    // Skip if it already ends with -ut (valid city page) - don't redirect city-only pages
    if (fullSlug.endsWith('-ut')) {
      return NextResponse.next();
    }

    // Check if this matches any of our valid cities at the start
    for (const city of VALID_CITIES) {
      if (fullSlug.startsWith(city + '-')) {
        // Extract the service part after the city name
        const servicePartStart = city.length + 1;
        const servicePart = fullSlug.substring(servicePartStart);

        if (servicePart) {
          // Try to find a mapping for this legacy service URL
          const mappedService = findLegacyServiceMapping(servicePart);
          
          if (mappedService) {
            // We found a valid mapping, redirect to the mapped service
            const newUrl = new URL(request.url);
            newUrl.pathname = `/${city}-ut/${mappedService}`;
            return NextResponse.redirect(newUrl, { status: 301 });
          } else {
            // No mapping found, redirect to the city page instead
            const newUrl = new URL(request.url);
            newUrl.pathname = `/${city}-ut`;
            return NextResponse.redirect(newUrl, { status: 301 });
          }
        }
      }
    }
  }

  // Check if this is a city/service URL pattern with -ut suffix (correct format)
  const match = pathname.match(/^\/([a-z-]+-ut)\/([a-z-]+)\/?$/);

  if (match) {
    const [, city, service] = match;

    // Check if this service needs a redirect - but skip if already redirected
    if (SERVICE_REDIRECTS[service] && SERVICE_REDIRECTS[service] !== service) {
      const newUrl = new URL(request.url);
      // Don't add trailing slash - let Next.js handle it
      newUrl.pathname = `/${city}/${SERVICE_REDIRECTS[service]}`;
      return NextResponse.redirect(newUrl, { status: 301 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match city/service paths, exclude webpack and chunks
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
