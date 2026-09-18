import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getEnv } from './env';

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

// If the environment variables aren't set yet, `supabase` stays null and
// AuthContext falls back to friendly error messages instead of crashing
// the whole site.
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
