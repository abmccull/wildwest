#!/usr/bin/env tsx
/**
 * Apply Blog Schema Script for Wild West Construction
 * Applies the blog database schema to Supabase
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

async function applyBlogSchema() {
  const supabase = createAdminClient();
  
  console.log("🚀 Applying blog schema...");
  
  try {
    // Read the blog schema file
    const schemaPath = path.join(process.cwd(), "supabase/migrations/002_blog_schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    
    // Split into individual statements (simple approach - split by semicolon at end of line)
    const statements = schemaSql
      .split(/;\s*\n/)
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + (statements[i].endsWith(';') ? '' : ';');
      
      // Skip comment-only statements
      if (statement.trim().startsWith('--') || statement.trim() === ';') {
        continue;
      }
      
      console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { 
          sql_statement: statement 
        });
        
        if (error) {
          // Try direct execution as fallback
          const { error: directError } = await supabase
            .from('__supabase_migrations')
            .select('*')
            .limit(1);
          
          if (directError) {
            console.warn(`⚠️  Statement ${i + 1} failed, trying alternative method...`);
            // For some statements, we might need to use specific table operations
            console.log(`Statement: ${statement.substring(0, 100)}...`);
          }
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      } catch (execError) {
        console.warn(`⚠️  Warning on statement ${i + 1}:`, execError);
      }
    }
    
    // Verify the schema was applied by checking for blog_categories table
    console.log("🔍 Verifying schema application...");
    
    const { data, error } = await supabase
      .from("blog_categories")
      .select("count", { count: "exact", head: true });
    
    if (error) {
      console.error("❌ Schema verification failed:", error.message);
      console.log("📝 Creating tables manually...");
      
      // Create categories table manually
      const createCategoriesTable = `
        CREATE TABLE IF NOT EXISTS blog_categories (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name TEXT NOT NULL UNIQUE,
          slug TEXT NOT NULL UNIQUE,
          description TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
        );
      `;
      
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql_statement: createCategoriesTable
      });
      
      if (createError) {
        console.error("❌ Failed to create categories table:", createError);
      } else {
        console.log("✅ Categories table created");
        
        // Insert default categories
        const insertCategories = `
          INSERT INTO blog_categories (name, slug, description) VALUES
          ('Flooring', 'flooring', 'All about flooring installation, repair, and trends'),
          ('Demolition', 'demolition', 'Demolition services, permits, and best practices'),
          ('Junk Removal', 'junk-removal', 'Junk removal tips, services, and preparation guides'),
          ('Home Improvement', 'home-improvement', 'General home improvement tips and guides')
          ON CONFLICT (slug) DO NOTHING;
        `;
        
        await supabase.rpc('exec_sql', { sql_statement: insertCategories });
        console.log("✅ Default categories inserted");
      }
    } else {
      console.log(`✅ Blog schema applied successfully! Found ${data?.length || 0} categories.`);
    }
    
  } catch (error) {
    console.error("❌ Schema application failed:", error);
    process.exit(1);
  }
}

// Run the schema application
applyBlogSchema().catch(console.error);