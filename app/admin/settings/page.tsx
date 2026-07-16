"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getSettings, setSettings } from "@/lib/db";
import type { SiteSettings } from "@/lib/types";
import { Save, Eye, EyeOff } from "lucide-react";

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 text-sm";

export default function SettingsPage() {
  const [form, setForm] = useState<SiteSettings>({
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    workingHours: "",
    cities: "",
    adminPassword: "",
  });
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    getSettings().then((s) => {
      setForm(s);
      setConfirmPassword(s.adminPassword);
    });
  }, []);

  const change = (field: keyof SiteSettings, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (field === "adminPassword") setPasswordError("");
  };

  const handleSave = async () => {
    if (form.adminPassword !== confirmPassword) {
      setPasswordError("كلمتا المرور غير متطابقتين");
      return;
    }
    if (form.adminPassword.length < 6) {
      setPasswordError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    await setSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields: { key: keyof SiteSettings; label: string; placeholder: string; type?: string }[] = [
    { key: "phone", label: "رقم الهاتف", placeholder: "+966500000000", type: "tel" },
    { key: "whatsapp", label: "رقم واتساب", placeholder: "+966500000000", type: "tel" },
    { key: "email", label: "البريد الإلكتروني", placeholder: "info@petrohub.sa", type: "email" },
    { key: "address", label: "العنوان", placeholder: "طريق الملك فهد، الرياض" },
    { key: "workingHours", label: "ساعات العمل", placeholder: "الأحد – الخميس، 8 صباحاً – 6 مساءً" },
    { key: "cities", label: "المدن التي نخدمها", placeholder: "الرياض، جدة، الدمام" },
  ];

  return (
    <AdminShell title="إعدادات الموقع">
      <div className="max-w-2xl space-y-6">
        {saved && (
          <div className="bg-brand-green-light border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold">
            ✓ تم حفظ الإعدادات
          </div>
        )}

        {/* Contact info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-brand-charcoal mb-5 pb-3 border-b border-gray-100">
            معلومات التواصل
          </h2>
          <div className="space-y-4">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                  {f.label}
                </label>
                <input
                  type={f.type || "text"}
                  className={inputCls}
                  value={form[f.key]}
                  onChange={(e) => change(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  dir="ltr"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Password */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-brand-charcoal mb-5 pb-3 border-b border-gray-100">
            كلمة مرور لوحة التحكم
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`${inputCls} pl-10`}
                  value={form.adminPassword}
                  onChange={(e) => change("adminPassword", e.target.value)}
                  placeholder="6 أحرف على الأقل"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-charcoal-light hover:text-brand-charcoal"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-charcoal mb-1.5">
                تأكيد كلمة المرور
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className={`${inputCls} ${passwordError ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="أعد إدخال كلمة المرور"
                dir="ltr"
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-brand-green text-white px-7 py-3 rounded-xl font-bold hover:bg-brand-green-mid transition-colors shadow-lg shadow-brand-green/20"
        >
          <Save size={16} />
          حفظ الإعدادات
        </button>
      </div>
    </AdminShell>
  );
}
