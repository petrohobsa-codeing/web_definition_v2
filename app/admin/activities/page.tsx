"use client";
import { useState, useEffect, useRef } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getActivities, addActivity, deleteActivity } from "@/lib/db";
import { uploadImage } from "@/lib/upload";
import type { ActivityItem } from "@/lib/types";
import { Plus, Trash2, X, Save, Image as ImageIcon, Calendar } from "lucide-react";

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

const empty: Omit<ActivityItem, "id"> = { title: "", description: "", category: "", date: "", image: "" };

export default function AdminActivitiesPage() {
  const [activities, setLocal] = useState<ActivityItem[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<ActivityItem, "id">>(empty);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const reload = () => { getActivities().then(setLocal); };
  useEffect(() => { reload(); }, []);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, image: url }));
    } catch (e: any) {
      alert(e?.message || "فشل رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.title.trim()) return;
    await addActivity(form);
    setForm(empty);
    setAdding(false);
    reload();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const remove = async (id: string) => {
    if (!confirm("حذف هذا النشاط؟")) return;
    await deleteActivity(id);
    reload();
  };

  return (
    <AdminShell title="إدارة الأنشطة">
      {saved && (
        <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
          ✓ تم الحفظ بنجاح
        </div>
      )}

      {!adding && (
        <button
          onClick={() => { setAdding(true); setForm(empty); }}
          className="mb-6 flex items-center gap-2 bg-brand-green text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20"
        >
          <Plus size={16} />
          إضافة نشاط جديد
        </button>
      )}

      {adding && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
          <h3 className="font-black text-brand-charcoal mb-5 text-lg">نشاط جديد</h3>
          <div className="space-y-4">
            <input className={inputCls} placeholder="عنوان النشاط *" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea className={`${inputCls} resize-none`} rows={3} placeholder="وصف النشاط"
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <input className={inputCls} placeholder="التصنيف" value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })} />
              <input type="date" className={inputCls} value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-charcoal mb-1.5">صورة النشاط</label>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 bg-gray-100 text-brand-charcoal px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
                <ImageIcon size={15} />
                {uploading ? "جارٍ الرفع..." : form.image ? "تغيير الصورة" : "رفع صورة"}
              </button>
              {form.image && (
                <img src={form.image} alt="" className="mt-3 w-full max-w-xs h-32 object-cover rounded-xl border border-gray-100" />
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} disabled={!form.title.trim() || uploading}
              className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors disabled:opacity-50">
              <Save size={15} /> حفظ
            </button>
            <button onClick={() => { setAdding(false); setForm(empty); }}
              className="flex items-center gap-2 bg-gray-100 text-brand-charcoal px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
              <X size={15} /> إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((a) => (
          <div key={a.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 hover:shadow-md transition-all duration-200">
            {a.image && (
              <img src={a.image} alt="" className="w-full h-36 object-cover rounded-xl mb-3" />
            )}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-brand-charcoal mb-2 leading-snug">{a.title}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {a.category && (
                    <span className="text-xs bg-brand-green-light text-brand-green px-2.5 py-1 rounded-full font-bold">{a.category}</span>
                  )}
                  {a.date && (
                    <span className="text-xs bg-gray-100 text-brand-charcoal-mid px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                      <Calendar size={10} /> {a.date}
                    </span>
                  )}
                </div>
                <p className="text-brand-charcoal-light text-xs leading-relaxed line-clamp-2">{a.description}</p>
              </div>
              <button onClick={() => remove(a.id)}
                className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-red-50 text-brand-charcoal-light hover:text-red-500 flex items-center justify-center transition-colors flex-shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="col-span-2 text-center py-16 text-brand-charcoal-light">
            لا توجد أنشطة. أضف نشاطاً جديداً.
          </div>
        )}
      </div>
    </AdminShell>
  );
}
