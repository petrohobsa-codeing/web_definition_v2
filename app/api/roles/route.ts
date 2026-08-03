import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requirePermission } from "@/lib/adminAuth";
import { sanitizePermissions } from "@/lib/permissions";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = requirePermission("roles", "read");
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { data, error } = await supabaseAdmin
      .from("roles")
      .select("id, key, label, permissions, is_system, created_at")
      .order("created_at", { ascending: true });
    if (error) throw error;
    const roles = (data || []).map((r) => ({
      id: r.id,
      key: r.key,
      label: r.label,
      permissions: r.permissions || {},
      isSystem: !!r.is_system,
      createdAt: r.created_at,
    }));
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json({ error: "فشل جلب الأدوار" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = requirePermission("roles", "create");
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const body = await request.json();
    if (!body.label || !String(body.label).trim()) {
      return NextResponse.json(
        { error: "المسمى الوظيفي مطلوب" },
        { status: 400 }
      );
    }
    const key =
      "role_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const permissions = sanitizePermissions(body.permissions);
    const newRole = {
      id: Date.now().toString(),
      key,
      label: String(body.label).trim(),
      permissions,
      is_system: false,
    };
    const { data, error } = await supabaseAdmin
      .from("roles")
      .insert(newRole)
      .select("id, key, label, permissions, is_system, created_at")
      .single();
    if (error) throw error;
    return NextResponse.json(
      {
        id: data.id,
        key: data.key,
        label: data.label,
        permissions: data.permissions || {},
        isSystem: !!data.is_system,
        createdAt: data.created_at,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json({ error: "فشل إنشاء الدور" }, { status: 500 });
  }
}
