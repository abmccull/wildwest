import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function createSitemap() {
  console.log('Fetching pages from database...');
  
  const { data: pages, error } = await supabase
    .from('pages')
    .select('slug, city, keyword, updated_at')
    .eq('published', true)
    .order('city', { ascending: true });

  if (error) {
    console.error('Error fetching pages:', error);
    return;
  }

  if (!pages || pages.length === 0) {
    console.log('No published pages found');
    return;
  }

  console.log(`Found ${pages.length} published pages`);

  // Generate sitemap entries
  const sitemapEntries: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  // Add homepage
  sitemapEntries.push(`
  <url>
    <loc>https://wildwestslc.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`);

  // Add service pages
  const cities = new Set<string>();
  
  pages.forEach(page => {
    const citySlug = page.city.toLowerCase().replace(/\s+/g, '-');
    cities.add(citySlug);
    
    // Extract service slug from the database slug
    const serviceSlug = page.slug.replace(new RegExp(`^${citySlug}-`), '');
    
    // Build the correct URL
    const url = `https://wildwestslc.com/${citySlug}-ut/${serviceSlug}/`;
    
    sitemapEntries.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${page.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  // Add city pages
  cities.forEach(citySlug => {
    sitemapEntries.push(`
  <url>
    <loc>https://wildwestslc.com/${citySlug}-ut/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
  });

  // Add main service category pages
  const serviceCategories = ['flooring', 'demolition', 'junk-removal'];
  serviceCategories.forEach(category => {
    sitemapEntries.push(`
  <url>
    <loc>https://wildwestslc.com/${category}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
  });

  sitemapEntries.push('</urlset>');

  // Write sitemap to public directory
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapEntries.join(''));
  
  console.log(`Sitemap generated with ${pages.length} pages`);
  console.log(`Sitemap saved to ${sitemapPath}`);

  // Also generate a robots.txt if it doesn't exist
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    const robotsContent = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://wildwestslc.com/sitemap.xml
`;
    fs.writeFileSync(robotsPath, robotsContent);
    console.log('robots.txt created');
  }
}

// Run the script
createSitemap().catch(console.error);