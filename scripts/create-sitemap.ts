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
    .select('slug, city, service, keyword, updated_at')
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

  // Add static pages
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' },
    { url: '/services', priority: 0.9, changefreq: 'weekly' },
    { url: '/blog', priority: 0.7, changefreq: 'weekly' },
    { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
    { url: '/terms', priority: 0.3, changefreq: 'yearly' },
  ];

  staticPages.forEach(page => {
    sitemapEntries.push(`
  <url>
    <loc>https://wildwestslc.com${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  });

  // Add service pages with correct URL structure
  const cities = new Set<string>();
  
  pages.forEach(page => {
    const citySlug = page.city.toLowerCase().replace(/\s+/g, '-');
    cities.add(citySlug);
    
    // Extract service slug by removing city prefix from the database slug
    const serviceSlug = page.slug.replace(new RegExp(`^${citySlug}-`), '');
    
    // Build the correct URL matching the routing pattern: /[city]-ut/[service]/
    const url = `https://wildwestslc.com/${citySlug}-ut/${serviceSlug}/`;
    
    sitemapEntries.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${page.updated_at ? new Date(page.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  });

  // Add city pages
  cities.forEach(citySlug => {
    sitemapEntries.push(`
  <url>
    <loc>https://wildwestslc.com/${citySlug}-ut/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  // Add main service category pages
  const serviceCategories = ['flooring', 'demolition', 'junk-removal'];
  serviceCategories.forEach(category => {
    sitemapEntries.push(`
  <url>
    <loc>https://wildwestslc.com/${category}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
  });

  sitemapEntries.push('</urlset>');

  // Write sitemap to public directory
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapEntries.join(''));
  
  console.log(`Sitemap generated with ${pages.length} service pages`);
  console.log(`Total URLs: ${staticPages.length + pages.length + cities.size + serviceCategories.length}`);
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