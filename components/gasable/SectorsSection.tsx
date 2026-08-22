"use client";
import { useLang } from "@/context/LanguageContext";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { Users2, Globe2, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { getSectorsContent } from "@/lib/db";
import { defaultSectorsContent } from "@/lib/store";
import type { SectorsContent } from "@/lib/types";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { CheckCircle2, ShieldCheck, TrendingUp };

export default function SectorsSection() {
  const { lang } = useLang();
  const [content, setContent] = useState<SectorsContent>(defaultSectorsContent);
  useEffect(() => { getSectorsContent().then(setContent).catch(() => {}); }, []);

  const pick = (ar: string, en?: string) => (lang === "en" ? en || ar : ar);
  const badge = pick(content.badge, content.badgeEn);
  const heading = pick(content.heading, content.headingEn);
  const paragraph = pick(content.paragraph, content.paragraphEn);
  const teamsLabel = pick(content.teamsLabel, content.teamsLabelEn);
  const teamsText = pick(content.teamsText, content.teamsTextEn);
  const coverageLabel = pick(content.coverageLabel, content.coverageLabelEn);
  const coverageText = pick(content.coverageText, content.coverageTextEn);
  const commitLabel = pick(content.commitLabel, content.commitLabelEn);
  const sectors = lang === "ar" ? content.sectorsAr : content.sectorsEn;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-50 rounded-3xl border border-gray-100 shadow-lg shadow-brand-charcoal/5 p-6 md:p-8">
          <span className="inline-block bg-[#3BBA9F] text-white font-black text-sm md:text-base px-4 py-2 rounded-xl mb-4">
            {badge}
          </span>

          <h2 className="text-h3 font-black text-brand-charcoal leading-snug mb-2">
            {heading}
          </h2>
          <p className="text-brand-charcoal-light leading-relaxed text-body-sm mb-6 max-w-3xl">
            {paragraph}
          </p>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-7">
            {sectors.map((s, i) => (
              <StaggerItem key={i} lift={false}>
                <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-center hover:border-[#3BBA9F]/30 hover:shadow-md transition-all duration-300">
                  <p className="font-bold text-brand-charcoal text-body-sm">{s}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#3BBA9F]/10 flex items-center justify-center">
                <Users2 size={18} className="text-[#3BBA9F]" />
              </span>
              <div className="min-w-0">
                <h3 className="font-black text-brand-charcoal text-h4 mb-1">{teamsLabel}</h3>
                <p className="text-brand-charcoal-light text-body-sm leading-relaxed">{teamsText}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#3BBA9F]/10 flex items-center justify-center">
                <Globe2 size={18} className="text-[#3BBA9F]" />
              </span>
              <div className="min-w-0">
                <h3 className="font-black text-brand-charcoal text-h4 mb-1">{coverageLabel}</h3>
                <p className="text-brand-charcoal-light text-body-sm leading-relaxed">{coverageText}</p>
              </div>
            </div>
          </div>

          <h3 className="font-black text-brand-charcoal text-h4 mb-4 text-center">{commitLabel}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {content.commitments.map((c) => {
              const Icon = iconMap[c.icon] || CheckCircle2;
              const title = lang === "ar" ? c.titleAr : c.titleEn;
              const desc = lang === "ar" ? c.descAr : c.descEn;
              return (
                <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                  <div className="w-9 h-9 rounded-lg bg-[#3BBA9F]/10 flex items-center justify-center mx-auto mb-2.5">
                    <Icon size={18} className="text-[#3BBA9F]" />
                  </div>
                  <h4 className="font-black text-brand-charcoal text-h4 mb-1">{title}</h4>
                  <p className="text-brand-charcoal-light text-body-sm leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
