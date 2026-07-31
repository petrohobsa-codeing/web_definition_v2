"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import UsersList from "@/components/users/UsersList";
import UserForm from "@/components/users/UserForm";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "viewer";
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (data: User) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("فشل إضافة المستخدم");
    await fetchUsers();
    setIsAdding(false);
  };

  const handleUpdate = async (data: User) => {
    const response = await fetch(`/api/users/${editingUser?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("فشل تحديث المستخدم");
    await fetchUsers();
    setEditingUser(null);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("فشل حذف المستخدم");
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
            <p className="text-gray-600">قائمة جميع المستخدمين في النظام</p>
          </div>
          {!isAdding && !editingUser && (
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              + إضافة مستخدم
            </button>
          )}
        </div>

        {isAdding && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">إضافة مستخدم جديد</h2>
            <UserForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
          </div>
        )}

        {editingUser && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">تعديل المستخدم</h2>
            <UserForm
              initialData={editingUser}
              onSubmit={handleUpdate}
              onCancel={() => setEditingUser(null)}
            />
          </div>
        )}

        {!isAdding && !editingUser && (
          <UsersList
            users={users}
            loading={loading}
            error={error}
            onEdit={(user) => setEditingUser(user as User)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </AdminShell>
  );
}"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import UsersList from "@/components/users/UsersList";

interface User {
  id: string;
    email: string;
      name: string;
        role: string;
          createdAt: string;
          }

          export default function UsersPage() {
            const [users, setUsers] = useState<User[]>([]);
              const [loading, setLoading] = useState(true);
                const [error, setError] = useState<string | null>(null);

                  useEffect(() => {
                      const fetchUsers = async () => {
                            try {
                                    setLoading(true);
                                            const response = await fetch("/api/users");
                                                    if (!response.ok) throw new Error("Failed to fetch users");
                                                            const data = await response.json();
                                                                    setUsers(data);
                                                                          } catch (err) {
                                                                                  setError(err instanceof Error ? err.message : "An error occurred");
                                                                                        } finally {
                                                                                                setLoading(false);
                                                                                                      }
                                                                                                          };
                                                                                                          
                                                                                                              fetchUsers();
                                                                                                                }, []);
                                                                                                                
                                                                                                                  return (
                                                                                                                      <AdminShell>
                                                                                                                            <div className="space-y-6">
                                                                                                                                    <div>
                                                                                                                                              <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
                                                                                                                                                        <p className="text-gray-600">قائمة جميع المستخدمين في النظام</p>
                                                                                                                                                                </div>
                                                                                                                                                                        <UsersList users={users} loading={loading} error={error} />
                                                                                                                                                                              </div>
                                                                                                                                                                                  </AdminShell>
                                                                                                                                                                                    );
                                                                                                                                                                                    }
