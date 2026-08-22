"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getChallengesContent, setChallengesContent } from "@/lib/db";
import { defaultChallengesContent } from "@/lib/store";
import type { ChallengesContent, ChallengeItem } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export default function ChallengesAdminPage() {
  const [content, setContent] = useState<ChallengesContent>(defaultChallengesContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getChallengesContent().then(setContent).catch(() => {});
  }, []);

  const updateMeta = (key: keyof Omit<ChallengesContent, "items">, val: string) =>
    setContent((p) => ({ ...p, [key]: val }));

  const updateItem = (idx: number, field: keyof ChallengeItem, val: string) =>
    setContent((p) => {
      const items = [...p.items];
      items[idx] = { ...items[idx], [field]: val };
      return { ...p, items };
    });

  const addItem = () =>
    setContent((p) => ({
      ...p,
      items: [...p.items, { id: Date.now().toString(), titleAr: "", descAr: "", titleEn: "", descEn: "" }],
    }));

  const removeItem = (idx: number) =>
    setContent((p) => ({ ...p, items: p.items.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await setChallengesContent(content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const tf = (label: string, val: string, onChange: (v: string) => void, ta?: boolean) => (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1">{label}</label>
      {ta ? (
        <textarea rows={2} value={val} onChange={(e) => onChange(e.target.value)} className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3BBA9F]/40 resize-none" />
      ) : (
        <input type="text" value={val} onChange={(e) => onChange(e.target.value)} className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3BBA9F]/40" />
      )}
    </div>
  );

  return (
    <AdminShell title="بطاقة التحديات">
      <div className="max-w-5xl space-y-6">
        {/* Header texts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-black text-gray-800 text-base border-b pb-2">نصوص البطاقة (عربي)</h2>
            {tf("الشارة", content.badge, (v) => updateMeta("badge", v))}
            {tf("العنوان", content.headline, (v) => updateMeta("headline", v))}
            {tf("العنوان الفرعي", content.subheading, (v) => updateMeta("subheading", v))}
            {tf("الفقرة", content.paragraph, (v) => updateMeta("paragraph", v), true)}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-black text-gray-800 text-base border-b pb-2">Card Texts (English)</h2>
            {tf("Badge (EN)", content.badgeEn || "", (v) => updateMeta("badgeEn", v))}
            {tf("Headline (EN)", content.headlineEn || "", (v) => updateMeta("headlineEn", v))}
            {tf("Subheading (EN)", content.subheadingEn || "", (v) => updateMeta("subheadingEn", v))}
            {tf("Paragraph (EN)", content.paragraphEn || "", (v) => updateMeta("paragraphEn", v), true)}
          </div>
        </div>

        {/* Challenge items */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-gray-800 text-base">عناصر التحديات</h2>
            <button onClick={addItem} className="flex items-center gap-1.5 bg-[#3BBA9F] text-white text-sm font-bold px-3 py-1.5 rounded-lg hover:bg-[#2ea88e] transition-colors">
              <Plus size={15} /> إضافة عنصر
            </button>
          </div>
          <div className="space-y-4">
            {content.items.map((item, idx) => (
              <div key={item.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black text-[#3BBA9F]">#{idx + 1}</span>
                  <button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tf("العنوان (عربي)", item.titleAr, (v) => updateItem(idx, "titleAr", v))}
                  {tf("Title (EN)", item.titleEn, (v) => updateItem(idx, "titleEn", v))}
                  {tf("الوصف (عربي)", item.descAr, (v) => updateItem(idx, "descAr", v), true)}
                  {tf("Description (EN)", item.descEn, (v) => updateItem(idx, "descEn", v), true)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleSave} disabled={saving} className="bg-[#3BBA9F] text-white font-black px-6 py-2.5 rounded-xl hover:bg-[#2ea88e] transition-colors disabled:opacity-60">
            {saving ? "جاري الحفظ..." : saved ? "تم الحفظ ✓" : "حفظ التغييرات"}
          </button>
          <button onClick={() => setContent(defaultChallengesContent)} className="border border-gray-200 text-gray-600 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            استعادة الافتراضي
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
