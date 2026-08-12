"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { StaggerGroup, StaggerItem } from "./Stagger";

const steps = [
  {
    n: "01",
    ar: { title: "فهم الاحتياج", desc: "تحديد المادة والكمية والموقع والتوقيت والمتطلبات الفنية والتشغيلية." },
    en: { title: "Understanding the need", desc: "Defining the material, quantity, site, timing and technical/operational requirements." },
  },
  {
    n: "02",
    ar: { title: "التحقق والتخطيط", desc: "مراجعة البيانات، وتنسيق المصدر والمسار وآلية التنفيذ." },
    en: { title: "Verification & planning", desc: "Reviewing the data and coordinating the source, route and execution method." },
  },
  {
    n: "03",
    ar: { title: "الجدولة والتأكيد", desc: "إبلاغ العميل باستلام الطلب واعتماده والموعد المتوقع لبدء التنفيذ." },
    en: { title: "Scheduling & confirmation", desc: "Notifying the client the request is received and approved, with an expected start time." },
  },
  {
    n: "04",
    ar: { title: "التنفيذ والمتابعة", desc: "متابعة التحرك والوصول والتسليم، ومعالجة الملاحظات فور ظهورها." },
    en: { title: "Execution & follow-up", desc: "Tracking movement, arrival and delivery, and handling feedback as soon as it appears." },
  },
  {
    n: "05",
    ar: { title: "التوثيق والإغلاق", desc: "تأكيد الاستلام وتوثيق الكميات والقراءات والمستندات ذات الصلة." },
    en: { title: "Documentation & closeout", desc: "Confirming receipt and documenting quantities, readings and related documents." },
  },
  {
    n: "06",
    ar: { title: "القياس والتحسين", desc: "الاستفادة من البيانات في إعادة الطلب، وضبط الاستهلاك، ورفع كفاءة التشغيل." },
    en: { title: "Measurement & improvement", desc: "Using the data for reordering, adjusting consumption, and raising operational efficiency." },
  },
];

const t = {
  ar: {
    badge: "نموذج Petrohob التشغيلي",
    tagline: "من الاحتياج إلى التنفيذ، ومن التنفيذ إلى معلومة قابلة للاستخدام",
    heading: "مسار واحد يربط الإمداد والمتابعة والمراقبة",
    paragraph:
      "صممنا طريقة العمل بحيث يحصل العميل على تجربة مترابطة، لا مجموعة خدمات منفصلة. يبدأ المسار بفهم الاحتياج، ثم تنسيق المصدر والنقل والتوقيت، ومتابعة الطلب ميدانيًا حتى التسليم وتوثيقه، والاستفادة من البيانات في التخطيط وتحسين الأداء.",
    cycleLabel: "دورة العمل",
  },
  en: {
    badge: "Petrohob's Operating Model",
    tagline: "From need to execution, and from execution to usable information",
    heading: "One path that connects supply, follow-up and monitoring",
    paragraph:
      "We designed our way of working so the client gets one connected experience, not a set of separate services. The path starts with understanding the need, then coordinating the source, transport and timing, following the request through delivery and documentation, and using the data to plan and improve performance.",
    cycleLabel: "The Work Cycle",
  },
};

export default function OperatingModel() {
  const { lang } = useLang();
  const L = t[lang];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative bg-gray-50 rounded-3xl border border-gray-100 shadow-lg shadow-brand-charcoal/5 p-6 md:p-8 md:pb-8 overflow-hidden">
          <span className="inline-block bg-[#3BBA9F] text-white font-black text-sm md:text-base px-4 py-2 rounded-xl mb-4">
            {L.badge}
          </span>
          <p className="text-brand-charcoal-light text-xs md:text-sm mb-5">{L.tagline}</p>

          <h2 className="text-lg md:text-xl font-black text-brand-charcoal leading-snug mb-2">
            {L.heading}
          </h2>
          <p className="text-brand-charcoal-light leading-relaxed text-xs md:text-sm mb-7 md:pl-56">
            {L.paragraph}
          </p>

          <h3 className="font-black text-brand-charcoal text-base mb-4">{L.cycleLabel}</h3>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:pl-56">
            {steps.map((step) => {
              const c = lang === "ar" ? step.ar : step.en;
              return (
                <StaggerItem key={step.n} lift={false}>
                  <div className="flex items-start gap-2.5 bg-white rounded-xl border border-gray-100 p-3.5 h-full">
                    <span className="flex-shrink-0 rounded-full bg-[#3BBA9F]/10 text-[#3BBA9F] font-black text-[11px] px-2.5 py-1">
                      {step.n}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-black text-brand-charcoal text-xs mb-1 leading-tight">{c.title}</h4>
                      <p className="text-brand-charcoal-light text-[11.5px] leading-snug">{c.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          {/* Desktop: small parallelogram photo tucked in the bottom-left corner */}
          <div className="hidden md:block absolute bottom-0 left-0 w-52 h-40">
            <div
              className="relative w-full h-full overflow-hidden shadow-lg"
              style={{ clipPath: "polygon(22% 0%, 100% 0%, 78% 100%, 0% 100%)" }}
            >
              <Image
                src="/images/about/team-refinery.jpg"
                alt={L.badge}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Mobile: full-width photo in normal flow, no leftover empty space */}
          <div
            className="md:hidden relative w-full aspect-[16/9] mt-6 overflow-hidden shadow-lg"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 82%, 88% 100%, 0% 100%)" }}
          >
            <Image
              src="/images/about/team-refinery.jpg"
              alt={L.badge}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
