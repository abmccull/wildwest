import { createClient } from '@supabase/supabase-js';
import { ParsedServiceData, ServiceDataCache } from './data-parser';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

/**
 * Loads service data from Supabase database
 * Falls back to CSV if database is unavailable
 */
export async function loadServiceDataFromSupabase(): Promise<ParsedServiceData[]> {
  try {
    const { data: pages, error } = await supabase
      .from('pages')
      .select('*')
      .order('city', { ascending: true });

    if (error) {
      console.error('Error loading data from Supabase:', error);
      return [];
    }

    if (!pages || pages.length === 0) {
      console.warn('No pages found in database');
      return [];
    }

    // Transform database records to ParsedServiceData format
    const services: ParsedServiceData[] = pages.map((page) => {
      // Extract the service part from the slug
      // slug format: "city-service-name"
      const citySlug = page.city.toLowerCase().replace(/\s+/g, '-');
      const serviceSlug = page.slug.replace(new RegExp(`^${citySlug}-`), '');

      // Build the URL slug in the expected format
      const urlSlug = `/${citySlug}-ut/${serviceSlug}/`;

      return {
        category: mapServiceToCategory(page.service),
        city: page.city,
        keyword: page.keyword,
        suggestedPageType: 'landing',
        urlSlug: urlSlug,
        seoTitle: page.meta_title,
        h1: page.h1,
        metaDescription: page.meta_description,
        internalLinkBlockHtml: page.content?.internalLinks || '',
        jsonLdService: page.content?.jsonLd || '',
        normalizedCity: citySlug,
        normalizedCategory: mapServiceToCategory(page.service).toLowerCase(),
        parsedJsonLd: page.content?.jsonLd ? JSON.parse(page.content.jsonLd) : null,
      };
    });

    console.log(`Loaded ${services.length} services from Supabase`);
    return services;
  } catch (error) {
    console.error('Failed to load data from Supabase:', error);
    return [];
  }
}

/**
 * Maps service enum values to category names
 */
function mapServiceToCategory(service: string): string {
  const serviceMap: Record<string, string> = {
    flooring: 'Flooring',
    demolition: 'Demolition',
    junk_removal: 'Junk Removal',
  };
  return serviceMap[service] || service;
}

/**
 * Creates a service data cache from database records
 */
export async function createSupabaseServiceCache(): Promise<ServiceDataCache | null> {
  const services = await loadServiceDataFromSupabase();

  if (services.length === 0) {
    return null;
  }

  // Group services by city
  const servicesByCity: { [city: string]: ParsedServiceData[] } = {};
  services.forEach((service) => {
    if (!servicesByCity[service.city]) {
      servicesByCity[service.city] = [];
    }
    servicesByCity[service.city].push(service);
  });

  // Group services by category
  const servicesByCategory: { [category: string]: ParsedServiceData[] } = {};
  services.forEach((service) => {
    if (!servicesByCategory[service.category]) {
      servicesByCategory[service.category] = [];
    }
    servicesByCategory[service.category].push(service);
  });

  // Group cities by service
  const citiesByService: { [keyword: string]: string[] } = {};
  services.forEach((service) => {
    if (!citiesByService[service.keyword]) {
      citiesByService[service.keyword] = [];
    }
    if (!citiesByService[service.keyword].includes(service.city)) {
      citiesByService[service.keyword].push(service.city);
    }
  });

  // Extract unique values
  const uniqueCities = Array.from(new Set(services.map((s) => s.city))).sort();
  const uniqueCategories = Array.from(new Set(services.map((s) => s.category))).sort();

  // Create slug mapping
  const servicesBySlug = new Map<string, ParsedServiceData>();
  services.forEach((service) => {
    servicesBySlug.set(service.urlSlug, service);
    // Also add without trailing slash
    servicesBySlug.set(service.urlSlug.replace(/\/$/, ''), service);
  });

  return {
    data: services,
    servicesByCity,
    servicesByCategory,
    citiesByService,
    uniqueCities,
    uniqueCategories,
    servicesBySlug,
    lastUpdated: new Date(),
  };
}
