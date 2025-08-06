import { createClient } from "@supabase/supabase-js";
import { Database, Lead, Page } from "@/types/database";

// Validate and clean environment variables
function cleanEnvVar(value: string | undefined): string | undefined {
  if (!value) return undefined;
  // Remove any trailing newlines or whitespace
  return value.trim().replace(/[\n\r]+/g, '');
}

// Create Supabase client for client-side operations
function createSupabaseClient() {
  const supabaseUrl = cleanEnvVar(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseAnonKey = cleanEnvVar(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy client that will throw errors when used
    // This prevents build-time failures
    console.warn("Supabase environment variables not configured");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return null as any;
  }
  
  // Validate URL format
  try {
    new URL(supabaseUrl);
  } catch (error) {
    console.error("Invalid NEXT_PUBLIC_SUPABASE_URL format:", supabaseUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return null as any;
  }
  
  return createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      db: {
        schema: "public",
      },
      global: {
        headers: {
          "x-application-name": "wildwest-seo",
        },
      },
    },
  );
}

// Export the client - it will be created lazily
export const supabase = createSupabaseClient();

// Create Supabase admin client for server-side operations (with service role key)
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing Supabase environment variables for server-side operations",
    );
  }

  return createClient<Database>(
    supabaseUrl,
    supabaseServiceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      db: {
        schema: "public",
      },
    },
  );
};

// Helper functions for common database operations

/**
 * Fetch a page by its slug
 */
export async function getPageBySlug(slug: string) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("Error fetching page:", error);
    return null;
  }

  // Increment page views (fire and forget)
  (async () => {
    try {
      await supabase.rpc("increment_page_views", { page_uuid: data.id });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  })();

  return data;
}

/**
 * Fetch all published pages
 */
export async function getPublishedPages() {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pages:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch pages by city
 */
export async function getPagesByCity(city: string) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("city", city)
    .eq("published", true)
    .order("service", { ascending: true });

  if (error) {
    console.error("Error fetching pages by city:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch pages by service
 */
export async function getPagesByService(
  service: "flooring" | "demolition" | "junk_removal",
) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("service", service)
    .eq("published", true)
    .order("city", { ascending: true });

  if (error) {
    console.error("Error fetching pages by service:", error);
    return [];
  }

  return data || [];
}

/**
 * Submit a lead from a contact form
 */
export async function submitLead(leadData: {
  name: string;
  email: string;
  phone?: string;
  city: string;
  service: "flooring" | "demolition" | "junk_removal";
  message?: string;
  page_id?: string;
  source_url?: string;
}) {
  const { data, error } = await supabase
    .from("leads")
    .insert([
      {
        ...leadData,
        ip_address: undefined, // Will be set server-side for security
        user_agent:
          typeof window !== "undefined"
            ? window.navigator.userAgent
            : undefined,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error submitting lead:", error);
    throw error;
  }

  return data;
}

/**
 * Track page analytics
 */
export async function trackPageView(
  pageId: string,
  analytics: {
    visitor_id?: string;
    session_id?: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    device_type?: string;
    browser?: string;
  },
) {
  const { error } = await supabase.from("page_analytics").insert([
    {
      page_id: pageId,
      ...analytics,
    },
  ]);

  if (error) {
    console.error("Error tracking page view:", error);
  }
}

/**
 * Get leads summary (admin only - requires auth)
 */
export async function getLeadsSummary() {
  const { data, error } = await supabase.rpc("get_leads_summary");

  if (error) {
    console.error("Error fetching leads summary:", error);
    return [];
  }

  return data || [];
}

// Real-time subscriptions

/**
 * Subscribe to new leads in real-time
 */
export function subscribeToLeads(callback: (lead: Lead) => void) {
  return supabase
    .channel("leads_channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "leads",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (payload: any) => {
        callback(payload.new as Lead);
      },
    )
    .subscribe();
}

/**
 * Subscribe to page updates in real-time
 */
export function subscribeToPageUpdates(
  pageId: string,
  callback: (page: Page) => void,
) {
  return supabase
    .channel(`page_${pageId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "pages",
        filter: `id=eq.${pageId}`,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (payload: any) => {
        callback(payload.new as Page);
      },
    )
    .subscribe();
}

// Export types
export type { Database } from "@/types/database";
