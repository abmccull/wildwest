// This file handles legacy URL redirects from old Google-indexed URLs
// to the new URL structure that matches our database

// Map of old URL patterns to new service slugs
// These are based on the actual data in our database
export const LEGACY_SERVICE_MAPPINGS: Record<string, string> = {
  // Junk Removal Services
  'commercial-junk-removal': 'commercial-junk-removal',
  'hazardous-waste-removal': 'hazardous-waste-removal',
  'junk-hauling-quote': 'junk-hauling-quote',
  'appliance-removal-services': 'appliance-removal-services',
  'junk-removal-services': 'junk-removal-services',
  'foreclosure-cleanout-services': 'foreclosure-cleanout-services',
  'residential-junk-removal': 'junk-removal', // redirect to generic junk removal
  'mattress-disposal': 'mattress-disposal',
  'basement-cleanout': 'basement-cleanout',
  'estate-cleanout-services': 'estate-cleanout-services',
  'yard-waste-removal': 'yard-waste-removal',
  'urgent-debris-removal': 'urgent-debris-removal',
  'emergency-junk-removal': 'emergency-junk-removal',
  'same-day-junk-removal': 'same-day-junk-removal',
  '24-hour-junk-removal': '24-hour-junk-removal',
  'next-day-junk-pickup': 'next-day-junk-pickup',
  'construction-debris-removal': 'construction-debris-removal',
  'office-cleanout-services': 'office-cleanout-services',
  'furniture-removal': 'furniture-removal',
  'cheap-junk-hauling': 'cheap-junk-hauling',
  'junk-removal-cost': 'junk-removal-cost',
  'free-junk-removal-estimate': 'free-junk-removal-estimate',
  'affordable-junk-removal': 'affordable-junk-removal',
  'electronic-waste-disposal': 'electronic-waste-disposal',
  'construction-waste-removal': 'construction-waste-removal',

  // Flooring Services
  'laminate-floor-installation-services': 'laminate-floor-installation-services',
  'shaw-lvp-installation': 'shaw-lvp-installation',
  'luxury-vinyl-plank-installation': 'luxury-vinyl-plank-installation',
  'laminate-flooring-installation': 'laminate-flooring-installation',
  'residential-flooring-installation': 'residential-flooring-installation',
  'waterproof-flooring-installation': 'waterproof-flooring-installation',
  'coretec-flooring-installation': 'coretec-flooring-installation',
  'armstrong-vinyl-plank-installation': 'armstrong-vinyl-plank-installation',
  'hardwood-flooring-installation': 'hardwood-flooring-installation',
  'hardwood-floor-installation-contractors': 'hardwood-floor-installation-contractors',
  'flooring-contractors': 'flooring-contractors',
  'flooring-installation': 'flooring-installation',
  'flooring-installation-services': 'flooring-installation-services',
  'diy-vs-professional-flooring-installation': 'diy-vs-professional-flooring-installation',
  'mohawk-hardwood-installation': 'mohawk-hardwood-installation',
  'best-flooring-installers': 'best-flooring-installers',
  'karndean-luxury-vinyl-installation': 'karndean-luxury-vinyl-installation',
  'lvp-flooring-installation-professionals': 'lvp-flooring-installation-professionals',
  'lvp-installation': 'lvp-installation',
  'engineered-hardwood-installation': 'engineered-hardwood-installation',
  'luxury-vinyl-tile-installation': 'luxury-vinyl-tile-installation',
  'hardwood-vs-laminate-installation': 'hardwood-vs-laminate-installation',
  'hardwood-flooring-installation-cost': 'hardwood-flooring-installation-cost',
  'laminate-installation-cost': 'laminate-installation-cost',
  'luxury-vinyl-plank-installation-cost': 'luxury-vinyl-plank-installation-cost',
  'vinyl-plank-installation': 'vinyl-plank-installation',

  // Demolition Services
  'residential-demolition': 'residential-demolition',
  'commercial-demolition': 'commercial-demolition',
  'demolition-services': 'demolition-services',
  'demolition-quote': 'demolition-quote',
  'demolition-cost': 'demolition-cost',
  'kitchen-demolition': 'kitchen-demolition',
  'bathroom-demolition-contractors': 'bathroom-demolition-contractors',
  'interior-demolition-contractors': 'interior-demolition-contractors',
  'selective-demolition-services': 'selective-demolition-services',
  'wall-removal-services': 'wall-removal-services',
  'emergency-demolition-services': 'emergency-demolition-services',
  'professional-demolition-contractors': 'professional-demolition-contractors',
  'licensed-demolition-contractor': 'licensed-demolition-contractor',
  'insured-demolition-company': 'insured-demolition-company',
  'structural-demolition-contractors': 'structural-demolition-contractors',
  'retail-store-demolition': 'retail-store-demolition',
  'commercial-building-demolition': 'commercial-building-demolition',
  'tenant-improvement-demolition': 'tenant-improvement-demolition',
  'warehouse-demolition-contractors': 'warehouse-demolition-contractors',
  'concrete-demolition': 'concrete-demolition',
  'affordable-demolition-services': 'affordable-demolition-services',
  'same-day-demolition': 'same-day-demolition',
  'demolition-contractors': 'demolition-contractors',
  'demolition-planning': 'demolition-planning',
  'demolition-debris-removal': 'demolition-debris-removal',
};

/**
 * Attempts to find a matching service in the database for a legacy URL
 * Returns the proper service slug if found, null otherwise
 */
export function findLegacyServiceMapping(serviceSlug: string): string | null {
  // First try exact match
  if (LEGACY_SERVICE_MAPPINGS[serviceSlug]) {
    return LEGACY_SERVICE_MAPPINGS[serviceSlug];
  }

  // Try without common suffixes
  const withoutSuffixes = serviceSlug
    .replace(/-services?$/, '')
    .replace(/-contractors?$/, '')
    .replace(/-cost$/, '')
    .replace(/-quote$/, '');

  if (withoutSuffixes !== serviceSlug && LEGACY_SERVICE_MAPPINGS[withoutSuffixes]) {
    return LEGACY_SERVICE_MAPPINGS[withoutSuffixes];
  }

  // For flooring, try mapping to generic flooring installation
  if (serviceSlug.includes('flooring') || serviceSlug.includes('floor')) {
    return 'flooring-installation';
  }

  // For demolition, try mapping to generic demolition services
  if (serviceSlug.includes('demolition') || serviceSlug.includes('demo')) {
    return 'demolition-services';
  }

  // For junk removal, try mapping to generic junk removal
  if (
    serviceSlug.includes('junk') ||
    serviceSlug.includes('removal') ||
    serviceSlug.includes('cleanout')
  ) {
    return 'junk-removal';
  }

  return null;
}
