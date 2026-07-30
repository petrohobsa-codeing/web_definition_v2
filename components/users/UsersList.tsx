"use client";

import React from "react";

interface User {
    id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

interface UsersListProps {
    users: User[];
  loading: boolean;
  error: string | null;
}

export default function UsersList({
  users,
  loading,
  error,
}: UsersListProps) {
  if (loading) {
    return (
            <div className="text-center py-8">
              <p>جاري تحميل المستخدمين...</p>
            </div>
          );
  }

  if (error) {
    return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {error}
            </div>
          );
  }

  if (users.length === 0) {
    return (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              لا توجد مستخدمين لعرضهم
            </div>
          );
  }

  return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-right">الاسم</th>
                <th className="px-4 py-2 text-right">البريد الإلكتروني</th>
                <th className="px-4 py-2 text-right">الدور</th>
                <th className="px-4 py-2 text-right">تاريخ الإنشاء</th>
              </tr>
        </thead>
            <tbody>
    {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
{user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">
{new Date(user.createdAt).toLocaleDateString('ar-SA')}
              </td>
                </tr>
          ))}
        </tbody>
          </table>
        </div>
      );
}
