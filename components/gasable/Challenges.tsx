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
        <div className="relative w-full h-[260px] md:h-[320px] rounded-4xl overflow-hidden shadow-2xl shadow-brand-charcoal/10 mb-10 group">
          <Image
            src="/images/about/control-room.jpg"
            alt={L.badge}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
            <span className="inline-block bg-[#0067E3] text-white font-black text-lg md:text-2xl px-6 py-3 rounded-2xl shadow-lg shadow-[#0067E3]/30">
              {L.badge}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <h2 className="text-2xl md:text-3xl font-black text-brand-charcoal leading-snug mb-2">
              {L.headline}
            </h2>
            <p className="text-[#0067E3] font-bold text-base md:text-lg">{L.subheading}</p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-brand-charcoal-light leading-loose text-base md:text-lg">{L.paragraph}</p>
          </div>
        </div>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const c = lang === "ar" ? item.ar : item.en;
            return (
              <StaggerItem key={item.n}>
                <div className="group relative h-full bg-gray-50 rounded-3xl border border-gray-100 p-7 hover:bg-white hover:border-[#0067E3]/30 hover:shadow-2xl hover:shadow-[#0067E3]/10 transition-all duration-400 overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-[#0067E3]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <span className="relative inline-flex w-10 h-10 rounded-xl bg-[#0067E3]/10 text-[#0067E3] font-black text-base items-center justify-center mb-4 group-hover:bg-[#0067E3] group-hover:text-white transition-colors duration-300">
                    {item.n}
                  </span>
                  <h3 className="relative text-base font-black text-brand-charcoal mb-2">{c.title}</h3>
                  <p className="relative text-brand-charcoal-light text-sm leading-relaxed">{c.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
