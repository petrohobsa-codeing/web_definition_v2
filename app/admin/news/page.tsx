"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getPosts, setPosts, addPost, deletePost } from "@/lib/db";
import type { BlogPost } from "@/lib/types";
import { Plus, Pencil, Trash2, X, Save, Calendar, Tag } from "lucide-react";

const categories = ["لوجستيات", "بيئة وصرف", "إمداد مائي", "طاقة", "أخبار الشركة"];

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

const empty: Omit<BlogPost, "id"> = { title: "", excerpt: "", content: "", category: "", date: new Date().toISOString().split("T")[0], slug: "" };

function slugify(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "").slice(0, 60) || Date.now().toString();
}

export default function AdminNewsPage() {
  const [posts, setLocal] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<BlogPost, "id">>(empty);
  const [saved, setSaved] = useState(false);

  useEffect(() => { getPosts().then(setLocal); }, []);

  const save = async () => {
    if (!form.title.trim()) return;
    const slug = form.slug || slugify(form.title);
    if (editing) {
      const updated = posts.map((p) => p.id === editing.id ? { ...form, slug, id: editing.id } : p);
      await setPosts(updated);
      setLocal(updated);
      setEditing(null);
    } else {
      await addPost({ ...form, slug });
      getPosts().then(setLocal);
      setAdding(false);
    }
    setForm(empty);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const remove = async (id: string) => {
    if (!confirm("حذف هذا المقال؟")) return;
    await deletePost(id);
    getPosts().then(setLocal);
  };

  const startEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({ title: p.title, excerpt: p.excerpt, content: p.content, category: p.category, date: p.date, slug: p.slug });
    setAdding(false);
  };

  const cancel = () => { setEditing(null); setAdding(false); setForm(empty); };
  const showForm = adding || editing !== null;

  return (
    <AdminShell title="إدارة الأخبار والمقالات">
      {saved && (
        <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
          ✓ تم الحفظ بنجاح
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => { setAdding(true); setEditing(null); setForm(empty); }}
          className="mb-6 flex items-center gap-2 bg-brand-green text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20"
        >
          <Plus size={16} />
          إضافة مقال جديد
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
          <h3 className="font-black text-brand-charcoal mb-5 text-lg">
            {editing ? "تعديل المقال" : "مقال جديد"}
          </h3>
          <div className="space-y-4">
            <input className={inputCls} placeholder="عنوان المقال *" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} />
            <textarea className={`${inputCls} resize-none`} rows={2} placeholder="مقتطف قصير (يظهر في قائمة الأخبار)"
              value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            <textarea className={`${inputCls} resize-none`} rows={8} placeholder="محتوى المقال الكامل (يدعم ## للعناوين و- للقوائم)"
              value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <select className={`${inputCls} cursor-pointer`} value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">اختر التصنيف</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input className={inputCls} type="date" value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} disabled={!form.title.trim()}
              className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors disabled:opacity-50">
              <Save size={15} /> حفظ ونشر
            </button>
            <button onClick={cancel}
              className="flex items-center gap-2 bg-gray-100 text-brand-charcoal px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
              <X size={15} /> إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Posts list */}
      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {p.category && (
                    <span className="text-xs bg-brand-green-light text-brand-green px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                      <Tag size={10} /> {p.category}
                    </span>
                  )}
                  <span className="text-xs text-brand-charcoal-light flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(p.date).toLocaleDateString("ar-SA")}
                  </span>
                </div>
                <h3 className="font-black text-brand-charcoal mb-1">{p.title}</h3>
                <p className="text-brand-charcoal-light text-xs line-clamp-2">{p.excerpt}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(p)}
                  className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-brand-green-light text-brand-charcoal-light hover:text-brand-green flex items-center justify-center transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => remove(p.id)}
                  className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-red-50 text-brand-charcoal-light hover:text-red-500 flex items-center justify-center transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
