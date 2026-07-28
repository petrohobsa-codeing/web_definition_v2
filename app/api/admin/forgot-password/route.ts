import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createResetToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const token = createResetToken();
    const origin = req.nextUrl.origin;
    const resetLink = origin + "/admin/reset-password?token=" + encodeURIComponent(token);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Petrohub <delivered@ioostooeld.resend.app>",
      to: "petrohob.sa@gmail.com",
      subject: "إعادة تعيين كلمة مرور لوحة التحكم",
      html:
        '<div dir="rtl" style="font-family: sans-serif;">' +
        "<p>تم استلام طلب لإعادة تعيين كلمة مرور لوحة تحكم Petrohub.</p>" +
        '<p><a href="' + resetLink + '">اضغط هنا لإعادة تعيين كلمة المرور</a></p>' +
        "<p>هذا الرابط صالح لمدة 15 دقيقة فقط. إذا لم تطلب ذلك، تجاهل هذه الرسالة.</p>" +
        "</div>",
    });

    if (error) {
      console.error("Resend error (forgot-password):", error);
      return NextResponse.json({ ok: false, error: "تعذر إرسال بريد إعادة التعيين" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("forgot-password route error:", err);
    return NextResponse.json({ ok: false, error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}
