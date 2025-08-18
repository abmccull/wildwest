/**
 * Service Slug Mapper
 *
 * Maps existing CSV service slugs to the enhanced content system slugs
 * Provides fallback content generation for services not in the enhanced system
 */

// Map CSV slugs to enhanced content slugs
export const serviceSlugMapping: { [csvSlug: string]: string } = {
  // Roofing services
  roofing: 'roofing-residential',
  'roof-installation': 'roofing-residential',
  'roof-repair': 'roofing-residential',
  'roof-replacement': 'roofing-residential',

  // Kitchen services
  'kitchen-remodel': 'kitchen-remodeling',
  'kitchen-renovation': 'kitchen-remodeling',
  'kitchen-remodeling': 'kitchen-remodeling',

  // Bathroom services
  'bathroom-remodel': 'bathroom-remodeling',
  'bathroom-renovation': 'bathroom-remodeling',
  'bathroom-remodeling': 'bathroom-remodeling',

  // Home additions
  'home-addition': 'home-additions',
  'room-addition': 'home-additions',
  'second-story': 'home-additions',

  // Deck services
  'deck-construction': 'deck-building',
  'deck-installation': 'deck-building',
  'deck-building': 'deck-building',

  // Siding services
  siding: 'siding-installation',
  'siding-replacement': 'siding-installation',
  'vinyl-siding': 'siding-installation',

  // Window services
  windows: 'window-replacement',
  'window-installation': 'window-replacement',

  // Flooring services - map to general flooring
  'hardwood-installation': 'flooring-installation',
  'laminate-installation': 'flooring-installation',
  'vinyl-plank-installation': 'flooring-installation',
  'tile-installation': 'flooring-installation',
  'carpet-installation': 'flooring-installation',
  'floor-refinishing': 'flooring-installation',

  // Plumbing services
  plumbing: 'plumbing-services',
  plumber: 'plumbing-services',
  'pipe-repair': 'plumbing-services',
  'water-heater': 'plumbing-services',

  // Electrical services
  electrical: 'electrical-services',
  electrician: 'electrical-services',
  'electrical-repair': 'electrical-services',
  'panel-upgrade': 'electrical-services',

  // HVAC services
  hvac: 'hvac-services',
  heating: 'hvac-services',
  cooling: 'hvac-services',
  'air-conditioning': 'hvac-services',
  furnace: 'hvac-services',
};

// Reverse mapping for lookups
export const reverseSlugMapping: { [enhancedSlug: string]: string[] } = {};
Object.entries(serviceSlugMapping).forEach(([csvSlug, enhancedSlug]) => {
  if (!reverseSlugMapping[enhancedSlug]) {
    reverseSlugMapping[enhancedSlug] = [];
  }
  reverseSlugMapping[enhancedSlug].push(csvSlug);
});

/**
 * Get enhanced content slug from CSV slug
 */
export function getEnhancedSlugFromCSV(csvSlug: string): string | null {
  return serviceSlugMapping[csvSlug] || null;
}

/**
 * Check if a service has enhanced content
 */
export function hasEnhancedContent(slug: string): boolean {
  return (
    Object.values(serviceSlugMapping).includes(slug) ||
    Object.keys(serviceSlugMapping).includes(slug)
  );
}

/**
 * Get all CSV slugs that map to an enhanced content slug
 */
export function getCSVSlugsForEnhanced(enhancedSlug: string): string[] {
  return reverseSlugMapping[enhancedSlug] || [];
}

/**
 * Normalize service slug for better matching
 */
export function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Find best matching enhanced content slug
 */
export function findBestMatch(inputSlug: string): string | null {
  const normalized = normalizeSlug(inputSlug);

  // Direct match
  if (serviceSlugMapping[normalized]) {
    return serviceSlugMapping[normalized];
  }

  // Check if the slug itself is an enhanced slug
  if (Object.values(serviceSlugMapping).includes(normalized)) {
    return normalized;
  }

  // Fuzzy matching - look for partial matches
  const fuzzyMatches = Object.keys(serviceSlugMapping).filter(
    (key) => key.includes(normalized) || normalized.includes(key)
  );

  if (fuzzyMatches.length > 0) {
    return serviceSlugMapping[fuzzyMatches[0]];
  }

  // Check enhanced slugs for partial matches
  const enhancedMatches = Object.values(serviceSlugMapping).filter(
    (slug) => slug.includes(normalized) || normalized.includes(slug)
  );

  if (enhancedMatches.length > 0) {
    return enhancedMatches[0];
  }

  return null;
}

/**
 * Generate category mapping based on service types
 */
export const categoryMapping: { [category: string]: string[] } = {
  Flooring: [
    'flooring-installation',
    'hardwood-installation',
    'laminate-installation',
    'vinyl-plank-installation',
    'tile-installation',
  ],
  Remodeling: ['kitchen-remodeling', 'bathroom-remodeling', 'home-additions'],
  Exterior: ['roofing-residential', 'siding-installation', 'window-replacement', 'deck-building'],
  Systems: ['plumbing-services', 'electrical-services', 'hvac-services'],
};

/**
 * Get category for a service slug
 */
export function getServiceCategory(slug: string): string | null {
  for (const [category, services] of Object.entries(categoryMapping)) {
    if (services.includes(slug)) {
      return category;
    }
  }
  return null;
}

const serviceSlugMapperUtils = {
  getEnhancedSlugFromCSV,
  hasEnhancedContent,
  getCSVSlugsForEnhanced,
  normalizeSlug,
  findBestMatch,
  getServiceCategory,
  serviceSlugMapping,
  reverseSlugMapping,
  categoryMapping,
};

export default serviceSlugMapperUtils;
