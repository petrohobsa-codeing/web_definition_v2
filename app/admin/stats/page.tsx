"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getStats, setStats } from "@/lib/store";
import type { StatItem } from "@/lib/types";
import { Save, RotateCcw } from "lucide-react";
import { defaultStats } from "@/lib/store";

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

export default function StatsPage() {
  const [items, setItems] = useState<StatItem[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setItems(getStats());
  }, []);

  const change = (id: string, field: "value" | "label", val: string) => {
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleSave = () => {
    setStats(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (!confirm("إعادة الإحصائيات للقيم الافتراضية؟")) return;
    setStats(defaultStats);
    setItems(defaultStats);
  };

  return (
    <AdminShell title="الإحصائيات">
      <div className="max-w-2xl">
        <p className="text-brand-charcoal-light text-sm mb-6">
          هذه الأرقام تظهر في قسم الإحصائيات بالصفحة الرئيسية.
        </p>

        {saved && (
          <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
            ✓ تم الحفظ
          </div>
        )}

        <div className="space-y-4 mb-6">
          {items.map((stat, idx) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center text-white font-black text-xs">
                  {idx + 1}
                </div>
                <p className="font-bold text-brand-charcoal text-sm">
                  إحصائية رقم {idx + 1}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                    القيمة (تظهر كبيرة)
                  </label>
                  <input
                    className={inputCls}
                    value={stat.value}
                    onChange={(e) => change(stat.id, "value", e.target.value)}
                    placeholder="+500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                    التسمية (تظهر صغيرة)
                  </label>
                  <input
                    className={inputCls}
                    value={stat.label}
                    onChange={(e) => change(stat.id, "label", e.target.value)}
                    placeholder="منشأة نخدمها"
                  />
                </div>
              </div>
              {/* Preview */}
              <div className="mt-4 p-4 bg-brand-green-light/40 rounded-xl flex items-center gap-3">
                <span className="text-3xl font-black text-brand-green">
                  {stat.value || "—"}
                </span>
                <span className="text-brand-charcoal-light text-sm">
                  {stat.label || "التسمية"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-brand-green text-white px-7 py-3 rounded-xl font-bold hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20"
          >
            <Save size={16} />
            حفظ التغييرات
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 border border-gray-200 text-brand-charcoal-light px-5 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={16} />
            إعادة تعيين
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
