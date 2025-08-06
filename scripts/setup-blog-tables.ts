#!/usr/bin/env tsx
/**
 * Setup Blog Tables Script for Wild West Construction
 * Creates the essential blog tables directly via Supabase
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase admin client
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing required environment variables");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function setupBlogTables() {
  const supabase = createAdminClient();
  
  console.log("🚀 Setting up blog tables...");
  
  try {
    // First, let's check if we can insert categories directly
    console.log("📝 Creating blog categories...");
    
    const categories = [
      { name: 'Flooring', slug: 'flooring', description: 'All about flooring installation, repair, and trends' },
      { name: 'Demolition', slug: 'demolition', description: 'Demolition services, permits, and best practices' },
      { name: 'Junk Removal', slug: 'junk-removal', description: 'Junk removal tips, services, and preparation guides' },
      { name: 'Home Improvement', slug: 'home-improvement', description: 'General home improvement tips and guides' }
    ];
    
    // Try to insert categories one by one
    for (const category of categories) {
      const { error } = await supabase
        .from('blog_categories')
        .upsert(category, { onConflict: 'slug' });
      
      if (error) {
        console.error(`❌ Failed to insert category ${category.name}:`, error.message);
      } else {
        console.log(`✅ Category created/updated: ${category.name}`);
      }
    }
    
    // Verify categories exist
    const { data: categoriesData, error: catError } = await supabase
      .from('blog_categories')
      .select('*');
    
    if (catError) {
      throw new Error(`Categories table not accessible: ${catError.message}`);
    }
    
    console.log(`✅ Found ${categoriesData.length} categories in database`);
    
    // Check if blog_posts table is accessible
    const { error: postsError } = await supabase
      .from('blog_posts')
      .select('count', { count: 'exact', head: true });
    
    if (postsError) {
      console.error(`❌ Blog posts table not accessible: ${postsError.message}`);
      console.log("🔧 You may need to apply the blog schema migration manually through Supabase dashboard");
    } else {
      console.log("✅ Blog posts table is accessible");
    }
    
  } catch (error) {
    console.error("❌ Setup failed:", error);
    
    // If tables don't exist, provide instructions
    console.log("\n📋 Manual Setup Instructions:");
    console.log("1. Go to your Supabase dashboard: https://supabase.com/dashboard");
    console.log("2. Navigate to SQL Editor");
    console.log("3. Copy and paste the content of supabase/migrations/002_blog_schema.sql");
    console.log("4. Run the migration");
    console.log("5. Then run this script again");
    
    process.exit(1);
  }
}

// Run the setup
setupBlogTables().catch(console.error);