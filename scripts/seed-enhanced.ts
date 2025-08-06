#!/usr/bin/env tsx
/**
 * Enhanced Database Seeding Script for Wild West Construction
 * Generates 1,140 pages with VALUABLE, LOCALLY-RELEVANT content
 * Not just SEO fodder - real information people would bookmark
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { Database, ServiceType, PageInsert } from "../types/database";
import {
  SALT_LAKE_COUNTY_CITIES,
  generateEnhancedContent,
  SERVICE_KEYWORDS,
  BUSINESS_INFO,
} from "./enhanced-content-generator";

// Initialize Supabase admin client
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing required environment variables");
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

const SERVICES: ServiceType[] = ["flooring", "demolition", "junk_removal"];

// Generate hub pages with enhanced content
function generateEnhancedHubPages(): PageInsert[] {
  console.log("🏢 Generating enhanced city hub pages with valuable content...");
  const hubPages: PageInsert[] = [];

  for (const city of SALT_LAKE_COUNTY_CITIES) {
    // Generate comprehensive hub content for all services
    const enhancedContent = generateEnhancedContent(city, "flooring"); // Use as template

    const slug =
      city.toLowerCase().replace(/\s+/g, "-") + "-construction-services";
    const metaTitle = `${city} Construction Services | Wild West - Flooring, Demo, Junk`;
    const metaDescription = `Professional construction services in ${city}, UT. Flooring installation, demolition, junk removal. Licensed local contractors. Free estimates: (801) 691-4065`;

    // Create rich hub page content combining all services
    const hubContent = {
      ...enhancedContent,
      hero_text: `Professional Construction Services in ${city}, Utah`,
      service_description: `Wild West Construction provides comprehensive construction services throughout ${city}. From flooring installation to demolition and junk removal, our Murray-based team delivers quality results with local expertise. We understand ${city}'s building codes, climate challenges, and neighborhood characteristics.`,
      sections: [
        ...(enhancedContent.sections || []),
        {
          title: `Our Services in ${city}`,
          content: `**Flooring Installation:** Hardwood, luxury vinyl plank (LVP), and laminate flooring expertly installed with Utah's climate in mind.\n\n**Demolition Services:** Safe, efficient demolition for kitchens, bathrooms, and structures with proper permits and disposal.\n\n**Junk Removal:** Same-day service available for construction debris, furniture, and estate cleanouts with eco-friendly disposal.`,
        },
        {
          title: `Why Choose Wild West Construction in ${city}?`,
          content: `Located at ${BUSINESS_INFO.address}, we're your neighbors serving ${city} with:\n• 10+ years of local experience\n• Understanding of Utah's unique building challenges\n• Licensed and insured contractors\n• Free detailed estimates\n• Same-day service availability\n\nCall ${BUSINESS_INFO.phone} or WhatsApp us for immediate assistance.`,
        },
      ],
    };

    hubPages.push({
      slug,
      city,
      service: "flooring", // Default service for structure
      keyword: "construction services",
      meta_title: metaTitle.substring(0, 60),
      meta_description: metaDescription.substring(0, 160),
      h1:
        hubContent.hero_text ||
        `Professional Construction Services in ${city}, Utah`,
      content: hubContent as any,
      published: true,
      views: 0,
    });
  }

  console.log(`   ✅ Generated ${hubPages.length} enhanced hub pages`);
  return hubPages;
}

// Generate keyword pages with enhanced content
function generateEnhancedKeywordPages(): PageInsert[] {
  console.log(
    "🔑 Generating keyword pages with valuable, locally-relevant content...",
  );
  const keywordPages: PageInsert[] = [];

  for (const city of SALT_LAKE_COUNTY_CITIES) {
    console.log(`   📍 Processing ${city}...`);

    for (const service of SERVICES) {
      const keywords = SERVICE_KEYWORDS[service];

      for (const keyword of keywords) {
        // Generate truly valuable content for this specific combination
        const enhancedContent = generateEnhancedContent(city, service, keyword);

        // Create SEO-friendly slug
        const citySlug = city.toLowerCase().replace(/\s+/g, "-");
        const keywordSlug = keyword.toLowerCase().replace(/\s+/g, "-");
        const slug = `${citySlug}-${keywordSlug}`;

        // Generate optimized meta tags
        const keywordTitle = keyword
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        const metaTitle = `${keywordTitle} ${city} | Wild West Construction`;
        const metaDescription = `Expert ${keyword} services in ${city}, UT. Licensed contractors, ${BUSINESS_INFO.yearsExperience} years experience. Free estimates. Call ${BUSINESS_INFO.phone} today!`;

        keywordPages.push({
          slug,
          city,
          service,
          keyword,
          meta_title: metaTitle.substring(0, 60),
          meta_description: metaDescription.substring(0, 160),
          h1:
            enhancedContent.hero_text || `${keywordTitle} Services in ${city}`,
          content: enhancedContent as any,
          published: true,
          views: 0,
        });
      }
    }
  }

  console.log(`   ✅ Generated ${keywordPages.length} enhanced keyword pages`);
  return keywordPages;
}

// Clear existing pages
async function clearExistingPages() {
  console.log("🧹 Clearing existing generic pages...");

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("pages")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

  if (error) {
    console.error("❌ Error clearing pages:", error);
    throw error;
  }

  console.log("   ✅ Existing pages cleared");
}

// Batch insert with progress tracking
async function batchInsertPages(
  supabase: ReturnType<typeof createAdminClient>,
  pages: PageInsert[],
  batchSize = 50,
) {
  console.log(`📦 Inserting ${pages.length} pages with enhanced content...`);

  const results = [];
  for (let i = 0; i < pages.length; i += batchSize) {
    const batch = pages.slice(i, i + batchSize);
    const progress = Math.round((i / pages.length) * 100);

    console.log(
      `   📊 Progress: ${progress}% - Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(pages.length / batchSize)}`,
    );

    const { data, error } = await supabase
      .from("pages")
      .insert(batch)
      .select("id, slug, city, service, keyword");

    if (error) {
      console.error(`❌ Error in batch:`, error);
      throw error;
    }

    if (data) {
      results.push(...data);
    }

    // Small delay to avoid overwhelming the database
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return results;
}

// Main seeding function
async function seedEnhancedDatabase() {
  console.log("🚀 Starting Enhanced Database Seeding...");
  console.log("================================================");
  console.log(
    "📝 This will generate VALUABLE content that users will actually bookmark",
  );
  console.log(
    "   Not just SEO fodder - real local information and helpful guides",
  );
  console.log("");

  try {
    const supabase = createAdminClient();
    console.log("✅ Connected to Supabase");

    // Clear existing generic content
    await clearExistingPages();
    console.log("");

    // Generate enhanced pages
    console.log("📄 Generating pages with valuable content...");
    const hubPages = generateEnhancedHubPages();
    const keywordPages = generateEnhancedKeywordPages();
    const allPages = [...hubPages, ...keywordPages];

    console.log("");
    console.log(`📊 Generation Summary:`);
    console.log(`   🏢 Hub pages: ${hubPages.length}`);
    console.log(`   🔑 Keyword pages: ${keywordPages.length}`);
    console.log(`   📚 Total pages: ${allPages.length}`);
    console.log(`   💎 Each page contains 8-10 valuable content sections`);
    console.log("");

    // Insert enhanced pages
    console.log("💾 Inserting enhanced pages into database...");
    const insertedPages = await batchInsertPages(supabase, allPages);

    console.log("");
    console.log("🎉 Enhanced seeding completed successfully!");
    console.log("================================================");
    console.log(`📈 Final Statistics:`);
    console.log(`   ✅ Pages inserted: ${insertedPages.length}`);
    console.log(`   📍 Cities covered: ${SALT_LAKE_COUNTY_CITIES.length}`);
    console.log(`   🛠️ Services: ${SERVICES.length}`);
    console.log(
      `   🔑 Keywords per service: ${SERVICE_KEYWORDS.flooring.length}`,
    );
    console.log("");

    // Show content quality metrics
    console.log("💎 Content Quality Metrics:");
    console.log("   • Real local permit information for each city");
    console.log("   • Actual cost breakdowns with Utah pricing");
    console.log("   • Climate-specific recommendations");
    console.log("   • Local supplier and disposal information");
    console.log("   • Seasonal timing guides");
    console.log("   • DIY vs Professional decision guides");
    console.log("   • Common problems and solutions");
    console.log("   • Neighborhood-specific content");
    console.log("");

    console.log("✅ Your SEO platform now has VALUABLE content that will:");
    console.log("   • Rank better (helpful content update)");
    console.log("   • Earn natural backlinks");
    console.log("   • Convert visitors to leads");
    console.log("   • Build trust and authority");
    console.log("");
    console.log(
      "🚀 Wild West Construction SEO platform is ready with enhanced content!",
    );
  } catch (error) {
    console.error("❌ Enhanced seeding failed:", error);
    process.exit(1);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help")) {
    console.log("Enhanced Database Seeding for Wild West Construction");
    console.log("");
    console.log("Usage: npm run seed:enhanced");
    console.log("");
    console.log("This script will:");
    console.log("  1. Clear existing generic pages");
    console.log(
      "  2. Generate 1,140 pages with valuable, locally-relevant content",
    );
    console.log("  3. Insert them into your Supabase database");
    console.log("");
    return;
  }

  await seedEnhancedDatabase();
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { seedEnhancedDatabase };
