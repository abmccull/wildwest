#!/usr/bin/env node

/**
 * Script to test redirect rules and validate URL mappings
 * Run with: node scripts/test-redirects.js
 */

const { generateDynamicRedirect, findRedirect } = require('../lib/redirects.ts');

// Test cases for various URL patterns
const testUrls = [
  // Basic city-service patterns
  '/murray-flooring',
  '/salt-lake-city-demolition',
  '/south-jordan-junk-removal',
  '/herriman-flooring',
  '/bluffdale-junk_removal',
  
  // Complex keyword patterns
  '/south-salt-lake-hardwood-flooring-installation',
  '/murray-luxury-vinyl-plank-installation',
  '/draper-kitchen-demolition-contractors',
  '/sandy-junk-hauling-quote',
  
  // Edge cases
  '/invalid-city-flooring',
  '/murray-invalid-service',
  '/just-a-slug',
  '',
  '/',
  
  // Legacy formats
  '/west-jordan-junk_removal',
  '/cottonwood-heights-junk_removal',
];

console.log('🧪 Testing Redirect Rules');
console.log('========================\n');

testUrls.forEach(url => {
  console.log(`Testing: ${url}`);
  
  // Test manual redirects first
  const manual = findRedirect ? findRedirect(url) : null;
  if (manual) {
    console.log(`  ✅ Manual redirect: ${manual.from} → ${manual.to} (${manual.permanent ? '301' : '307'})`);
    return;
  }
  
  // Test dynamic redirects
  const dynamic = generateDynamicRedirect ? generateDynamicRedirect(url) : null;
  if (dynamic) {
    console.log(`  ✅ Dynamic redirect: ${dynamic.from} → ${dynamic.to} (${dynamic.permanent ? '301' : '307'})`);
  } else {
    console.log(`  ❌ No redirect found - will return 404`);
  }
  
  console.log('');
});

console.log('\n📋 SUMMARY:');
console.log('===========');
console.log('✅ URLs that will redirect properly');
console.log('❌ URLs that will return 404 - need attention');
console.log('\nNext steps:');
console.log('1. Deploy these changes to fix existing 404s');
console.log('2. Monitor Google Search Console for remaining 404s');
console.log('3. Add more specific redirect rules as needed');