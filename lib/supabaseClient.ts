import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Public client - safe to use in the browser. Relies on Row Level Security
// policies in Supabase to control what can be read/written with this key.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
