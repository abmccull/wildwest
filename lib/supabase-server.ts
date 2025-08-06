/**
 * Server-side Supabase client for Next.js App Router
 * Use this for server components and API routes
 */

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

// Validate and clean environment variables
function cleanEnvVar(value: string | undefined): string | undefined {
  if (!value) return undefined;
  // Remove any trailing newlines or whitespace
  return value.trim().replace(/[\n\r]+/g, '');
}

/**
 * Create a Supabase client for server-side operations
 */
export async function createServerClient() {
  const supabaseUrl = cleanEnvVar(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseAnonKey = cleanEnvVar(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }
  
  // Validate URL format
  try {
    new URL(supabaseUrl);
  } catch (error) {
    throw new Error(`Invalid NEXT_PUBLIC_SUPABASE_URL format: ${supabaseUrl}`);
  }
  
  return createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

/**
 * Create a Supabase admin client for privileged operations
 * WARNING: Only use this for server-side operations that require admin access
 */
export function createAdminClient() {
  const supabaseUrl = cleanEnvVar(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseServiceKey = cleanEnvVar(process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables for admin client");
  }
  
  // Validate URL format
  try {
    new URL(supabaseUrl);
  } catch (error) {
    throw new Error(`Invalid NEXT_PUBLIC_SUPABASE_URL format: ${supabaseUrl}`);
  }

  return createClient<Database>(
    supabaseUrl,
    supabaseServiceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

/**
 * Server-side function to fetch all leads (admin only)
 */
export async function getLeads() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
    return [];
  }

  return data || [];
}

/**
 * Server-side function to update lead status
 */
export async function updateLeadStatus(
  leadId: string,
  status: Database["public"]["Enums"]["lead_status"],
) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId)
    .select()
    .single();

  if (error) {
    console.error("Error updating lead status:", error);
    throw error;
  }

  return data;
}

/**
 * Server-side function to create or update a page
 */
export async function upsertPage(
  page: Database["public"]["Tables"]["pages"]["Insert"],
) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("pages")
    .upsert(page)
    .select()
    .single();

  if (error) {
    console.error("Error upserting page:", error);
    throw error;
  }

  return data;
}

/**
 * Server-side function to bulk create pages
 */
export async function bulkCreatePages(
  pages: Database["public"]["Tables"]["pages"]["Insert"][],
) {
  const supabase = createAdminClient();

  const { data, error } = await supabase.from("pages").insert(pages).select();

  if (error) {
    console.error("Error bulk creating pages:", error);
    throw error;
  }

  return data || [];
}

/**
 * Server-side function to get analytics for a specific page
 */
export async function getPageAnalytics(pageId: string, days: number = 30) {
  const supabase = createAdminClient();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("page_analytics")
    .select("*")
    .eq("page_id", pageId)
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching page analytics:", error);
    return [];
  }

  return data || [];
}

/**
 * Server-side function to get aggregated analytics
 */
export async function getAnalyticsSummary() {
  const supabase = createAdminClient();

  const { data: pages, error: pagesError } = await supabase
    .from("pages")
    .select("id, slug, city, service, views")
    .order("views", { ascending: false })
    .limit(10);

  if (pagesError) {
    console.error("Error fetching pages for analytics:", pagesError);
    return { topPages: [], totalViews: 0 };
  }

  const totalViews =
    pages?.reduce((sum, page) => sum + (page.views || 0), 0) || 0;

  return {
    topPages: pages || [],
    totalViews,
  };
}

/**
 * Server-side function to search pages
 */
export async function searchPages(query: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .or(
      `city.ilike.%${query}%,keyword.ilike.%${query}%,meta_title.ilike.%${query}%`,
    )
    .eq("published", true)
    .limit(10);

  if (error) {
    console.error("Error searching pages:", error);
    return [];
  }

  return data || [];
}
