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

export interface CityData {
  name: string;
  slug: string;
  county: string;
  state: string;
  zipCodes: string[];
  population: number;
  latitude: number;
  longitude: number;
  description: string;
  nearbyAreas: string[];
}

export interface ServiceData {
  category: string;
  service: string;
  slug: string;
  description: string;
  averagePrice: number;
  duration: string;
  difficulty: string;
  popularity: number;
  seasonality: string;
  equipment: string;
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

export interface CityDataCache {
  cities: CityData[];
  citiesBySlug: Map<string, CityData>;
  lastUpdated: Date;
}

export interface ServiceCatalogCache {
  services: ServiceData[];
  servicesByCategory: { [category: string]: ServiceData[] };
  servicesBySlug: Map<string, ServiceData>;
  lastUpdated: Date;
}

// In-memory caches
let serviceDataCache: ServiceDataCache | null = null;
let cityDataCache: CityDataCache | null = null;
let serviceCatalogCache: ServiceCatalogCache | null = null;

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
 * Validates required fields in a city record
 */
function validateCityData(record: any): boolean {
  const requiredFields = ['name', 'slug', 'county', 'state'];

  for (const field of requiredFields) {
    if (!record[field] || typeof record[field] !== 'string' || record[field].trim() === '') {
      console.warn(`Invalid or missing field "${field}" in city record:`, record);
      return false;
    }
  }

  return true;
}

/**
 * Validates required fields in a service catalog record
 */
function validateServiceCatalogData(record: any): boolean {
  const requiredFields = ['category', 'service', 'slug', 'description'];

  for (const field of requiredFields) {
    if (!record[field] || typeof record[field] !== 'string' || record[field].trim() === '') {
      console.warn(`Invalid or missing field "${field}" in service catalog record:`, record);
      return false;
    }
  }

  return true;
}

/**
 * Transforms raw CSV record to ParsedServiceData
 */
function transformServiceRecord(record: any): ParsedServiceData {
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
 * Transforms raw CSV record to CityData
 */
function transformCityRecord(record: any): CityData {
  return {
    name: record.name?.trim() || '',
    slug: record.slug?.trim() || '',
    county: record.county?.trim() || '',
    state: record.state?.trim() || '',
    zipCodes: record.zipCodes ? record.zipCodes.split(',').map((zip: string) => zip.trim()) : [],
    population: parseInt(record.population) || 0,
    latitude: parseFloat(record.latitude) || 0,
    longitude: parseFloat(record.longitude) || 0,
    description: record.description?.trim() || '',
    nearbyAreas: record.nearbyAreas
      ? record.nearbyAreas.split(',').map((area: string) => area.trim())
      : [],
  };
}

/**
 * Transforms raw CSV record to ServiceData
 */
function transformServiceCatalogRecord(record: any): ServiceData {
  return {
    category: record.category?.trim() || '',
    service: record.service?.trim() || '',
    slug: record.slug?.trim() || '',
    description: record.description?.trim() || '',
    averagePrice: parseInt(record.averagePrice) || 0,
    duration: record.duration?.trim() || '',
    difficulty: record.difficulty?.trim() || '',
    popularity: parseInt(record.popularity) || 0,
    seasonality: record.seasonality?.trim() || '',
    equipment: record.equipment?.trim() || '',
  };
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
 * Creates a slug-to-city mapping
 */
function createCitiesBySlug(cities: CityData[]): Map<string, CityData> {
  const slugMap = new Map<string, CityData>();

  cities.forEach((city) => {
    if (city.slug) {
      slugMap.set(city.slug, city);
    }
  });

  return slugMap;
}

/**
 * Creates a slug-to-service catalog mapping
 */
function createServiceCatalogBySlug(services: ServiceData[]): Map<string, ServiceData> {
  const slugMap = new Map<string, ServiceData>();

  services.forEach((service) => {
    if (service.slug) {
      slugMap.set(service.slug, service);
    }
  });

  return slugMap;
}

/**
 * Groups service catalog by category
 */
function groupServiceCatalogByCategory(services: ServiceData[]): {
  [category: string]: ServiceData[];
} {
  return services.reduce(
    (acc, service) => {
      const category = service.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(service);
      return acc;
    },
    {} as { [category: string]: ServiceData[] }
  );
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
    const transformedRecords = validRecords.map(transformServiceRecord);

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
 * Loads and parses the cities CSV file
 */
function loadCityData(): CityData[] {
  try {
    const csvPath = join(process.cwd(), 'data/cities.csv');
    const csvContent = readFileSync(csvPath, 'utf8');

    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_quotes: true,
      quote: '"',
      escape: '"',
    });

    const validRecords = records.filter(validateCityData);
    const transformedRecords = validRecords.map(transformCityRecord);

    console.log(
      `Loaded ${transformedRecords.length} valid city records from ${records.length} total records`
    );

    return transformedRecords;
  } catch (error) {
    console.error('Error loading city data:', error);
    throw new Error(`Failed to load city data: ${error}`);
  }
}

/**
 * Loads and parses the services catalog CSV file
 */
function loadServiceCatalogData(): ServiceData[] {
  try {
    const csvPath = join(process.cwd(), 'data/services.csv');
    const csvContent = readFileSync(csvPath, 'utf8');

    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_quotes: true,
      quote: '"',
      escape: '"',
    });

    const validRecords = records.filter(validateServiceCatalogData);
    const transformedRecords = validRecords.map(transformServiceCatalogRecord);

    console.log(
      `Loaded ${transformedRecords.length} valid service catalog records from ${records.length} total records`
    );

    return transformedRecords;
  } catch (error) {
    console.error('Error loading service catalog data:', error);
    throw new Error(`Failed to load service catalog data: ${error}`);
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
 * Initializes or refreshes the city data cache
 */
export function initializeCityData(): CityDataCache {
  console.log('Loading city data from CSV...');

  const cities = loadCityData();
  const citiesBySlug = createCitiesBySlug(cities);

  const cache: CityDataCache = {
    cities,
    citiesBySlug,
    lastUpdated: new Date(),
  };

  cityDataCache = cache;

  console.log(`City data cache initialized with ${cities.length} cities`);

  return cache;
}

/**
 * Initializes or refreshes the service catalog cache
 */
export function initializeServiceCatalogData(): ServiceCatalogCache {
  console.log('Loading service catalog data from CSV...');

  const services = loadServiceCatalogData();
  const servicesByCategory = groupServiceCatalogByCategory(services);
  const servicesBySlug = createServiceCatalogBySlug(services);

  const cache: ServiceCatalogCache = {
    services,
    servicesByCategory,
    servicesBySlug,
    lastUpdated: new Date(),
  };

  serviceCatalogCache = cache;

  console.log(`Service catalog cache initialized with ${services.length} services`);

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
 * Gets the cached city data, initializing if necessary
 */
export function getCityData(): CityDataCache {
  if (!cityDataCache) {
    return initializeCityData();
  }
  return cityDataCache;
}

/**
 * Gets the cached service catalog data, initializing if necessary
 */
export function getServiceCatalogData(): ServiceCatalogCache {
  if (!serviceCatalogCache) {
    return initializeServiceCatalogData();
  }
  return serviceCatalogCache;
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
 * Gets all unique cities from service data
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

  // Normalize the slug for lookup
  let normalizedSlug = slug;

  // Ensure it starts with /
  if (!normalizedSlug.startsWith('/')) {
    normalizedSlug = '/' + normalizedSlug;
  }

  // Ensure it ends with /
  if (!normalizedSlug.endsWith('/')) {
    normalizedSlug = normalizedSlug + '/';
  }

  // Try exact match first
  let service = cache.servicesBySlug.get(normalizedSlug);

  // If not found, try without leading slash
  if (!service) {
    service = cache.servicesBySlug.get(normalizedSlug.substring(1));
  }

  // If still not found, try the original slug
  if (!service) {
    service = cache.servicesBySlug.get(slug);
  }

  // If still not found, try variations
  if (!service) {
    // Try without trailing slash
    const withoutTrailing = normalizedSlug.endsWith('/')
      ? normalizedSlug.slice(0, -1)
      : normalizedSlug;
    service = cache.servicesBySlug.get(withoutTrailing);
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
 * Gets city data by slug
 */
export function getCityBySlug(slug: string): CityData | null {
  const cache = getCityData();
  return cache.citiesBySlug.get(slug) || null;
}

/**
 * Gets all cities
 */
export function getAllCities(): CityData[] {
  const cache = getCityData();
  return [...cache.cities];
}

/**
 * Gets service catalog data by slug
 */
export function getServiceCatalogBySlug(slug: string): ServiceData | null {
  const cache = getServiceCatalogData();
  return cache.servicesBySlug.get(slug) || null;
}

/**
 * Gets all services in a category from catalog
 */
export function getServiceCatalogByCategory(category: string): ServiceData[] {
  const cache = getServiceCatalogData();
  return cache.servicesByCategory[category] || [];
}

/**
 * Gets all service catalog data
 */
export function getAllServiceCatalog(): ServiceData[] {
  const cache = getServiceCatalogData();
  return [...cache.services];
}

/**
 * Gets all service categories from catalog
 */
export function getServiceCategories(): string[] {
  const cache = getServiceCatalogData();
  return Object.keys(cache.servicesByCategory).sort();
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
 * Refreshes all caches (useful for development or if CSV files change)
 */
export function refreshAllData(): {
  serviceCache: ServiceDataCache;
  cityCache: CityDataCache;
  serviceCatalogCache: ServiceCatalogCache;
} {
  serviceDataCache = null;
  cityDataCache = null;
  serviceCatalogCache = null;

  return {
    serviceCache: initializeServiceData(),
    cityCache: initializeCityData(),
    serviceCatalogCache: initializeServiceCatalogData(),
  };
}
