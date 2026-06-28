"use client";
import { useLang } from "@/context/LanguageContext";
import CountUp from "@/components/ui/CountUp";
import { Boxes, MapPin, Clock, BadgeCheck, Truck } from "lucide-react";

const stats = [
  { Icon: Boxes, value: "4", ar: "خدمات لوجستية متكاملة", en: "Integrated Logistics Services" },
  { Icon: MapPin, value: "5+", ar: "مناطق تغطية في المملكة", en: "Coverage Regions" },
  { Icon: Clock, value: "24/7", ar: "متاحون للطلبات الطارئة", en: "Available for Urgent Orders" },
  { Icon: BadgeCheck, value: "100%", ar: "التزام بالمواعيد والجودة", en: "Commitment to Quality" },
  { Icon: Truck, value: "50K+", ar: "لتر تُورّد شهرياً", en: "Liters Supplied Monthly" },
];

export default function InFigures() {
  const { lang } = useLang();
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-12">
          <span className="text-brand-green">Fast Link</span>{" "}
          <span className="text-brand-charcoal-mid">{lang === "ar" ? "في" : "in"}</span>{" "}
          <span className="text-[#C8102E]">{lang === "ar" ? "أرقام" : "Figures"}</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map(({ Icon, value, ar, en }, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center p-6 ${
                i === 4 ? "col-span-2 lg:col-span-1 lg:col-start-2" : ""
              }`}
            >
              <div className="w-[120px] h-[120px] rounded-full bg-navy-red-gradient flex items-center justify-center mb-5 shadow-lg shadow-[#1B355E]/20">
                <Icon size={54} className="text-white" strokeWidth={1.5} />
              </div>
              <CountUp
                value={value}
                className="text-6xl md:text-7xl font-black text-gasable-gradient leading-none"
              />
              <p className="text-[#54595F] font-semibold mt-3 text-lg">{lang === "ar" ? ar : en}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
