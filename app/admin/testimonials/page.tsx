"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getTestimonials, setTestimonials } from "@/lib/store";
import type { Testimonial } from "@/lib/types";
import { Plus, Pencil, Trash2, X, Save, Quote } from "lucide-react";

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

const emptyT: Omit<Testimonial, "id"> = {
  text: "",
  name: "",
  role: "",
  company: "",
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setItems(getTestimonials());
  }, []);

  const openNew = () => {
    setEditing({ id: Date.now().toString(), ...emptyT });
    setIsNew(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing({ ...t });
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("حذف هذا الرأي؟")) return;
    const updated = items.filter((t) => t.id !== id);
    setTestimonials(updated);
    setItems(updated);
  };

  const handleSave = () => {
    if (!editing) return;
    const updated = isNew
      ? [...items, editing]
      : items.map((t) => (t.id === editing.id ? editing : t));
    setTestimonials(updated);
    setItems(updated);
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const change = (field: keyof Testimonial, val: string) =>
    setEditing((e) => (e ? { ...e, [field]: val } : e));

  return (
    <AdminShell title="آراء العملاء">
      <div className="flex items-center justify-between mb-6">
        <p className="text-brand-charcoal-light text-sm">
          {items.length} رأي معروض
        </p>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20"
        >
          <Plus size={16} />
          إضافة رأي
        </button>
      </div>

      {saved && (
        <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
          ✓ تم الحفظ
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 hover:shadow-md transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center mb-4">
              <Quote size={18} className="text-brand-green" />
            </div>
            <p className="text-brand-charcoal-light text-sm leading-relaxed line-clamp-3 mb-4">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-green to-brand-green-mid flex items-center justify-center text-white font-black text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-black text-brand-charcoal text-sm">{t.name}</p>
                <p className="text-brand-charcoal-light text-xs">
                  {t.role}، {t.company}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(t)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-brand-green-light text-brand-green hover:bg-brand-green hover:text-white transition-colors text-sm font-bold"
              >
                <Pencil size={13} />
                تعديل
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-black text-brand-charcoal">
                {isNew ? "إضافة رأي جديد" : "تعديل الرأي"}
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
                  نص الرأي
                </label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={4}
                  value={editing.text}
                  onChange={(e) => change("text", e.target.value)}
                  placeholder="ما قاله العميل..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                  اسم العميل
                </label>
                <input
                  className={inputCls}
                  value={editing.name}
                  onChange={(e) => change("name", e.target.value)}
                  placeholder="م. أحمد القحطاني"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                    المسمى الوظيفي
                  </label>
                  <input
                    className={inputCls}
                    value={editing.role}
                    onChange={(e) => change("role", e.target.value)}
                    placeholder="مدير العمليات"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                    الشركة
                  </label>
                  <input
                    className={inputCls}
                    value={editing.company}
                    onChange={(e) => change("company", e.target.value)}
                    placeholder="شركة كبرى"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-green-mid transition-colors"
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
