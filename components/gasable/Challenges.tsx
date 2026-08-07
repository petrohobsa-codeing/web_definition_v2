"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { StaggerGroup, StaggerItem } from "./Stagger";

const items = [
  {
    n: 1,
    ar: { title: "مطابقة الكميات", desc: "الفروقات بين المطلوب والمحمّل والمستلم تستدعي قياسًا أوضح وسجلًا يمكن الرجوع إليه." },
    en: { title: "Quantity reconciliation", desc: "Gaps between requested, loaded and received amounts call for clearer measurement and a traceable record." },
  },
  {
    n: 2,
    ar: { title: "استقرار الإمداد", desc: "أي تأخر أو انقطاع قد ينعكس مباشرة على الإنتاج والخدمة والالتزامات التشغيلية." },
    en: { title: "Supply stability", desc: "Any delay or interruption can directly affect production, service, and operational commitments." },
  },
  {
    n: 3,
    ar: { title: "تشتت المتابعة", desc: "تعدد الموردين ووسائل التواصل والمستندات يستهلك الوقت ويزيد احتمالات الخطأ." },
    en: { title: "Scattered follow-up", desc: "Multiple suppliers, communication channels and documents consume time and raise the chance of error." },
  },
  {
    n: 4,
    ar: { title: "سلامة المنتج", desc: "تحتاج المنشآت إلى ضمان مطابقة المواد للمواصفات والحد من مخاطر الخلط أو التغيير في خصائصها." },
    en: { title: "Product integrity", desc: "Facilities need assurance that materials meet specification, with the risk of mixing or altered properties minimized." },
  },
  {
    n: 5,
    ar: { title: "تعدد المواقع والأطراف", desc: "ارتفاع عدد نقاط التسليم والجهات المشاركة يتطلب تنسيقًا محكمًا ومسؤوليات محددة." },
    en: { title: "Multiple sites & parties", desc: "A rising number of delivery points and participating parties requires tight coordination and clear ownership." },
  },
  {
    n: 6,
    ar: { title: "تأخر المعلومة", desc: "غياب القراءات اللحظية يجعل التخطيط وإعادة الطلب أقل دقة ويؤخّر الاستجابة." },
    en: { title: "Delayed information", desc: "Without real-time readings, planning and reordering become less accurate and response times slow down." },
  },
];

const t = {
  ar: {
    badge: "التحديات التي تواجه المنشآت",
    headline: "التحدي ليس في توافر المنتج وحده",
    subheading: "إدارة الطاقة تحتاج إلى رؤية قبل التسليم وأثناءه وبعده",
    paragraph:
      "تتعامل المنشآت اليوم مع سلسلة مترابطة من الجهات والمواقع ووسائل النقل والمستندات والقراءات. وكلما اتسعت هذه السلسلة، ازدادت الحاجة إلى مسؤوليات واضحة، وبيانات قابلة للتحقق، وتحديثات تصل في الوقت المناسب.",
  },
  en: {
    badge: "Challenges Facing Facilities",
    headline: "The challenge isn't product availability alone",
    subheading: "Energy management needs visibility before, during and after delivery",
    paragraph:
      "Facilities today deal with an interconnected chain of parties, sites, transport methods, documents and readings. As this chain grows, so does the need for clear responsibilities, verifiable data, and updates that arrive at the right time.",
  },
};

export default function Challenges() {
  const { lang } = useLang();
  const L = t[lang];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 -left-32 w-96 h-96 rounded-full bg-[#0067E3]/5 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <span className="inline-block bg-[#0067E3] text-white font-black text-xl md:text-2xl px-7 py-3.5 rounded-2xl shadow-lg shadow-[#0067E3]/25">
            {L.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Right: headline + copy + photo */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl md:text-3xl font-black text-brand-charcoal mb-3 leading-snug">
              {L.headline}
            </h2>
            <p className="text-[#0067E3] font-bold text-base md:text-lg mb-4">{L.subheading}</p>
            <p className="text-brand-charcoal-light leading-loose text-base mb-8">{L.paragraph}</p>

            <div
              className="relative w-full aspect-[16/10] overflow-hidden shadow-2xl shadow-brand-charcoal/10 group rounded-tr-3xl rounded-br-3xl rounded-bl-3xl"
              style={{ borderTopLeftRadius: "140px" }}
            >
              <Image
                src="/images/about/control-room.jpg"
                alt={L.badge}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          {/* Left: 6-item numbered grid */}
          <StaggerGroup className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
            {items.map((item) => {
              const c = lang === "ar" ? item.ar : item.en;
              return (
                <StaggerItem key={item.n} lift={false}>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0067E3]/10 text-[#0067E3] font-black text-sm flex items-center justify-center">
                      {item.n}
                    </span>
                    <div>
                      <h3 className="font-black text-brand-charcoal text-base mb-1.5">{c.title}</h3>
                      <p className="text-brand-charcoal-light text-sm leading-relaxed">{c.desc}</p>
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
