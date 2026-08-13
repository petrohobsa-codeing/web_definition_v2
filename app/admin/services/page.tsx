"use client";
import { useState, useEffect, useRef } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getServices, setServices, getServiceDetails, setServiceDetails } from "@/lib/db";
import { uploadImage } from "@/lib/upload";
import type { ServiceItem, ServiceDetailItem } from "@/lib/types";
import { Plus, Pencil, Trash2, X, Save, Fuel, Cpu, Flame, MonitorCheck, Droplets, Zap, Truck, Image as ImageIcon } from "lucide-react";

const iconOptions: { value: ServiceItem["iconName"]; label: string }[] = [
  { value: "Fuel", label: "وقود (Fuel)" },
  { value: "Droplets", label: "قطرات (Droplets)" },
  { value: "Truck", label: "شاحنة (Truck)" },
  { value: "Zap", label: "طاقة (Zap)" },
  { value: "Cpu", label: "معالج (Cpu)" },
  { value: "Flame", label: "لهب (Flame)" },
  { value: "MonitorCheck", label: "شاشة (Monitor)" },
];

const iconMap = { Fuel, Cpu, Flame, MonitorCheck, Droplets, Zap, Truck };

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

const sectionCls = "font-black text-brand-charcoal text-sm border-b border-gray-100 pb-2 mb-1";

/** One combined form the admin fills once; on save it's written to both the
 * homepage-card table (services) and the full-detail table (service_details)
 * so they never drift out of sync with each other. */
interface CombinedService {
  id: string;
  slug: string;
  iconName: ServiceItem["iconName"];
  image?: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  intro: string;
  introEn?: string;
  advantages: string[];
  advantagesEn?: string[];
  value: string[];
  valueEn?: string[];
}

const emptyService: Omit<CombinedService, "id"> = {
  slug: "",
  iconName: "Fuel",
  image: "",
  title: "",
  titleEn: "",
  description: "",
  descriptionEn: "",
  intro: "",
  introEn: "",
  advantages: [],
  advantagesEn: [],
  value: [],
  valueEn: [],
};

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 40);
}

function merge(services: ServiceItem[], details: ServiceDetailItem[]): CombinedService[] {
  const byId = new Map(details.map((d) => [d.id, d]));
  const combined = services.map((s) => {
    const d = byId.get(s.id);
    byId.delete(s.id);
    return {
      id: s.id,
      slug: d?.slug || s.href.split("#")[1] || s.id,
      iconName: s.iconName,
      image: s.image,
      title: s.title,
      titleEn: s.titleEn,
      description: s.description,
      descriptionEn: s.descriptionEn,
      intro: d?.intro || "",
      introEn: d?.introEn,
      advantages: d?.advantages || [],
      advantagesEn: d?.advantagesEn,
      value: d?.value || [],
      valueEn: d?.valueEn,
    };
  });
  // Any service_details rows with no matching services row (shouldn't normally
  // happen, but keeps the admin from silently losing orphaned data).
  for (const d of Array.from(byId.values())) {
    combined.push({
      id: d.id,
      slug: d.slug,
      iconName: (d.iconName as ServiceItem["iconName"]) || "Fuel",
      image: d.image,
      title: d.title,
      titleEn: d.titleEn,
      description: "",
      descriptionEn: "",
      intro: d.intro,
      introEn: d.introEn,
      advantages: d.advantages,
      advantagesEn: d.advantagesEn,
      value: d.value,
      valueEn: d.valueEn,
    });
  }
  return combined;
}

export default function ServicesPage() {
  const [items, setItems] = useState<CombinedService[]>([]);
  const [editing, setEditing] = useState<CombinedService | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    Promise.all([getServices(), getServiceDetails()]).then(([s, d]) => setItems(merge(s, d)));
  };

  useEffect(load, []);

  const openNew = () => {
    setEditing({ id: Date.now().toString(), ...emptyService });
    setIsNew(true);
  };

  const openEdit = (s: CombinedService) => {
    setEditing({ ...s });
    setIsNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل تريد حذف هذه الخدمة بكل تفاصيلها؟")) return;
    const updated = items.filter((s) => s.id !== id);
    await persist(updated);
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

  const persist = async (updated: CombinedService[]) => {
    const slugOf = (s: CombinedService) => s.slug || slugify(s.title) || s.id;
    await Promise.all([
      setServices(
        updated.map((s) => ({
          id: s.id,
          iconName: s.iconName,
          image: s.image,
          title: s.title,
          titleEn: s.titleEn,
          description: s.description,
          descriptionEn: s.descriptionEn,
          href: `/services#${slugOf(s)}`,
        }))
      ),
      setServiceDetails(
        updated.map((s) => ({
          id: s.id,
          slug: slugOf(s),
          iconName: s.iconName,
          image: s.image,
          title: s.title,
          titleEn: s.titleEn,
          intro: s.intro,
          introEn: s.introEn,
          advantages: s.advantages,
          advantagesEn: s.advantagesEn,
          value: s.value,
          valueEn: s.valueEn,
        }))
      ),
    ]);
    setItems(updated);
  };

  const handleSave = async () => {
    if (!editing) return;
    const finalized = { ...editing, slug: editing.slug || slugify(editing.title) || editing.id };
    const updated = isNew
      ? [...items, finalized]
      : items.map((s) => (s.id === finalized.id ? finalized : s));
    await persist(updated);
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const change = <K extends keyof CombinedService>(field: K, val: CombinedService[K]) =>
    setEditing((e) => (e ? { ...e, [field]: val } : e));

  const changeList = (field: "advantages" | "advantagesEn" | "value" | "valueEn", val: string) => {
    const arr = val.split("\n").map((x) => x.trim()).filter(Boolean);
    change(field, arr);
  };

  return (
    <AdminShell title="إدارة الخدمات">
      <p className="text-brand-charcoal-light text-sm mb-4">
        كل خدمة هنا مكان واحد لإدارة بطاقتها في الصفحة الرئيسية، وتفاصيلها ومزاياها الكاملة في صفحة الخدمات — لا حاجة لتحديث مكانين منفصلين.
      </p>
      <div className="flex items-center justify-between mb-6">
        <p className="text-brand-charcoal-light text-sm">{items.length} خدمة معروضة</p>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20"
        >
          <Plus size={16} />
          إضافة خدمة
        </button>
      </div>

      {saved && (
        <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
          ✓ تم الحفظ بنجاح
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((service) => {
          const Icon = iconMap[service.iconName] || Fuel;
          return (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                {service.image ? (
                  <img src={service.image} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-brand-green-light flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-brand-green" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-brand-charcoal mb-1">{service.title}</h3>
                  <p className="text-brand-charcoal-light text-xs line-clamp-2 mb-2">{service.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-brand-charcoal-light">
                      /services#{service.slug}
                    </code>
                    <span className="text-xs text-brand-charcoal-light">
                      {service.advantages.length} مزايا · {service.value.length} قيمة مضافة
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(service)}
                    className="p-2 rounded-xl bg-brand-green-light text-brand-green hover:bg-brand-green hover:text-white transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-black text-brand-charcoal">
                {isNew ? "إضافة خدمة" : "تعديل الخدمة"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="p-2 rounded-xl hover:bg-gray-100 text-brand-charcoal-light"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className={sectionCls}>البطاقة (تظهر في الصفحة الرئيسية)</p>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">صورة الخدمة (اختياري)</label>
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
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">الأيقونة (تُستخدم عند عدم وجود صورة)</label>
                <select
                  className={`${inputCls} cursor-pointer`}
                  value={editing.iconName}
                  onChange={(e) => change("iconName", e.target.value as ServiceItem["iconName"])}
                >
                  {iconOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">اسم الخدمة (عربي)</label>
                  <input className={inputCls} value={editing.title} onChange={(e) => change("title", e.target.value)} placeholder="اسم الخدمة" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">اسم الخدمة (إنجليزي — اختياري)</label>
                  <input className={inputCls} value={editing.titleEn || ""} onChange={(e) => change("titleEn", e.target.value)} placeholder="Service name in English" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">الرابط المختصر (slug) — اختياري، يُشتق من الاسم تلقائياً</label>
                <input className={inputCls} value={editing.slug} onChange={(e) => change("slug", slugify(e.target.value))} placeholder="مثال: energy-logistics" dir="ltr" />
                <p className="text-xs text-brand-charcoal-light mt-1">سيظهر الرابط كـ: /services#{editing.slug || slugify(editing.title) || "..."}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">وصف مختصر (عربي — للبطاقة)</label>
                  <textarea className={`${inputCls} resize-none`} rows={3} value={editing.description} onChange={(e) => change("description", e.target.value)} placeholder="وصف قصير يظهر في البطاقة" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">وصف مختصر (إنجليزي — اختياري)</label>
                  <textarea className={`${inputCls} resize-none`} rows={3} value={editing.descriptionEn || ""} onChange={(e) => change("descriptionEn", e.target.value)} placeholder="Short card description in English" />
                </div>
              </div>

              <p className={`${sectionCls} pt-4`}>التفاصيل الكاملة (تظهر في صفحة الخدمات)</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">المقدمة (عربي)</label>
                  <textarea className={`${inputCls} resize-none`} rows={4} value={editing.intro} onChange={(e) => change("intro", e.target.value)} placeholder="فقرة تعريفية عن الخدمة" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">المقدمة (إنجليزي — اختياري)</label>
                  <textarea className={`${inputCls} resize-none`} rows={4} value={editing.introEn || ""} onChange={(e) => change("introEn", e.target.value)} placeholder="Introductory paragraph in English" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">المزايا (عربي — سطر لكل ميزة)</label>
                  <textarea className={`${inputCls} resize-none`} rows={5} value={editing.advantages.join("\n")} onChange={(e) => changeList("advantages", e.target.value)} placeholder={"إمدادات مستمرة على مدار الساعة\nالتزام كامل بمعايير السلامة"} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">المزايا (إنجليزي — سطر لكل ميزة)</label>
                  <textarea className={`${inputCls} resize-none`} rows={5} value={(editing.advantagesEn || []).join("\n")} onChange={(e) => changeList("advantagesEn", e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">القيمة المضافة (عربي — سطر لكل عنصر)</label>
                  <textarea className={`${inputCls} resize-none`} rows={4} value={editing.value.join("\n")} onChange={(e) => changeList("value", e.target.value)} placeholder={"استمرارية الأعمال دون انقطاع\nتقليل المخاطر التشغيلية"} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">القيمة المضافة (إنجليزي — سطر لكل عنصر)</label>
                  <textarea className={`${inputCls} resize-none`} rows={4} value={(editing.valueEn || []).join("\n")} onChange={(e) => changeList("valueEn", e.target.value)} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100 sticky bottom-0 bg-white">
              <button
                onClick={handleSave}
                disabled={uploading}
                className="flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-green-mid transition-colors disabled:opacity-50"
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
