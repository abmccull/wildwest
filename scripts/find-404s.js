#!/usr/bin/env node

/**
 * Script to identify 404 pages and URL structure mismatches
 * Run with: node scripts/find-404s.js
 */

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// City mappings from database.ts
const CITY_DISPLAY_NAMES = {
  "salt-lake-city": "Salt Lake City",
  "west-valley-city": "West Valley City", 
  "west-jordan": "West Jordan",
  "sandy": "Sandy",
  "orem": "Orem",
  "ogden": "Ogden",
  "layton": "Layton",
  "taylorsville": "Taylorsville",
  "murray": "Murray",
  "bountiful": "Bountiful",
  "draper": "Draper",
  "riverton": "Riverton",
  "roy": "Roy",
  "pleasant-grove": "Pleasant Grove",
  "cottonwood-heights": "Cottonwood Heights",
};

const SERVICE_MAPPING = {
  "flooring": "flooring",
  "demolition": "demolition", 
  "junk-removal": "junk_removal",
  "junk_removal": "junk_removal"
};

async function analyzePagesAndRoutes() {
  console.log('🔍 Analyzing pages and URL structure...\n');

  try {
    // Fetch all published pages from database
    const { data: pages, error } = await supabase
      .from('pages')
      .select('id, slug, city, service, published')
      .eq('published', true);

    if (error) {
      console.error('Error fetching pages:', error);
      return;
    }

    console.log(`📊 Found ${pages.length} published pages in database\n`);

    const redirectsNeeded = [];
    const potentialIssues = [];
    const validRoutes = [];

    for (const page of pages) {
      const { slug, city, service } = page;
      
      // Expected nested URL format
      const citySlug = city.toLowerCase().replace(/\s+/g, '-');
      const serviceSlug = service === 'junk_removal' ? 'junk-removal' : service;
      const expectedNestedUrl = `/locations/${citySlug}/${serviceSlug}`;
      const expectedFlatUrl = `/${slug}`;

      // Check if city exists in our routing system
      if (!CITY_DISPLAY_NAMES[citySlug]) {
        potentialIssues.push({
          type: 'UNMAPPED_CITY',
          page: page,
          issue: `City "${city}" (${citySlug}) not found in CITY_DISPLAY_NAMES`,
          currentSlug: slug,
          expectedUrl: expectedNestedUrl
        });
        continue;
      }

      // Check if service mapping exists
      if (!SERVICE_MAPPING[service] && !SERVICE_MAPPING[serviceSlug]) {
        potentialIssues.push({
          type: 'UNMAPPED_SERVICE', 
          page: page,
          issue: `Service "${service}" not found in service mapping`,
          currentSlug: slug,
          expectedUrl: expectedNestedUrl
        });
        continue;
      }

      // Generate redirect mapping
      const constructedSlug = `${citySlug}-${serviceSlug}`;
      
      if (slug !== constructedSlug) {
        redirectsNeeded.push({
          type: 'SLUG_MISMATCH',
          from: `/${slug}`,
          to: expectedNestedUrl,
          page: page,
          issue: `Database slug "${slug}" doesn't match constructed "${constructedSlug}"`
        });
      } else {
        // This is a correctly formatted flat slug that should redirect to nested
        redirectsNeeded.push({
          type: 'FLAT_TO_NESTED',
          from: `/${slug}`,
          to: expectedNestedUrl,
          page: page,
          issue: 'Flat slug should redirect to nested URL structure'
        });
      }

      validRoutes.push({
        flatUrl: `/${slug}`,
        nestedUrl: expectedNestedUrl,
        page: page
      });
    }

    // Print analysis results
    console.log('🚨 POTENTIAL 404 ISSUES:');
    console.log('========================');
    
    if (potentialIssues.length === 0) {
      console.log('✅ No mapping issues found');
    } else {
      potentialIssues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.type}: ${issue.issue}`);
        console.log(`   Page: ${issue.page.slug} (${issue.page.city} ${issue.page.service})`);
        console.log(`   Expected: ${issue.expectedUrl}\n`);
      });
    }

    console.log('\n🔀 REDIRECTS NEEDED:');
    console.log('===================');
    console.log(`Found ${redirectsNeeded.length} redirects needed\n`);

    // Group redirects by type
    const flatToNested = redirectsNeeded.filter(r => r.type === 'FLAT_TO_NESTED');
    const slugMismatches = redirectsNeeded.filter(r => r.type === 'SLUG_MISMATCH');

    console.log(`📝 Flat to Nested (${flatToNested.length}):`);
    flatToNested.slice(0, 10).forEach(redirect => {
      console.log(`   ${redirect.from} → ${redirect.to}`);
    });
    if (flatToNested.length > 10) {
      console.log(`   ... and ${flatToNested.length - 10} more`);
    }

    if (slugMismatches.length > 0) {
      console.log(`\n⚠️  Slug Mismatches (${slugMismatches.length}):`);
      slugMismatches.forEach(redirect => {
        console.log(`   ${redirect.from} → ${redirect.to}`);
        console.log(`      Issue: ${redirect.issue}`);
      });
    }

    console.log('\n📋 REDIRECT RULES TO IMPLEMENT:');
    console.log('==============================');
    
    // Generate redirect rules for lib/redirects.ts
    const redirectRules = redirectsNeeded.map(redirect => ({
      from: redirect.from,
      to: redirect.to,
      permanent: true
    }));

    console.log('Copy this to lib/redirects.ts:');
    console.log('```typescript');
    console.log('export const redirectRules: RedirectRule[] = [');
    redirectRules.slice(0, 20).forEach(rule => {
      console.log(`  { from: "${rule.from}", to: "${rule.to}", permanent: ${rule.permanent} },`);
    });
    if (redirectRules.length > 20) {
      console.log(`  // ... and ${redirectRules.length - 20} more rules`);
    }
    console.log('];');
    console.log('```');

    // Also check for common patterns that might be causing 404s
    console.log('\n🔍 COMMON 404 PATTERNS TO CHECK:');
    console.log('================================');
    console.log('1. Old URLs with different slug formats');
    console.log('2. URLs referenced in sitemap but not in database');
    console.log('3. External links pointing to old URL structure');
    console.log('4. Google Search Console URLs that don\'t match current routes');

    // Return data for further processing
    return {
      pages,
      redirectsNeeded,
      potentialIssues,
      validRoutes,
      redirectRules
    };

  } catch (error) {
    console.error('Error analyzing pages:', error);
  }
}

async function checkSitemapUrls() {
  console.log('\n🗺️  CHECKING SITEMAP URLS:');
  console.log('=========================');
  
  try {
    // This would ideally fetch from your actual sitemap
    // For now, we'll check the fallback cities and services from the sitemap
    const sitemapCities = [
      "salt-lake-city", "west-valley-city", "west-jordan", "sandy",
      "orem", "murray", "taylorsville", "draper"
    ];
    
    const sitemapServices = ["flooring", "demolition", "junk-removal"];
    
    let sitemapUrls = [];
    
    // Generate URLs that would be in sitemap
    sitemapCities.forEach(city => {
      sitemapUrls.push(`/locations/${city}`);
      sitemapServices.forEach(service => {
        sitemapUrls.push(`/locations/${city}/${service}`);
      });
    });

    console.log(`📍 Generated ${sitemapUrls.length} sitemap URLs to verify`);
    console.log('These URLs should all resolve correctly in your app routing');

    return sitemapUrls;

  } catch (error) {
    console.error('Error checking sitemap URLs:', error);
  }
}

// Main execution
async function main() {
  console.log('🚀 Wild West SEO - 404 Analysis Tool');
  console.log('====================================\n');

  const analysis = await analyzePagesAndRoutes();
  const sitemapUrls = await checkSitemapUrls();

  console.log('\n✨ NEXT STEPS:');
  console.log('=============');
  console.log('1. Update lib/redirects.ts with the generated redirect rules');
  console.log('2. Test the redirect functionality in middleware.ts');
  console.log('3. Update any hardcoded URLs in the codebase');
  console.log('4. Submit updated sitemap to Google Search Console');
  console.log('5. Monitor 404 errors in Google Search Console after deployment');

  process.exit(0);
}

main().catch(console.error);