"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getCredentials, setCredentials } from "@/lib/db";
import type { CredentialItem } from "@/lib/types";
import { Save, RotateCcw } from "lucide-react";
import { defaultCredentials } from "@/lib/store";

const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

export default function CredentialsPage() {
    const [items, setItems] = useState<CredentialItem[]>([]);
    const [saved, setSaved] = useState(false);

  useEffect(() => {
        getCredentials().then(setItems);
  }, []);

  const change = (id: string, field: "title" | "description", val: string) => {
        setItems((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  const handleSave = async () => {
        await setCredentials(items);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
        if (!confirm("إعادة القيم الافتراضية؟")) return;
        await setCredentials(defaultCredentials);
        setItems(defaultCredentials);
  };

  return (
        <AdminShell title="اعتماداتنا وثقتنا">
              <div className="max-w-2xl">
                      <p className="text-brand-charcoal-light text-sm mb-6">
                                هذه البطاقات تظهر في قسم اعتماداتنا بالصفحة الرئيسية.
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
                                    <div className="space-y-4">
                                                    <div>
                                                                      <label className="block text-xs font-bold text-brand-charcoal mb-1.5">العنوان</label>
                                                                      <input
                                                                                            className={inputCls}
                                                                                            value={item.title}
                                                                                            onChange={(e) => change(item.id, "title", e.target.value)}
                                                                                            placeholder="الجودة والسلامة"
                                                                                          />
                                                    </div>
                                                    <div>
                                                                      <label className="block text-xs font-bold text-brand-charcoal mb-1.5">الوصف</label>
                                                                      <textarea
                                                                                            className={inputCls}
                                                                                            rows={2}
                                                                                            value={item.description}
                                                                                            onChange={(e) => change(item.id, "description", e.target.value)}
                                                                                            placeholder="النص التوضيحي"
                                                                                          />
                                                    </div>
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
</AdminShell>
