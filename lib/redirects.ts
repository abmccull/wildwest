export interface RedirectRule {
  from: string;
  to: string;
  permanent?: boolean; // 308 if true, else 307
}

// Central place to define manual redirects for legacy or misspelled URLs.
// Use lowercase, no trailing slash for `from` and `to`.
export const redirectRules: RedirectRule[] = [
  // Flat slug to nested URL structure redirects for mapped cities
  { from: "/salt-lake-city-flooring", to: "/locations/salt-lake-city/flooring", permanent: true },
  { from: "/salt-lake-city-demolition", to: "/locations/salt-lake-city/demolition", permanent: true },
  { from: "/salt-lake-city-junk-removal", to: "/locations/salt-lake-city/junk-removal", permanent: true },
  { from: "/west-valley-city-flooring", to: "/locations/west-valley-city/flooring", permanent: true },
  { from: "/west-valley-city-demolition", to: "/locations/west-valley-city/demolition", permanent: true },
  { from: "/west-valley-city-junk-removal", to: "/locations/west-valley-city/junk-removal", permanent: true },
  { from: "/west-jordan-flooring", to: "/locations/west-jordan/flooring", permanent: true },
  { from: "/west-jordan-demolition", to: "/locations/west-jordan/demolition", permanent: true },
  { from: "/west-jordan-junk-removal", to: "/locations/west-jordan/junk-removal", permanent: true },
  { from: "/sandy-flooring", to: "/locations/sandy/flooring", permanent: true },
  { from: "/sandy-demolition", to: "/locations/sandy/demolition", permanent: true },
  { from: "/sandy-junk-removal", to: "/locations/sandy/junk-removal", permanent: true },
  { from: "/orem-flooring", to: "/locations/orem/flooring", permanent: true },
  { from: "/orem-demolition", to: "/locations/orem/demolition", permanent: true },
  { from: "/orem-junk-removal", to: "/locations/orem/junk-removal", permanent: true },
  { from: "/murray-flooring", to: "/locations/murray/flooring", permanent: true },
  { from: "/murray-demolition", to: "/locations/murray/demolition", permanent: true },
  { from: "/murray-junk-removal", to: "/locations/murray/junk-removal", permanent: true },
  { from: "/taylorsville-flooring", to: "/locations/taylorsville/flooring", permanent: true },
  { from: "/taylorsville-demolition", to: "/locations/taylorsville/demolition", permanent: true },
  { from: "/taylorsville-junk-removal", to: "/locations/taylorsville/junk-removal", permanent: true },
  { from: "/draper-flooring", to: "/locations/draper/flooring", permanent: true },
  { from: "/draper-demolition", to: "/locations/draper/demolition", permanent: true },
  { from: "/draper-junk-removal", to: "/locations/draper/junk-removal", permanent: true },
  { from: "/riverton-flooring", to: "/locations/riverton/flooring", permanent: true },
  { from: "/riverton-demolition", to: "/locations/riverton/demolition", permanent: true },
  { from: "/riverton-junk-removal", to: "/locations/riverton/junk-removal", permanent: true },
  { from: "/cottonwood-heights-flooring", to: "/locations/cottonwood-heights/flooring", permanent: true },
  { from: "/cottonwood-heights-demolition", to: "/locations/cottonwood-heights/demolition", permanent: true },
  { from: "/cottonwood-heights-junk-removal", to: "/locations/cottonwood-heights/junk-removal", permanent: true },
  { from: "/bountiful-flooring", to: "/locations/bountiful/flooring", permanent: true },
  { from: "/bountiful-demolition", to: "/locations/bountiful/demolition", permanent: true },
  { from: "/bountiful-junk-removal", to: "/locations/bountiful/junk-removal", permanent: true },
  { from: "/layton-flooring", to: "/locations/layton/flooring", permanent: true },
  { from: "/layton-demolition", to: "/locations/layton/demolition", permanent: true },
  { from: "/layton-junk-removal", to: "/locations/layton/junk-removal", permanent: true },
  { from: "/ogden-flooring", to: "/locations/ogden/flooring", permanent: true },
  { from: "/ogden-demolition", to: "/locations/ogden/demolition", permanent: true },
  { from: "/ogden-junk-removal", to: "/locations/ogden/junk-removal", permanent: true },
  { from: "/pleasant-grove-flooring", to: "/locations/pleasant-grove/flooring", permanent: true },
  { from: "/pleasant-grove-demolition", to: "/locations/pleasant-grove/demolition", permanent: true },
  { from: "/pleasant-grove-junk-removal", to: "/locations/pleasant-grove/junk-removal", permanent: true },
  { from: "/roy-flooring", to: "/locations/roy/flooring", permanent: true },
  { from: "/roy-demolition", to: "/locations/roy/demolition", permanent: true },
  { from: "/roy-junk-removal", to: "/locations/roy/junk-removal", permanent: true },

  // Additional mapped cities that were missing from original mapping
  { from: "/south-jordan-flooring", to: "/locations/south-jordan/flooring", permanent: true },
  { from: "/south-jordan-demolition", to: "/locations/south-jordan/demolition", permanent: true },
  { from: "/south-jordan-junk-removal", to: "/locations/south-jordan/junk-removal", permanent: true },
  { from: "/herriman-flooring", to: "/locations/herriman/flooring", permanent: true },
  { from: "/herriman-demolition", to: "/locations/herriman/demolition", permanent: true },
  { from: "/herriman-junk-removal", to: "/locations/herriman/junk-removal", permanent: true },
  { from: "/midvale-flooring", to: "/locations/midvale/flooring", permanent: true },
  { from: "/midvale-demolition", to: "/locations/midvale/demolition", permanent: true },
  { from: "/midvale-junk-removal", to: "/locations/midvale/junk-removal", permanent: true },
  { from: "/holladay-flooring", to: "/locations/holladay/flooring", permanent: true },
  { from: "/holladay-demolition", to: "/locations/holladay/demolition", permanent: true },
  { from: "/holladay-junk-removal", to: "/locations/holladay/junk-removal", permanent: true },
  { from: "/south-salt-lake-flooring", to: "/locations/south-salt-lake/flooring", permanent: true },
  { from: "/south-salt-lake-demolition", to: "/locations/south-salt-lake/demolition", permanent: true },
  { from: "/south-salt-lake-junk-removal", to: "/locations/south-salt-lake/junk-removal", permanent: true },
  { from: "/bluffdale-flooring", to: "/locations/bluffdale/flooring", permanent: true },
  { from: "/bluffdale-demolition", to: "/locations/bluffdale/demolition", permanent: true },
  { from: "/bluffdale-junk-removal", to: "/locations/bluffdale/junk-removal", permanent: true },

  // Legacy service format redirects
  { from: "/salt-lake-city-junk_removal", to: "/locations/salt-lake-city/junk-removal", permanent: true },
  { from: "/west-valley-city-junk_removal", to: "/locations/west-valley-city/junk-removal", permanent: true },
  { from: "/west-jordan-junk_removal", to: "/locations/west-jordan/junk-removal", permanent: true },
  { from: "/sandy-junk_removal", to: "/locations/sandy/junk-removal", permanent: true },
  { from: "/orem-junk_removal", to: "/locations/orem/junk-removal", permanent: true },
  { from: "/murray-junk_removal", to: "/locations/murray/junk-removal", permanent: true },
  { from: "/taylorsville-junk_removal", to: "/locations/taylorsville/junk-removal", permanent: true },
  { from: "/draper-junk_removal", to: "/locations/draper/junk-removal", permanent: true },
  { from: "/riverton-junk_removal", to: "/locations/riverton/junk-removal", permanent: true },
  { from: "/cottonwood-heights-junk_removal", to: "/locations/cottonwood-heights/junk-removal", permanent: true },
  { from: "/bountiful-junk_removal", to: "/locations/bountiful/junk-removal", permanent: true },
  { from: "/layton-junk_removal", to: "/locations/layton/junk-removal", permanent: true },
  { from: "/ogden-junk_removal", to: "/locations/ogden/junk-removal", permanent: true },
  { from: "/pleasant-grove-junk_removal", to: "/locations/pleasant-grove/junk-removal", permanent: true },
  { from: "/roy-junk_removal", to: "/locations/roy/junk-removal", permanent: true },
  { from: "/south-jordan-junk_removal", to: "/locations/south-jordan/junk-removal", permanent: true },
  { from: "/herriman-junk_removal", to: "/locations/herriman/junk-removal", permanent: true },
  { from: "/midvale-junk_removal", to: "/locations/midvale/junk-removal", permanent: true },
  { from: "/holladay-junk_removal", to: "/locations/holladay/junk-removal", permanent: true },
  { from: "/south-salt-lake-junk_removal", to: "/locations/south-salt-lake/junk-removal", permanent: true },
  { from: "/bluffdale-junk_removal", to: "/locations/bluffdale/junk-removal", permanent: true },
];

// Dynamic redirect function for database-driven redirects
export function generateDynamicRedirect(pathname: string): RedirectRule | undefined {
  // Remove leading slash and normalize
  const slug = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  
  // Parse pattern: city-service or city-service-keywords
  const parts = slug.split('-');
  
  if (parts.length < 2) return undefined;
  
  // Try to match city-service pattern
  const possibleServices = ['flooring', 'demolition', 'junk', 'junk_removal'];
  
  // Look for service at different positions
  for (let i = 1; i < parts.length; i++) {
    const cityPart = parts.slice(0, i).join('-');
    const servicePart = parts[i];
    
    // Handle junk removal special case
    let normalizedService = servicePart;
    if (servicePart === 'junk' && parts[i + 1] === 'removal') {
      normalizedService = 'junk-removal';
    } else if (servicePart === 'junk_removal') {
      normalizedService = 'junk-removal';
    }
    
    // Check if this matches a city-service pattern
    const cityDisplayNames: Record<string, string> = {
      'salt-lake-city': 'Salt Lake City',
      'west-valley-city': 'West Valley City',
      'west-jordan': 'West Jordan',
      'sandy': 'Sandy',
      'south-jordan': 'South Jordan',
      'orem': 'Orem',
      'ogden': 'Ogden',
      'layton': 'Layton',
      'taylorsville': 'Taylorsville',
      'murray': 'Murray',
      'bountiful': 'Bountiful',
      'draper': 'Draper',
      'riverton': 'Riverton',
      'herriman': 'Herriman',
      'midvale': 'Midvale',
      'holladay': 'Holladay',
      'south-salt-lake': 'South Salt Lake',
      'bluffdale': 'Bluffdale',
      'roy': 'Roy',
      'pleasant-grove': 'Pleasant Grove',
      'cottonwood-heights': 'Cottonwood Heights',
    };
    
    const validServices = ['flooring', 'demolition', 'junk-removal'];
    
    if (cityDisplayNames[cityPart] && validServices.includes(normalizedService)) {
      return {
        from: pathname,
        to: `/locations/${cityPart}/${normalizedService}`,
        permanent: true
      };
    }
  }
  
  return undefined;
}

export function findRedirect(pathname: string): RedirectRule | undefined {
  const normalized = normalizePath(pathname);
  return redirectRules.find((r) => r.from === normalized);
}

export function normalizePath(pathname: string): string {
  // Lowercase, collapse slashes, strip trailing slash (except root)
  let p = pathname.toLowerCase();
  p = p.replace(/\/+/g, "/");
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}


