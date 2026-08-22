import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data } = await supabaseAdmin
    .from("settings")
    .select("phone, whatsapp, email, address, website, social_links")
    .eq("id", "main")
    .maybeSingle();

  return NextResponse.json({
    phone: data?.phone || "",
    whatsapp: data?.whatsapp || "",
    email: data?.email || "",
    address: data?.address || "",
    website: data?.website || "",
    socialLinks: data?.social_links || {},
  });
}
