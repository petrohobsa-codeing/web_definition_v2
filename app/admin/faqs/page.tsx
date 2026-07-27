"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getFaqs, setFaqs } from "@/lib/db";
import type { FaqItem } from "@/lib/types";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import { defaultFaqs } from "@/lib/store";

const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

export default function FaqsPage() {
    const [items, setItems] = useState<FaqItem[]>([]);
    const [saved, setSaved] = useState(false);

  useEffect(() => {
        getFaqs().then(setItems);
  }, []);

  const change = (id: string, field: "question" | "answer", val: string) => {
        setItems((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  const addItem = () => {
        setItems((prev) => [...prev, { id: Date.now().toString(), question: "", answer: "" }]);
  };

  const removeItem = (id: string) => {
        setItems((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = async () => {
        await setFaqs(items);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
        if (!confirm("إعادة القيم الافتراضية؟")) return;
        await setFaqs(defaultFaqs);
        setItems(defaultFaqs);
  };

  return (
        <AdminShell title="الأسئلة الشائعة">
              <div className="max-w-2xl">
                      <p className="text-brand-charcoal-light text-sm mb-6">
                                هذه الأسئلة تظهر في قسم الأسئلة الشائعة بالصفحة الرئيسية.
                      </p>
              
                {saved && (
                    <div className="mb-4 bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
                                تم الحفظ
                    </div>
                      )}
              
                      <div className="space-y-4 mb-6">
                        {items.map((item, idx) => (
                      <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-green/20 transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-2">
                                                                      <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center text-white font-black text-xs">
                                                                        {idx + 1}
                                                                      </div>
                                                                      <p className="font-bold text-brand-charcoal text-sm">سؤال رقم {idx + 1}</p>
                                                    </div>
                                                    <button
                                                                        onClick={() => removeItem(item.id)}
                                                                        className="text-red-400 hover:text-red-600 p-1"
                                                                        aria-label="حذف"
                                                                      >
                                                                      <Trash2 size={18} />
                                                    </button>
                                    </div>
                                    <div className="space-y-4">
                                                    <div>
                                                                      <label className="block text-xs font-bold text-brand-charcoal mb-1.5">السؤال</label>
                                                                      <input
                                                                                            className={inputCls}
                                                                                            value={item.question}
                                                                                            onChange={(e) => change(item.id, "question", e.target.value)}
                                                                                            placeholder="ما هي الخدمة؟"
                                                                                          />
                                                    </div>
                                                    <div>
                                                                      <label className="block text-xs font-bold text-brand-charcoal mb-1.5">الإجابة</label>
                                                                      <textarea
                                                                                            className={inputCls}
                                                                                            rows={3}
                                                                                            value={item.answer}
                                                                                            onChange={(e) => change(item.id, "answer", e.target.value)}
                                                                                            placeholder="نص الإجابة"
                                                                                          />
                                                    </div>
                                    </div>
                      </div>
                    ))}
                      </div>
              
                      <div className="flex gap-3 flex-wrap">
                                <button
                                              onClick={addItem}
                                              className="flex items-center gap-2 border border-brand-green/30 text-brand-green px-5 py-3 rounded-xl font-bold hover:bg-brand-green-light transition-colors"
                                            >
                                            <Plus size={16} />
                                            إضافة سؤال
                                </button>

                                  <button onClick={handleSave} className="flex items-center gap-2 bg-brand-green text-white px-7 py-3 rounded-xl font-bold hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20">
                                              <Save size={16} />
                                              حفظ التغييرات
                                            </button>
                                  <button onClick={handleReset} className="flex items-center gap-2 border border-gray-200 text-brand-charcoal-light px-5 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                                              <RotateCcw size={16} />
                                              إعادة تعيين
                                            </button>
                      </div>
              </div>
        </AdminShell>
      );
}
