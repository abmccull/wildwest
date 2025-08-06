import { NextRequest, NextResponse } from "next/server";

// Basic auth credentials (in production, these should be environment variables)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "wildwest2024!";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  
  // Add cache headers based on content type
  const pathname = url.pathname;
  
  // Static assets - long-term caching
  if (pathname.match(/\.(ico|svg|jpg|jpeg|png|gif|webp|avif)$/i)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // CSS and JS files - long-term caching with immutable
  if (pathname.match(/\.(css|js)$/i) || pathname.includes('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Fonts - long-term caching
  if (pathname.match(/\.(woff|woff2|ttf|otf|eot)$/i)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Access-Control-Allow-Origin', '*');
  }
  
  // HTML pages - stale-while-revalidate for better performance
  if (!pathname.includes('.') && !pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  }
  
  // API routes - no cache
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }
  
  // Add ETag support for better cache validation
  if (pathname.match(/\.(css|js|json)$/i)) {
    const etag = `W/"${Buffer.from(pathname).toString('base64')}"`;
    response.headers.set('ETag', etag);
  }
  
  // Add performance hints
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Connection', 'keep-alive');
  
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
     * Match all admin routes
     */
    "/admin/:path*",
  ],
};
