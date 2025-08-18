import { createClient } from '@supabase/supabase-js';
import type { Database } from '../supabase/types/database.types';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use the new publishable key instead of anon key
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
// Secret key for server-side operations
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client-side Supabase client (for frontend components)
export const createClientComponentClient = () => {
  return createClient<Database>(supabaseUrl!, supabasePublishableKey!);
};

// Service role client (for admin operations, bypasses RLS)
// This should only be used in API routes or server-side code
export const createServiceClient = () => {
  if (!supabaseSecretKey) {
    throw new Error('Missing SUPABASE_SECRET_KEY environment variable');
  }

  return createClient<Database>(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Standard client for API routes (respects RLS)
export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey);

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
