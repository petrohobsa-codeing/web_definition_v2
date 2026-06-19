"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getServices, setServices } from "@/lib/store";
import type { ServiceItem } from "@/lib/types";
import { Plus, Pencil, Trash2, X, Save, Fuel, Cpu, Flame, MonitorCheck } from "lucide-react";

const iconOptions: { value: ServiceItem["iconName"]; label: string }[] = [
  { value: "Fuel", label: "وقود (Fuel)" },
  { value: "Cpu", label: "معالج (Cpu)" },
  { value: "Flame", label: "لهب (Flame)" },
  { value: "MonitorCheck", label: "شاشة (Monitor)" },
];

const iconMap = { Fuel, Cpu, Flame, MonitorCheck };

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

const emptyService: Omit<ServiceItem, "id"> = {
  iconName: "Fuel",
  title: "",
  description: "",
  href: "",
};

export default function ServicesPage() {
  const [services, setServicesState] = useState<ServiceItem[]>([]);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setServicesState(getServices());
  }, []);

  const openNew = () => {
    setEditing({ id: Date.now().toString(), ...emptyService });
    setIsNew(true);
  };

  const openEdit = (s: ServiceItem) => {
    setEditing({ ...s });
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("هل تريد حذف هذه الخدمة؟")) return;
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    setServicesState(updated);
  };

  const handleSave = () => {
    if (!editing) return;
    const updated = isNew
      ? [...services, editing]
      : services.map((s) => (s.id === editing.id ? editing : s));
    setServices(updated);
    setServicesState(updated);
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const change = (field: keyof ServiceItem, val: string) =>
    setEditing((e) => (e ? { ...e, [field]: val } : e));

  return (
    <AdminShell title="إدارة الخدمات">
      <div className="flex items-center justify-between mb-6">
        <p className="text-brand-charcoal-light text-sm">
          {services.length} خدمة معروضة
        </p>
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
        {services.map((service) => {
          const Icon = iconMap[service.iconName];
          return (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-green-light flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-brand-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-brand-charcoal mb-1">
                    {service.title}
                  </h3>
                  <p className="text-brand-charcoal-light text-xs line-clamp-2 mb-2">
                    {service.description}
                  </p>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-brand-charcoal-light">
                    {service.href}
                  </code>
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
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
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
              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                  الأيقونة
                </label>
                <select
                  className={`${inputCls} cursor-pointer`}
                  value={editing.iconName}
                  onChange={(e) =>
                    change("iconName", e.target.value)
                  }
                >
                  {iconOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                  اسم الخدمة
                </label>
                <input
                  className={inputCls}
                  value={editing.title}
                  onChange={(e) => change("title", e.target.value)}
                  placeholder="اسم الخدمة"
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
                  placeholder="وصف الخدمة"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                  رابط الصفحة
                </label>
                <input
                  className={inputCls}
                  value={editing.href}
                  onChange={(e) => change("href", e.target.value)}
                  placeholder="/services/diesel-supply"
                />
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
