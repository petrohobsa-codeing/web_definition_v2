"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const faqs = [
  {
    ar: { q: "ما الخدمات التي تقدّمها PetroHop؟", a: "نقدّم سبع خدمات متكاملة: توريد غاز البترول المسال (LPG)، المنتجات البترولية، خدمات المياه والبيئة، حلول الطاقة، منصة PetroHub IoT، الخدمات اللوجستية، وأنظمة تتبع ومراقبة المركبات." },
    en: { q: "What services does PetroHop offer?", a: "We provide seven integrated services: LPG supply, petroleum products, water & environmental services, energy solutions, the PetroHub IoT platform, logistics services, and vehicle tracking & monitoring systems." },
  },
  {
    ar: { q: "ما المناطق التي تغطّيها خدماتكم؟", a: "نغطّي شبكة تشغيل واسعة تشمل الرياض، مكة المكرمة، المدينة المنورة، ينبع، وتبوك، مع إمكانية التنسيق لمناطق أخرى حسب الطلب." },
    en: { q: "Which regions do your services cover?", a: "We cover a wide operational network including Riyadh, Makkah, Madinah, Yanbu and Tabuk, with the ability to coordinate for other regions on request." },
  },
  {
    ar: { q: "كيف تضمنون معايير السلامة والجودة؟", a: "نلتزم بأعلى معايير السلامة المحلية والدولية في جميع مراحل النقل والتسليم، باستخدام أسطول حديث مجهّز بأحدث أنظمة الأمان وفرق متخصصة مدرّبة." },
    en: { q: "How do you ensure safety and quality standards?", a: "We comply with the highest local and international safety standards across every transport and delivery stage, using a modern fleet equipped with the latest safety systems and trained specialized teams." },
  },
  {
    ar: { q: "ما هي منصة PetroHub IoT؟", a: "منصة رقمية ذكية لمراقبة استهلاك الطاقة والمعدات في الوقت الفعلي، تساعد على خفض الاستهلاك حتى 30% وتقليل الأعطال عبر الصيانة الوقائية والتنبيهات الذكية." },
    en: { q: "What is the PetroHub IoT platform?", a: "A smart digital platform for real-time monitoring of energy and equipment consumption, helping cut consumption by up to 30% and reduce breakdowns through preventive maintenance and smart alerts." },
  },
  {
    ar: { q: "كيف أحصل على عرض سعر؟", a: "يمكنك طلب عرض سعر مخصّص عبر صفحة \"اطلب عرض سعر\"، وسيتواصل معك فريقنا خلال 24 ساعة بعرض مصمّم وفق احتياجاتك." },
    en: { q: "How do I get a quote?", a: "You can request a custom quote via the \"Get a Quote\" page, and our team will contact you within 24 hours with an offer tailored to your needs." },
  },
];

export default function Faq() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-3">
          <span className="text-brand-green">{lang === "ar" ? "الأسئلة" : "Frequently Asked"}</span>{" "}
          <span className="text-[#C8102E]">{lang === "ar" ? "الشائعة" : "Questions"}</span>
        </h2>
        <p className="text-center text-[#54595F] mb-12">
          {lang === "ar"
            ? "إجابات على أكثر الأسئلة شيوعاً حول خدمات PetroHop."
            : "Answers to the most common questions about PetroHop's services."}
        </p>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const c = lang === "ar" ? item.ar : item.en;
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-[#1B355E]/30 bg-[#F4F6FA]" : "border-gray-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-brand-green-dark">{c.q}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-[#C8102E] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[#54595F] leading-7">{c.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
