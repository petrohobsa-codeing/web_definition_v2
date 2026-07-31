import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
  ) {
  try {
    const { data, error } = await supabase
    .from("app_users")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return NextResponse.json(
      { error: "المستخدم غير موجود" },
      { status: 404 }
      );
  }

  return NextResponse.json({
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: data.created_at,
  });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "فشل جلب البيانات" },
      { status: 500 }
      );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
  ) {
  try {
    const body = await request.json();

  const { data, error } = await supabase
    .from("app_users")
    .update({
      name: body.name,
      email: body.email,
      role: body.role,
    })
    .eq("id", params.id)
    .select()
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return NextResponse.json(
      { error: "المستخدم غير موجود" },
      { status: 404 }
      );
  }

  return NextResponse.json({
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: data.created_at,
  });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "فشل تحديث البيانات" },
      { status: 500 }
      );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
  ) {
  try {
    const { data, error } = await supabase
    .from("app_users")
    .delete()
    .eq("id", params.id)
    .select()
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return NextResponse.json(
      { error: "المستخدم غير موجود" },
      { status: 404 }
      );
  }

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
    return NextResponse.json(
      { error: "فشل حذف البيانات" },
      { status: 500 }
      );
  }
}
