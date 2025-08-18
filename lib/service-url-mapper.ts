import { getServiceData, ParsedServiceData } from './data-parser';

// Common service name variations mapping
const SERVICE_VARIATIONS: Record<string, string[]> = {
  'junk-removal-service': ['junk-removal', 'junk-removal-services', 'junk-hauling-service'],
  'junk-removal': ['junk-removal-service', 'junk-removal-services', 'junk-hauling'],
  'hardwood-floor-installation': ['hardwood-flooring', 'hardwood-floors', 'hardwood-installation'],
  'vinyl-plank-installation': ['vinyl-plank', 'vinyl-plank-flooring', 'vinyl-flooring'],
  'laminate-installation': ['laminate-flooring', 'laminate-floors', 'laminate'],
  'interior-demolition': ['demolition', 'demo', 'interior-demo'],
  'construction-debris-removal': ['construction-cleanup', 'construction-debris', 'debris-removal'],
  'bathroom-remodeling': ['bathroom-remodel', 'bathroom-renovation'],
  'kitchen-remodeling': ['kitchen-remodel', 'kitchen-renovation'],
  'flooring-installation': ['flooring', 'floor-installation'],
};

/**
 * Finds a service by trying various URL patterns
 */
export function findServiceByUrl(citySlug: string, serviceSlug: string): ParsedServiceData | null {
  const cache = getServiceData();

  // Build the full URL to try
  const fullUrl = `/${citySlug}/${serviceSlug}/`;

  // Try exact match first
  let service = cache.servicesBySlug.get(fullUrl);
  if (service) return service;

  // Try without trailing slash
  service = cache.servicesBySlug.get(`/${citySlug}/${serviceSlug}`);
  if (service) return service;

  // Try to find variations of the service name
  for (const [canonical, variations] of Object.entries(SERVICE_VARIATIONS)) {
    if (serviceSlug === canonical || variations.includes(serviceSlug)) {
      // Try the canonical version
      service = cache.servicesBySlug.get(`/${citySlug}/${canonical}/`);
      if (service) return service;
    }

    // If the current slug is a canonical name, try its variations
    if (canonical === serviceSlug) {
      for (const variation of variations) {
        service = cache.servicesBySlug.get(`/${citySlug}/${variation}/`);
        if (service) return service;
      }
    }
  }

  return null;
}

/**
 * Finds the closest matching service URL for a given city and service
 */
export function findClosestServiceMatch(
  citySlug: string,
  serviceSlug: string
): {
  service: ParsedServiceData | null;
  suggestions: ParsedServiceData[];
} {
  const cache = getServiceData();

  // First try to find exact match
  const exactMatch = findServiceByUrl(citySlug, serviceSlug);
  if (exactMatch) {
    return { service: exactMatch, suggestions: [] };
  }

  // Find all services for this city
  const cityServices = cache.data.filter((s) => {
    const urlParts = s.urlSlug.split('/').filter((p) => p);
    return urlParts[0] === citySlug;
  });

  // Find services with similar names
  const normalizedSearch = serviceSlug.toLowerCase().replace(/-/g, ' ');
  const suggestions = cityServices
    .filter((s) => {
      const serviceKeywords = s.keyword.toLowerCase();
      const urlService = s.urlSlug.split('/')[2]?.replace(/-/g, ' ') || '';

      return (
        serviceKeywords.includes(normalizedSearch) ||
        urlService.includes(normalizedSearch) ||
        normalizedSearch.includes(urlService)
      );
    })
    .slice(0, 5);

  return { service: null, suggestions };
}

/**
 * Gets all valid service slugs for a city
 */
export function getValidServiceSlugsForCity(citySlug: string): string[] {
  const cache = getServiceData();

  return cache.data
    .filter((s) => s.urlSlug.startsWith(`/${citySlug}/`))
    .map((s) => {
      const parts = s.urlSlug.split('/').filter((p) => p);
      return parts[1] || '';
    })
    .filter((slug) => slug)
    .sort();
}
