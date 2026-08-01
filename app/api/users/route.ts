import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, getSession } from "@/lib/adminAuth";
import { hashPassword } from "@/lib/passwords";

export const dynamic = "force-dynamic";

function requireAdmin() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  const session = getSession(token);
  if (!session) return { error: "غير مصرح", status: 401 as const };
  if (session.role !== "admin")
    return { error: "الصلاحية غير كافية", status: 403 as const };
  return { session };
}

export async function GET() {
  const auth = requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { data, error } = await supabaseAdmin
      .from("app_users")
      .select("id, name, email, role, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    const users = (data || []).map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.created_at,
    }));
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: "الاسم والبريد وكلمة المرور مطلوبة" },
        { status: 400 }
      );
    }
    if (String(body.password).length < 8) {
      return NextResponse.json(
        { error: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" },
        { status: 400 }
      );
    }
    const newUser = {
      id: Date.now().toString(),
      name: body.name,
      email: String(body.email).trim().toLowerCase(),
      role: body.role || "viewer",
      password_hash: hashPassword(body.password),
    };
    const { data, error } = await supabaseAdmin
      .from("app_users")
      .insert(newUser)
      .select("id, name, email, role, created_at")
      .single();
    if (error) throw error;
    return NextResponse.json(
      {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: data.created_at,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
