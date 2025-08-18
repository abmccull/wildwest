import { createClient } from '@supabase/supabase-js';
import type { Database } from '../supabase/types/database.types';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client-side Supabase client (for frontend components)
export const createClientComponentClient = () => {
  return createClient<Database>(supabaseUrl!, supabaseAnonKey!);
};

// Service role client (for admin operations, bypasses RLS)
// This should only be used in API routes or server-side code
export const createServiceClient = () => {
  if (!supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Standard client for API routes (respects RLS)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Export types for easier usage
export type { Database } from '../supabase/types/database.types';
export type {
  Service,
  City,
  Lead,
  Booking,
  Attachment,
  Job,
  ChatSession,
  LeadInsert,
  BookingInsert,
  AttachmentInsert,
} from '../supabase/types/database.types';
