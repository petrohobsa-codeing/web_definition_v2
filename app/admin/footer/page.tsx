"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getFooterContent, setFooterContent } from "@/lib/db";
import { defaultFooterContent } from "@/lib/store";
import type { FooterContent } from "@/lib/types";

export default function FooterAdminPage() {
  const [content, setContent] = useState<FooterContent>(defaultFooterContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getFooterContent().then(setContent).catch(() => {});
  }, []);

  const field = (label: string, key: keyof FooterContent, textarea?: boolean) => (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={(content[key] as string) || ""}
          onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3BBA9F]/40 resize-none"
        />
      ) : (
        <input
          type="text"
          value={(content[key] as string) || ""}
          onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3BBA9F]/40"
        />
      )}
    </div>
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await setFooterContent(content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell title="محتوى التذييل (Footer)">
      <div className="max-w-4xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-black text-gray-800 text-base border-b pb-2">النصوص العربية</h2>
            {field("الشعار (tagline)", "tagline")}
            {field("العنوان الرئيسي", "heading")}
            {field("الفقرة", "paragraph", true)}
            {field("الجملة الختامية", "closing")}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-black text-gray-800 text-base border-b pb-2">النصوص الإنجليزية</h2>
            {field("Tagline (EN)", "taglineEn")}
            {field("Heading (EN)", "headingEn")}
            {field("Paragraph (EN)", "paragraphEn", true)}
            {field("Closing (EN)", "closingEn")}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#3BBA9F] text-white font-black px-6 py-2.5 rounded-xl hover:bg-[#2ea88e] transition-colors disabled:opacity-60"
          >
            {saving ? "جاري الحفظ..." : saved ? "تم الحفظ ✓" : "حفظ التغييرات"}
          </button>
          <button
            onClick={() => setContent(defaultFooterContent)}
            className="border border-gray-200 text-gray-600 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            استعادة الافتراضي
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
