// Test script to verify the production fix will work
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// Load production environment variables
dotenv.config({ path: ".env.production" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function testProductionFix() {
  console.log("🧪 Testing production blog fix...");
  
  try {
    // Test the exact same call that the blog page makes
    const { data: posts, error } = await supabase.rpc("get_blog_posts", {
      page_num: 1,
      page_size: 12,
      filter_category_slug: null,
      search_term: null,
    });
    
    if (error) {
      console.error("❌ Function call failed:", error.message);
      return;
    }
    
    console.log(`✅ Success! Found ${posts.length} blog posts`);
    
    if (posts.length > 0) {
      console.log("\n📝 Sample posts:");
      posts.slice(0, 3).forEach((post, i) => {
        console.log(`   ${i + 1}. ${post.title}`);
        console.log(`      Category: ${post.category_name}`);
        console.log(`      Slug: ${post.slug}`);
      });
      
      console.log("\n🎉 Production fix successful!");
      console.log("📅 Deployment may take 2-5 minutes to show changes");
      console.log("🌐 Check: https://wildwestslc.com/blog");
    } else {
      console.log("⚠️  No posts returned (but function call succeeded)");
    }
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testProductionFix();