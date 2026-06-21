"use client";
import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { addQuote } from "@/lib/db";

const activityTypes = [
  "المقاولات والإنشاءات",
  "الصناعة والمصانع",
  "اللوجستيات والنقل",
  "الزراعة",
  "العقارات والمجمّعات",
  "محطات توليد الطاقة",
  "أخرى",
];

const serviceOptions = [
  { val: "petroleum", label: "منتجات بترولية (بنزين / ديزل / غاز)" },
  { val: "sewage", label: "سحب بيارات وصرف صحي" },
  { val: "water", label: "إمداد مائي (مياه تحلية / شرب)" },
  { val: "generators", label: "تأجير مولدات كهربائية" },
];

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    activity: "",
    fuelType: "",
    quantity: "",
    city: "",
    sensors: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addQuote({
        name: form.name,
        phone: form.phone,
        email: form.email,
        activity: form.activity,
        fuelType: form.fuelType,
        quantity: form.quantity,
        city: form.city,
        sensors: form.sensors,
        message: form.message,
      });
      await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all duration-200 bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50";

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-brand-green-light flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-brand-green" />
        </div>
        <h3 className="text-2xl font-black text-brand-charcoal mb-3">
          تم إرسال طلبك!
        </h3>
        <p className="text-brand-charcoal-light max-w-md">
          شكراً لك. سيتواصل معك فريق فاست لينك خلال 24 ساعة بعرض سعر مخصّص لاحتياجاتك.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="q-name" className="block text-sm font-bold text-brand-charcoal mb-2">
            الاسم <span className="text-red-500">*</span>
          </label>
          <input
            id="q-name"
            type="text"
            required
            placeholder="اسم الشخص أو المنشأة"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="q-phone" className="block text-sm font-bold text-brand-charcoal mb-2">
            رقم الجوال <span className="text-red-500">*</span>
          </label>
          <input
            id="q-phone"
            type="tel"
            required
            placeholder="+966 5XX XXX XXX"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="q-email" className="block text-sm font-bold text-brand-charcoal mb-2">
          البريد الإلكتروني
        </label>
        <input
          id="q-email"
          type="email"
          placeholder="example@company.sa"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Activity type */}
        <div>
          <label htmlFor="q-activity" className="block text-sm font-bold text-brand-charcoal mb-2">
            نوع النشاط
          </label>
          <select
            id="q-activity"
            value={form.activity}
            onChange={(e) => setForm({ ...form, activity: e.target.value })}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">اختر نوع النشاط</option>
            {activityTypes.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label htmlFor="q-city" className="block text-sm font-bold text-brand-charcoal mb-2">
            الموقع / المدينة
          </label>
          <select
            id="q-city"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">اختر المدينة</option>
            {["الرياض", "مكة المكرمة", "المدينة المنورة", "ينبع", "تبوك", "أخرى"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Service type */}
      <div>
        <p className="text-sm font-bold text-brand-charcoal mb-3">الخدمة المطلوبة</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serviceOptions.map((opt) => (
            <label
              key={opt.val}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 font-medium text-sm ${
                form.fuelType === opt.val
                  ? "border-brand-green bg-brand-green-light text-brand-green"
                  : "border-gray-200 text-brand-charcoal-mid hover:border-brand-green/30"
              }`}
            >
              <input
                type="radio"
                name="fuelType"
                value={opt.val}
                checked={form.fuelType === opt.val}
                onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="q-quantity" className="block text-sm font-bold text-brand-charcoal mb-2">
          الكمية أو الحجم التقديري
        </label>
        <input
          id="q-quantity"
          type="text"
          placeholder="مثال: 5000 لتر / 3 صهاريج / 500 KVA"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="q-message" className="block text-sm font-bold text-brand-charcoal mb-2">
          تفاصيل إضافية
        </label>
        <textarea
          id="q-message"
          rows={4}
          placeholder="أي تفاصيل أخرى تودّ إضافتها عن طلبك..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <Button
        type="submit"
        disabled={loading || !form.name || !form.phone}
        size="lg"
        className="w-full justify-center"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            جارٍ الإرسال...
          </span>
        ) : (
          "إرسال الطلب"
        )}
      </Button>

      <p className="text-xs text-brand-charcoal-light text-center leading-relaxed">
        بإرسالك هذا النموذج فإنك توافق على سياسة الخصوصية لدينا. لن نشارك بياناتك مع أي طرف ثالث.
      </p>
    </form>
  );
}
