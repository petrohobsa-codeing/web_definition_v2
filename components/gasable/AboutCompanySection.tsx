"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/gasable/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/gasable/Stagger";
import { Eye, Target, Calendar } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useAutoTranslate } from "@/lib/useAutoTranslate";
import { getAboutCompany } from "@/lib/db";
import { defaultAboutCompany } from "@/lib/store";
import type { AboutCompanyContent } from "@/lib/types";

export default function AboutCompanySection() {
  const { lang } = useLang();
  const [content, setContent] = useState<AboutCompanyContent>(defaultAboutCompany);

  useEffect(() => {
    getAboutCompany()
      .then(setContent)
      .catch(() => {});
  }, []);

  // English copy typed by the admin wins; otherwise the Arabic text is
  // auto-translated, the same way the rest of the admin-managed content works.
  const at = useAutoTranslate([
    content.titleTop,
    content.titleBottom,
    content.eyebrow,
    content.headline,
    content.paragraph,
    content.since,
    content.visionLabel,
    content.visionText,
    content.missionLabel,
    content.missionText,
  ]);

  const pick = (ar: string, en?: string) => (lang === "en" ? en || at(ar) : ar);

  const A = {
    titleTop: pick(content.titleTop, content.titleTopEn),
    titleBottom: pick(content.titleBottom, content.titleBottomEn),
    eyebrow: pick(content.eyebrow, content.eyebrowEn),
    headline: pick(content.headline, content.headlineEn),
    paragraph: pick(content.paragraph, content.paragraphEn),
    since: pick(content.since, content.sinceEn),
    visionLabel: pick(content.visionLabel, content.visionLabelEn),
    visionText: pick(content.visionText, content.visionTextEn),
    missionLabel: pick(content.missionLabel, content.missionLabelEn),
    missionText: pick(content.missionText, content.missionTextEn),
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-green-light/40 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-7 order-2 lg:order-2" delay={0.05}>
            <p className="text-[#3BBA9F] font-bold text-lg mb-2 tracking-wide">{A.eyebrow}</p>
            <h2 className="text-h3 font-black text-brand-charcoal mb-5 leading-snug">
              {A.headline}
            </h2>
            <p className="text-brand-charcoal-light leading-loose text-base md:text-lg">{A.paragraph}</p>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              <StaggerItem>
                <div className="group h-full bg-white rounded-3xl border border-gray-100 p-7 hover:border-[#3BBA9F]/30 hover:shadow-2xl hover:shadow-[#3BBA9F]/10 transition-all duration-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3BBA9F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="relative w-12 h-12 rounded-2xl bg-[#3BBA9F]/10 flex items-center justify-center mb-5 group-hover:bg-[#3BBA9F] transition-colors duration-300">
                    <Eye size={22} className="text-[#3BBA9F] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="relative text-brand-charcoal font-black text-lg mb-2">{A.visionLabel}</p>
                  <p className="relative text-brand-charcoal-light leading-relaxed text-sm md:text-base">{A.visionText}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="group h-full bg-white rounded-3xl border border-gray-100 p-7 hover:border-brand-gold/40 hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold-light/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="relative w-12 h-12 rounded-2xl bg-brand-gold-light flex items-center justify-center mb-5 group-hover:bg-brand-gold transition-colors duration-300">
                    <Target size={22} className="text-brand-gold-dark group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="relative text-brand-charcoal font-black text-lg mb-2">{A.missionLabel}</p>
                  <p className="relative text-brand-charcoal-light leading-relaxed text-sm md:text-base">{A.missionText}</p>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </Reveal>

          <Reveal className="lg:col-span-5 order-1 lg:order-1" delay={0.15}>
            <h2 className="text-h1 font-black leading-[1.05] mb-6">
              <span className="block text-brand-charcoal">{A.titleTop}</span>
              <span className="block text-[#3BBA9F]">{A.titleBottom}</span>
            </h2>
            <div className="relative">
              <div
                className="relative w-full aspect-[4/3] overflow-hidden shadow-2xl shadow-brand-charcoal/10 group rounded-tr-3xl rounded-br-3xl rounded-bl-3xl"
                style={{ borderTopLeftRadius: "140px" }}
              >
                <Image
                  src={content.photo || defaultAboutCompany.photo}
                  alt={A.titleBottom}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl shadow-brand-charcoal/10 p-4 border border-gray-100 flex items-center gap-3"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#3BBA9F]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-[#3BBA9F]" />
                </div>
                <p className="font-black text-brand-charcoal text-sm whitespace-nowrap">{A.since}</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
