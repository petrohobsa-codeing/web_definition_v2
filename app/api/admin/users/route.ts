import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, verifySessionToken, AdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const ALL_PERMISSION_KEYS = [
  "dashboard",
  "slides",
  "services",
  "service_details",
  "projects",
  "news",
  "activities",
  "testimonials",
  "stats",
  "mission",
  "regions",
  "network",
  "credentials",
  "faqs",
  "quotes",
  "messages",
  "settings",
  "users",
  ];

function getSession(): AdminSession | null {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

function unauthorized() {
  return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
}

function forbidden() {
  return NextResponse.json({ error: "هذه الصفحة للمالك فقط" }, { status: 403 });
}

function normalizePermissions(input: unknown): Record<string, boolean> {
  const source = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const permissions: Record<string, boolean> = {};
  for (const key of ALL_PERMISSION_KEYS) {
    permissions[key] = !!source[key];
  }
  return permissions;
}

export async function GET() {
  const session = getSession();
  if (!session) return unauthorized();
  if (session.role !== "owner") return forbidden();

const { data, error } = await supabaseAdmin
  .from("admin_users")
  .select("id, email, role, permissions, created_at")
  .order("created_at", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data || [] });
}

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return unauthorized();
  if (session.role !== "owner") return forbidden();

const body = await req.json();
  const email = String(body.email || "").trim();
  if (!email) return NextResponse.json({ error: "البريد الإلكتروني مطلوب" }, { status: 400 });

const permissions = normalizePermissions(body.permissions);

const { data: invited, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);
  if (inviteError || !invited?.user) {
    return NextResponse.json({ error: inviteError?.message || "فشل إرسال الدعوة" }, { status: 500 });
  }

const { error: insertError } = await supabaseAdmin.from("admin_users").insert({
  id: invited.user.id,
  email,
  role: "staff",
  permissions,
});
  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });

return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  const session = getSession();
  if (!session) return unauthorized();
  if (session.role !== "owner") return forbidden();

const body = await req.json();
  const id = body.id;
  if (!id) return NextResponse.json({ error: "المعرف مطلوب" }, { status: 400 });

const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.permissions !== undefined) {
    row.permissions = normalizePermissions(body.permissions);
  }
  if (body.role === "owner" || body.role === "staff") {
    row.role = body.role;
  }

const { error } = await supabaseAdmin.from("admin_users").update(row).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = getSession();
  if (!session) return unauthorized();
  if (session.role !== "owner") return forbidden();

const body = await req.json();
  const id = body.id;
  if (!id) return NextResponse.json({ error: "المعرف مطلوب" }, { status: 400 });
  if (id === session.uid) {
    return NextResponse.json({ error: "لا يمكنك حذف حسابك الخاص" }, { status: 400 });
  }

const { error } = await supabaseAdmin.from("admin_users").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

await supabaseAdmin.auth.admin.deleteUser(id).catch(() => {});

return NextResponse.json({ ok: true });
}
