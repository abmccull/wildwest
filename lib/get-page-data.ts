import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for server-side use
function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SECRET_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export interface PageData {
  id: string;
  slug: string;
  city: string;
  service: 'flooring' | 'demolition' | 'junk_removal';
  keyword: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  content: any;
  published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

/**
 * Fetches page data from Supabase by city and service slug
 */
export async function getPageBySlug(
  citySlug: string,
  serviceSlug: string
): Promise<PageData | null> {
  const supabase = getSupabaseClient();

  // Remove -ut suffix from city slug
  const cityName = citySlug
    .replace('-ut', '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Build the expected slug format: city-service
  const expectedSlug = `${citySlug.replace('-ut', '')}-${serviceSlug}`;

  try {
    // First try exact slug match
    let { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', expectedSlug)
      .eq('published', true)
      .single();

    if (!error && data) {
      return data as PageData;
    }

    // If not found, try by city and keyword match
    const { data: pagesByCity, error: cityError } = await supabase
      .from('pages')
      .select('*')
      .eq('city', cityName)
      .eq('published', true);

    if (!cityError && pagesByCity && pagesByCity.length > 0) {
      // Try to find a match by service slug
      const match = pagesByCity.find((page) => {
        const pageServiceSlug = page.slug.replace(
          new RegExp(`^${citySlug.replace('-ut', '')}-`),
          ''
        );
        return pageServiceSlug === serviceSlug;
      });

      if (match) {
        return match as PageData;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching page data:', error);
    return null;
  }
}

/**
 * Fetches all pages for a city
 */
export async function getPagesByCity(citySlug: string): Promise<PageData[]> {
  const supabase = getSupabaseClient();

  const cityName = citySlug
    .replace('-ut', '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  try {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('city', cityName)
      .eq('published', true)
      .order('keyword', { ascending: true });

    if (error) {
      console.error('Error fetching pages by city:', error);
      return [];
    }

    return (data || []) as PageData[];
  } catch (error) {
    console.error('Error fetching pages by city:', error);
    return [];
  }
}

/**
 * Get related pages in the same category
 */
export async function getRelatedPages(
  city: string,
  service: string,
  limit: number = 5
): Promise<PageData[]> {
  const supabase = getSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('city', city)
      .eq('service', service)
      .eq('published', true)
      .limit(limit);

    if (error) {
      console.error('Error fetching related pages:', error);
      return [];
    }

    return (data || []) as PageData[];
  } catch (error) {
    console.error('Error fetching related pages:', error);
    return [];
  }
}

/**
 * Transform PageData to match the existing ParsedServiceData format
 */
export function transformPageToServiceData(page: PageData) {
  const citySlug = page.city.toLowerCase().replace(/\s+/g, '-');
  const serviceSlug = page.slug.replace(new RegExp(`^${citySlug}-`), '');

  return {
    category: mapServiceToCategory(page.service),
    city: page.city,
    keyword: page.keyword,
    suggestedPageType: 'landing',
    urlSlug: `/${citySlug}-ut/${serviceSlug}/`,
    seoTitle: page.meta_title,
    h1: page.h1,
    metaDescription: page.meta_description,
    internalLinkBlockHtml: page.content?.internalLinks || '',
    jsonLdService: page.content?.jsonLd || '',
    normalizedCity: citySlug,
    normalizedCategory: mapServiceToCategory(page.service).toLowerCase(),
    parsedJsonLd: page.content?.jsonLd ? JSON.parse(page.content.jsonLd) : null,
  };
}

function mapServiceToCategory(service: string): string {
  const serviceMap: Record<string, string> = {
    flooring: 'Flooring',
    demolition: 'Demolition',
    junk_removal: 'Junk Removal',
  };
  return serviceMap[service] || service;
}
