"use client";
import { useLang } from "@/context/LanguageContext";
import CountUp from "@/components/ui/CountUp";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { Boxes, MapPin, Clock, Leaf, BadgeCheck } from "lucide-react";

const stats = [
  { Icon: Boxes, value: "7", ar: "خدمات وحلول متكاملة", en: "Integrated Services" },
  { Icon: MapPin, value: "5+", ar: "مناطق تغطية في المملكة", en: "Coverage Regions" },
  { Icon: Clock, value: "24/7", ar: "تشغيل ومراقبة متواصلة", en: "Operation & Monitoring" },
  { Icon: Leaf, value: "30%", ar: "خفض في استهلاك الطاقة", en: "Energy Savings" },
  { Icon: BadgeCheck, value: "100%", ar: "التزام بالجودة والسلامة", en: "Quality & Safety" },
];

export default function InFigures() {
  const { lang } = useLang();
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-12">
          <span className="text-brand-green">Petrohub</span>{" "}
          <span className="text-brand-charcoal-mid">{lang === "ar" ? "في" : "in"}</span>{" "}
          <span className="text-[#0067E3]">{lang === "ar" ? "أرقام" : "Figures"}</span>
        </h2>

        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map(({ Icon, value, ar, en }, i) => (
            <StaggerItem
              key={i}
              lift={false}
              className={`flex flex-col items-center text-center p-6 ${
                i === 4 ? "col-span-2 lg:col-span-1 lg:col-start-2" : ""
              }`}
            >
              <div className="hover-grow mb-5">
                <Icon size={72} stroke="url(#fl-grad)" strokeWidth={1.5} />
              </div>
              <CountUp
                value={value}
                className="text-6xl md:text-7xl font-black text-gasable-gradient leading-none"
              />
              <p className="text-[#54595F] font-semibold mt-3 text-lg">{lang === "ar" ? ar : en}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
