import { createClient } from "@supabase/supabase-js";

// Service-role client - SERVER ONLY. Bypasses Row Level Security.
// Never import this file from a "use client" component.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_KEY as string;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
