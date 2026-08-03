import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requirePermission } from "@/lib/adminAuth";
import { sanitizePermissions } from "@/lib/permissions";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requirePermission("roles", "update");
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const body = await request.json();
    const update: Record<string, unknown> = {};
    if (body.label !== undefined) {
      if (!String(body.label).trim()) {
        return NextResponse.json(
          { error: "المسمى الوظيفي مطلوب" },
          { status: 400 }
        );
      }
      update.label = String(body.label).trim();
    }
    if (body.permissions !== undefined) {
      update.permissions = sanitizePermissions(body.permissions);
    }
    const { data, error } = await supabaseAdmin
      .from("roles")
      .update(update)
      .eq("id", params.id)
      .select("id, key, label, permissions, is_system, created_at")
      .maybeSingle();
    if (error) throw error;
    if (!data)
      return NextResponse.json({ error: "الدور غير موجود" }, { status: 404 });
    return NextResponse.json({
      id: data.id,
      key: data.key,
      label: data.label,
      permissions: data.permissions || {},
      isSystem: !!data.is_system,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json({ error: "فشل تحديث الدور" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requirePermission("roles", "delete");
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { data: role, error: roleError } = await supabaseAdmin
      .from("roles")
      .select("id, key, is_system")
      .eq("id", params.id)
      .maybeSingle();
    if (roleError) throw roleError;
    if (!role)
      return NextResponse.json({ error: "الدور غير موجود" }, { status: 404 });
    if (role.is_system) {
      return NextResponse.json(
        { error: "لا يمكن حذف هذا الدور الأساسي" },
        { status: 403 }
      );
    }
    const { count, error: countError } = await supabaseAdmin
      .from("app_users")
      .select("id", { count: "exact", head: true })
      .eq("role", role.key);
    if (countError) throw countError;
    if ((count || 0) > 0) {
      return NextResponse.json(
        {
          error:
            "لا يمكن حذف هذا الدور لأنه مُسند لمستخدمين. قم بتغيير دورهم أولاً",
        },
        { status: 400 }
      );
    }
    const { error } = await supabaseAdmin.from("roles").delete().eq("id", params.id);
    if (error) throw error;
    return NextResponse.json({ message: "تم حذف الدور بنجاح" });
  } catch (error) {
    console.error("Error deleting role:", error);
    return NextResponse.json({ error: "فشل حذف الدور" }, { status: 500 });
  }
}
