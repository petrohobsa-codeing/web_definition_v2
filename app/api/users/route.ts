import { NextRequest, NextResponse } from "next/server";

const mockUsers = [
  {
    id: "1",
    name: "محمد علي",
    email: "mohammad@example.com",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "فاطمة أحمد",
    email: "fatima@example.com",
    role: "editor",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "علي محمود",
    email: "ali@example.com",
    role: "viewer",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockUsers, { status: 200 });
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
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
