"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import GasableButton from "./GasableButton";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { Flame, Fuel, Droplets, Zap, Cpu, Truck, MonitorCheck } from "lucide-react";
import { defaultServices } from "@/lib/store";
import { getServices } from "@/lib/db";
import type { ServiceItem } from "@/lib/types";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/i18n";
import { useAutoTranslate } from "@/lib/useAutoTranslate";

const iconMap: Record<string, typeof Flame> = { Flame, Fuel, Droplets, Zap, Cpu, Truck, MonitorCheck };

export default function Speciality() {
  const { lang } = useLang();
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const at = useAutoTranslate(services.flatMap((s) => [s.title, s.description]));
  return (
    <section className="bg-[#F2F7F6] py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-3">
                    <span className="text-brand-green">{lang === "ar" ? "خدماتنا" : "Our Services"}</span>
        </h2>
        <p className="text-center text-[#54595F] max-w-2xl mx-auto mb-12">
                    {lang === "ar"
                      ? "حلول متكاملة للطاقة والخدمات اللوجستية تلبي احتياجات القطاعات السكنية والتجارية والصناعية."
                      : "Integrated energy and logistics solutions meeting the needs of the residential, commercial and industrial sectors."}
        </p>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
                    const Icon = iconMap[s.iconName] || Flame;
            return (
              <StaggerItem
                key={s.id}
                className="bg-white rounded-2xl overflow-hidden text-center shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={s.href} className="flex flex-col items-center h-full">
                  {s.image ? (
                    <div className="relative w-full aspect-[16/9]">
                      <Image src={s.image} alt={at(tr(lang, s.title, s.titleEn))} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="hover-grow mt-7 mb-5">
                      <Icon size={56} stroke="url(#fl-grad)" strokeWidth={1.5} />
                    </div>
                  )}
                  <div className="p-7 pt-5 flex flex-col items-center">
                    <h3 className="text-lg font-bold text-brand-green-dark mb-3 leading-snug">
                      {at(tr(lang, s.title, s.titleEn))}
                    </h3>
                    <p className="text-[#54595F] text-sm leading-6">{at(tr(lang, s.description, s.descriptionEn))}</p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <div className="text-center mt-12">
          <GasableButton href="/services">
            {lang === "ar" ? "اكتشف جميع خدماتنا" : "Explore all our services"}
          </GasableButton>
        </div>
      </div>
    </section>
  );
}
