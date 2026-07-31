"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import UserForm from "@/components/users/UserForm";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: string;
}

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("فشل جلب بيانات المستخدم");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleUpdate = async (data: User) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("فشل تحديث المستخدم");
    const updated = await response.json();
    setUser(updated);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("فشل حذف المستخدم");
      router.push("/admin/users");
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <AdminShell title="تفاصيل المستخدم">
        <div className="text-center py-8">جاري التحميل...</div>
      </AdminShell>
    );
  }

  if (error || !user) {
    return (
      <AdminShell title="تفاصيل المستخدم">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || "المستخدم غير موجود"}
        </div>
        <Link href="/admin/users" className="text-blue-600 hover:underline mt-4 inline-block">
          العودة للقائمة
        </Link>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="تفاصيل المستخدم">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/admin/users" className="text-blue-600 hover:underline text-sm">
              ← العودة للقائمة
            </Link>
            <h1 className="text-3xl font-bold mt-2">تفاصيل المستخدم</h1>
          </div>
          {!isEditing && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                تعديل
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 transition"
              >
                {isDeleting ? "جاري الحذف..." : "حذف"}
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <UserForm
            initialData={user}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-lg space-y-4">
            <div>
              <span className="text-sm text-gray-500">الاسم</span>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">البريد الإلكتروني</span>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">الدور</span>
              <p className="text-lg font-medium">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {user.role}
                </span>
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">تاريخ الإنشاء</span>
              <p className="text-lg font-medium">
                {new Date(user.createdAt).toLocaleDateString("ar-SA")}
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
