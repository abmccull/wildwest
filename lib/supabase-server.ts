import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '../supabase/types/database.types';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use the new publishable key for client operations
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
// Use the new secret key for server operations
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Missing Supabase environment variables');
}

// Server-side Supabase client (for API routes and server components)
export const createServerClient = () => {
  // For now, use the publishable key - we can enhance with SSR later if needed
  return createClient<Database>(supabaseUrl!, supabasePublishableKey!);
};

// Service role client for server operations (bypasses RLS)
export const createServerServiceClient = () => {
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

// Standard server client for API routes (respects RLS)
export const supabaseServer = createClient<Database>(supabaseUrl, supabasePublishableKey);

// Export types for easier usage
export type { Database } from '../supabase/types/database.types';
