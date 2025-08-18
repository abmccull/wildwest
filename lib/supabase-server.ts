import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '../supabase/types/database.types';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Server-side Supabase client (for API routes and server components)
export const createServerClient = () => {
  // For now, use the regular client - we can enhance with SSR later if needed
  return createClient<Database>(supabaseUrl!, supabaseAnonKey!);
};

// Service role client for server operations (bypasses RLS)
export const createServerServiceClient = () => {
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

// Standard server client for API routes (respects RLS)
export const supabaseServer = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Export types for easier usage
export type { Database } from '../supabase/types/database.types';
