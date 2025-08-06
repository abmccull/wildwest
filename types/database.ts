/**
 * Database types for Wild West Construction SEO Platform
 * Auto-generated types based on Supabase schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ServiceType = "flooring" | "demolition" | "junk_removal";
export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "lost";

export interface Database {
  public: {
    Tables: {
      blog_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author: string;
          category_id: string;
          featured_image: string | null;
          meta_description: string;
          meta_keywords: string | null;
          tags: string[];
          published: boolean;
          featured: boolean;
          views: number;
          reading_time: number | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author?: string;
          category_id: string;
          featured_image?: string | null;
          meta_description: string;
          meta_keywords?: string | null;
          tags?: string[];
          published?: boolean;
          featured?: boolean;
          views?: number;
          reading_time?: number | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          author?: string;
          category_id?: string;
          featured_image?: string | null;
          meta_description?: string;
          meta_keywords?: string | null;
          tags?: string[];
          published?: boolean;
          featured?: boolean;
          views?: number;
          reading_time?: number | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_post_analytics: {
        Row: {
          id: string;
          post_id: string;
          visitor_id: string | null;
          session_id: string | null;
          referrer: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          device_type: string | null;
          browser: string | null;
          country: string | null;
          region: string | null;
          city: string | null;
          ip_address: string | null;
          duration: number | null;
          scroll_depth: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          visitor_id?: string | null;
          session_id?: string | null;
          referrer?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          device_type?: string | null;
          browser?: string | null;
          country?: string | null;
          region?: string | null;
          city?: string | null;
          ip_address?: string | null;
          duration?: number | null;
          scroll_depth?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          visitor_id?: string | null;
          session_id?: string | null;
          referrer?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          device_type?: string | null;
          browser?: string | null;
          country?: string | null;
          region?: string | null;
          city?: string | null;
          ip_address?: string | null;
          duration?: number | null;
          scroll_depth?: number | null;
          created_at?: string;
        };
      };
      pages: {
        Row: {
          id: string;
          slug: string;
          city: string;
          service: ServiceType;
          keyword: string;
          meta_title: string;
          meta_description: string;
          h1: string;
          content: Json;
          published: boolean;
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          city: string;
          service: ServiceType;
          keyword: string;
          meta_title: string;
          meta_description: string;
          h1: string;
          content?: Json;
          published?: boolean;
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          city?: string;
          service?: ServiceType;
          keyword?: string;
          meta_title?: string;
          meta_description?: string;
          h1?: string;
          content?: Json;
          published?: boolean;
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          page_id: string | null;
          name: string;
          email: string;
          phone: string | null;
          city: string;
          service: ServiceType;
          message: string | null;
          source_url: string | null;
          ip_address: string | null;
          user_agent: string | null;
          status: LeadStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page_id?: string | null;
          name: string;
          email: string;
          phone?: string | null;
          city: string;
          service: ServiceType;
          message?: string | null;
          source_url?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          status?: LeadStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          page_id?: string | null;
          name?: string;
          email?: string;
          phone?: string | null;
          city?: string;
          service?: ServiceType;
          message?: string | null;
          source_url?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          status?: LeadStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      page_analytics: {
        Row: {
          id: string;
          page_id: string | null;
          visitor_id: string | null;
          session_id: string | null;
          referrer: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          device_type: string | null;
          browser: string | null;
          country: string | null;
          region: string | null;
          city: string | null;
          ip_address: string | null;
          duration: number | null;
          bounce: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id?: string | null;
          visitor_id?: string | null;
          session_id?: string | null;
          referrer?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          device_type?: string | null;
          browser?: string | null;
          country?: string | null;
          region?: string | null;
          city?: string | null;
          ip_address?: string | null;
          duration?: number | null;
          bounce?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          page_id?: string | null;
          visitor_id?: string | null;
          session_id?: string | null;
          referrer?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          device_type?: string | null;
          browser?: string | null;
          country?: string | null;
          region?: string | null;
          city?: string | null;
          ip_address?: string | null;
          duration?: number | null;
          bounce?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_leads_summary: {
        Args: Record<string, never>;
        Returns: {
          city: string;
          service: ServiceType;
          total_leads: number;
          new_leads: number;
          converted_leads: number;
        }[];
      };
      get_page_by_slug: {
        Args: {
          page_slug: string;
        };
        Returns: {
          id: string;
          slug: string;
          city: string;
          service: ServiceType;
          keyword: string;
          meta_title: string;
          meta_description: string;
          h1: string;
          content: Json;
          published: boolean;
          views: number;
          created_at: string;
          updated_at: string;
        }[];
      };
      increment_page_views: {
        Args: {
          page_uuid: string;
        };
        Returns: void;
      };
      get_blog_posts: {
        Args: {
          page_num?: number;
          page_size?: number;
          category_slug?: string;
          search_term?: string;
        };
        Returns: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          author: string;
          category_name: string;
          category_slug: string;
          featured_image: string | null;
          tags: string[];
          published: boolean;
          featured: boolean;
          views: number;
          reading_time: number | null;
          published_at: string | null;
          created_at: string;
        }[];
      };
      get_blog_post_with_related: {
        Args: {
          post_slug: string;
        };
        Returns: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author: string;
          category_name: string;
          category_slug: string;
          featured_image: string | null;
          meta_description: string;
          meta_keywords: string | null;
          tags: string[];
          published: boolean;
          featured: boolean;
          views: number;
          reading_time: number | null;
          published_at: string | null;
          created_at: string;
          related_posts: Json;
        }[];
      };
      get_blog_posts_count: {
        Args: {
          category_slug?: string;
          search_term?: string;
        };
        Returns: number;
      };
      increment_blog_post_views: {
        Args: {
          post_uuid: string;
        };
        Returns: void;
      };
    };
    Enums: {
      lead_status: "new" | "contacted" | "qualified" | "converted" | "lost";
      service_type: "flooring" | "demolition" | "junk_removal";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Helper types for easier usage
export type BlogCategory =
  Database["public"]["Tables"]["blog_categories"]["Row"];
export type BlogCategoryInsert =
  Database["public"]["Tables"]["blog_categories"]["Insert"];
export type BlogCategoryUpdate =
  Database["public"]["Tables"]["blog_categories"]["Update"];

export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type BlogPostInsert =
  Database["public"]["Tables"]["blog_posts"]["Insert"];
export type BlogPostUpdate =
  Database["public"]["Tables"]["blog_posts"]["Update"];

export type BlogPostAnalytics =
  Database["public"]["Tables"]["blog_post_analytics"]["Row"];
export type BlogPostAnalyticsInsert =
  Database["public"]["Tables"]["blog_post_analytics"]["Insert"];

export type Page = Database["public"]["Tables"]["pages"]["Row"];
export type PageInsert = Database["public"]["Tables"]["pages"]["Insert"];
export type PageUpdate = Database["public"]["Tables"]["pages"]["Update"];

export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"];

export type PageAnalytics =
  Database["public"]["Tables"]["page_analytics"]["Row"];
export type PageAnalyticsInsert =
  Database["public"]["Tables"]["page_analytics"]["Insert"];

// Content structure for page content JSON
export interface PageContent {
  hero_text?: string;
  service_description?: string;
  city_description?: string;
  features?: string[];
  testimonials?: Array<{
    name: string;
    text: string;
    rating: number;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  cta_text?: string;
  sections?: Array<{
    title: string;
    content: string;
    image?: string;
  }>;
}

// City list for the hub-and-spoke model (Salt Lake County)
export const CITIES = [
  "Salt Lake City",
  "West Valley City",
  "West Jordan",
  "Sandy",
  "Orem",
  "Ogden",
  "Layton",
  "Taylorsville",
  "Murray",
  "Bountiful",
  "Draper",
  "Riverton",
  "Roy",
  "Pleasant Grove",
  "Cottonwood Heights",
] as const;

export type City = (typeof CITIES)[number];

// Service list
export const SERVICES: ServiceType[] = [
  "flooring",
  "demolition",
  "junk_removal",
];

// Service display names
export const SERVICE_DISPLAY_NAMES: Record<ServiceType, string> = {
  flooring: "Flooring",
  demolition: "Demolition",
  junk_removal: "Junk Removal",
};

// URL slug generator
export function generateSlug(city: string, service: ServiceType): string {
  return `${city.toLowerCase().replace(/\s+/g, "-")}-${service.replace("_", "-")}`;
}

// Meta title generator
export function generateMetaTitle(city: string, service: ServiceType): string {
  const serviceName = SERVICE_DISPLAY_NAMES[service];
  return `${serviceName} Services in ${city} | Wild West Construction`;
}

// Meta description generator
export function generateMetaDescription(
  city: string,
  service: ServiceType,
): string {
  const serviceName = SERVICE_DISPLAY_NAMES[service].toLowerCase();
  return `Professional ${serviceName} services in ${city}, UT. Licensed, insured, and experienced contractors. Free estimates available.`;
}
