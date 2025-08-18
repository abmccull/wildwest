import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { join } from 'path';

// TypeScript interfaces for the parsed data
export interface ServicePageData {
  category: string;
  city: string;
  keyword: string;
  suggestedPageType: string;
  urlSlug: string;
  seoTitle: string;
  h1: string;
  metaDescription: string;
  internalLinkBlockHtml: string;
  jsonLdService: string;
}

export interface ParsedServiceData extends ServicePageData {
  // Additional computed fields
  parsedJsonLd?: any;
  normalizedCity: string;
  normalizedCategory: string;
}

export interface ServicesByCity {
  [city: string]: ParsedServiceData[];
}

export interface ServicesByCategory {
  [category: string]: ParsedServiceData[];
}

export interface CitiesByService {
  [keyword: string]: string[];
}

export interface ServiceDataCache {
  data: ParsedServiceData[];
  servicesByCity: ServicesByCity;
  servicesByCategory: ServicesByCategory;
  citiesByService: CitiesByService;
  uniqueCities: string[];
  uniqueCategories: string[];
  servicesBySlug: Map<string, ParsedServiceData>;
  lastUpdated: Date;
}

// In-memory cache
let serviceDataCache: ServiceDataCache | null = null;

/**
 * Normalizes city names for consistent grouping
 */
function normalizeCity(city: string): string {
  return city
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');
}

/**
 * Normalizes category names for consistent grouping
 */
function normalizeCategory(category: string): string {
  return category
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');
}

/**
 * Safely parses JSON-LD content
 */
function parseJsonLd(jsonLdString: string): any | null {
  try {
    return JSON.parse(jsonLdString);
  } catch (error) {
    console.warn('Failed to parse JSON-LD:', error);
    return null;
  }
}

/**
 * Validates required fields in a service record
 */
function validateServiceData(record: any): boolean {
  const requiredFields = ['Category', 'City', 'Keyword', 'URL Slug', 'SEO Title'];

  for (const field of requiredFields) {
    if (!record[field] || typeof record[field] !== 'string' || record[field].trim() === '') {
      console.warn(`Invalid or missing field "${field}" in record:`, record);
      return false;
    }
  }

  return true;
}

/**
 * Transforms raw CSV record to ParsedServiceData
 */
function transformRecord(record: any): ParsedServiceData {
  const data: ParsedServiceData = {
    category: record['Category']?.trim() || '',
    city: record['City']?.trim() || '',
    keyword: record['Keyword']?.trim() || '',
    suggestedPageType: record['Suggested Page Type']?.trim() || '',
    urlSlug: record['URL Slug']?.trim() || '',
    seoTitle: record['SEO Title']?.trim() || '',
    h1: record['H1']?.trim() || '',
    metaDescription: record['Meta Description']?.trim() || '',
    internalLinkBlockHtml: record['Internal Link Block HTML']?.trim() || '',
    jsonLdService: record['JSON-LD Service']?.trim() || '',
    normalizedCity: normalizeCity(record['City'] || ''),
    normalizedCategory: normalizeCategory(record['Category'] || ''),
  };

  // Parse JSON-LD if present
  if (data.jsonLdService) {
    data.parsedJsonLd = parseJsonLd(data.jsonLdService);
  }

  return data;
}

/**
 * Groups services by city
 */
function groupServicesByCity(services: ParsedServiceData[]): ServicesByCity {
  return services.reduce((acc, service) => {
    const city = service.city;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(service);
    return acc;
  }, {} as ServicesByCity);
}

/**
 * Groups services by category
 */
function groupServicesByCategory(services: ParsedServiceData[]): ServicesByCategory {
  return services.reduce((acc, service) => {
    const category = service.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as ServicesByCategory);
}

/**
 * Groups cities by service/keyword
 */
function groupCitiesByService(services: ParsedServiceData[]): CitiesByService {
  return services.reduce((acc, service) => {
    const keyword = service.keyword;
    if (!acc[keyword]) {
      acc[keyword] = [];
    }
    if (!acc[keyword].includes(service.city)) {
      acc[keyword].push(service.city);
    }
    return acc;
  }, {} as CitiesByService);
}

/**
 * Creates a slug-to-service mapping
 */
function createServicesBySlug(services: ParsedServiceData[]): Map<string, ParsedServiceData> {
  const slugMap = new Map<string, ParsedServiceData>();

  services.forEach((service) => {
    if (service.urlSlug) {
      // Remove leading slash for consistent lookup
      const cleanSlug = service.urlSlug.startsWith('/')
        ? service.urlSlug.substring(1)
        : service.urlSlug;
      slugMap.set(cleanSlug, service);
    }
  });

  return slugMap;
}

/**
 * Loads and parses the CSV file
 */
function loadCsvData(): ParsedServiceData[] {
  try {
    const csvPath = join(process.cwd(), 'wildwest_master_seo_matrix.csv');
    const csvContent = readFileSync(csvPath, 'utf8');

    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_quotes: true,
      quote: '"',
      escape: '"',
    });

    const validRecords = records.filter(validateServiceData);
    const transformedRecords = validRecords.map(transformRecord);

    console.log(
      `Loaded ${transformedRecords.length} valid service records from ${records.length} total records`
    );

    return transformedRecords;
  } catch (error) {
    console.warn('CSV file not found or unable to load. Using fallback data.', error);
    // Return empty array to allow build to continue
    // In production, data will come from other sources or APIs
    return [];
  }
}

/**
 * Initializes or refreshes the service data cache
 */
export function initializeServiceData(): ServiceDataCache {
  console.log('Loading service data from CSV...');

  const services = loadCsvData();

  // Group data for efficient access
  const servicesByCity = groupServicesByCity(services);
  const servicesByCategory = groupServicesByCategory(services);
  const citiesByService = groupCitiesByService(services);

  // Extract unique values
  const uniqueCities = Array.from(new Set(services.map((s) => s.city))).sort();
  const uniqueCategories = Array.from(new Set(services.map((s) => s.category))).sort();

  // Create slug mapping
  const servicesBySlug = createServicesBySlug(services);

  const cache: ServiceDataCache = {
    data: services,
    servicesByCity,
    servicesByCategory,
    citiesByService,
    uniqueCities,
    uniqueCategories,
    servicesBySlug,
    lastUpdated: new Date(),
  };

  serviceDataCache = cache;

  console.log(
    `Service data cache initialized with ${services.length} services across ${uniqueCities.length} cities and ${uniqueCategories.length} categories`
  );

  return cache;
}

/**
 * Gets the cached service data, initializing if necessary
 */
export function getServiceData(): ServiceDataCache {
  if (!serviceDataCache) {
    return initializeServiceData();
  }
  return serviceDataCache;
}

/**
 * Gets all services for a specific city
 */
export function getServicesForCity(city: string): ParsedServiceData[] {
  const cache = getServiceData();
  return cache.servicesByCity[city] || [];
}

/**
 * Gets all cities that offer a specific service/keyword
 */
export function getCitiesForService(keyword: string): string[] {
  const cache = getServiceData();
  return cache.citiesByService[keyword] || [];
}

/**
 * Gets all unique cities
 */
export function getUniqueCities(): string[] {
  const cache = getServiceData();
  return [...cache.uniqueCities];
}

/**
 * Gets all unique categories
 */
export function getUniqueCategories(): string[] {
  const cache = getServiceData();
  return [...cache.uniqueCategories];
}

/**
 * Gets service page data by URL slug
 */
export function getServiceBySlug(slug: string): ParsedServiceData | null {
  const cache = getServiceData();

  // Try exact match first
  let service = cache.servicesBySlug.get(slug);

  // Try with leading slash removed
  if (!service && slug.startsWith('/')) {
    service = cache.servicesBySlug.get(slug.substring(1));
  }

  // Try with leading slash added
  if (!service && !slug.startsWith('/')) {
    service = cache.servicesBySlug.get('/' + slug);
  }

  return service || null;
}

/**
 * Gets all services in a specific category
 */
export function getServicesByCategory(category: string): ParsedServiceData[] {
  const cache = getServiceData();
  return cache.servicesByCategory[category] || [];
}

/**
 * Searches services by keyword (case-insensitive partial match)
 */
export function searchServices(query: string): ParsedServiceData[] {
  const cache = getServiceData();
  const lowerQuery = query.toLowerCase();

  return cache.data.filter(
    (service) =>
      service.keyword.toLowerCase().includes(lowerQuery) ||
      service.seoTitle.toLowerCase().includes(lowerQuery) ||
      service.city.toLowerCase().includes(lowerQuery) ||
      service.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Gets services filtered by city and category
 */
export function getServicesByCityAndCategory(
  city?: string,
  category?: string
): ParsedServiceData[] {
  const cache = getServiceData();
  let results = cache.data;

  if (city) {
    results = results.filter((service) => service.city === city);
  }

  if (category) {
    results = results.filter((service) => service.category === category);
  }

  return results;
}

/**
 * Gets statistics about the service data
 */
export function getServiceDataStats() {
  const cache = getServiceData();

  return {
    totalServices: cache.data.length,
    totalCities: cache.uniqueCities.length,
    totalCategories: cache.uniqueCategories.length,
    servicesPerCity: Object.entries(cache.servicesByCity)
      .map(([city, services]) => ({
        city,
        count: services.length,
      }))
      .sort((a, b) => b.count - a.count),
    servicesPerCategory: Object.entries(cache.servicesByCategory)
      .map(([category, services]) => ({
        category,
        count: services.length,
      }))
      .sort((a, b) => b.count - a.count),
    lastUpdated: cache.lastUpdated,
  };
}

/**
 * Validates data integrity and reports issues
 */
export function validateDataIntegrity(): {
  isValid: boolean;
  issues: string[];
  stats: any;
} {
  const cache = getServiceData();
  const issues: string[] = [];

  // Check for missing required fields
  const requiredFields: (keyof ParsedServiceData)[] = [
    'category',
    'city',
    'keyword',
    'urlSlug',
    'seoTitle',
  ];

  cache.data.forEach((service, index) => {
    requiredFields.forEach((field) => {
      if (!service[field] || service[field].toString().trim() === '') {
        issues.push(`Record ${index + 1}: Missing or empty ${field}`);
      }
    });

    // Check URL slug format
    if (service.urlSlug && !service.urlSlug.startsWith('/')) {
      issues.push(`Record ${index + 1}: URL slug should start with '/': ${service.urlSlug}`);
    }

    // Check JSON-LD validity
    if (service.jsonLdService && !service.parsedJsonLd) {
      issues.push(`Record ${index + 1}: Invalid JSON-LD for ${service.city} - ${service.keyword}`);
    }
  });

  // Check for duplicate slugs
  const slugCounts = new Map<string, number>();
  cache.data.forEach((service) => {
    if (service.urlSlug) {
      const count = slugCounts.get(service.urlSlug) || 0;
      slugCounts.set(service.urlSlug, count + 1);
    }
  });

  slugCounts.forEach((count, slug) => {
    if (count > 1) {
      issues.push(`Duplicate URL slug found: ${slug} (${count} occurrences)`);
    }
  });

  const stats = getServiceDataStats();

  return {
    isValid: issues.length === 0,
    issues,
    stats,
  };
}

/**
 * Refreshes the cache (useful for development or if CSV file changes)
 */
export function refreshServiceData(): ServiceDataCache {
  serviceDataCache = null;
  return initializeServiceData();
}
