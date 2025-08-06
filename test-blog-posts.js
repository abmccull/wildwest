// Quick test script to verify blog posts are working
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function testBlogPosts() {
  console.log("🧪 Testing blog post functionality...");
  
  try {
    // Test categories
    console.log("📂 Testing categories...");
    const { data: categories, error: catError } = await supabase
      .from("blog_categories")
      .select("*");
    
    if (catError) throw catError;
    console.log(`✅ Found ${categories.length} categories`);
    
    // Test blog posts
    console.log("📝 Testing blog posts...");
    const { data: posts, error: postsError } = await supabase
      .from("blog_posts")
      .select("title, slug, published, category_id")
      .eq("published", true);
    
    if (postsError) throw postsError;
    console.log(`✅ Found ${posts.length} published blog posts`);
    
    // Test get_blog_posts function
    console.log("🔧 Testing get_blog_posts function...");
    const { data: functionPosts, error: funcError } = await supabase.rpc("get_blog_posts", {
      page_num: 1,
      page_size: 5
    });
    
    if (funcError) throw funcError;
    console.log(`✅ Function returned ${functionPosts.length} posts`);
    
    // Show sample posts
    console.log("\n📋 Sample blog posts:");
    functionPosts.slice(0, 3).forEach(post => {
      console.log(`   • ${post.title} (${post.category_name})`);
    });
    
    console.log("\n🎉 All tests passed! Blog is ready to go.");
    console.log("🌐 Visit http://localhost:3000/blog to see your posts");
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testBlogPosts();