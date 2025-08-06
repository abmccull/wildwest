import { NextRequest, NextResponse } from "next/server";

// Basic auth credentials (in production, these should be environment variables)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "wildwest2024!";

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const basicAuth = request.headers.get("authorization");

    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      if (authValue) {
        try {
          const [user, pwd] = atob(authValue).split(":");

          if (user === ADMIN_USERNAME && pwd === ADMIN_PASSWORD) {
            return NextResponse.next();
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all admin routes
     */
    "/admin/:path*",
  ],
};
