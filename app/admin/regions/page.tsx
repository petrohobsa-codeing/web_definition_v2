"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getRegions, setRegions } from "@/lib/db";
import type { RegionItem } from "@/lib/types";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import { defaultRegions } from "@/lib/store";

const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

export default function RegionsPage() {
    const [items, setItems] = useState<RegionItem[]>([]);
    const [saved, setSaved] = useState(false);

  useEffect(() => {
        getRegions().then(setItems);
  }, []);

  const change = (id: string, val: string) => {
        setItems((prev) => prev.map((s) => (s.id === id ? { ...s, name: val } : s)));
  };

  const addItem = () => {
        setItems((prev) => [...prev, { id: Date.now().toString(), name: "" }]);
  };

  const removeItem = (id: string) => {
        setItems((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = async () => {
        await setRegions(items);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
        if (!confirm("إعادة القيم الافتراضية؟")) return;
        await setRegions(defaultRegions);
        setItems(defaultRegions);
  };

  return (
        <AdminShell title="مناطق التغطية">
              <div className="max-w-2xl">
                      <p className="text-brand-charcoal-light text-sm mb-6">
                                هذه المدن تظهر في قسم مناطق التغطية بالصفحة الرئيسية.
                      </p>
              
                {saved && (
                    <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
                                تم الحفظ
                    </div>
                      )}
              
                      <div className="space-y-3 mb-6">
                        {items.map((item, idx) => (
                      <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                                      {idx + 1}
                                    </div>
                                    <input
                                                      className={inputCls}
                                                      value={item.name}
                                                      onChange={(e) => change(item.id, e.target.value)}
                                                      placeholder="اسم المدينة"
                                                    />
                                    <button
                                                      onClick={() => removeItem(item.id)}
                                                      className="text-red-400 hover:text-red-600 p-2 flex-shrink-0"
                                                      aria-label="حذف"
                                                    >
                                                    <Trash2 size={18} />
                                    </button>
                      </div>
                    ))}
                      </div>
              
                      <div className="flex gap-3 flex-wrap">
                                <button
                                              onClick={addItem}
                                              className="flex items-center gap-2 border border-brand-green/30 text-brand-green px-5 py-3 rounded-xl font-bold hover:bg-brand-green-light transition-colors"
                                            >
                                            <Plus size={16} />
                                            إضافة مدينة
                                </button>
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
