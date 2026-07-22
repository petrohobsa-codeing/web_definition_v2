import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const id = body.id as string | undefined;
  const replyText = body.replyText as string | undefined;
  if (!id || !replyText) {
    return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
  }

  const { data: message, error: fetchError } = await supabaseAdmin
    .from("messages")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (fetchError || !message) {
    return NextResponse.json({ error: "الرسالة غير موجودة" }, { status: 404 });
  }

  let emailSent = false;
  let emailError: string | null = null;

  if (message.email) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: "Petrohub <delivered@ioostooeld.resend.app>",
        to: message.email,
        subject: "رد على رسالتك - بتروهب",
        html:
          '<div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin:0 auto; padding: 24px;">' +
          '<p>مرحباً ' + message.name + '،</p>' +
          '<p style="white-space: pre-wrap; line-height: 1.8;">' + replyText + '</p>' +
          '<p style="color:#9CA3AF; font-size:12px; margin-top:24px;">شركة بتروهب للخدمات اللوجستية والبترولية</p>' +
          '</div>',
      });
      if (error) {
        emailError = error.message;
      } else {
        emailSent = true;
      }
    } catch (e: any) {
      emailError = e?.message || "تعذر إرسال البريد";
    }
  }

  const { error: updateError } = await supabaseAdmin
    .from("messages")
    .update({ reply_text: replyText, replied_at: new Date().toISOString(), status: "read" })
    .eq("id", id);
  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, emailSent, emailError });
}
