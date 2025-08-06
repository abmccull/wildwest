#!/usr/bin/env tsx
/**
 * Database Seeding Script for Wild West Construction SEO Platform
 * Generates 1,125+ pages using the hub-and-spoke model:
 * - 15 hub pages (one per city)
 * - 1,125 keyword pages (15 cities × 3 services × 25 keywords)
 * Total: 1,140 pages
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { Database, ServiceType, PageInsert } from "../types/database";
import {
  SALT_LAKE_COUNTY_CITIES,
  SERVICE_KEYWORDS,
  CITY_NEIGHBORHOODS,
  BUSINESS_INFO,
  generateMetaTitle,
  generateMetaDescription,
  generateH1,
  generateSlug,
  generatePageContent,
} from "./content-generator";

// Initialize Supabase client with service role key for admin operations
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Services to generate pages for
const SERVICES: ServiceType[] = ["flooring", "demolition", "junk_removal"];

// Batch insert function for better performance
async function batchInsertPages(
  supabase: ReturnType<typeof createAdminClient>,
  pages: PageInsert[],
  batchSize = 100,
) {
  console.log(
    `📦 Inserting ${pages.length} pages in batches of ${batchSize}...`,
  );

  const results = [];
  for (let i = 0; i < pages.length; i += batchSize) {
    const batch = pages.slice(i, i + batchSize);

    console.log(
      `   Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(pages.length / batchSize)}: ${batch.length} pages`,
    );

    const { data, error } = await supabase
      .from("pages")
      .insert(batch)
      .select("id, slug, city, service, keyword");

    if (error) {
      console.error(
        `❌ Error in batch ${Math.floor(i / batchSize) + 1}:`,
        error,
      );
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

// Generate hub pages (one per city - 15 total)
function generateHubPages(): PageInsert[] {
  const hubPages: PageInsert[] = [];

  console.log("🏢 Generating city hub pages...");

  for (const city of SALT_LAKE_COUNTY_CITIES) {
    // Create a general hub page for the city (using flooring as default service for structure)
    const service: ServiceType = "flooring"; // Use flooring as template service
    const slug =
      city.toLowerCase().replace(/\s+/g, "-") + "-construction-services";
    const metaTitle = `${city} Construction Services | Wild West`.substring(
      0,
      60,
    );
    const metaDescription = `Professional construction services in ${city}, UT. Flooring, demolition, and junk removal. Licensed contractors with 10+ years experience.`;
    const h1 = `Professional Construction Services in ${city}, Utah`;

    // Generate comprehensive city hub content
    const content = generateCityHubContent(city);

    // Use "construction services" as the keyword for hub pages
    const keyword = "construction services";

    hubPages.push({
      slug,
      city,
      service, // Keep service field for database consistency
      keyword,
      meta_title: metaTitle,
      meta_description: metaDescription,
      h1,
      content,
      published: true,
      views: 0,
    });
  }

  console.log(`   Generated ${hubPages.length} city hub pages`);
  return hubPages;
}

// Generate keyword-specific pages
function generateKeywordPages(): PageInsert[] {
  const keywordPages: PageInsert[] = [];

  console.log("🔑 Generating keyword-specific pages...");

  for (const city of SALT_LAKE_COUNTY_CITIES) {
    console.log(`   Processing ${city}...`);

    for (const service of SERVICES) {
      const keywords = SERVICE_KEYWORDS[service];

      for (const keyword of keywords) {
        const slug = generateSlug(city, service, keyword);
        const metaTitle = generateMetaTitle(city, service, keyword);
        const metaDescription = generateMetaDescription(city, service, keyword);
        const h1 = generateH1(city, service, keyword);
        const content = generatePageContent(city, service, keyword);

        keywordPages.push({
          slug,
          city,
          service,
          keyword,
          meta_title: metaTitle,
          meta_description: metaDescription,
          h1,
          content,
          published: true,
          views: 0,
        });
      }
    }
  }

  console.log(`   Generated ${keywordPages.length} keyword pages`);
  return keywordPages;
}

// Validate page data before insertion
function validatePages(pages: PageInsert[]): {
  valid: PageInsert[];
  invalid: any[];
} {
  const valid: PageInsert[] = [];
  const invalid: any[] = [];

  for (const page of pages) {
    // Check required fields
    if (!page.slug || !page.city || !page.service || !page.keyword) {
      invalid.push({ page, reason: "Missing required fields" });
      continue;
    }

    // Check meta title length (max 60 chars)
    if (page.meta_title && page.meta_title.length > 60) {
      invalid.push({ page, reason: "Meta title too long" });
      continue;
    }

    // Check meta description length (max 160 chars)
    if (page.meta_description && page.meta_description.length > 160) {
      invalid.push({ page, reason: "Meta description too long" });
      continue;
    }

    // Check slug format (lowercase, hyphens only)
    if (!/^[a-z0-9-]+$/.test(page.slug)) {
      invalid.push({ page, reason: "Invalid slug format" });
      continue;
    }

    valid.push(page);
  }

  return { valid, invalid };
}

// Main seeding function
async function seedDatabase() {
  console.log("🌱 Starting database seeding...");
  console.log("=====================================");

  try {
    // Initialize Supabase client
    const supabase = createAdminClient();
    console.log("✅ Connected to Supabase");

    // Check if pages already exist
    const { count: existingCount } = await supabase
      .from("pages")
      .select("*", { count: "exact", head: true });

    if (existingCount && existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing pages in database`);
      console.log("   This script will add new pages (duplicates possible)");
      console.log(
        "   Consider clearing the pages table first if you want a fresh start",
      );
      console.log("");
    }

    // Generate all pages
    console.log("📄 Generating pages...");
    const hubPages = generateHubPages();
    const keywordPages = generateKeywordPages();
    const allPages = [...hubPages, ...keywordPages];

    console.log(`📊 Generation Summary:`);
    console.log(`   Hub pages: ${hubPages.length}`);
    console.log(`   Keyword pages: ${keywordPages.length}`);
    console.log(`   Total pages: ${allPages.length}`);
    console.log("");

    // Validate pages
    console.log("🔍 Validating page data...");
    const { valid, invalid } = validatePages(allPages);

    if (invalid.length > 0) {
      console.log(`⚠️  Found ${invalid.length} invalid pages:`);
      invalid.forEach((item, index) => {
        console.log(
          `   ${index + 1}. ${item.reason}: ${item.page.slug || "no slug"}`,
        );
      });
      console.log("");
    }

    console.log(`✅ ${valid.length} pages validated successfully`);
    console.log("");

    // Insert pages in batches
    console.log("💾 Inserting pages into database...");
    const insertedPages = await batchInsertPages(supabase, valid);

    console.log("");
    console.log("🎉 Seeding completed successfully!");
    console.log("=====================================");
    console.log(`📈 Final Statistics:`);
    console.log(`   Hub pages: ${hubPages.length}`);
    console.log(`   Keyword pages: ${keywordPages.length}`);
    console.log(`   Total pages generated: ${allPages.length}`);
    console.log(`   Pages validated: ${valid.length}`);
    console.log(`   Pages inserted: ${insertedPages.length}`);
    console.log(`   Pages failed: ${invalid.length}`);
    console.log(
      `   Expected total: ${15 + 15 * 3 * 25} (${15} hubs + ${15 * 3 * 25} keyword pages)`,
    );
    console.log("");

    // Breakdown by service
    const serviceBreakdown = SERVICES.reduce(
      (acc, service) => {
        const servicePages = insertedPages.filter((p) => p.service === service);
        acc[service] = servicePages.length;
        return acc;
      },
      {} as Record<string, number>,
    );

    console.log(`📊 Pages by Service:`);
    Object.entries(serviceBreakdown).forEach(([service, count]) => {
      const serviceName = service
        .replace("_", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      console.log(`   ${serviceName}: ${count} pages`);
    });
    console.log("");

    // Breakdown by city
    console.log(`🏙️  Pages by City:`);
    const cityBreakdown = SALT_LAKE_COUNTY_CITIES.reduce(
      (acc, city) => {
        const cityPages = insertedPages.filter((p) => p.city === city);
        acc[city] = cityPages.length;
        return acc;
      },
      {} as Record<string, number>,
    );

    Object.entries(cityBreakdown).forEach(([city, count]) => {
      console.log(`   ${city}: ${count} pages`);
    });

    console.log("");
    console.log("✅ All pages have been successfully seeded!");
    console.log("🚀 Your SEO platform is ready to go!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    console.log("");
    console.log("🔧 Troubleshooting tips:");
    console.log("   1. Check your environment variables are set correctly");
    console.log("   2. Ensure your database schema is up to date");
    console.log(
      "   3. Verify your Supabase service role key has the correct permissions",
    );
    console.log("   4. Check the database logs in your Supabase dashboard");

    process.exit(1);
  }
}

// Utility function to clear existing pages (use with caution)
async function clearExistingPages() {
  console.log("🧹 Clearing existing pages...");

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("pages")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

  if (error) {
    console.error("❌ Error clearing pages:", error);
    throw error;
  }

  console.log("✅ Existing pages cleared");
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--clear")) {
    await clearExistingPages();
    console.log("");
  }

  await seedDatabase();
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

// Generate city hub content
function generateCityHubContent(city: string): any {
  const neighborhoods = CITY_NEIGHBORHOODS[city] || [];
  const isMurray = city === "Murray";

  return {
    hero_text: `Professional Construction Services in ${city}, Utah`,
    service_description: `${BUSINESS_INFO.name} provides comprehensive construction services throughout ${city} and surrounding areas. From flooring installation to demolition and junk removal, our experienced team delivers quality results with exceptional customer service. ${isMurray ? `Located right here in ${city} at ${BUSINESS_INFO.address}, ` : ""}Contact us at ${BUSINESS_INFO.phone} for your free estimate.`,
    city_description: `Proudly serving ${city} and neighborhoods including ${neighborhoods.slice(0, 3).join(", ")}, and surrounding areas throughout Salt Lake County. ${isMurray ? `Our main office is conveniently located in ${city} for fast, local service.` : ""}`,
    features: [
      "Licensed and insured contractors",
      `${BUSINESS_INFO.yearsExperience} years of experience`,
      "Free estimates and consultations",
      "Quality materials and workmanship",
      "Customer satisfaction guarantee",
      "Same-day service available",
      `Local Murray, UT business at ${BUSINESS_INFO.address}`,
      "WhatsApp messaging available for quick communication",
    ],
    testimonials: [
      {
        name: "Mike S.",
        text: `Excellent work! ${BUSINESS_INFO.name} completed our project in ${city} professionally and on time. Called ${BUSINESS_INFO.phone} and they were out the next day. Highly recommend!`,
        rating: 5,
      },
      {
        name: "Sarah M.",
        text: `Professional and reliable contractors. ${BUSINESS_INFO.name} exceeded our expectations and left everything clean. Great experience in ${city}.`,
        rating: 5,
      },
      {
        name: "David J.",
        text: `Top-notch construction services in ${city}. ${BUSINESS_INFO.name}'s crew was skilled and courteous. Would definitely use them again.`,
        rating: 5,
      },
    ],
    faq: [
      {
        question: `What construction services does ${BUSINESS_INFO.name} offer in ${city}?`,
        answer: `${BUSINESS_INFO.name} provides flooring installation, demolition services, and junk removal throughout ${city}. Our experienced team handles both residential and commercial projects with professional results. Contact us at ${BUSINESS_INFO.phone} or ${BUSINESS_INFO.email} for more information.`,
      },
      {
        question: `Is ${BUSINESS_INFO.name} licensed and insured in ${city}?`,
        answer: `Yes, ${BUSINESS_INFO.name} is fully licensed and insured to operate in ${city} and throughout Utah. We carry comprehensive liability insurance and workers' compensation coverage for your protection.`,
      },
      {
        question: `Does ${BUSINESS_INFO.name} provide free estimates in ${city}?`,
        answer: `Absolutely! ${BUSINESS_INFO.name} offers free, no-obligation estimates for all construction services in ${city}. Call ${BUSINESS_INFO.phone} or email ${BUSINESS_INFO.email} to schedule your consultation.`,
      },
      {
        question: `What areas of ${city} do you serve?`,
        answer: `We serve all areas of ${city} including ${neighborhoods.join(", ")} and surrounding neighborhoods throughout Salt Lake County.`,
      },
      {
        question: `How quickly can ${BUSINESS_INFO.name} start my project in ${city}?`,
        answer: `${BUSINESS_INFO.name} typically can start construction projects in ${city} within 1-2 weeks, depending on project scope and schedule. Emergency services are available for urgent needs. Call ${BUSINESS_INFO.phone} for immediate scheduling.`,
      },
    ],
    cta_text: `Ready to start your construction project in ${city}? Contact ${BUSINESS_INFO.name} at ${BUSINESS_INFO.phone} or email ${BUSINESS_INFO.email} for a free estimate today!`,
    sections: [
      {
        title: `Why Choose ${BUSINESS_INFO.name} in ${city}?`,
        content: `With ${BUSINESS_INFO.yearsExperience} years of experience serving ${city}, ${BUSINESS_INFO.name} has built a reputation for excellence in construction services. Located at ${BUSINESS_INFO.address}${isMurray ? " right in your community" : ""}, our team combines expertise with quality materials to deliver results that exceed expectations. We understand the unique needs of ${city} residents and businesses. Call ${BUSINESS_INFO.phone} to experience the difference.`,
      },
      {
        title: `${BUSINESS_INFO.name} Services in ${city}`,
        content: `Flooring Installation: From hardwood and laminate to luxury vinyl plank (LVP), ${BUSINESS_INFO.name} provides professional flooring installation services throughout ${city}.\n\nDemolition Services: Safe and efficient demolition for residential and commercial properties, including interior demolition and debris removal.\n\nJunk Removal: Comprehensive junk removal and cleanout services for homes, offices, and construction sites in ${city} and surrounding areas.\n\nContact ${BUSINESS_INFO.phone} for all your construction needs in ${city}.`,
      },
      {
        title: `Serving ${city} Communities`,
        content: `${BUSINESS_INFO.name} is proud to serve homeowners and businesses throughout ${city}, including ${neighborhoods.join(", ")}. ${isMurray ? `With our office located right in ${city}, we provide fast, local service to all neighborhoods. ` : ""}Our local knowledge and commitment to the community ensure personalized service that meets your specific needs. Call ${BUSINESS_INFO.phone} or visit us at ${BUSINESS_INFO.address}.`,
      },
    ],
  };
}

export {
  seedDatabase,
  clearExistingPages,
  generateHubPages,
  generateKeywordPages,
  generateCityHubContent,
};
