"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { useState, useEffect } from "react";
import { getChallengesContent } from "@/lib/db";
import { defaultChallengesContent } from "@/lib/store";
import type { ChallengesContent } from "@/lib/types";

export default function Challenges() {
  const { lang } = useLang();
  const [content, setContent] = useState<ChallengesContent>(defaultChallengesContent);
  useEffect(() => { getChallengesContent().then(setContent).catch(() => {}); }, []);

  const pick = (ar: string, en?: string) => (lang === "en" ? en || ar : ar);
  const badge = pick(content.badge, content.badgeEn);
  const headline = pick(content.headline, content.headlineEn);
  const subheading = pick(content.subheading, content.subheadingEn);
  const paragraph = pick(content.paragraph, content.paragraphEn);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-50 rounded-3xl border border-gray-100 shadow-lg shadow-brand-charcoal/5 p-6 md:p-8">
          <span className="inline-block bg-[#3BBA9F] text-white font-black text-sm md:text-base px-4 py-2 rounded-xl mb-5">
            {badge}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div className="md:col-span-4">
              <div
                className="relative w-full aspect-[4/3] overflow-hidden shadow-md rounded-tr-2xl rounded-br-2xl rounded-bl-2xl group"
                style={{ borderTopLeftRadius: "56px" }}
              >
                <Image
                  src="/images/about/control-room.jpg"
                  alt={badge}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-h3 font-black text-brand-charcoal leading-snug mb-1.5">
                {headline}
              </h2>
              <p className="text-[#3BBA9F] font-bold text-body-sm mb-2">{subheading}</p>
              <p className="text-brand-charcoal-light leading-relaxed text-body-sm">{paragraph}</p>
            </div>
          </div>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {content.items.map((item) => {
              const title = lang === "ar" ? item.titleAr : item.titleEn;
              const desc = lang === "ar" ? item.descAr : item.descEn;
              return (
                <StaggerItem key={item.id} lift={false}>
                  <div className="flex items-start gap-2.5 bg-white rounded-xl border border-gray-100 p-3.5 h-full">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3BBA9F]/10 text-[#3BBA9F] font-black text-[11px] flex items-center justify-center">
                      {item.id}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-black text-brand-charcoal text-h4 mb-1 leading-tight">{title}</h3>
                      <p className="text-brand-charcoal-light text-caption leading-snug">{desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
