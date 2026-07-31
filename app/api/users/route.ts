import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
    .from("app_users")
    .select("*")
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
  try {
    const body = await request.json();

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
      );
  }

  const newUser = {
    id: Date.now().toString(),
    name: body.name,
    email: body.email,
    role: body.role || "viewer",
  };

  const { data, error } = await supabase
    .from("app_users")
    .insert(newUser)
    .select()
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
