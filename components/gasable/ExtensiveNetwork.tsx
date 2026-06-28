"use client";
import { useLang } from "@/context/LanguageContext";
import GasableButton from "./GasableButton";
import { Store, Truck, Building2 } from "lucide-react";

const cards = [
  { Icon: Store, ar: "الموردون", en: "Suppliers" },
  { Icon: Truck, ar: "شركات اللوجستيات والسائقون", en: "Logistic Companies & Drivers" },
  { Icon: Building2, ar: "الشركات والمؤسسات", en: "Corporates" },
];

export default function ExtensiveNetwork() {
  const { lang } = useLang();
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-12">
          <span className="text-brand-green">{lang === "ar" ? "شبكتنا" : "Our"}</span>{" "}
          <span className="text-brand-charcoal-mid">{lang === "ar" ? "" : "Extensive"}</span>{" "}
          <span className="text-[#C8102E]">{lang === "ar" ? "الواسعة" : "Network"}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map(({ Icon, ar, en }, i) => (
            <div
              key={i}
              className="bg-[#F0FAF5] rounded-3xl p-10 flex flex-col items-center text-center"
            >
              <div className="w-28 h-28 rounded-full bg-navy-red-gradient flex items-center justify-center mb-6 shadow-lg">
                <Icon size={52} className="text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-[22px] font-semibold text-brand-charcoal-mid mb-6 min-h-[3.5rem] flex items-center">
                {lang === "ar" ? ar : en}
              </h3>
              <GasableButton href="/contact">
                {lang === "ar" ? "انضم الآن" : "Join Now"}
              </GasableButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
