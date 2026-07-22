import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

function isAuthed(): boolean {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

function unauthorized() {
  return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
}

function rowToMessage(r: any) {
  return {
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    message: r.message,
    status: r.status,
    replyText: r.reply_text || undefined,
    repliedAt: r.replied_at || undefined,
    createdAt: r.created_at,
  };
}

function rowToQuote(r: any) {
  return {
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    activity: r.activity,
    fuelType: r.fuel_type,
    quantity: r.quantity,
    city: r.city,
    sensors: r.sensors,
    message: r.message,
    status: r.status,
    createdAt: r.created_at,
  };
}

function rowToSettings(r: any) {
  return {
    phone: r.phone,
    whatsapp: r.whatsapp,
    email: r.email,
    address: r.address,
    workingHours: r.working_hours,
    cities: r.cities,
    adminPassword: r.admin_password,
  };
}

export async function GET(_req: NextRequest, context: { params: { resource: string } }) {
  if (!isAuthed()) return unauthorized();
  const resource = context.params.resource;

  if (resource === "messages") {
    const { data, error } = await supabaseAdmin.from("messages").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ items: (data || []).map(rowToMessage) });
  }
  if (resource === "quotes") {
    const { data, error } = await supabaseAdmin.from("quotes").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ items: (data || []).map(rowToQuote) });
  }
  if (resource === "settings") {
    const { data, error } = await supabaseAdmin.from("settings").select("*").eq("id", "main").maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ item: data ? rowToSettings(data) : null });
  }
  return NextResponse.json({ error: "unknown resource" }, { status: 404 });
}

export async function PUT(req: NextRequest, context: { params: { resource: string } }) {
  if (!isAuthed()) return unauthorized();
  const resource = context.params.resource;
  const body = await req.json();

  if (resource === "messages" || resource === "quotes") {
    const { error } = await supabaseAdmin.from(resource).update({ status: body.status }).eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }
  if (resource === "settings") {
    const row: Record<string, unknown> = {};
    if (body.phone !== undefined) row.phone = body.phone;
    if (body.whatsapp !== undefined) row.whatsapp = body.whatsapp;
    if (body.email !== undefined) row.email = body.email;
    if (body.address !== undefined) row.address = body.address;
    if (body.workingHours !== undefined) row.working_hours = body.workingHours;
    if (body.cities !== undefined) row.cities = body.cities;
    if (body.adminPassword !== undefined) row.admin_password = body.adminPassword;
    const { error } = await supabaseAdmin.from("settings").update(row).eq("id", "main");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "unknown resource" }, { status: 404 });
}

export async function DELETE(req: NextRequest, context: { params: { resource: string } }) {
  if (!isAuthed()) return unauthorized();
  const resource = context.params.resource;
  const body = await req.json();

  if (resource === "messages" || resource === "quotes") {
    const { error } = await supabaseAdmin.from(resource).delete().eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "unknown resource" }, { status: 404 });
}
