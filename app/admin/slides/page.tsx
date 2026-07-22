"use client";
import { useState, useEffect, useRef } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getSlides, setSlides } from "@/lib/db";
import { uploadImage } from "@/lib/upload";
import type { HeroSlide } from "@/lib/types";
import { Plus, Pencil, Trash2, X, Save, GripVertical, Image as ImageIcon } from "lucide-react";

const empty: Omit<HeroSlide, "id"> = {
  badge: "",
  heading: "",
  description: "",
  image: "",
  cta1Label: "",
  cta1Href: "/quote",
  cta2Label: "",
  cta2Href: "/contact",
};

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

export default function SlidesPage() {
  const [slides, setSlidesState] = useState<HeroSlide[]>([]);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getSlides().then(setSlidesState);
  }, []);

  const openNew = () => {
    setEditing({ id: Date.now().toString(), ...empty });
    setIsNew(true);
  };

  const openEdit = (s: HeroSlide) => {
    setEditing({ ...s });
    setIsNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل تريد حذف هذه الشريحة؟")) return;
    const updated = slides.filter((s) => s.id !== id);
    await setSlides(updated);
    setSlidesState(updated);
  };

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setEditing((e) => (e ? { ...e, image: url } : e));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "فشل رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    let updated: HeroSlide[];
    if (isNew) {
      updated = [...slides, editing];
    } else {
      updated = slides.map((s) => (s.id === editing.id ? editing : s));
    }
    await setSlides(updated);
    setSlidesState(updated);
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const change = (field: keyof HeroSlide, val: string) =>
    setEditing((e) => (e ? { ...e, [field]: val } : e));

  return (
    <AdminShell title="شرائح الصفحة الرئيسية">
      {/* Header actions */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-brand-charcoal-light text-sm">
          {slides.length} شريحة — تظهر على الصفحة الرئيسية بالترتيب
        </p>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20"
        >
          <Plus size={16} />
          إضافة شريحة
        </button>
      </div>

      {saved && (
        <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
          ✓ تم الحفظ بنجاح
        </div>
      )}

      {/* Slides list */}
      <div className="space-y-4 mb-6">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              {slide.image && (
                <img src={slide.image} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              )}
              <div className="flex items-center gap-3 flex-shrink-0">
                <GripVertical size={16} className="text-gray-300" />
                <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center text-white font-black text-sm">
                  {idx + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-brand-green-light text-brand-green text-xs font-bold px-2 py-0.5 rounded-full">
                    {slide.badge}
                  </span>
                </div>
                <h3 className="font-black text-brand-charcoal text-sm mb-1 truncate">
                  {slide.heading}
                </h3>
                <p className="text-brand-charcoal-light text-xs line-clamp-2">
                  {slide.description}
                </p>
                <div className="flex gap-3 mt-2 text-xs text-brand-charcoal-light">
                  <span>زر 1: {slide.cta1Label}</span>
                  <span>·</span>
                  <span>زر 2: {slide.cta2Label}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(slide)}
                  className="p-2 rounded-xl bg-brand-green-light text-brand-green hover:bg-brand-green hover:text-white transition-colors"
                  aria-label="تعديل"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  aria-label="حذف"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {slides.length === 0 && (
          <div className="text-center py-16 text-brand-charcoal-light">
            لا توجد شرائح. أضف شريحة جديدة.
          </div>
        )}
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-black text-brand-charcoal">
                {isNew ? "إضافة شريحة جديدة" : "تعديل الشريحة"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="p-2 rounded-xl hover:bg-gray-100 text-brand-charcoal-light"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                  صورة الشريحة (البانر)
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 bg-gray-100 text-brand-charcoal px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  <ImageIcon size={15} />
                  {uploading ? "جارٍ الرفع..." : editing.image ? "تغيير الصورة" : "رفع صورة"}
                </button>
                {editing.image && (
                  <img src={editing.image} alt="" className="mt-3 w-full h-40 object-cover rounded-xl border border-gray-100" />
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                  الشارة (Badge)
                </label>
                <input
                  className={inputCls}
                  value={editing.badge}
                  onChange={(e) => change("badge", e.target.value)}
                  placeholder="مثال: تزويد الوقود"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                  العنوان الرئيسي
                </label>
                <input
                  className={inputCls}
                  value={editing.heading}
                  onChange={(e) => change("heading", e.target.value)}
                  placeholder="العنوان الكبير"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                  الوصف
                </label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={editing.description}
                  onChange={(e) => change("description", e.target.value)}
                  placeholder="وصف قصير للشريحة"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                    نص الزر الأول
                  </label>
                  <input
                    className={inputCls}
                    value={editing.cta1Label}
                    onChange={(e) => change("cta1Label", e.target.value)}
                    placeholder="اطلب الآن"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                    رابط الزر الأول
                  </label>
                  <input
                    className={inputCls}
                    value={editing.cta1Href}
                    onChange={(e) => change("cta1Href", e.target.value)}
                    placeholder="/quote"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                    نص الزر الثاني
                  </label>
                  <input
                    className={inputCls}
                    value={editing.cta2Label}
                    onChange={(e) => change("cta2Label", e.target.value)}
                    placeholder="اعرف المزيد"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                    رابط الزر الثاني
                  </label>
                  <input
                    className={inputCls}
                    value={editing.cta2Href}
                    onChange={(e) => change("cta2Href", e.target.value)}
                    placeholder="/contact"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={uploading}
                className="flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20 disabled:opacity-50"
              >
                <Save size={16} />
                حفظ
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-6 py-3 rounded-xl border border-gray-200 text-brand-charcoal-light hover:bg-gray-50 font-bold transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
