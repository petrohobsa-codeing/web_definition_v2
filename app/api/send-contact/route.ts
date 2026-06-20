import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "الاسم والجوال مطلوبان" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Fast Link <onboarding@resend.dev>",
      to: process.env.TO_EMAIL || "info@fastlink.sa",
      subject: `رسالة جديدة من ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 24px; border-radius: 16px;">
          <div style="background: #064E3B; padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">رسالة جديدة من الموقع</h1>
            <p style="color: #6EE7B7; margin: 8px 0 0;">شركة فاست لينك للخدمات اللوجستية والبترولية</p>
          </div>

          <div style="background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #E5E7EB;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 12px 8px; color: #6B7280; font-size: 14px; width: 35%;">الاسم</td>
                <td style="padding: 12px 8px; color: #111827; font-weight: bold;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 12px 8px; color: #6B7280; font-size: 14px;">رقم الجوال</td>
                <td style="padding: 12px 8px; color: #111827; font-weight: bold;">${phone}</td>
              </tr>
              ${email ? `
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 12px 8px; color: #6B7280; font-size: 14px;">البريد الإلكتروني</td>
                <td style="padding: 12px 8px; color: #111827; font-weight: bold;">${email}</td>
              </tr>` : ""}
              ${message ? `
              <tr>
                <td style="padding: 12px 8px; color: #6B7280; font-size: 14px; vertical-align: top;">الرسالة</td>
                <td style="padding: 12px 8px; color: #111827; line-height: 1.6;">${message}</td>
              </tr>` : ""}
            </table>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="tel:${phone}" style="background: #059669; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
              اتصل بالعميل
            </a>
          </div>

          <p style="text-align: center; color: #9CA3AF; font-size: 12px; margin-top: 20px;">
            تم إرسال هذه الرسالة من موقع فاست لينك — fastlink.sa
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ أثناء الإرسال" }, { status: 500 });
  }
}
