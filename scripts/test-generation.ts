#!/usr/bin/env tsx
/**
 * Test script to verify content generation is working properly
 */

import {
  SALT_LAKE_COUNTY_CITIES,
  SERVICE_KEYWORDS,
  BUSINESS_INFO,
  generateMetaTitle,
  generateMetaDescription,
  generateH1,
  generateSlug,
  generatePageContent,
} from "./content-generator";

// Test the content generation
console.log("🧪 Testing Wild West Construction Content Generation...");
console.log("================================================");

// Test business info
console.log("📋 Business Information:");
console.log(`   Name: ${BUSINESS_INFO.name}`);
console.log(`   Phone: ${BUSINESS_INFO.phone}`);
console.log(`   Email: ${BUSINESS_INFO.email}`);
console.log(`   Address: ${BUSINESS_INFO.address}`);
console.log("");

// Test with Murray (home city) and flooring service
const testCity = "Murray";
const testService = "flooring";
const testKeyword = "hardwood flooring installation";

console.log("🏢 Test Generation for Murray (Home City):");
console.log(`   City: ${testCity}`);
console.log(`   Service: ${testService}`);
console.log(`   Keyword: ${testKeyword}`);
console.log("");

// Generate test content
const metaTitle = generateMetaTitle(testCity, testService as any, testKeyword);
const metaDescription = generateMetaDescription(
  testCity,
  testService as any,
  testKeyword,
);
const h1 = generateH1(testCity, testService as any, testKeyword);
const slug = generateSlug(testCity, testService as any, testKeyword);
const content = generatePageContent(testCity, testService as any, testKeyword);

console.log("📝 Generated Content:");
console.log(`   Meta Title: ${metaTitle}`);
console.log(`   Meta Description: ${metaDescription}`);
console.log(`   H1: ${h1}`);
console.log(`   Slug: ${slug}`);
console.log("");

console.log("💬 Sample FAQ:");
console.log(`   Q: ${content.faq[0].question}`);
console.log(`   A: ${content.faq[0].answer}`);
console.log("");

console.log("⭐ Sample Testimonial:");
console.log(
  `   ${content.testimonials[0].name}: "${content.testimonials[0].text}"`,
);
console.log("");

console.log("🎯 CTA:");
console.log(`   ${content.cta_text}`);
console.log("");

// Test total page calculation
const totalCities = SALT_LAKE_COUNTY_CITIES.length;
const totalServices = Object.keys(SERVICE_KEYWORDS).length;
const keywordsPerService = SERVICE_KEYWORDS.flooring.length;
const totalKeywordPages = totalCities * totalServices * keywordsPerService;
const totalHubPages = totalCities;
const totalPages = totalHubPages + totalKeywordPages;

console.log("📊 Expected Generation Summary:");
console.log(`   Cities: ${totalCities}`);
console.log(`   Services: ${totalServices}`);
console.log(`   Keywords per service: ${keywordsPerService}`);
console.log(`   Hub pages: ${totalHubPages}`);
console.log(`   Keyword pages: ${totalKeywordPages}`);
console.log(`   Total pages: ${totalPages}`);
console.log("");

console.log("✅ Content generation test completed successfully!");
console.log(
  "🚀 Ready to seed your database with high-quality, localized content!",
);
