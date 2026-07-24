import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => ({}));
    const { name, phone, email, activity, fuelType, quantity, city, sensors, message } = body || {};

  if (!name || !phone) {
        return NextResponse.json({ ok: false, error: "الاسم والجوال مطلوبان" }, { status: 400 });
  }

  const id = Date.now().toString();

  const { error } = await supabaseAdmin.from("quotes").insert({
        id,
        name,
        phone,
        email,
        activity,
        fuel_type: fuelType,
        quantity,
        city,
        sensors,
        message,
        status: "new",
  });

  if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id });
}
