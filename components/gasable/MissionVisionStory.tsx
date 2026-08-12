"use client";
import { useLang } from "@/context/LanguageContext";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { Search, CheckCircle2, Handshake, Target, type LucideIcon } from "lucide-react";

function IconCircle({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      className="w-[100px] h-[100px] rounded-full flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(#F2F7F6, #F2F7F6), linear-gradient(135deg, #252C5D, #3BBA9F)",
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        border: "2px solid transparent",
      }}
    >
      <Icon size={38} strokeWidth={1.75} className="text-[#3BBA9F]" />
    </div>
  );
}

const values = [
  {
    icon: Search,
    ar: { title: "الوضوح", description: "نجعل حالة الطلب والكميات والمسؤوليات أكثر قابلية للفهم والمتابعة." },
    en: { title: "Clarity", description: "We make demand status, quantities and responsibilities easier to understand and track." },
  },
  {
    icon: CheckCircle2,
    ar: { title: "المصداقية", description: "نقول ما نستطيع تنفيذه، ونلتزم بما نتعهد به." },
    en: { title: "Credibility", description: "We say what we can deliver, and commit to what we promise." },
  },
  {
    icon: Handshake,
    ar: { title: "الشراكة والتطوير", description: "نتعامل مع احتياج العميل كمسؤولية مشتركة، ونطوّر أدواتنا باستمرار لتحسين النتائج." },
    en: { title: "Partnership & Development", description: "We treat client needs as a shared responsibility and continuously improve our tools to achieve better results." },
  },
  {
    icon: Target,
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
    <section className="bg-[#F2F7F6] py-[60px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="title-underline text-3xl md:text-4xl font-black text-brand-charcoal text-center mb-14 block mx-auto w-fit">
          {L.badge}
        </h2>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {values.map((v, i) => {
            const c = lang === "ar" ? v.ar : v.en;
            return (
              <StaggerItem key={i} lift={false} className="text-center flex flex-col items-center">
                <div className="hover-grow mb-5">
                  <IconCircle icon={v.icon} />
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
