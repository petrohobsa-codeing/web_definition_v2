"use client";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CheckCircle2, Sparkles, Flame, Fuel, Droplets, Leaf, Cpu, Truck, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import {
  services, intro, commitment, advantagesLabel, valueLabel, type IconKey,
} from "@/lib/petrohopServices";

const iconMap: Record<IconKey, typeof Flame> = {
  lpg: Flame,
  oil: Fuel,
  water: Droplets,
  energy: Leaf,
  iot: Cpu,
  logistics: Truck,
  tracking: Navigation,
};

const ui = {
  ar: { badge: "خدماتنا", quote: "اطلب عرض سعر", contact: "تواصل معنا", cta: "هل تريد حلاً مخصّصاً لمنشأتك؟" },
  en: { badge: "Our Services", quote: "Get a Quote", contact: "Contact Us", cta: "Need a tailored solution for your business?" },
};

export default function ServicesContent() {
  const { lang } = useLang();
  const L = ui[lang];
  const I = intro[lang];
  const C = commitment[lang];

  return (
    <>
      {/* Intro hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#C8102E]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
            {L.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">{I.title}</h1>
          <p className="text-brand-gold text-xl md:text-2xl font-bold mb-6">{I.subtitle}</p>
          <p className="text-white/70 text-lg leading-relaxed">{I.body}</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          {services.map((s, idx) => {
            const c = lang === "ar" ? s.ar : s.en;
            const Icon = iconMap[s.icon];
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
                <div className="p-7 md:p-10">
                  {/* Header */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className="hover-grow flex-shrink-0">
                      <Icon size={56} stroke="url(#fl-grad)" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#C8102E]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black text-brand-green-dark leading-tight">
                        {c.title}
                      </h2>
                    </div>
                  </div>

                  {/* Intro */}
                  <p className="text-[#54595F] leading-loose mb-8">{c.intro}</p>

                  {/* Advantages + Value */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#F4F6FA] rounded-2xl p-6">
                      <h3 className="flex items-center gap-2 font-black text-brand-green-dark mb-4">
                        <CheckCircle2 size={18} className="text-brand-green" />
                        {advantagesLabel[lang]}
                      </h3>
                      <ul className="space-y-2.5">
                        {c.advantages.map((a) => (
                          <li key={a} className="flex items-start gap-2.5 text-[#54595F] text-sm leading-6">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#FCE9EC] rounded-2xl p-6">
                      <h3 className="flex items-center gap-2 font-black text-[#A00C24] mb-4">
                        <Sparkles size={18} className="text-[#C8102E]" />
                        {valueLabel[lang]}
                      </h3>
                      <ul className="space-y-2.5">
                        {c.value.map((v) => (
                          <li key={v} className="flex items-start gap-2.5 text-[#54595F] text-sm leading-6">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C8102E] flex-shrink-0" />
                            {v}
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
      <section className="py-20 bg-[#F4F6FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-5">
            <span className="text-brand-green">{lang === "ar" ? "التزامنا" : "Our"}</span>{" "}
            <span className="text-[#C8102E]">{lang === "ar" ? "" : "Commitment"}</span>
          </h2>
          <p className="text-[#54595F] leading-loose text-lg">{C.body}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-charcoal-light mb-6 text-lg">{L.cta}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="/quote" size="lg">{L.quote}</Button>
            <Button href="/contact" variant="secondary" size="lg">{L.contact}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
