"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { useState, useEffect } from "react";
import { getOperatingModelContent } from "@/lib/db";
import { defaultOperatingModelContent } from "@/lib/store";
import type { OperatingModelContent } from "@/lib/types";

export default function OperatingModel() {
  const { lang } = useLang();
  const [content, setContent] = useState<OperatingModelContent>(defaultOperatingModelContent);
  useEffect(() => { getOperatingModelContent().then(setContent).catch(() => {}); }, []);

  const pick = (ar: string, en?: string) => (lang === "en" ? en || ar : ar);
  const badge = pick(content.badge, content.badgeEn);
  const tagline = pick(content.tagline, content.taglineEn);
  const heading = pick(content.heading, content.headingEn);
  const paragraph = pick(content.paragraph, content.paragraphEn);
  const cycleLabel = pick(content.cycleLabel, content.cycleLabelEn);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative bg-gray-50 rounded-3xl border border-gray-100 shadow-lg shadow-brand-charcoal/5 p-6 md:p-8 md:pb-8 overflow-hidden">
          <span className="inline-block bg-[#3BBA9F] text-white font-black text-sm md:text-base px-4 py-2 rounded-xl mb-4">
            {badge}
          </span>
          <p className="text-brand-charcoal-light text-body-sm mb-5">{tagline}</p>

          <h2 className="text-h3 font-black text-brand-charcoal leading-snug mb-2">
            {heading}
          </h2>
          <p className="text-brand-charcoal-light leading-relaxed text-body-sm mb-7 md:pl-56">
            {paragraph}
          </p>

          <h3 className="font-black text-brand-charcoal text-h4 mb-4">{cycleLabel}</h3>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:pl-56">
            {content.steps.map((step) => {
              const title = lang === "ar" ? step.titleAr : step.titleEn;
              const desc = lang === "ar" ? step.descAr : step.descEn;
              return (
                <StaggerItem key={step.id} lift={false}>
                  <div className="flex items-start gap-2.5 bg-white rounded-xl border border-gray-100 p-3.5 h-full">
                    <span className="flex-shrink-0 rounded-full bg-[#3BBA9F]/10 text-[#3BBA9F] font-black text-[11px] px-2.5 py-1">
                      {step.number}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-black text-brand-charcoal text-h4 mb-1 leading-tight">{title}</h4>
                      <p className="text-brand-charcoal-light text-caption leading-snug">{desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          {/* Desktop: small parallelogram photo tucked in the bottom-left corner */}
          <div className="hidden md:block absolute bottom-0 left-0 w-52 h-40">
            <div
              className="relative w-full h-full overflow-hidden shadow-lg"
              style={{ clipPath: "polygon(22% 0%, 100% 0%, 78% 100%, 0% 100%)" }}
            >
              <Image
                src="/images/about/team-refinery.jpg"
                alt={badge}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Mobile: full-width photo in normal flow */}
          <div
            className="md:hidden relative w-full aspect-[16/9] mt-6 overflow-hidden shadow-lg"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 82%, 88% 100%, 0% 100%)" }}
          >
            <Image
              src="/images/about/team-refinery.jpg"
              alt={badge}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
