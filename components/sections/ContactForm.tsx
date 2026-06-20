"use client";
import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { addMessage } from "@/lib/store";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      addMessage({ name: form.name, phone: form.phone, email: form.email, message: form.message });
      await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-brand-green-light flex items-center justify-center mb-6">
          <CheckCircle2 size={40} className="text-brand-green" />
        </div>
        <h3 className="text-2xl font-black text-brand-charcoal mb-3">
          تم إرسال رسالتك!
        </h3>
        <p className="text-brand-charcoal-light max-w-sm">
          شكراً لتواصلك مع Fast Link. سيتصل بك فريقنا خلال ساعات العمل.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-bold text-brand-charcoal mb-2"
        >
          الاسم <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          placeholder="اسم المنشأة"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all duration-200 bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50"
        />
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-bold text-brand-charcoal mb-2"
        >
          رقم الجوال <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          required
          placeholder="+966 5XX XXX XXX"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all duration-200 bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-bold text-brand-charcoal mb-2"
        >
          البريد الإلكتروني
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="example@company.sa"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all duration-200 bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-bold text-brand-charcoal mb-2"
        >
          رسالتك
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="أكتب رسالتك هنا..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all duration-200 bg-gray-50 text-brand-charcoal placeholder:text-brand-charcoal-light/50 resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={loading || !form.name || !form.phone}
        className="w-full justify-center"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            جارٍ الإرسال...
          </span>
        ) : (
          "إرسال"
        )}
      </Button>

      <p className="text-xs text-brand-charcoal-light text-center leading-relaxed">
        بإرسالك هذا النموذج فإنك توافق على سياسة الخصوصية لدينا. لن نشارك
        بياناتك مع أي طرف ثالث.
      </p>
    </form>
  );
}
