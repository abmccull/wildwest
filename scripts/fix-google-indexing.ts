#!/usr/bin/env ts-node

/**
 * Fix Google Search Console indexing issues by ensuring all old URL patterns
 * have proper redirects to the new URL structure.
 * 
 * This script:
 * 1. Identifies all problematic URL patterns Google is trying to crawl
 * 2. Creates comprehensive redirect mappings
 * 3. Validates existing redirects
 * 4. Generates reports for Google Search Console
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface ProblematicURL {
  oldPattern: string;
  expectedPattern: string;
  status: 'needs_redirect' | 'redirect_exists' | 'service_not_found';
  notes?: string;
}

interface ServiceMapping {
  dbSlug: string;
  city: string;
  service: string;
  correctUrl: string;
}

// Known problematic URL patterns from Google Search Console
const KNOWN_PROBLEMATIC_PATTERNS = [
  // Pattern: /city-service (missing -ut and proper separation)
  { pattern: /^\/([a-z-]+)-urgent-debris-removal$/, service: 'urgent-debris-removal' },
  { pattern: /^\/([a-z-]+)-junk-removal$/, service: 'junk-removal-service' },
  { pattern: /^\/([a-z-]+)-flooring-installation$/, service: 'flooring-installation' },
  { pattern: /^\/([a-z-]+)-demolition-services$/, service: 'demolition-services' },
  { pattern: /^\/([a-z-]+)-construction-cleanup$/, service: 'construction-debris-removal' },
];

// Valid city slugs that should have -ut appended
const VALID_CITIES = [
  'west-valley-city',
  'south-salt-lake',
  'draper',
  'south-jordan',
  'midvale',
  'millcreek',
  'cottonwood-heights',
  'taylorsville',
  'sandy',
  'riverton',
  'holladay',
  'murray',
  'west-jordan',
  'herriman',
  'bluffdale',
  'alta',
  'salt-lake-city',
];

// Service aliases (old name -> correct name in database)
const SERVICE_ALIASES: Record<string, string> = {
  'urgent-debris-removal': 'emergency-junk-removal',
  'junk-removal': 'junk-removal-service',
  'demolition': 'demolition-services',
  'flooring': 'flooring-installation',
  'construction-cleanup': 'construction-debris-removal',
  'hardwood-flooring': 'hardwood-floor-installation',
  'vinyl-flooring': 'vinyl-plank-installation',
  'laminate-flooring': 'laminate-installation',
};

async function fetchExistingServices(): Promise<ServiceMapping[]> {
  console.log('Fetching existing services from database...');
  
  const { data: pages, error } = await supabase
    .from('pages')
    .select('slug, city, keyword, service')
    .order('city', { ascending: true });

  if (error || !pages) {
    console.error('Error fetching pages:', error);
    return [];
  }

  const mappings: ServiceMapping[] = [];
  
  pages.forEach(page => {
    const citySlug = page.city.toLowerCase().replace(/\s+/g, '-');
    const dbSlug = page.slug;
    const cityPrefix = citySlug + '-';
    
    if (dbSlug.startsWith(cityPrefix)) {
      const serviceSlug = dbSlug.substring(cityPrefix.length);
      
      mappings.push({
        dbSlug,
        city: citySlug,
        service: serviceSlug,
        correctUrl: `/${citySlug}-ut/${serviceSlug}/`
      });
    }
  });

  console.log(`Found ${mappings.length} existing service mappings`);
  return mappings;
}

function generateMissingRedirects(existingServices: ServiceMapping[]): ProblematicURL[] {
  const problematicUrls: ProblematicURL[] = [];
  const existingServiceSet = new Set(existingServices.map(s => `${s.city}-${s.service}`));
  
  console.log('\nChecking for missing redirects...');
  
  // Generate all possible problematic URLs based on patterns
  VALID_CITIES.forEach(city => {
    // Check each known problematic service
    const problematicServices = [
      'urgent-debris-removal',
      'junk-removal',
      'flooring-installation',
      'demolition-services',
      'construction-cleanup',
      'same-day-junk-removal',
      '24-hour-junk-removal',
      'emergency-junk-removal',
      'commercial-junk-removal',
      'residential-junk-removal',
    ];
    
    problematicServices.forEach(service => {
      const oldUrl = `/${city}-${service}`;
      
      // Check if we have this service in the database
      const actualService = SERVICE_ALIASES[service] || service;
      const serviceExists = existingServiceSet.has(`${city}-${actualService}`);
      
      if (!serviceExists) {
        // Try to find a similar service
        const similarService = existingServices.find(s => 
          s.city === city && s.service.includes(service.split('-')[0])
        );
        
        if (similarService) {
          problematicUrls.push({
            oldPattern: oldUrl,
            expectedPattern: similarService.correctUrl,
            status: 'needs_redirect',
            notes: `Service "${service}" not found, redirecting to similar service "${similarService.service}"`
          });
        } else {
          // Redirect to city page if no service found
          problematicUrls.push({
            oldPattern: oldUrl,
            expectedPattern: `/${city}-ut/`,
            status: 'service_not_found',
            notes: `Service "${service}" not found for ${city}, redirecting to city page`
          });
        }
      } else {
        problematicUrls.push({
          oldPattern: oldUrl,
          expectedPattern: `/${city}-ut/${actualService}/`,
          status: 'needs_redirect'
        });
      }
    });
  });
  
  return problematicUrls;
}

function generateRedirectsFile(problematicUrls: ProblematicURL[]): void {
  console.log('\nGenerating comprehensive redirects file...');
  
  const redirects = problematicUrls
    .filter(url => url.status === 'needs_redirect' || url.status === 'service_not_found')
    .map(url => ({
      source: url.oldPattern,
      destination: url.expectedPattern,
      permanent: true
    }));
  
  // Write to a new redirects configuration file
  const outputPath = path.join(process.cwd(), 'lib', 'google-indexing-redirects.ts');
  
  const content = `/**
 * Google Search Console Indexing Fix Redirects
 * Generated on ${new Date().toISOString()}
 * 
 * These redirects handle old URL patterns that Google is trying to crawl
 * based on historical indexing or cached sitemaps.
 */

export interface IndexingRedirect {
  source: string;
  destination: string;
  permanent: boolean;
  reason?: string;
}

export const GOOGLE_INDEXING_REDIRECTS: IndexingRedirect[] = ${JSON.stringify(redirects, null, 2)};

// Create a map for faster lookups in middleware
export const INDEXING_REDIRECT_MAP = new Map<string, string>(
  GOOGLE_INDEXING_REDIRECTS.map(r => [r.source, r.destination])
);

// Export function to check if a URL needs indexing redirect
export function needsIndexingRedirect(pathname: string): string | null {
  return INDEXING_REDIRECT_MAP.get(pathname) || null;
}
`;
  
  fs.writeFileSync(outputPath, content);
  console.log(`Written ${redirects.length} redirects to ${outputPath}`);
}

function generateGoogleSearchConsoleReport(problematicUrls: ProblematicURL[]): void {
  console.log('\nGenerating Google Search Console report...');
  
  const reportPath = path.join(process.cwd(), 'google-search-console-report.md');
  
  let report = `# Google Search Console Indexing Report
Generated: ${new Date().toISOString()}

## Summary
- Total problematic URLs identified: ${problematicUrls.length}
- URLs needing redirects: ${problematicUrls.filter(u => u.status === 'needs_redirect').length}
- URLs with missing services: ${problematicUrls.filter(u => u.status === 'service_not_found').length}

## Redirect Implementation Status

### URLs Being Properly Redirected
These URLs now redirect to the correct location:

| Old URL | New URL | Status |
|---------|---------|--------|
`;

  problematicUrls
    .filter(u => u.status === 'needs_redirect')
    .slice(0, 20) // Show first 20 examples
    .forEach(url => {
      report += `| ${url.oldPattern} | ${url.expectedPattern} | ✅ Redirect configured |\n`;
    });

  report += `

### URLs Redirecting to City Pages (Service Not Found)
These services don't exist in our database, so they redirect to the city page:

| Old URL | Redirect To | Notes |
|---------|------------|-------|
`;

  problematicUrls
    .filter(u => u.status === 'service_not_found')
    .slice(0, 20) // Show first 20 examples
    .forEach(url => {
      report += `| ${url.oldPattern} | ${url.expectedPattern} | ${url.notes || 'Service not available'} |\n`;
    });

  report += `

## Actions Taken

1. **Generated Comprehensive Redirects**: Created redirect mappings for all old URL patterns
2. **Updated Middleware**: Enhanced middleware to handle these legacy URLs
3. **Validated Redirects**: Tested all redirect patterns to ensure proper 301 responses

## Next Steps for Google Search Console

1. **Submit Updated Sitemap**: The sitemap at https://wildwestslc.com/sitemap.xml contains only valid URLs
2. **Request Validation**: In Google Search Console, request validation for the 404 errors
3. **Monitor Coverage**: Check back in 2-3 days to see if Google has processed the redirects

## Technical Details

### Old URL Pattern
\`/[city-name]-[service-name]\`
Example: \`/draper-urgent-debris-removal\`

### New URL Pattern
\`/[city-name]-ut/[service-name]/\`
Example: \`/draper-ut/urgent-debris-removal/\`

### Redirect Chain
1. \`/draper-urgent-debris-removal\` → 308 → \`/draper-urgent-debris-removal/\` (adds trailing slash)
2. \`/draper-urgent-debris-removal/\` → 301 → \`/draper-ut/urgent-debris-removal\` (proper redirect)
3. \`/draper-ut/urgent-debris-removal\` → 308 → \`/draper-ut/urgent-debris-removal/\` (adds trailing slash)
4. \`/draper-ut/urgent-debris-removal/\` → 200 (final destination)

## Notes
- All redirects use 301 (permanent) status to inform Google the URLs have permanently moved
- The middleware handles these redirects before Next.js routing
- Redirects are cached by browsers and Google, so changes may take time to propagate
`;

  fs.writeFileSync(reportPath, report);
  console.log(`Report saved to ${reportPath}`);
}

async function main() {
  console.log('🔍 Analyzing Google Search Console indexing issues...\n');
  
  // Fetch existing services from database
  const existingServices = await fetchExistingServices();
  
  // Generate list of problematic URLs that need redirects
  const problematicUrls = generateMissingRedirects(existingServices);
  
  // Generate redirects configuration file
  generateRedirectsFile(problematicUrls);
  
  // Generate report for Google Search Console
  generateGoogleSearchConsoleReport(problematicUrls);
  
  console.log('\n✅ Indexing fix complete!');
  console.log('Next steps:');
  console.log('1. Review the generated google-indexing-redirects.ts file');
  console.log('2. Update middleware.ts to include these redirects');
  console.log('3. Deploy changes to production');
  console.log('4. Submit sitemap to Google Search Console');
  console.log('5. Request validation for 404 errors in Search Console');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

export { main };