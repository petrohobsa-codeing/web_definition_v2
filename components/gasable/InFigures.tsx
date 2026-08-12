"use client";
import CountUp from "@/components/ui/CountUp";
import { defaultStats } from "@/lib/store";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/i18n";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { Boxes, MapPin, Clock, Leaf, BadgeCheck } from "lucide-react";

const icons = [Boxes, MapPin, Clock, Leaf, BadgeCheck];

export default function InFigures() {
  const { lang } = useLang();
  const stats = defaultStats;
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-12">
          <span className="text-brand-green" dir="ltr">Petrohub</span>{" "}
          <span className="text-brand-charcoal-mid">{lang === "ar" ? "في" : "in"}</span>{" "}
          <span className="text-[#3BBA9F]">{lang === "ar" ? "أرقام" : "Figures"}</span>
        </h2>

        <StaggerGroup className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s, i) => { const Icon = icons[i % icons.length]; return (
            <StaggerItem
                        key={s.id}
              lift={false}
                        className="flex flex-col items-center text-center p-6"
            >
              <div className="hover-grow mb-5">
                <Icon size={72} stroke="url(#fl-grad)" strokeWidth={1.5} />
              </div>
              <CountUp
                            value={s.value}
                className="text-6xl md:text-7xl font-black text-gasable-gradient leading-none"
              />
              <p className="text-[#54595F] font-semibold mt-3 text-lg">{tr(lang, s.label, s.labelEn)}</p>
            </StaggerItem>
                  );
                               })}
        </StaggerGroup>
      </div>
    </section>
  );
}
