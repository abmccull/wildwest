import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const service = searchParams.get('service');

  if (!city || !service) {
    return NextResponse.json({ exists: false });
  }

  try {
    // Check if a page exists with this city and service combination
    // We'll check for various possible slugs
    const possibleSlugs = [
      `${city}-${service}`, // e.g., midvale-commercial-junk-removal
      `${city.replace('-ut', '')}-${service}`, // without -ut suffix
    ];

    const { data, error } = await supabase
      .from('pages')
      .select('slug, keyword')
      .in('slug', possibleSlugs)
      .limit(1);

    if (error) {
      console.error('Database query error:', error);
      return NextResponse.json({ exists: false });
    }

    if (data && data.length > 0) {
      return NextResponse.json({
        exists: true,
        slug: data[0].slug,
        keyword: data[0].keyword,
      });
    }

    // If no exact match, try to find any service for this city
    // This helps us determine if we should redirect to city page
    const cityName = city
      .replace('-ut', '')
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const { data: cityData } = await supabase
      .from('pages')
      .select('slug')
      .eq('city', cityName)
      .limit(1);

    if (cityData && cityData.length > 0) {
      // City exists but not this specific service
      return NextResponse.json({
        exists: false,
        cityExists: true,
      });
    }

    return NextResponse.json({ exists: false });
  } catch (error) {
    console.error('Error checking service:', error);
    return NextResponse.json({ exists: false });
  }
}
