import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyResetToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const token = body.token as string | undefined;
  const newPassword = body.newPassword as string | undefined;

  if (!verifyResetToken(token)) {
    return NextResponse.json({ ok: false, error: "الرابط غير صالح أو منتهي الصلاحية" }, { status: 400 });
  }

  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ ok: false, error: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("settings").update({ admin_password: newPassword }).eq("id", "main");

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
