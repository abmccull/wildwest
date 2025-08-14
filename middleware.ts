import { NextRequest, NextResponse } from "next/server";

// Basic auth credentials
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "wildwest2024!";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname.toLowerCase();
  
  // Canonicalize www to apex domain
  const host = request.headers.get("host") || "";
  if (host === "www.wildwestslc.com") {
    url.hostname = "wildwestslc.com";
    return NextResponse.redirect(url, { status: 308 });
  }

  // Simple redirect map for city-service URLs
  const redirectMap: Record<string, string> = {
    "/murray-flooring": "/locations/murray/flooring",
    "/murray-demolition": "/locations/murray/demolition",
    "/murray-junk-removal": "/locations/murray/junk-removal",
    "/salt-lake-city-flooring": "/locations/salt-lake-city/flooring",
    "/salt-lake-city-demolition": "/locations/salt-lake-city/demolition",
    "/salt-lake-city-junk-removal": "/locations/salt-lake-city/junk-removal",
    "/west-valley-city-flooring": "/locations/west-valley-city/flooring",
    "/west-valley-city-demolition": "/locations/west-valley-city/demolition",
    "/west-valley-city-junk-removal": "/locations/west-valley-city/junk-removal",
    "/west-jordan-flooring": "/locations/west-jordan/flooring",
    "/west-jordan-demolition": "/locations/west-jordan/demolition",
    "/west-jordan-junk-removal": "/locations/west-jordan/junk-removal",
    "/sandy-flooring": "/locations/sandy/flooring",
    "/sandy-demolition": "/locations/sandy/demolition",
    "/sandy-junk-removal": "/locations/sandy/junk-removal",
    "/south-jordan-flooring": "/locations/south-jordan/flooring",
    "/south-jordan-demolition": "/locations/south-jordan/demolition",
    "/south-jordan-junk-removal": "/locations/south-jordan/junk-removal",
    "/orem-flooring": "/locations/orem/flooring",
    "/orem-demolition": "/locations/orem/demolition",
    "/orem-junk-removal": "/locations/orem/junk-removal",
    "/ogden-flooring": "/locations/ogden/flooring",
    "/ogden-demolition": "/locations/ogden/demolition",
    "/ogden-junk-removal": "/locations/ogden/junk-removal",
    "/layton-flooring": "/locations/layton/flooring",
    "/layton-demolition": "/locations/layton/demolition",
    "/layton-junk-removal": "/locations/layton/junk-removal",
    "/taylorsville-flooring": "/locations/taylorsville/flooring",
    "/taylorsville-demolition": "/locations/taylorsville/demolition",
    "/taylorsville-junk-removal": "/locations/taylorsville/junk-removal",
    "/bountiful-flooring": "/locations/bountiful/flooring",
    "/bountiful-demolition": "/locations/bountiful/demolition",
    "/bountiful-junk-removal": "/locations/bountiful/junk-removal",
    "/draper-flooring": "/locations/draper/flooring",
    "/draper-demolition": "/locations/draper/demolition",
    "/draper-junk-removal": "/locations/draper/junk-removal",
    "/riverton-flooring": "/locations/riverton/flooring",
    "/riverton-demolition": "/locations/riverton/demolition",
    "/riverton-junk-removal": "/locations/riverton/junk-removal",
    "/herriman-flooring": "/locations/herriman/flooring",
    "/herriman-demolition": "/locations/herriman/demolition",
    "/herriman-junk-removal": "/locations/herriman/junk-removal",
    "/midvale-flooring": "/locations/midvale/flooring",
    "/midvale-demolition": "/locations/midvale/demolition",
    "/midvale-junk-removal": "/locations/midvale/junk-removal",
    "/holladay-flooring": "/locations/holladay/flooring",
    "/holladay-demolition": "/locations/holladay/demolition",
    "/holladay-junk-removal": "/locations/holladay/junk-removal",
    "/south-salt-lake-flooring": "/locations/south-salt-lake/flooring",
    "/south-salt-lake-demolition": "/locations/south-salt-lake/demolition",
    "/south-salt-lake-junk-removal": "/locations/south-salt-lake/junk-removal",
    "/bluffdale-flooring": "/locations/bluffdale/flooring",
    "/bluffdale-demolition": "/locations/bluffdale/demolition",
    "/bluffdale-junk-removal": "/locations/bluffdale/junk-removal",
    "/roy-flooring": "/locations/roy/flooring",
    "/roy-demolition": "/locations/roy/demolition",
    "/roy-junk-removal": "/locations/roy/junk-removal",
    "/pleasant-grove-flooring": "/locations/pleasant-grove/flooring",
    "/pleasant-grove-demolition": "/locations/pleasant-grove/demolition",
    "/pleasant-grove-junk-removal": "/locations/pleasant-grove/junk-removal",
    "/cottonwood-heights-flooring": "/locations/cottonwood-heights/flooring",
    "/cottonwood-heights-demolition": "/locations/cottonwood-heights/demolition",
    "/cottonwood-heights-junk-removal": "/locations/cottonwood-heights/junk-removal",
  };

  // Check for redirects
  if (redirectMap[pathname]) {
    url.pathname = redirectMap[pathname];
    return NextResponse.redirect(url, { status: 301 });
  }

  // Admin authentication
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
          console.error("Auth decode error:", error);
        }
      }
    }

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
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};