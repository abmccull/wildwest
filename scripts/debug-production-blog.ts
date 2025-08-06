#!/usr/bin/env tsx
/**
 * Debug Production Blog Script
 * Checks what's wrong with blog post retrieval in production
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Load production environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase admin client for production
function createProdAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
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

async function debugProductionBlog() {
  console.log("🔍 Debugging production blog...");
  
  const supabase = createProdAdminClient();
  
  try {
    // 1. Check raw blog posts
    console.log("📋 Step 1: Checking raw blog posts...");
    const { data: rawPosts, error: rawError } = await supabase
      .from("blog_posts")
      .select("title, slug, published, created_at")
      .eq("published", true);
    
    if (rawError) {
      throw new Error(`Failed to fetch raw posts: ${rawError.message}`);
    }
    
    console.log(`✅ Found ${rawPosts.length} published posts`);
    rawPosts.slice(0, 3).forEach(post => {
      console.log(`   • ${post.title} (${post.slug})`);
    });
    
    // 2. Try the get_blog_posts function with different parameters
    console.log("\n📋 Step 2: Testing get_blog_posts function...");
    
    try {
      // Try with old parameter name (category_slug)
      const { data: oldParams, error: oldError } = await supabase.rpc("get_blog_posts", {
        page_num: 1,
        page_size: 5,
        category_slug: null,
        search_term: null
      });
      
      if (oldError) {
        console.log("❌ Old parameter name failed:", oldError.message);
      } else {
        console.log(`✅ Old parameter name worked! Found ${oldParams.length} posts`);
      }
    } catch (e) {
      console.log("❌ Old parameter name failed:", e);
    }
    
    try {
      // Try with new parameter name (filter_category_slug)
      const { data: newParams, error: newError } = await supabase.rpc("get_blog_posts", {
        page_num: 1,
        page_size: 5,
        filter_category_slug: null,
        search_term: null
      });
      
      if (newError) {
        console.log("❌ New parameter name failed:", newError.message);
      } else {
        console.log(`✅ New parameter name worked! Found ${newParams.length} posts`);
      }
    } catch (e) {
      console.log("❌ New parameter name failed:", e);
    }
    
    // 3. Check if the function exists
    console.log("\n📋 Step 3: Checking function existence...");
    const { data: functions, error: funcError } = await supabase
      .from("pg_proc")
      .select("proname")
      .eq("proname", "get_blog_posts");
    
    if (funcError) {
      console.log("⚠️  Cannot check function existence:", funcError.message);
    } else if (functions && functions.length > 0) {
      console.log("✅ get_blog_posts function exists");
    } else {
      console.log("❌ get_blog_posts function does not exist");
    }
    
    // 4. Manual join query
    console.log("\n📋 Step 4: Testing manual query...");
    const { data: manualPosts, error: manualError } = await supabase
      .from("blog_posts")
      .select(`
        id,
        title,
        slug,
        excerpt,
        author,
        blog_categories!blog_posts_category_id_fkey (
          name,
          slug
        ),
        featured_image,
        tags,
        published,
        featured,
        views,
        reading_time,
        published_at,
        created_at
      `)
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(5);
    
    if (manualError) {
      console.log("❌ Manual query failed:", manualError.message);
    } else {
      console.log(`✅ Manual query worked! Found ${manualPosts.length} posts`);
      if (manualPosts.length > 0) {
        console.log("Sample post structure:", JSON.stringify(manualPosts[0], null, 2));
      }
    }
    
  } catch (error) {
    console.error("❌ Debug failed:", error);
  }
}

// Run the debug
debugProductionBlog().catch(console.error);