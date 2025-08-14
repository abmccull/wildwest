import { NextResponse } from "next/server";

// Redirect old pages-1.xml to new sitemap index
export async function GET() {
  return NextResponse.redirect(new URL('/sitemap-index.xml', 'https://wildwestslc.com'), 301);
}


