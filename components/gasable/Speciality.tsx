"use client";
import { useLang } from "@/context/LanguageContext";
import GasableButton from "./GasableButton";
import { Recycle, BarChart3, Plug, Cpu } from "lucide-react";

const items = [
  {
    Icon: Recycle,
    ar: { title: "حلول صديقة للبيئة", text: "نقدّم حلولاً مبتكرة مصمّمة لتقليل الانبعاثات الضارّة بالبيئة." },
    en: { title: "Eco-Friendly Solutions", text: "We offer innovative solutions designed to minimize harmful environmental emissions." },
  },
  {
    Icon: BarChart3,
    ar: { title: "التحوّل الرقمي", text: "تبسيط العمليات التشغيلية باستخدام حلول رقمية متقدّمة." },
    en: { title: "Digital Transformation", text: "Simplifying operational processes using advanced digital solutions." },
  },
  {
    Icon: Plug,
    ar: { title: "تعزيز الاستدامة", text: "تلبية احتياجات الطاقة الحالية مع الحفاظ على الموارد للأجيال القادمة." },
    en: { title: "Promoting Sustainability", text: "Addressing today's energy demands while safeguarding resources for future generations." },
  },
  {
    Icon: Cpu,
    ar: { title: "حلول الذكاء الاصطناعي", text: "استخدام الذكاء الاصطناعي لإنتاج تقارير وبيانات ثاقبة لتحسين الأداء." },
    en: { title: "Artificial Intelligence Solutions", text: "Utilizing AI to generate insightful reports and data to optimize performance." },
  },
];

export default function Speciality() {
  const { lang } = useLang();
  return (
    <section className="bg-[#F0FAF5] py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-12">
          <span className="text-brand-charcoal-mid">{lang === "ar" ? "تخصّصنا" : "Our"}</span>{" "}
          <span className="text-brand-green-dark">{lang === "ar" ? "" : "Speciality"}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {items.map(({ Icon, ...c }, i) => {
            const content = lang === "ar" ? c.ar : c.en;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-[100px] h-[100px] rounded-2xl bg-gradient-to-br from-[#51B957]/10 to-[#0E549A]/10 flex items-center justify-center mb-5">
                  <Icon size={48} className="text-brand-green-dark" strokeWidth={1.5} />
                </div>
                <h3 className="text-[22px] font-semibold text-brand-charcoal-mid mb-3">
                  {content.title}
                </h3>
                <p className="text-[#54595F] leading-7">{content.text}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <GasableButton href="/services">
            {lang === "ar" ? "اقرأ المزيد" : "Read More"}
          </GasableButton>
        </div>
      </div>
    </section>
  );
}
