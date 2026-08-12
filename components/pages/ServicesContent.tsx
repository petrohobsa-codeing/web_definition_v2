"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { defaultServiceDetails } from "@/lib/store";
import { getServiceDetails } from "@/lib/db";
import type { ServiceDetailItem } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CheckCircle2, Sparkles, Flame, Fuel, Droplets, Zap, Cpu, Truck, MonitorCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/i18n";
import { useAutoTranslate } from "@/lib/useAutoTranslate";
import {
    intro, commitment, advantagesLabel, valueLabel,
} from "@/lib/petrohubServices";

const iconMap: Record<string, typeof Flame> = { Flame, Fuel, Droplets, Zap, Cpu, Truck, MonitorCheck };

const ui = {
  ar: { badge: "خدماتنا", quote: "اطلب عرض سعر", contact: "تواصل معنا", cta: "هل تريد حلاً مخصّصاً لمنشأتك؟" },
  en: { badge: "Our Services", quote: "Get a Quote", contact: "Contact Us", cta: "Need a tailored solution for your business?" },
};

export default function ServicesContent() {
  const { lang } = useLang();
  const L = ui[lang];
  const I = intro[lang];
  const C = commitment[lang];
  const [services, setServices] = useState<ServiceDetailItem[]>(defaultServiceDetails);

  useEffect(() => {
    getServiceDetails().then(setServices);
  }, []);

  const at = useAutoTranslate(
    services.flatMap((s) => [s.title, s.intro, ...(s.advantages || []), ...(s.value || [])])
  );

  return (
    <>
      {/* Intro hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#3BBA9F]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
            {L.badge}
          </Badge>
          <h1 className="text-display font-black text-white mb-4">{I.title}</h1>
          <p className="text-h4 text-brand-gold font-bold mb-6">{I.subtitle}</p>
          <p className="text-body-lg text-white/70 leading-relaxed">{I.body}</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          {services.map((s, idx) => {
            const Icon = iconMap[s.iconName] || Flame;
            return (
              <motion.article
                id={s.slug}
                key={s.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55 }}
                className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="h-1.5 bg-navy-red-gradient" />
                {s.image && (
                  <div className="relative w-full aspect-[21/9]">
                    <Image src={s.image} alt={at(tr(lang, s.title, s.titleEn))} fill className="object-cover" />
                  </div>
                )}
                <div className="p-7 md:p-10">
                  {/* Header */}
                  <div className="flex items-start gap-5 mb-6">
                    {!s.image && (
                      <div className="hover-grow flex-shrink-0">
                        <Icon size={56} stroke="url(#fl-grad)" strokeWidth={1.5} />
                      </div>
                    )}
                    <div>
                      <span className="text-body-sm font-bold text-[#3BBA9F]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-h2 font-black text-brand-green-dark leading-tight">
                        {at(tr(lang, s.title, s.titleEn))}
                      </h2>
                    </div>
                  </div>

                  {/* Intro */}
                                  <p className="text-body-lg text-[#54595F] leading-loose mb-8">{at(tr(lang, s.intro, s.introEn))}</p>

                  {/* Advantages + Value */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#F2F7F6] rounded-2xl p-6">
                      <h3 className="text-h4 flex items-center gap-2 font-black text-brand-green-dark mb-4">
                        <CheckCircle2 size={18} className="text-brand-green" />
                        {advantagesLabel[lang]}
                      </h3>
                      <ul className="space-y-2.5">
                        {tr(lang, s.advantages, s.advantagesEn).map((a) => (
                          <li key={a} className="text-body-sm flex items-start gap-2.5 text-[#54595F] leading-6">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                            {at(a)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#E4F4EF] rounded-2xl p-6">
                      <h3 className="text-h4 flex items-center gap-2 font-black text-[#2E9B84] mb-4">
                        <Sparkles size={18} className="text-[#3BBA9F]" />
                        {valueLabel[lang]}
                      </h3>
                      <ul className="space-y-2.5">
                        {tr(lang, s.value, s.valueEn).map((v) => (
                          <li key={v} className="text-body-sm flex items-start gap-2.5 text-[#54595F] leading-6">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3BBA9F] flex-shrink-0" />
                            {at(v)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20 bg-[#F2F7F6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-h2 font-black mb-5">
            <span className="text-brand-green">{lang === "ar" ? "التزامنا" : "Our"}</span>{" "}
            <span className="text-[#3BBA9F]">{lang === "ar" ? "" : "Commitment"}</span>
          </h2>
          <p className="text-body-lg text-[#54595F] leading-loose">{C.body}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-body-lg text-brand-charcoal-light mb-6">{L.cta}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="/quote" size="lg">{L.quote}</Button>
            <Button href="/contact" variant="secondary" size="lg">{L.contact}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
