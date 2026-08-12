"use client";
import { useLang } from "@/context/LanguageContext";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { Users2, Globe2, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";

const sectors = {
  ar: [
    "الإنشاءات والمقاولات",
    "القطاع الصناعي",
    "التعدين",
    "النفط والغاز",
    "البنية التحتية والمشاريع الكبرى",
    "الجهات الحكومية",
    "الرعاية الصحية",
    "الضيافة والسياحة",
    "التجارة والخدمات",
  ],
  en: [
    "Construction and Contracting",
    "Industrial sector",
    "Mining",
    "Petroleum and natural gas",
    "Infrastructure and significant initiatives",
    "Governmental organizations",
    "Healthcare",
    "Hospitality and Tourism",
    "Commerce and Services",
  ],
};

const commitments = [
  {
    icon: CheckCircle2,
    ar: { title: "الجودة", desc: "إجراءات واضحة وتنفيذ يراعي المتطلبات الفنية." },
    en: { title: "Quality", desc: "Clear procedures and implementations that consider technical requirements." },
  },
  {
    icon: ShieldCheck,
    ar: { title: "السلامة والامتثال", desc: "ممارسات تراعي الاشتراطات وتحمي الأفراد والمواقع." },
    en: { title: "Safety & Compliance", desc: "Practices that adhere to requirements and safeguard individuals and locations." },
  },
  {
    icon: TrendingUp,
    ar: { title: "التحسين المستمر", desc: "مراجعة الأداء وتطوير الإجراءات والمنتجات التقنية." },
    en: { title: "Ongoing enhancement", desc: "Evaluating performance and formulating technical procedures and products." },
  },
];

const t = {
  ar: {
    badge: "القطاعات التي نخدمها",
    heading: "خبرة قابلة للتكيف مع طبيعة كل نشاط وموقع",
    paragraph:
      "نخدم منشآت ومشروعات ذات متطلبات تشغيلية متنوعة. تتكيف طريقة عمل Petrohub مع حجم المنشأة، وعدد المواقع، وحساسية التشغيل، ومتطلبات كل مشروع.",
    teamsLabel: "فرق مؤهلة",
    teamsText: "فرق يتم استقطابها وتجهيزها بما يتناسب مع احتياجات القطاع والموقع ونطاق العمل.",
    coverageLabel: "نطاق التغطية",
    coverageText: "جميع مدن المملكة العربية السعودية، مع إمكانية تنفيذ الأعمال خارج المملكة وفق طبيعة المشروع ومتطلباته.",
    commitLabel: "التزامنا",
  },
  en: {
    badge: "Sectors We Serve",
    heading: "Experience tailored to the specific nature of each activity and location",
    paragraph:
      "We cater to facilities and projects with varied operational needs. Petrohub's approach is tailored to the facility's size, the number of locations, the sensitivity of the operation, and the specific requirements of each project.",
    teamsLabel: "Qualified teams",
    teamsText: "Teams are assembled and outfitted based on the requirements of the sector, geographical area, and scope of work.",
    coverageLabel: "Coverage area",
    coverageText: "All cities within the Kingdom of Saudi Arabia, with the potential to conduct work outside the Kingdom based on the project's nature and requirements.",
    commitLabel: "Our dedication",
  },
};

export default function SectorsSection() {
  const { lang } = useLang();
  const L = t[lang];
  const S = sectors[lang];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-50 rounded-3xl border border-gray-100 shadow-lg shadow-brand-charcoal/5 p-6 md:p-8">
          <span className="inline-block bg-[#3BBA9F] text-white font-black text-sm md:text-base px-4 py-2 rounded-xl mb-4">
            {L.badge}
          </span>

          <h2 className="text-lg md:text-xl font-black text-brand-charcoal leading-snug mb-2">
            {L.heading}
          </h2>
          <p className="text-brand-charcoal-light leading-relaxed text-xs md:text-sm mb-6 max-w-3xl">
            {L.paragraph}
          </p>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-7">
            {S.map((s) => (
              <StaggerItem key={s} lift={false}>
                <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-center hover:border-[#3BBA9F]/30 hover:shadow-md transition-all duration-300">
                  <p className="font-bold text-brand-charcoal text-xs md:text-sm">{s}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#3BBA9F]/10 flex items-center justify-center">
                <Users2 size={18} className="text-[#3BBA9F]" />
              </span>
              <div className="min-w-0">
                <h3 className="font-black text-brand-charcoal text-sm mb-1">{L.teamsLabel}</h3>
                <p className="text-brand-charcoal-light text-xs leading-relaxed">{L.teamsText}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#3BBA9F]/10 flex items-center justify-center">
                <Globe2 size={18} className="text-[#3BBA9F]" />
              </span>
              <div className="min-w-0">
                <h3 className="font-black text-brand-charcoal text-sm mb-1">{L.coverageLabel}</h3>
                <p className="text-brand-charcoal-light text-xs leading-relaxed">{L.coverageText}</p>
              </div>
            </div>
          </div>

          <h3 className="font-black text-brand-charcoal text-base mb-4 text-center">{L.commitLabel}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {commitments.map((c) => {
              const cc = lang === "ar" ? c.ar : c.en;
              return (
                <div key={cc.title} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                  <div className="w-9 h-9 rounded-lg bg-[#3BBA9F]/10 flex items-center justify-center mx-auto mb-2.5">
                    <c.icon size={18} className="text-[#3BBA9F]" />
                  </div>
                  <h4 className="font-black text-brand-charcoal text-sm mb-1">{cc.title}</h4>
                  <p className="text-brand-charcoal-light text-xs leading-relaxed">{cc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
