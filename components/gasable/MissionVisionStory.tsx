"use client";
import { useLang } from "@/context/LanguageContext";
import { StaggerGroup, StaggerItem } from "./Stagger";

const grad = (id: string) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#0C2D6B" />
      <stop offset="100%" stopColor="#0067E3" />
    </linearGradient>
  </defs>
);

const ClarityIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px]" fill="none" strokeWidth="3">
    {grad("g4")}
    <circle cx="44" cy="44" r="24" stroke="url(#g4)" />
    <circle cx="44" cy="44" r="7" stroke="url(#g4)" />
    <line x1="61" y1="61" x2="80" y2="80" stroke="url(#g4)" strokeLinecap="round" />
  </svg>
);

const CredibilityIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px]" fill="none" strokeWidth="3">
    {grad("g5")}
    <circle cx="50" cy="50" r="38" stroke="url(#g5)" />
    <path d="M34 51l11 11 21-22" stroke="url(#g5)" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PartnershipIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px]" fill="none" strokeWidth="3">
    {grad("g6")}
    <circle cx="36" cy="40" r="13" stroke="url(#g6)" />
    <path
      d="M45 49l11 11a7.8 7.8 0 0 0 11-11l-15-15"
      stroke="url(#g6)"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M27 60c4-4 9-6 14-4" stroke="url(#g6)" strokeLinecap="round" />
  </svg>
);

const DisciplineIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px]" fill="none" strokeWidth="3">
    {grad("g7")}
    <circle cx="50" cy="54" r="30" stroke="url(#g7)" />
    <path d="M50 40v16l13 7" stroke="url(#g7)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 15h20" stroke="url(#g7)" strokeLinecap="round" />
  </svg>
);

const values = [
  {
    icon: ClarityIcon,
    ar: { title: "الوضوح", description: "نجعل حالة الطلب والكميات والمسؤوليات أكثر قابلية للفهم والمتابعة." },
    en: { title: "Clarity", description: "We make demand status, quantities and responsibilities easier to understand and track." },
  },
  {
    icon: CredibilityIcon,
    ar: { title: "المصداقية", description: "نقول ما نستطيع تنفيذه، ونلتزم بما نتعهد به." },
    en: { title: "Credibility", description: "We say what we can deliver, and commit to what we promise." },
  },
  {
    icon: PartnershipIcon,
    ar: { title: "الشراكة والتطوير", description: "نتعامل مع احتياج العميل كمسؤولية مشتركة، ونطوّر أدواتنا باستمرار." },
    en: { title: "Partnership & Development", description: "We treat client needs as a shared responsibility and continuously improve our tools." },
  },
  {
    icon: DisciplineIcon,
    ar: { title: "الانضباط", description: "نبني العمل على إجراءات محددة وتنسيق واضح بين الأطراف." },
    en: { title: "Discipline", description: "We build our work on defined procedures and clear coordination between parties." },
  },
];

const t = {
  ar: { badge: "قيمنا" },
  en: { badge: "Our Values" },
};

export default function MissionVisionStory() {
  const { lang } = useLang();
  const L = t[lang];

  return (
    <section className="bg-[#F3F6FC] py-[60px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="title-underline text-3xl md:text-4xl font-black text-brand-charcoal text-center mb-14 block mx-auto w-fit">
          {L.badge}
        </h2>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {values.map((v, i) => {
            const c = lang === "ar" ? v.ar : v.en;
            const Icon = v.icon;
            return (
              <StaggerItem key={i} lift={false} className="text-center flex flex-col items-center">
                <div className="hover-grow mb-5">
                  <Icon />
                </div>
                <h3 className="title-underline text-[20px] font-black text-brand-charcoal-mid mb-4">
                  {c.title}
                </h3>
                <p className="text-[#54595F] leading-7 max-w-xs text-sm">{c.description}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
