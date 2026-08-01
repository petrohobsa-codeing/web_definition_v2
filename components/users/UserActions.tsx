"use client";

import React from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface UserActionsProps {
    userId: string;
    onEdit?: () => void;
    onDelete?: () => void;
    isLoading?: boolean;
    canDelete?: boolean;
}

export default function UserActions({
    userId,
    onEdit,
    onDelete,
    isLoading = false,
    canDelete = true,
}: UserActionsProps) {
    return (
        <div className="flex gap-2">
        <Link
            href={`/admin/users/${userId}`}
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-105 transition text-sm"
            >
        <Eye size={14} />
        عرض
        </Link>
        <button
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 hover:scale-105 transition text-sm disabled:bg-gray-400 disabled:hover:scale-100"
            disabled={isLoading}
            >
        <Pencil size={14} />
        تعديل
        </button>
            {canDelete && (
        <button
            onClick={onDelete}
            className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 hover:scale-105 transition text-sm disabled:bg-gray-400 disabled:hover:scale-100"
            disabled={isLoading}
            >
        <Trash2 size={14} />
        حذف
        </button>
            )}
        </div>
        );
}
