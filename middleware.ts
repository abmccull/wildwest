import { NextRequest, NextResponse } from "next/server";
import { findRedirect, generateDynamicRedirect, normalizePath } from "@/lib/redirects";

// Use Node.js runtime for better compatibility
// export const runtime = 'edge'; // Removed due to compatibility issues

// Basic auth credentials (in production, these should be environment variables)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "wildwest2024!";

// Cache control headers for different content types
const CACHE_HEADERS = {
  STATIC_LONG: 'public, max-age=31536000, immutable',
  STATIC_SHORT: 'public, max-age=86400, s-maxage=86400',
  HTML: 'public, s-maxage=60, stale-while-revalidate=300, max-age=0',
  API: 'no-store, no-cache, must-revalidate, proxy-revalidate',
  CDN_LONG: 'public, s-maxage=31536000, immutable',
  CDN_EDGE: 'public, s-maxage=60, stale-while-revalidate=300',
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const host = request.headers.get("host") || "";

  // Canonicalize host: redirect www -> apex
  if (host === "www.wildwestslc.com") {
    url.hostname = "wildwestslc.com";
    return NextResponse.redirect(url, { status: 308 });
  }

  // URL normalization: lowercase path, remove trailing slash, collapse doubles
  const normalizedPath = normalizePath(url.pathname);
  if (normalizedPath !== url.pathname) {
    url.pathname = normalizedPath;
    return NextResponse.redirect(url, { status: 308 });
  }

  // Manual redirect rules
  const manual = findRedirect(url.pathname);
  if (manual) {
    url.pathname = manual.to;
    return NextResponse.redirect(url, { status: manual.permanent ? 301 : 307 });
  }

  // Dynamic redirect rules for database-driven URLs
  const dynamic = generateDynamicRedirect(url.pathname);
  if (dynamic) {
    url.pathname = dynamic.to;
    return NextResponse.redirect(url, { status: dynamic.permanent ? 301 : 307 });
  }
  
  // Add optimized cache headers based on content type
  const pathname = url.pathname;
  
  // Static assets - long-term caching with CDN optimization
  if (pathname.match(/\.(ico|svg|jpg|jpeg|png|gif|webp|avif)$/i)) {
    response.headers.set('Cache-Control', CACHE_HEADERS.STATIC_LONG);
    response.headers.set('CDN-Cache-Control', CACHE_HEADERS.CDN_LONG);
    response.headers.set('Vercel-CDN-Cache-Control', CACHE_HEADERS.CDN_LONG);
  }
  
  // CSS and JS files - long-term caching with immutable
  if (pathname.match(/\.(css|js)$/i) || pathname.includes('/_next/static/')) {
    response.headers.set('Cache-Control', CACHE_HEADERS.STATIC_LONG);
    response.headers.set('CDN-Cache-Control', CACHE_HEADERS.CDN_LONG);
    response.headers.set('Vercel-CDN-Cache-Control', CACHE_HEADERS.CDN_LONG);
  }
  
  // Fonts - long-term caching with CORS headers
  if (pathname.match(/\.(woff|woff2|ttf|otf|eot)$/i)) {
    response.headers.set('Cache-Control', CACHE_HEADERS.STATIC_LONG);
    response.headers.set('CDN-Cache-Control', CACHE_HEADERS.CDN_LONG);
    response.headers.set('Vercel-CDN-Cache-Control', CACHE_HEADERS.CDN_LONG);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, User-Agent');
    response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
  
  // HTML pages - aggressive edge caching with stale-while-revalidate
  if (!pathname.includes('.') && !pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', CACHE_HEADERS.HTML);
    response.headers.set('CDN-Cache-Control', CACHE_HEADERS.CDN_EDGE);
    response.headers.set('Vercel-CDN-Cache-Control', CACHE_HEADERS.CDN_EDGE);
  }
  
  // API routes - no cache with additional headers
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', CACHE_HEADERS.API);
    response.headers.set('CDN-Cache-Control', 'no-cache');
    response.headers.set('Vercel-CDN-Cache-Control', 'no-cache');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }
  
  // Add ETag support for better cache validation
  if (pathname.match(/\.(css|js|json)$/i)) {
    const etag = `W/"${Buffer.from(pathname).toString('base64')}"`;
    response.headers.set('ETag', etag);
  }
  
  // Add performance and security hints
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Connection', 'keep-alive');
  
  // Add server timing headers for performance monitoring
  const serverTiming = `middleware;dur=${Date.now() - (request as any).startTime || 0}`;
  response.headers.set('Server-Timing', serverTiming);
  
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const basicAuth = request.headers.get("authorization");

    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      if (authValue) {
        try {
          const [user, pwd] = atob(authValue).split(":");

          if (user === ADMIN_USERNAME && pwd === ADMIN_PASSWORD) {
            return response;
          }
        } catch (error) {
          // Invalid base64 or other decode error
          console.error("Auth decode error:", error);
        }
      }
    }

    // Return 401 with WWW-Authenticate header for basic auth prompt
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Wild West Construction Admin Area"',
      },
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all admin routes and key paths for optimization
     */
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
