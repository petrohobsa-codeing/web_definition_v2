"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getSectorsContent, setSectorsContent } from "@/lib/db";
import { defaultSectorsContent } from "@/lib/store";
import type { SectorsContent, SectorCommitment } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export default function SectorsAdminPage() {
  const [content, setContent] = useState<SectorsContent>(defaultSectorsContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSectorsContent().then(setContent).catch(() => {});
  }, []);

  const updateMeta = (key: keyof Omit<SectorsContent, "sectorsAr" | "sectorsEn" | "commitments">, val: string) =>
    setContent((p) => ({ ...p, [key]: val }));

  const updateSectorAr = (idx: number, val: string) =>
    setContent((p) => { const s = [...p.sectorsAr]; s[idx] = val; return { ...p, sectorsAr: s }; });
  const updateSectorEn = (idx: number, val: string) =>
    setContent((p) => { const s = [...p.sectorsEn]; s[idx] = val; return { ...p, sectorsEn: s }; });
  const addSector = () =>
    setContent((p) => ({ ...p, sectorsAr: [...p.sectorsAr, ""], sectorsEn: [...p.sectorsEn, ""] }));
  const removeSector = (idx: number) =>
    setContent((p) => ({ ...p, sectorsAr: p.sectorsAr.filter((_, i) => i !== idx), sectorsEn: p.sectorsEn.filter((_, i) => i !== idx) }));

  const updateCommitment = (idx: number, field: keyof SectorCommitment, val: string) =>
    setContent((p) => { const c = [...p.commitments]; c[idx] = { ...c[idx], [field]: val }; return { ...p, commitments: c }; });
  const addCommitment = () =>
    setContent((p) => ({
      ...p,
      commitments: [...p.commitments, { id: Date.now().toString(), icon: "CheckCircle2", titleAr: "", descAr: "", titleEn: "", descEn: "" }],
    }));
  const removeCommitment = (idx: number) =>
    setContent((p) => ({ ...p, commitments: p.commitments.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await setSectorsContent(content);
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
    <AdminShell title="بطاقة القطاعات">
      <div className="max-w-5xl space-y-6">
        {/* Header texts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-black text-gray-800 text-base border-b pb-2">نصوص البطاقة (عربي)</h2>
            {tf("الشارة", content.badge, (v) => updateMeta("badge", v))}
            {tf("العنوان", content.heading, (v) => updateMeta("heading", v))}
            {tf("الفقرة", content.paragraph, (v) => updateMeta("paragraph", v), true)}
            {tf("تسمية الفرق", content.teamsLabel, (v) => updateMeta("teamsLabel", v))}
            {tf("نص الفرق", content.teamsText, (v) => updateMeta("teamsText", v), true)}
            {tf("تسمية التغطية", content.coverageLabel, (v) => updateMeta("coverageLabel", v))}
            {tf("نص التغطية", content.coverageText, (v) => updateMeta("coverageText", v), true)}
            {tf("تسمية الالتزامات", content.commitLabel, (v) => updateMeta("commitLabel", v))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-black text-gray-800 text-base border-b pb-2">Card Texts (English)</h2>
            {tf("Badge (EN)", content.badgeEn || "", (v) => updateMeta("badgeEn", v))}
            {tf("Heading (EN)", content.headingEn || "", (v) => updateMeta("headingEn", v))}
            {tf("Paragraph (EN)", content.paragraphEn || "", (v) => updateMeta("paragraphEn", v), true)}
            {tf("Teams Label (EN)", content.teamsLabelEn || "", (v) => updateMeta("teamsLabelEn", v))}
            {tf("Teams Text (EN)", content.teamsTextEn || "", (v) => updateMeta("teamsTextEn", v), true)}
            {tf("Coverage Label (EN)", content.coverageLabelEn || "", (v) => updateMeta("coverageLabelEn", v))}
            {tf("Coverage Text (EN)", content.coverageTextEn || "", (v) => updateMeta("coverageTextEn", v), true)}
            {tf("Commitment Label (EN)", content.commitLabelEn || "", (v) => updateMeta("commitLabelEn", v))}
          </div>
        </div>

        {/* Sectors list */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-gray-800 text-base">قائمة القطاعات</h2>
            <button onClick={addSector} className="flex items-center gap-1.5 bg-[#3BBA9F] text-white text-sm font-bold px-3 py-1.5 rounded-lg hover:bg-[#2ea88e] transition-colors">
              <Plus size={15} /> إضافة قطاع
            </button>
          </div>
          <div className="space-y-2">
            {content.sectorsAr.map((s, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input type="text" value={s} onChange={(e) => updateSectorAr(idx, e.target.value)} placeholder="اسم القطاع (عربي)" className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3BBA9F]/40" />
                <input type="text" value={content.sectorsEn[idx] || ""} onChange={(e) => updateSectorEn(idx, e.target.value)} placeholder="Sector name (EN)" className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3BBA9F]/40" />
                <button onClick={() => removeSector(idx)} className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Commitments */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-gray-800 text-base">الالتزامات</h2>
            <button onClick={addCommitment} className="flex items-center gap-1.5 bg-[#3BBA9F] text-white text-sm font-bold px-3 py-1.5 rounded-lg hover:bg-[#2ea88e] transition-colors">
              <Plus size={15} /> إضافة
            </button>
          </div>
          <div className="space-y-4">
            {content.commitments.map((c, idx) => (
              <div key={c.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <select
                    value={c.icon}
                    onChange={(e) => updateCommitment(idx, "icon", e.target.value)}
                    className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#3BBA9F]/40"
                  >
                    <option value="CheckCircle2">CheckCircle2</option>
                    <option value="ShieldCheck">ShieldCheck</option>
                    <option value="TrendingUp">TrendingUp</option>
                    <option value="Star">Star</option>
                    <option value="Award">Award</option>
                  </select>
                  <button onClick={() => removeCommitment(idx)} className="mr-auto text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tf("العنوان (عربي)", c.titleAr, (v) => updateCommitment(idx, "titleAr", v))}
                  {tf("Title (EN)", c.titleEn, (v) => updateCommitment(idx, "titleEn", v))}
                  {tf("الوصف (عربي)", c.descAr, (v) => updateCommitment(idx, "descAr", v), true)}
                  {tf("Description (EN)", c.descEn, (v) => updateCommitment(idx, "descEn", v), true)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleSave} disabled={saving} className="bg-[#3BBA9F] text-white font-black px-6 py-2.5 rounded-xl hover:bg-[#2ea88e] transition-colors disabled:opacity-60">
            {saving ? "جاري الحفظ..." : saved ? "تم الحفظ ✓" : "حفظ التغييرات"}
          </button>
          <button onClick={() => setContent(defaultSectorsContent)} className="border border-gray-200 text-gray-600 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            استعادة الافتراضي
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
