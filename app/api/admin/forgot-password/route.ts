import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email as string | undefined;
    if (!email) {
      return NextResponse.json({ ok: false, error: "البريد الإلكتروني مطلوب" }, { status: 400 });
    }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    const authClient = createClient(supabaseUrl, supabaseAnonKey);

  const origin = req.nextUrl.origin;
    const { error } = await authClient.auth.resetPasswordForEmail(email, {
      redirectTo: origin + "/admin/reset-password",
    });

  if (error) {
    console.error("resetPasswordForEmail error:", error);
    return NextResponse.json({ ok: false, error: "تعذر إرسال رابط إعادة التعيين" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("forgot-password error:", err);
    return NextResponse.json({ ok: false, error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}
  }
  
