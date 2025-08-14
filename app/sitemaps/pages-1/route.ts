import { NextResponse } from "next/server";

// This sitemap has been deprecated and replaced by the new structured sitemap system.
// Redirect to the main sitemap index.
export async function GET() {
  return NextResponse.redirect(new URL('/sitemap-index.xml', 'https://wildwestslc.com'), 301);
}


