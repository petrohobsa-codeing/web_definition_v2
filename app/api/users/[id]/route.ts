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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = mockUsers.find((u) => u.id === params.id);
    if (!user) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
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
    const userIndex = mockUsers.findIndex((u) => u.id === params.id);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...body,
      id: params.id,
    };

    return NextResponse.json(mockUsers[userIndex]);
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
    const userIndex = mockUsers.findIndex((u) => u.id === params.id);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    const deletedUser = mockUsers.splice(userIndex, 1);
    return NextResponse.json({
      message: "تم حذف المستخدم بنجاح",
      user: deletedUser[0],
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "فشل حذف البيانات" },
      { status: 500 }
    );
  }
}
