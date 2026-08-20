"use client";
import { useState, useEffect, useRef } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getAboutCompany, setAboutCompany } from "@/lib/db";
import { uploadImage } from "@/lib/upload";
import { defaultAboutCompany } from "@/lib/store";
import type { AboutCompanyContent } from "@/lib/types";
import { Save, Image as ImageIcon, RotateCcw } from "lucide-react";

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

const labelCls = "block text-xs font-bold text-brand-charcoal mb-2";

export default function AboutCompanyAdminPage() {
  const [content, setContent] = useState<AboutCompanyContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAboutCompany().then(setContent);
  }, []);

  const change = (field: keyof AboutCompanyContent, val: string) =>
    setContent((c) => (c ? { ...c, [field]: val } : c));

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setContent((c) => (c ? { ...c, photo: url } : c));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "فشل رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      await setAboutCompany(content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "فشل الحفظ");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!confirm("استعادة النص الافتراضي؟ لن يُحفظ إلا بعد الضغط على «حفظ التغييرات».")) return;
    setContent({ ...defaultAboutCompany });
  };

  if (!content) {
    return (
      <AdminShell title="بطاقة عن الشركة">
        <p className="text-brand-charcoal-light text-sm">جاري التحميل…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="بطاقة عن الشركة">
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <p className="text-brand-charcoal-light text-sm">
          تظهر هذه البطاقة في الصفحة الرئيسية وصفحة «عن الشركة».
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-white border border-gray-200 text-brand-charcoal px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={16} />
            استعادة الافتراضي
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20 disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "جاري الحفظ…" : "حفظ التغييرات"}
          </button>
        </div>
      </div>

      {saved && (
        <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
          ✓ تم الحفظ بنجاح
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="font-black text-brand-charcoal text-sm mb-4">صورة البطاقة</p>
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
            {content.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.photo} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <ImageIcon size={32} />
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-brand-charcoal px-4 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors disabled:opacity-60"
          >
            <ImageIcon size={16} />
            {uploading ? "جاري الرفع…" : "رفع صورة"}
          </button>
          <div className="mt-3">
            <label className={labelCls}>أو ضع رابط الصورة</label>
            <input
              className={inputCls}
              value={content.photo}
              onChange={(e) => change("photo", e.target.value)}
              placeholder="/images/hero/petrohub-hq.jpg"
            />
          </div>
        </div>

        {/* Arabic content */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <p className="font-black text-brand-charcoal text-sm">المحتوى بالعربية</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>العنوان (سطر أول)</label>
              <input className={inputCls} value={content.titleTop} onChange={(e) => change("titleTop", e.target.value)} placeholder="عن" />
            </div>
            <div>
              <label className={labelCls}>العنوان (سطر ثانٍ)</label>
              <input className={inputCls} value={content.titleBottom} onChange={(e) => change("titleBottom", e.target.value)} placeholder="بتروهب" />
            </div>
          </div>
          <div>
            <label className={labelCls}>السطر التمهيدي</label>
            <input className={inputCls} value={content.eyebrow} onChange={(e) => change("eyebrow", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>العنوان الرئيسي</label>
            <input className={inputCls} value={content.headline} onChange={(e) => change("headline", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>نص التعريف</label>
            <textarea className={`${inputCls} resize-none`} rows={8} value={content.paragraph} onChange={(e) => change("paragraph", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>شارة التاريخ</label>
            <input className={inputCls} value={content.since} onChange={(e) => change("since", e.target.value)} placeholder="منذ عام 2004" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>عنوان بطاقة الرؤية</label>
              <input className={inputCls} value={content.visionLabel} onChange={(e) => change("visionLabel", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>عنوان بطاقة الرسالة</label>
              <input className={inputCls} value={content.missionLabel} onChange={(e) => change("missionLabel", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>نص الرؤية</label>
            <textarea className={`${inputCls} resize-none`} rows={4} value={content.visionText} onChange={(e) => change("visionText", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>نص الرسالة</label>
            <textarea className={`${inputCls} resize-none`} rows={4} value={content.missionText} onChange={(e) => change("missionText", e.target.value)} />
          </div>
        </div>

        {/* English content */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4" dir="ltr">
          <p className="font-black text-brand-charcoal text-sm text-right" dir="rtl">
            المحتوى بالإنجليزية <span className="font-normal text-brand-charcoal-light">(اختياري — يُترجم تلقائيًا إذا تُرك فارغًا)</span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Title (line 1)</label>
              <input className={inputCls} value={content.titleTopEn || ""} onChange={(e) => change("titleTopEn", e.target.value)} placeholder="About" />
            </div>
            <div>
              <label className={labelCls}>Title (line 2)</label>
              <input className={inputCls} value={content.titleBottomEn || ""} onChange={(e) => change("titleBottomEn", e.target.value)} placeholder="Petrohub" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Eyebrow</label>
            <input className={inputCls} value={content.eyebrowEn || ""} onChange={(e) => change("eyebrowEn", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Headline</label>
            <input className={inputCls} value={content.headlineEn || ""} onChange={(e) => change("headlineEn", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Paragraph</label>
            <textarea className={`${inputCls} resize-none`} rows={8} value={content.paragraphEn || ""} onChange={(e) => change("paragraphEn", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Date badge</label>
            <input className={inputCls} value={content.sinceEn || ""} onChange={(e) => change("sinceEn", e.target.value)} placeholder="Since 2004" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Vision card title</label>
              <input className={inputCls} value={content.visionLabelEn || ""} onChange={(e) => change("visionLabelEn", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Mission card title</label>
              <input className={inputCls} value={content.missionLabelEn || ""} onChange={(e) => change("missionLabelEn", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Vision text</label>
            <textarea className={`${inputCls} resize-none`} rows={4} value={content.visionTextEn || ""} onChange={(e) => change("visionTextEn", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Mission text</label>
            <textarea className={`${inputCls} resize-none`} rows={4} value={content.missionTextEn || ""} onChange={(e) => change("missionTextEn", e.target.value)} />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
