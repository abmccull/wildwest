import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function generateRedirects() {
  console.log('Fetching pages from database...');
  
  const { data: pages, error } = await supabase
    .from('pages')
    .select('slug, city, keyword, service')
    .order('city', { ascending: true });

  if (error) {
    console.error('Error fetching pages:', error);
    return;
  }

  if (!pages || pages.length === 0) {
    console.log('No pages found');
    return;
  }

  console.log(`Found ${pages.length} pages`);

  // Group pages by city
  const pagesByCity = new Map<string, any[]>();
  
  pages.forEach(page => {
    const cityKey = page.city.toLowerCase().replace(/\s+/g, '-');
    if (!pagesByCity.has(cityKey)) {
      pagesByCity.set(cityKey, []);
    }
    pagesByCity.get(cityKey)!.push(page);
  });

  // Generate redirect mappings
  const redirects: any[] = [];
  
  pagesByCity.forEach((cityPages, citySlug) => {
    cityPages.forEach(page => {
      // The slug in the database is like "midvale-commercial-junk-removal"
      // We need to extract just the service part
      const dbSlug = page.slug;
      const cityPrefix = citySlug + '-';
      
      if (dbSlug.startsWith(cityPrefix)) {
        const serviceSlug = dbSlug.substring(cityPrefix.length);
        
        // Create redirect from old URL to new URL
        const oldUrl = `/${dbSlug}`;
        const newUrl = `/${citySlug}-ut/${serviceSlug}`;
        
        redirects.push({
          source: oldUrl,
          destination: newUrl,
          permanent: true,
          slug: dbSlug,
          city: page.city,
          service: serviceSlug,
          keyword: page.keyword
        });
      }
    });
  });

  // Write redirects to a JSON file
  const redirectsPath = path.join(process.cwd(), 'lib', 'generated-redirects.json');
  fs.writeFileSync(redirectsPath, JSON.stringify(redirects, null, 2));
  
  console.log(`Generated ${redirects.length} redirects`);
  console.log(`Redirects saved to ${redirectsPath}`);

  // Also generate a TypeScript module with the mappings
  const tsContent = `// Auto-generated redirect mappings
// Generated on ${new Date().toISOString()}

export interface RedirectMapping {
  source: string;
  destination: string;
  permanent: boolean;
  slug: string;
  city: string;
  service: string;
  keyword: string;
}

export const GENERATED_REDIRECTS: RedirectMapping[] = ${JSON.stringify(redirects, null, 2)};

// Create a map for faster lookups
export const REDIRECT_MAP = new Map<string, string>(
  GENERATED_REDIRECTS.map(r => [r.source, r.destination])
);
`;

  const tsPath = path.join(process.cwd(), 'lib', 'generated-redirects.ts');
  fs.writeFileSync(tsPath, tsContent);
  
  console.log(`TypeScript module saved to ${tsPath}`);
}

// Run the script
generateRedirects().catch(console.error);