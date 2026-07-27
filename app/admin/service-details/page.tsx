"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getServiceDetails, setServiceDetails } from "@/lib/db";
import type { ServiceDetailItem } from "@/lib/types";
import { Save, RotateCcw } from "lucide-react";
import { defaultServiceDetails } from "@/lib/store";

const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

export default function ServiceDetailsPage() {
    const [items, setItems] = useState<ServiceDetailItem[]>([]);
    const [saved, setSaved] = useState(false);

  useEffect(() => {
        getServiceDetails().then(setItems);
  }, []);

  const change = (id: string, field: "title" | "intro", val: string) => {
        setItems((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  const changeList = (id: string, field: "advantages" | "value", val: string) => {
        const arr = val.split("\n").map((x) => x.trim()).filter(Boolean);
        setItems((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: arr } : s)));
  };

  const handleSave = async () => {
        await setServiceDetails(items);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
        if (!confirm("إعادة القيم الافتراضية؟")) return;
        await setServiceDetails(defaultServiceDetails);
        setItems(defaultServiceDetails);
  };

  return (
        <AdminShell title="تفاصيل الخدمات">
              <div className="max-w-3xl">
                      <p className="text-brand-charcoal-light text-sm mb-6">هذه البيانات تظهر في صفحة الخدمات التفصيلية. اكتب كل ميزة أو قيمة مضافة في سطر منفصل.</p>
              
                {saved && (
                    <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">تم الحفظ</div>
                      )}

                        <div className="space-y-4 mb-6">
                          {items.map((item, idx) => (
                      <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 transition-all">
                                    <div className="flex items-center gap-2 mb-4">
                                                    <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center text-white font-black text-xs">{idx + 1}</div>
                                                      <p className="font-bold text-brand-charcoal text-sm">{item.title}</p>
                                    </div>
                                      <div className="space-y-4">
                                                        <div>
                                                                          <label className="block text-xs font-bold text-brand-charcoal mb-1.5">العنوان</label>
                                                                          <input className={inputCls} value={item.title} onChange={(e) => change(item.id, "title", e.target.value)} />
                                                                        </div>
                                                        <div>
                                                                          <label className="block text-xs font-bold text-brand-charcoal mb-1.5">المقدمة</label>
                                                                          <textarea className={inputCls} rows={3} value={item.intro} onChange={(e) => change(item.id, "intro", e.target.value)} />
                                                                        </div>
                                                  <div>
                                                                          <label className="block text-xs font-bold text-brand-charcoal mb-1.5">المزايا (سطر لكل ميزة)</label>
                                                                    <textarea className={inputCls} rows={5} value={item.advantages.join("\n")} onChange={(e) => changeList(item.id, "advantages", e.target.value)} />
                                                                  </div>
                                                        <div>
                                                                          <label className="block text-xs font-bold text-brand-charcoal mb-1.5">القيمة المضافة (سطر لكل عنصر)</label>
                                                                          <textarea className={inputCls} rows={4} value={item.value.join("\n")} onChange={(e) => changeList(item.id, "value", e.target.value)} />
                                                                        </div>
                                      </div>
                      </div>
                                                      ))}
                                      </div>

                        <div className="flex gap-3">
                                  <button onClick={handleSave} className="flex items-center gap-2 bg-brand-green text-white px-7 py-3 rounded-xl font-bold hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20">
                                              <Save size={16} />
                                              حفظ التغييرات
                                  </button>
                                  <button onClick={handleReset} className="flex items-center gap-2 border border-gray-200 text-brand-charcoal-light px-5 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                                              <RotateCcw size={16} />
                                              إعادة تعيين
                                  </button></div>
                                    </div>
              </AdminShell>
      );
}
