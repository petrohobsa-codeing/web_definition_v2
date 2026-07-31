"use client";

import React, { useState } from "react";

interface User {
    id?: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

interface UserFormProps {
    initialData?: User;
  onSubmit: (data: User) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UserForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    name: initialData?.name || "",
          email: initialData?.email || "",
          role: initialData?.role || "viewer",
      });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!formData.email.trim()) newErrors.email = "البريد مطلوب";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "البريد غير صحيح";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setIsSubmitting(true);
      await onSubmit({
        ...formData,
        id: initialData?.id,
});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
            setIsSubmitting(false);
}
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              الاسم
            </label>
            <input
              type="text"
              value={formData.name}
          onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: "" });
              }}
          className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.name ? "border-red-500" : "border-gray-300"
            }`}
        />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

          <div>
        <label className="block text-sm font-medium text-gray-700">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
              value={formData.email}
          onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: "" });
            }}
                      className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-none ${
                        errors.email ? "border-red-500" : "border-gray-300"
            }`}
                    />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                      الدور
                    </label>
                    <select
                                  value={formData.role}
                                  onChange={(e) =>
                        setFormData({
              ...formData,
                                      role: e.target.value as "admin" | "editor" | "viewer",
})
}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                >
                                  <option value="viewer">مشاهد</option>
          <option value="editor">محرر</option>
                                  <option value="admin">مسلم</option>
                                </select>
          </div>

                  <div className="flex gap-3 pt-4">
                    <button
                                  type="submit"
                                  disabled={isSubmitting || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
                    >
            {isSubmitting ? "جاري..." : initialData ? "تحديث" : "إضافة"}
        </button>
                    <button
                      type="button"
                      onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              );
}
