"use client";
import { useLang } from "@/context/LanguageContext";
import GasableButton from "./GasableButton";
import { Store, Truck, Building2 } from "lucide-react";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { useEffect, useState } from "react";
import { getNetworkCards } from "@/lib/db";
import { defaultNetworkCards } from "@/lib/store";

const icons = [Store, Truck, Building2];

export default function ExtensiveNetwork() {
  const { lang } = useLang();
  const [cards, setCards] = useState(defaultNetworkCards);
  useEffect(() => {
    getNetworkCards().then(setCards);
  }, []);
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-12">
          <span className="text-brand-green">{lang === "ar" ? "شبكتنا" : "Our"}</span>{" "}
          <span className="text-brand-charcoal-mid">{lang === "ar" ? "" : "Extensive"}</span>{" "}
          <span className="text-[#0067E3]">{lang === "ar" ? "الواسعة" : "Network"}</span>
        </h2>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((c, i) => {
      const Icon = icons[i] || Store;
      return (
            <StaggerItem
key={c.id}
              className="bg-[#F3F6FC] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="hover-grow mb-6">
                <Icon size={72} stroke="url(#fl-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-[22px] font-semibold text-brand-charcoal-mid mb-6 min-h-[3.5rem] flex items-center">
                {c.title}
              </h3>
              <GasableButton href="/contact">
                {lang === "ar" ? "انضم الآن" : "Join Now"}
              </GasableButton>
            </StaggerItem>
          );
    })}
        </StaggerGroup>
      </div>
    </section>
  );
}
