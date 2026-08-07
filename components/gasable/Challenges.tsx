"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { StaggerGroup, StaggerItem } from "./Stagger";

const items = [
  {
    n: 1,
    ar: { title: "مطابقة الكميات", desc: "قياس أوضح وسجل يمكن الرجوع إليه." },
    en: { title: "Quantity reconciliation", desc: "Clearer measurement and a traceable record." },
  },
  {
    n: 2,
    ar: { title: "استقرار الإمداد", desc: "أي تأخر ينعكس على الإنتاج والالتزامات." },
    en: { title: "Supply stability", desc: "Delays directly affect production and commitments." },
  },
  {
    n: 3,
    ar: { title: "تشتت المتابعة", desc: "تعدد الجهات يستهلك الوقت ويزيد الخطأ." },
    en: { title: "Scattered follow-up", desc: "Multiple contacts cost time and raise errors." },
  },
  {
    n: 4,
    ar: { title: "سلامة المنتج", desc: "ضمان مطابقة المواد للمواصفات." },
    en: { title: "Product integrity", desc: "Ensuring materials meet specification." },
  },
  {
    n: 5,
    ar: { title: "تعدد المواقع والأطراف", desc: "تنسيق محكم ومسؤوليات محددة." },
    en: { title: "Multiple sites & parties", desc: "Tight coordination and clear ownership." },
  },
  {
    n: 6,
    ar: { title: "تأخر المعلومة", desc: "يقلّل دقة التخطيط ويؤخّر الاستجابة." },
    en: { title: "Delayed information", desc: "Less accurate planning, slower response." },
  },
];

const t = {
  ar: {
    badge: "التحديات التي تواجه المنشآت",
    headline: "التحدي ليس في توافر المنتج وحده",
    subheading: "إدارة الطاقة تحتاج إلى رؤية قبل التسليم وأثناءه وبعده",
    paragraph:
      "تتعامل المنشآت اليوم مع سلسلة مترابطة من الجهات والمواقع والمستندات والقراءات، وكلما اتسعت زادت الحاجة إلى مسؤوليات واضحة وبيانات قابلة للتحقق.",
  },
  en: {
    badge: "Challenges Facing Facilities",
    headline: "The challenge isn't product availability alone",
    subheading: "Energy management needs visibility before, during and after delivery",
    paragraph:
      "Facilities deal with an interconnected chain of parties, sites, documents and readings — the wider it grows, the more it needs clear ownership and verifiable data.",
  },
};

export default function Challenges() {
  const { lang } = useLang();
  const L = t[lang];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-50 rounded-3xl border border-gray-100 shadow-lg shadow-brand-charcoal/5 p-6 md:p-8">
          <span className="inline-block bg-[#0067E3] text-white font-black text-sm md:text-base px-4 py-2 rounded-xl mb-5">
            {L.badge}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div className="md:col-span-4">
              <div
                className="relative w-full aspect-[4/3] overflow-hidden shadow-md rounded-tr-2xl rounded-br-2xl rounded-bl-2xl group"
                style={{ borderTopLeftRadius: "56px" }}
              >
                <Image
                  src="/images/about/control-room.jpg"
                  alt={L.badge}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-lg md:text-xl font-black text-brand-charcoal leading-snug mb-1.5">
                {L.headline}
              </h2>
              <p className="text-[#0067E3] font-bold text-xs md:text-sm mb-2">{L.subheading}</p>
              <p className="text-brand-charcoal-light leading-relaxed text-xs md:text-sm">{L.paragraph}</p>
            </div>
          </div>

          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {items.map((item) => {
              const c = lang === "ar" ? item.ar : item.en;
              return (
                <StaggerItem key={item.n} lift={false}>
                  <div className="flex items-start gap-2 bg-white rounded-xl border border-gray-100 p-3 h-full">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0067E3]/10 text-[#0067E3] font-black text-[11px] flex items-center justify-center">
                      {item.n}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-black text-brand-charcoal text-xs mb-0.5 leading-tight">{c.title}</h3>
                      <p className="text-brand-charcoal-light text-[11px] leading-snug">{c.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
