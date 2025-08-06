#!/usr/bin/env tsx
/**
 * Import Blog Posts Script for Wild West Construction
 * Imports all markdown blog posts from blog-posts folder into Supabase
 */

import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

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

// Blog post data structure
interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_description: string;
  category: string;
  tags: string[];
}

// Map of blog posts to their data
const blogPosts: BlogPost[] = [
  // Flooring Posts
  {
    title: "The Utah Homeowner's Guide to Winter-Proof Flooring",
    slug: "utah-winter-proof-flooring-guide",
    excerpt: "Protect your flooring investment from Utah's harsh winters. Learn how to combat salt damage, temperature swings, and moisture issues with the right materials and maintenance.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/utah-winter-proof-flooring-guide.md"), "utf-8"),
    meta_description: "Protect Utah flooring from winter salt damage & temperature swings. Expert tips for material selection & maintenance.",
    category: "flooring",
    tags: ["winter flooring", "salt damage", "Utah weather", "flooring maintenance", "temperature protection"]
  },
  {
    title: "Basement Flooring in Utah: Solving Moisture Problems",
    slug: "utah-basement-flooring-solutions",
    excerpt: "Utah's unique soil conditions and climate create specific basement flooring challenges. Discover moisture-resistant solutions that work with our local conditions.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/utah-basement-flooring-solutions.md"), "utf-8"),
    meta_description: "Utah basement flooring solutions for moisture & foundation issues. Expert guide to materials that work in Salt Lake Valley.",
    category: "flooring",
    tags: ["basement flooring", "moisture control", "foundation settling", "Utah homes", "waterproofing"]
  },
  {
    title: "Flooring for Active Utah Families: Durability Meets Style",
    slug: "flooring-active-utah-families",
    excerpt: "Find the perfect flooring that stands up to Utah's outdoor lifestyle. From muddy boots to ski equipment, discover materials that handle it all while looking great.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/flooring-active-utah-families.md"), "utf-8"),
    meta_description: "Durable flooring options for active Utah families. Handle outdoor gear, pets & high traffic with style.",
    category: "flooring",
    tags: ["family flooring", "durable materials", "pet-friendly", "high traffic", "Utah lifestyle"]
  },
  {
    title: "The Real Cost of Flooring in Salt Lake City: 2025 Pricing Guide",
    slug: "flooring-cost-guide-salt-lake-city-2025",
    excerpt: "Get accurate, local pricing for flooring projects in Salt Lake City. Compare materials, installation costs, and discover ways to maximize your budget.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/flooring-cost-guide-salt-lake-city-2025.md"), "utf-8"),
    meta_description: "2025 Salt Lake City flooring costs: Real pricing for materials & installation. Budget guide with local insights.",
    category: "flooring",
    tags: ["flooring costs", "pricing guide", "Salt Lake City", "budget planning", "2025 prices"]
  },
  {
    title: "Sustainable Flooring Options for Eco-Conscious Utah Homeowners",
    slug: "sustainable-flooring-utah-eco-friendly",
    excerpt: "Explore environmentally friendly flooring options that align with Utah's commitment to sustainability. From reclaimed materials to low-VOC options.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/sustainable-flooring-utah-eco-friendly.md"), "utf-8"),
    meta_description: "Eco-friendly flooring options for Utah homes. Sustainable materials, low-VOC choices & green building standards.",
    category: "flooring",
    tags: ["sustainable flooring", "eco-friendly", "green building", "low-VOC", "LEED certified"]
  },

  // Demolition Posts
  {
    title: "Navigating Salt Lake City's Historic Demolition Rules After 2024",
    slug: "salt-lake-historic-demolition-rules-2024",
    excerpt: "Salt Lake City tightened historic demolition rules after the 2024 Fifth Ward controversy. Learn the new requirements before your permit gets denied.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/salt-lake-historic-demolition-rules-2024.md"), "utf-8"),
    meta_description: "Salt Lake City tightened historic demolition rules after Easter 2024 controversy. Learn new requirements.",
    category: "demolition",
    tags: ["historic preservation", "demolition permits", "Salt Lake City", "2024 regulations", "building codes"]
  },
  {
    title: "Hidden Costs of Demolishing Pre-1978 Utah Homes",
    slug: "hidden-costs-pre-1978-utah-homes-demolition",
    excerpt: "Pre-1978 home demolition in Utah can cost $15,000+ more than expected. Learn about asbestos, lead paint, and legal requirements before you start.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/hidden-costs-pre-1978-utah-homes-demolition.md"), "utf-8"),
    meta_description: "Pre-1978 Utah home demolition can cost $15,000+ more. Learn about asbestos, lead & legal requirements.",
    category: "demolition",
    tags: ["asbestos removal", "lead paint", "pre-1978 homes", "demolition costs", "hazardous materials"]
  },
  {
    title: "Earthquake-Proofing Your Demolition: Salt Lake City's Seismic Risks",
    slug: "earthquake-proofing-demolition-salt-lake-city",
    excerpt: "Salt Lake City sits on a major fault line. Learn how seismic risks affect demolition decisions and when rebuilding beats retrofitting.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/earthquake-proofing-demolition-salt-lake-city.md"), "utf-8"),
    meta_description: "Salt Lake City demolition & earthquake risks. Learn when to demolish vs retrofit for seismic safety.",
    category: "demolition",
    tags: ["earthquake safety", "seismic risk", "Wasatch Fault", "structural assessment", "building safety"]
  },
  {
    title: "DIY Demolition in Utah: Legal Limits and Safety Requirements",
    slug: "utah-diy-demolition-legal-limits-guide",
    excerpt: "Know exactly what demolition work you can legally do yourself in Utah. Avoid fines, stay safe, and understand when you need professionals.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/utah-diy-demolition-legal-limits-guide.md"), "utf-8"),
    meta_description: "Utah DIY demolition legal guide: What you can and can't do yourself. Avoid fines & stay safe.",
    category: "demolition",
    tags: ["DIY demolition", "legal requirements", "safety guidelines", "permits", "Utah regulations"]
  },
  {
    title: "Commercial Demolition in Salt Lake City Business Districts",
    slug: "salt-lake-commercial-demolition-business-district-guide",
    excerpt: "Navigate the complex requirements for commercial demolition in downtown SLC and Sugar House. From permits to parking, get it right the first time.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/salt-lake-commercial-demolition-business-district-guide.md"), "utf-8"),
    meta_description: "Salt Lake City commercial demolition guide: Business district requirements, permits & regulations.",
    category: "demolition",
    tags: ["commercial demolition", "business districts", "downtown SLC", "permits", "regulations"]
  },

  // Junk Removal Posts
  {
    title: "Complete Salt Lake City Guide to Free and Low-Cost Junk Disposal",
    slug: "salt-lake-city-junk-removal-guide",
    excerpt: "Save hundreds on junk removal with Salt Lake City's free programs. Learn about Call 2 Haul, transfer stations, and seasonal cleanup events.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/salt-lake-city-junk-removal-guide.md"), "utf-8"),
    meta_description: "Save money on Salt Lake City junk removal. Free Call 2 Haul program, transfer stations & disposal guide.",
    category: "junk-removal",
    tags: ["junk removal", "Call 2 Haul", "free disposal", "Salt Lake City", "waste management"]
  },
  {
    title: "Estate Cleanouts and Senior Downsizing in Salt Lake City",
    slug: "estate-cleanouts-senior-downsizing-salt-lake-city",
    excerpt: "Compassionate guide to estate cleanouts and senior transitions in Salt Lake City. Local resources, donation centers, and emotional support tips.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/estate-cleanouts-senior-downsizing-salt-lake-city.md"), "utf-8"),
    meta_description: "Compassionate estate cleanout guide for Salt Lake City. Senior downsizing resources & local support.",
    category: "junk-removal",
    tags: ["estate cleanout", "senior downsizing", "donation centers", "emotional support", "Salt Lake City"]
  },
  {
    title: "Post-Renovation Cleanup: Utah Construction Debris Disposal Rules",
    slug: "post-renovation-cleanup-utah-construction-debris",
    excerpt: "Know Utah's rules for construction debris disposal. Where to take materials, recycling options, and cost-effective cleanup strategies.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/post-renovation-cleanup-utah-construction-debris.md"), "utf-8"),
    meta_description: "Utah construction debris disposal guide: Rules, recycling options & transfer station locations.",
    category: "junk-removal",
    tags: ["construction debris", "renovation cleanup", "recycling", "disposal rules", "Utah"]
  },
  {
    title: "Hoarding Cleanup in Salt Lake City: Resources and Support",
    slug: "hoarding-cleanup-salt-lake-city-resources-support",
    excerpt: "Sensitive, supportive guide to hoarding cleanup in Salt Lake City. Mental health resources, specialized services, and step-by-step assistance.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/hoarding-cleanup-salt-lake-city-resources-support.md"), "utf-8"),
    meta_description: "Salt Lake City hoarding cleanup support: Mental health resources & compassionate cleanup services.",
    category: "junk-removal",
    tags: ["hoarding cleanup", "mental health support", "specialized services", "Salt Lake City", "compassionate care"]
  },
  {
    title: "Seasonal Junk Removal Calendar for Salt Lake City Homeowners",
    slug: "seasonal-junk-removal-calendar-salt-lake-city",
    excerpt: "Month-by-month guide to optimal junk removal timing in Salt Lake City. Align cleanouts with city programs and weather patterns for best results.",
    content: fs.readFileSync(path.join(process.cwd(), "blog-posts/seasonal-junk-removal-calendar-salt-lake-city.md"), "utf-8"),
    meta_description: "Salt Lake City seasonal junk removal calendar: Best times for cleanouts aligned with city programs.",
    category: "junk-removal",
    tags: ["seasonal cleanup", "junk removal calendar", "city programs", "Salt Lake City", "home maintenance"]
  }
];

async function importBlogPosts() {
  const supabase = createAdminClient();
  
  console.log("🚀 Starting blog post import...");
  
  try {
    // Get category IDs
    const { data: categories, error: catError } = await supabase
      .from("blog_categories")
      .select("id, slug");
    
    if (catError) {
      throw new Error(`Failed to fetch categories: ${catError.message}`);
    }
    
    const categoryMap = new Map(categories.map(c => [c.slug, c.id]));
    
    // Process each blog post
    for (const post of blogPosts) {
      const categoryId = categoryMap.get(post.category);
      
      if (!categoryId) {
        console.error(`❌ Category not found: ${post.category}`);
        continue;
      }
      
      // Check if post already exists
      const { data: existing } = await supabase
        .from("blog_posts")
        .select("id")
        .eq("slug", post.slug)
        .single();
      
      if (existing) {
        console.log(`⏭️  Skipping existing post: ${post.title}`);
        continue;
      }
      
      // Insert new post
      const { error: insertError } = await supabase
        .from("blog_posts")
        .insert({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          meta_description: post.meta_description,
          category_id: categoryId,
          tags: post.tags,
          published: true,
          published_at: new Date().toISOString(),
          author: "Wild West Construction Team",
          featured: false,
          views: 0
        });
      
      if (insertError) {
        console.error(`❌ Failed to insert "${post.title}":`, insertError.message);
      } else {
        console.log(`✅ Imported: ${post.title}`);
      }
    }
    
    console.log("\n🎉 Blog post import complete!");
    
    // Show summary
    const { count } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true });
    
    console.log(`📊 Total blog posts in database: ${count}`);
    
  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  }
}

// Run the import
importBlogPosts().catch(console.error);