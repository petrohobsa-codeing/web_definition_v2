"use client";
import { useLang } from "@/context/LanguageContext";
import GasableButton from "./GasableButton";
import { Flame, Droplets, Recycle, Zap } from "lucide-react";
import { StaggerGroup, StaggerItem } from "./Stagger";

const items = [
  {
    Icon: Flame,
    href: "/services/diesel-supply",
    ar: { title: "الخدمات البترولية والغاز", text: "وساطة وتوريد المنتجات البترولية: بنزين (91، 95)، ديزل، وغاز مسال للمنشآت والمشاريع والأساطيل." },
    en: { title: "Petroleum & Gas Services", text: "Brokerage and supply of petroleum products: petrol (91, 95), diesel and LPG for facilities, projects and fleets." },
  },
  {
    Icon: Recycle,
    href: "/services/gas-supply",
    ar: { title: "الحلول البيئية والصرف", text: "تأمين صهاريج سحب مياه الصرف الصحي والبيارات للمواقع والمنشآت والمجمعات السكنية والتجارية." },
    en: { title: "Environmental & Sewage Solutions", text: "Sewage and wastewater tanker services for sites, facilities and residential or commercial complexes." },
  },
  {
    Icon: Droplets,
    href: "/services/water-supply",
    ar: { title: "الإمداد المائي", text: "توزيع وتوريد مياه التحلية ومياه الشرب العذبة للمشاريع والمواقع الإنشائية في مناطق تغطيتنا." },
    en: { title: "Water Supply", text: "Distribution and supply of desalinated and fresh drinking water for projects and construction sites." },
  },
  {
    Icon: Zap,
    href: "/services/generators",
    ar: { title: "الطاقة البديلة (المولدات)", text: "وساطة لتأجير المولدات الكهربائية بمختلف الأحجام والأحمال للمشاريع الإنشائية والفعاليات والمنشآت." },
    en: { title: "Alternative Energy (Generators)", text: "Brokerage for renting electrical generators of all sizes and loads for projects, events and facilities." },
  },
];

export default function Speciality() {
  const { lang } = useLang();
  return (
    <section className="bg-[#F4F6FA] py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-12">
          <span className="text-brand-green">{lang === "ar" ? "خدماتنا" : "Our"}</span>{" "}
          <span className="text-[#C8102E]">{lang === "ar" ? "" : "Services"}</span>
        </h2>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {items.map(({ Icon, ...c }, i) => {
            const content = lang === "ar" ? c.ar : c.en;
            return (
              <StaggerItem
                key={i}
                className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="hover-grow mb-5">
                  <Icon size={64} stroke="url(#fl-grad)" strokeWidth={1.5} />
                </div>
                <h3 className="text-[22px] font-semibold text-brand-charcoal-mid mb-3">
                  {content.title}
                </h3>
                <p className="text-[#54595F] leading-7">{content.text}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <div className="text-center mt-12">
          <GasableButton href="/services">
            {lang === "ar" ? "اقرأ المزيد" : "Read More"}
          </GasableButton>
        </div>
      </div>
    </section>
  );
}
