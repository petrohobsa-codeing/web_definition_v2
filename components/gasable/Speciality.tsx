"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import GasableButton from "./GasableButton";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { Flame, Fuel, Droplets, Leaf, Cpu, Truck, Navigation } from "lucide-react";
import { services, type IconKey } from "@/lib/petrohopServices";

const iconMap: Record<IconKey, typeof Flame> = {
  lpg: Flame,
  oil: Fuel,
  water: Droplets,
  energy: Leaf,
  iot: Cpu,
  logistics: Truck,
  tracking: Navigation,
};

export default function Speciality() {
  const { lang } = useLang();
  return (
    <section className="bg-[#F4F6FA] py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-3">
          <span className="text-brand-green">{lang === "ar" ? "خدماتنا" : "Our"}</span>{" "}
          <span className="text-[#C8102E]">{lang === "ar" ? "" : "Services"}</span>
        </h2>
        <p className="text-center text-[#54595F] max-w-2xl mx-auto mb-12">
          {lang === "ar"
            ? "حلول متكاملة للطاقة والخدمات اللوجستية تلبي احتياجات القطاعات السكنية والتجارية والصناعية."
            : "Integrated energy and logistics solutions serving the residential, commercial and industrial sectors."}
        </p>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const c = lang === "ar" ? s.ar : s.en;
            const Icon = iconMap[s.icon];
            return (
              <StaggerItem
                key={s.slug}
                className="bg-white rounded-2xl p-7 text-center shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/services#${s.slug}`} className="flex flex-col items-center h-full">
                  <div className="hover-grow mb-5">
                    <Icon size={56} stroke="url(#fl-grad)" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-green-dark mb-3 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-[#54595F] text-sm leading-6">{c.intro}</p>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <div className="text-center mt-12">
          <GasableButton href="/services">
            {lang === "ar" ? "اكتشف جميع خدماتنا" : "Explore All Services"}
          </GasableButton>
        </div>
      </div>
    </section>
  );
}
