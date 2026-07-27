"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getNetworkCards, setNetworkCards } from "@/lib/db";
import type { NetworkCard } from "@/lib/types";
import { Save, RotateCcw } from "lucide-react";
import { defaultNetworkCards } from "@/lib/store";

const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

export default function NetworkPage() {
    const [items, setItems] = useState<NetworkCard[]>([]);
    const [saved, setSaved] = useState(false);

  useEffect(() => {
        getNetworkCards().then(setItems);
  }, []);

  const change = (id: string, val: string) => {
        setItems((prev) => prev.map((s) => (s.id === id ? { ...s, title: val } : s)));
  };

  const handleSave = async () => {
        await setNetworkCards(items);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
        if (!confirm("إعادة القيم الافتراضية؟")) return;
        await setNetworkCards(defaultNetworkCards);
        setItems(defaultNetworkCards);
  };

  return (
        <AdminShell title="شبكتنا الواسعة">
              <div className="max-w-2xl">
                      <p className="text-brand-charcoal-light text-sm mb-6">
                                هذه البطاقات تظهر في قسم شبكتنا الواسعة بالصفحة الرئيسية.
                      </p>
              
                {saved && (
                    <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
                                تم الحفظ
                    </div>
                      )}
              
                      <div className="space-y-4 mb-6">
                        {items.map((item, idx) => (
                      <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 transition-all">
                                    <div className="flex items-center gap-2 mb-4">
                                                    <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center text-white font-black text-xs">
                                                      {idx + 1}
                                                    </div>
                                                    <p className="font-bold text-brand-charcoal text-sm">بطاقة رقم {idx + 1}</p>
                                    </div>
                                    <label className="block text-xs font-bold text-brand-charcoal mb-1.5">العنوان</label>
                                    <input
                                                      className={inputCls}
                                                      value={item.title}
                                                      onChange={(e) => change(item.id, e.target.value)}
                                                      placeholder="الموردون"
                                                    />
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
