export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          id?: number;
          name: string;
          slug: string;
        };
        Update: {
          id?: number;
          name?: string;
          slug?: string;
        };
      };
      cities: {
        Row: {
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          id?: number;
          name: string;
          slug: string;
        };
        Update: {
          id?: number;
          name?: string;
          slug?: string;
        };
      };
      leads: {
        Row: {
          id: number;
          name: string;
          email: string | null;
          mobile: string;
          city_id: number | null;
          address: string | null;
          service_id: number | null;
          preferred_date: string | null;
          preferred_time: string | null;
          details: string | null;
          sms_consent: boolean;
          whatsapp_consent: boolean;
          utm_params: Json | null;
          page_path: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          email?: string | null;
          mobile: string;
          city_id?: number | null;
          address?: string | null;
          service_id?: number | null;
          preferred_date?: string | null;
          preferred_time?: string | null;
          details?: string | null;
          sms_consent?: boolean;
          whatsapp_consent?: boolean;
          utm_params?: Json | null;
          page_path?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string | null;
          mobile?: string;
          city_id?: number | null;
          address?: string | null;
          service_id?: number | null;
          preferred_date?: string | null;
          preferred_time?: string | null;
          details?: string | null;
          sms_consent?: boolean;
          whatsapp_consent?: boolean;
          utm_params?: Json | null;
          page_path?: string | null;
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: number;
          lead_id: number | null;
          slot_date: string;
          slot_time: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: number;
          lead_id?: number | null;
          slot_date: string;
          slot_time: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          id?: number;
          lead_id?: number | null;
          slot_date?: string;
          slot_time?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
        };
      };
      attachments: {
        Row: {
          id: number;
          lead_id: number | null;
          job_id: number | null;
          url: string;
          type: 'photo' | 'video' | null;
          uploaded_at: string;
        };
        Insert: {
          id?: number;
          lead_id?: number | null;
          job_id?: number | null;
          url: string;
          type?: 'photo' | 'video' | null;
          uploaded_at?: string;
        };
        Update: {
          id?: number;
          lead_id?: number | null;
          job_id?: number | null;
          url?: string;
          type?: 'photo' | 'video' | null;
          uploaded_at?: string;
        };
      };
      jobs: {
        Row: {
          id: number;
          service_id: number | null;
          city_id: number | null;
          title: string | null;
          description: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          service_id?: number | null;
          city_id?: number | null;
          title?: string | null;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          service_id?: number | null;
          city_id?: number | null;
          title?: string | null;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
      chat_sessions: {
        Row: {
          id: number;
          conversation: Json | null;
          captured_lead_id: number | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          conversation?: Json | null;
          captured_lead_id?: number | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          conversation?: Json | null;
          captured_lead_id?: number | null;
          created_at?: string;
        };
      };
      sms_interactions: {
        Row: {
          id: number;
          lead_id: number | null;
          phone_number: string;
          message_text: string;
          message_type: 'outbound' | 'inbound';
          status: 'pending' | 'sent' | 'delivered' | 'failed' | 'received';
          twilio_sid: string | null;
          error_message: string | null;
          utm_params: Json | null;
          page_path: string | null;
          consent_given: boolean;
          cost_cents: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          lead_id?: number | null;
          phone_number: string;
          message_text: string;
          message_type?: 'outbound' | 'inbound';
          status?: 'pending' | 'sent' | 'delivered' | 'failed' | 'received';
          twilio_sid?: string | null;
          error_message?: string | null;
          utm_params?: Json | null;
          page_path?: string | null;
          consent_given?: boolean;
          cost_cents?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          lead_id?: number | null;
          phone_number?: string;
          message_text?: string;
          message_type?: 'outbound' | 'inbound';
          status?: 'pending' | 'sent' | 'delivered' | 'failed' | 'received';
          twilio_sid?: string | null;
          error_message?: string | null;
          utm_params?: Json | null;
          page_path?: string | null;
          consent_given?: boolean;
          cost_cents?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_attachment_url: {
        Args: {
          attachment_id: number;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Helper types for easier usage
export type Service = Database['public']['Tables']['services']['Row'];
export type City = Database['public']['Tables']['cities']['Row'];
export type Lead = Database['public']['Tables']['leads']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type Attachment = Database['public']['Tables']['attachments']['Row'];
export type Job = Database['public']['Tables']['jobs']['Row'];
export type ChatSession = Database['public']['Tables']['chat_sessions']['Row'];
export type SmsInteraction = Database['public']['Tables']['sms_interactions']['Row'];

// Insert types
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];
export type CityInsert = Database['public']['Tables']['cities']['Insert'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
export type AttachmentInsert = Database['public']['Tables']['attachments']['Insert'];
export type JobInsert = Database['public']['Tables']['jobs']['Insert'];
export type ChatSessionInsert = Database['public']['Tables']['chat_sessions']['Insert'];
export type SmsInteractionInsert = Database['public']['Tables']['sms_interactions']['Insert'];

// Update types
export type ServiceUpdate = Database['public']['Tables']['services']['Update'];
export type CityUpdate = Database['public']['Tables']['cities']['Update'];
export type LeadUpdate = Database['public']['Tables']['leads']['Update'];
export type BookingUpdate = Database['public']['Tables']['bookings']['Update'];
export type AttachmentUpdate = Database['public']['Tables']['attachments']['Update'];
export type JobUpdate = Database['public']['Tables']['jobs']['Update'];
export type ChatSessionUpdate = Database['public']['Tables']['chat_sessions']['Update'];
export type SmsInteractionUpdate = Database['public']['Tables']['sms_interactions']['Update'];
