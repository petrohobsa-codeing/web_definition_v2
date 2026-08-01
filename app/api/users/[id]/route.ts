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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { data, error } = await supabaseAdmin
      .from("app_users")
      .select("id, name, email, role, created_at")
      .eq("id", params.id)
      .maybeSingle();
    if (error) throw error;
    if (!data)
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    return NextResponse.json({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "فشل جلب البيانات" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const body = await request.json();
    const update: Record<string, unknown> = {};
    if (body.name !== undefined) update.name = body.name;
    if (body.email !== undefined)
      update.email = String(body.email).trim().toLowerCase();
    if (body.role !== undefined) update.role = body.role;
    if (body.password) {
      if (String(body.password).length < 8) {
        return NextResponse.json(
          { error: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" },
          { status: 400 }
        );
      }
      update.password_hash = hashPassword(body.password);
    }
    const { data, error } = await supabaseAdmin
      .from("app_users")
      .update(update)
      .eq("id", params.id)
      .select("id, name, email, role, created_at")
      .maybeSingle();
    if (error) throw error;
    if (!data)
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    return NextResponse.json({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "فشل تحديث البيانات" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requireAdmin();
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    if (auth.session.userId === params.id) {
      return NextResponse.json(
        { error: "لا يمكنك حذف حسابك الحالي" },
        { status: 400 }
      );
    }
    const { data: target, error: targetError } = await supabaseAdmin
    .from("app_users")
    .select("email")
    .eq("id", params.id)
    .maybeSingle();
    if (targetError) throw targetError;
    if (target?.email?.toLowerCase() === "petrohob.sa@gmail.com") {
      return NextResponse.json(
        { error: "لا يمكن حذف حساب مالك النظام" },
        { status: 403 }
        );
    }
    const { data, error } = await supabaseAdmin
      .from("app_users")
      .delete()
      .eq("id", params.id)
      .select("id, name, email, role, created_at")
      .maybeSingle();
    if (error) throw error;
    if (!data)
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    return NextResponse.json({
      message: "تم حذف المستخدم بنجاح",
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: data.created_at,
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "فشل حذف البيانات" }, { status: 500 });
  }
}
