"use client";

import React from "react";
import Link from "next/link";

interface UserActionsProps {
    userId: string;
  onEdit?: () => void;
      onDelete?: () => void;
          isLoading?: boolean;
}

export default function UserActions({
  userId,
  onEdit,
  onDelete,
  isLoading = false,
}: UserActionsProps) {
  return (
        <div className="flex gap-2">
          <Link
            href={`/admin/users/${userId}`}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                >
                  عرض
                </Link>
                <button
                  onClick={onEdit}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm disabled:bg-gray-400"
                  disabled={isLoading}
      >
                  تعديل
                </button>
                <button
                  onClick={onDelete}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm disabled:bg-gray-400"
                  disabled={isLoading}
                >
                  حذف
                </button>
              </div>
            );
}
