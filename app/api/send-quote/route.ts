import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, phone, email, activity, fuelType, quantity, city, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "الاسم والجوال مطلوبان" }, { status: 400 });
    }

    const serviceLabels: Record<string, string> = {
      petroleum: "منتجات بترولية (بنزين / ديزل / غاز)",
      sewage: "سحب بيارات وصرف صحي",
      water: "إمداد مائي (مياه تحلية / شرب)",
      generators: "تأجير مولدات كهربائية",
    };

    const { error } = await resend.emails.send({
      from: "Fast Link <delivered@ioostooeld.resend.app>",
      to: process.env.TO_EMAIL || "info@fastlink.sa",
      subject: `طلب عرض سعر جديد — ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 24px; border-radius: 16px;">
          <div style="background: #064E3B; padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">طلب عرض سعر جديد</h1>
            <p style="color: #6EE7B7; margin: 8px 0 0;">شركة فاست لينك للخدمات اللوجستية والبترولية</p>
          </div>

          <div style="background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #E5E7EB;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 12px 8px; color: #6B7280; font-size: 14px; width: 40%;">الاسم</td>
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
              ${activity ? `
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 12px 8px; color: #6B7280; font-size: 14px;">نوع النشاط</td>
                <td style="padding: 12px 8px; color: #111827; font-weight: bold;">${activity}</td>
              </tr>` : ""}
              ${fuelType ? `
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 12px 8px; color: #6B7280; font-size: 14px;">الخدمة المطلوبة</td>
                <td style="padding: 12px 8px; color: #059669; font-weight: bold;">${serviceLabels[fuelType] || fuelType}</td>
              </tr>` : ""}
              ${city ? `
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 12px 8px; color: #6B7280; font-size: 14px;">المدينة</td>
                <td style="padding: 12px 8px; color: #111827; font-weight: bold;">${city}</td>
              </tr>` : ""}
              ${quantity ? `
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 12px 8px; color: #6B7280; font-size: 14px;">الكمية / الحجم</td>
                <td style="padding: 12px 8px; color: #111827; font-weight: bold;">${quantity}</td>
              </tr>` : ""}
              ${message ? `
              <tr>
                <td style="padding: 12px 8px; color: #6B7280; font-size: 14px; vertical-align: top;">تفاصيل إضافية</td>
                <td style="padding: 12px 8px; color: #111827;">${message}</td>
              </tr>` : ""}
            </table>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="tel:${phone}" style="background: #059669; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
              اتصل بالعميل
            </a>
          </div>

          <p style="text-align: center; color: #9CA3AF; font-size: 12px; margin-top: 20px;">
            تم إرسال هذا الطلب من موقع فاست لينك — fastlink.sa
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
