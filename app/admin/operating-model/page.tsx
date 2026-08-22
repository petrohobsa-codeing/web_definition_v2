"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getOperatingModelContent, setOperatingModelContent } from "@/lib/db";
import { defaultOperatingModelContent } from "@/lib/store";
import type { OperatingModelContent, OperatingStep } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export default function OperatingModelAdminPage() {
  const [content, setContent] = useState<OperatingModelContent>(defaultOperatingModelContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getOperatingModelContent().then(setContent).catch(() => {});
  }, []);

  const updateMeta = (key: keyof Omit<OperatingModelContent, "steps">, val: string) =>
    setContent((p) => ({ ...p, [key]: val }));

  const updateStep = (idx: number, field: keyof OperatingStep, val: string) =>
    setContent((p) => {
      const steps = [...p.steps];
      steps[idx] = { ...steps[idx], [field]: val };
      return { ...p, steps };
    });

  const addStep = () =>
    setContent((p) => ({
      ...p,
      steps: [
        ...p.steps,
        { id: Date.now().toString(), number: String(p.steps.length + 1).padStart(2, "0"), titleAr: "", descAr: "", titleEn: "", descEn: "" },
      ],
    }));

  const removeStep = (idx: number) =>
    setContent((p) => ({ ...p, steps: p.steps.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await setOperatingModelContent(content);
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
    <AdminShell title="النموذج التشغيلي">
      <div className="max-w-5xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-black text-gray-800 text-base border-b pb-2">نصوص البطاقة (عربي)</h2>
            {tf("الشارة", content.badge, (v) => updateMeta("badge", v))}
            {tf("الشعار", content.tagline, (v) => updateMeta("tagline", v))}
            {tf("العنوان", content.heading, (v) => updateMeta("heading", v))}
            {tf("الفقرة", content.paragraph, (v) => updateMeta("paragraph", v), true)}
            {tf("تسمية دورة العمل", content.cycleLabel, (v) => updateMeta("cycleLabel", v))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-black text-gray-800 text-base border-b pb-2">Card Texts (English)</h2>
            {tf("Badge (EN)", content.badgeEn || "", (v) => updateMeta("badgeEn", v))}
            {tf("Tagline (EN)", content.taglineEn || "", (v) => updateMeta("taglineEn", v))}
            {tf("Heading (EN)", content.headingEn || "", (v) => updateMeta("headingEn", v))}
            {tf("Paragraph (EN)", content.paragraphEn || "", (v) => updateMeta("paragraphEn", v), true)}
            {tf("Cycle Label (EN)", content.cycleLabelEn || "", (v) => updateMeta("cycleLabelEn", v))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-gray-800 text-base">خطوات دورة العمل</h2>
            <button onClick={addStep} className="flex items-center gap-1.5 bg-[#3BBA9F] text-white text-sm font-bold px-3 py-1.5 rounded-lg hover:bg-[#2ea88e] transition-colors">
              <Plus size={15} /> إضافة خطوة
            </button>
          </div>
          <div className="space-y-4">
            {content.steps.map((step, idx) => (
              <div key={step.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="text"
                    value={step.number}
                    onChange={(e) => updateStep(idx, "number", e.target.value)}
                    className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center font-black text-[#3BBA9F] focus:outline-none focus:ring-2 focus:ring-[#3BBA9F]/40"
                    placeholder="01"
                  />
                  <span className="text-xs text-gray-400">رقم الخطوة</span>
                  <button onClick={() => removeStep(idx)} className="mr-auto text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tf("العنوان (عربي)", step.titleAr, (v) => updateStep(idx, "titleAr", v))}
                  {tf("Title (EN)", step.titleEn, (v) => updateStep(idx, "titleEn", v))}
                  {tf("الوصف (عربي)", step.descAr, (v) => updateStep(idx, "descAr", v), true)}
                  {tf("Description (EN)", step.descEn, (v) => updateStep(idx, "descEn", v), true)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleSave} disabled={saving} className="bg-[#3BBA9F] text-white font-black px-6 py-2.5 rounded-xl hover:bg-[#2ea88e] transition-colors disabled:opacity-60">
            {saving ? "جاري الحفظ..." : saved ? "تم الحفظ ✓" : "حفظ التغييرات"}
          </button>
          <button onClick={() => setContent(defaultOperatingModelContent)} className="border border-gray-200 text-gray-600 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            استعادة الافتراضي
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
