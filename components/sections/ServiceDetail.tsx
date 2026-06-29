"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, Fuel, Flame, Cpu, MonitorCheck, Droplets, Zap } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useLang } from "@/context/LanguageContext";

const iconMap = { Fuel, Flame, Cpu, MonitorCheck, Droplets, Zap } as const;
type IconName = keyof typeof iconMap;

interface Bi { ar: string; en: string }
interface BiStep { ar: { title: string; description: string }; en: { title: string; description: string } }

interface ServiceDetailProps {
  serviceName: Bi;
  badge: Bi;
  title: Bi;
  description: Bi;
  iconName: IconName;
  features: { ar: string[]; en: string[] };
  howItWorks?: BiStep[];
}

const ui = {
  ar: {
    home: "الرئيسية", services: "الخدمات",
    quote: "اطلب عرض سعر", talk: "تحدّث مع خبير",
    featuresBadge: "المزايا", featuresTitle: "أبرز المزايا",
    howBadge: "كيف يعمل", howTitle: "كيف نعمل",
    readyTitle: "جاهز للبدء؟",
    readySub: "تواصل معنا الآن واحصل على عرض سعر مخصّص لاحتياجاتك خلال 24 ساعة.",
  },
  en: {
    home: "Home", services: "Services",
    quote: "Get a Quote", talk: "Talk to an Expert",
    featuresBadge: "Features", featuresTitle: "Key Features",
    howBadge: "How it works", howTitle: "How We Work",
    readyTitle: "Ready to start?",
    readySub: "Contact us now and get a custom quote for your needs within 24 hours.",
  },
};

export default function ServiceDetail({
  serviceName, badge, title, description, iconName, features, howItWorks,
}: ServiceDetailProps) {
  const { lang } = useLang();
  const L = ui[lang];
  const Icon = iconMap[iconName];
  const featureList = lang === "ar" ? features.ar : features.en;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#C8102E]" />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors duration-200">{L.home}</Link>
            <ChevronLeft size={14} className="rtl:rotate-180" />
            <Link href="/services" className="hover:text-white transition-colors duration-200">{L.services}</Link>
            <ChevronLeft size={14} className="rtl:rotate-180" />
            <span className="text-white font-medium">{lang === "ar" ? serviceName.ar : serviceName.en}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
                {lang === "ar" ? badge.ar : badge.en}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                {lang === "ar" ? title.ar : title.en}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {lang === "ar" ? description.ar : description.en}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/quote" variant="gold" size="lg">{L.quote}</Button>
                <Button href="/contact" variant="outline" size="lg">{L.talk}</Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 rounded-full bg-brand-gold/10 blur-2xl" />
                <div className="relative w-full h-full rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 flex items-center justify-center">
                    <Icon size={64} className="text-brand-gold" />
                  </div>
                </div>
                <div className="absolute inset-[-20px] rounded-full border border-white/5 animate-spin-slow" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white" aria-labelledby="features-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Badge className="mb-4">{L.featuresBadge}</Badge>
            <h2 id="features-title" className="text-3xl md:text-4xl font-black text-brand-charcoal">
              {L.featuresTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureList.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-brand-green-light/50 border border-brand-green/10"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={20} className="text-white" />
                </div>
                <span className="font-bold text-brand-charcoal">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      {howItWorks && (
        <section className="py-24 bg-gray-50" aria-labelledby="how-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Badge className="mb-4">{L.howBadge}</Badge>
              <h2 id="how-title" className="text-3xl md:text-4xl font-black text-brand-charcoal">
                {L.howTitle}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, i) => {
                const s = lang === "ar" ? step.ar : step.en;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative bg-white rounded-3xl p-7 border border-gray-100 hover:border-brand-green/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-green flex items-center justify-center text-white font-black text-lg mb-5">
                      {i + 1}
                    </div>
                    <h3 className="font-black text-brand-charcoal mb-2">{s.title}</h3>
                    <p className="text-brand-charcoal-light text-sm leading-relaxed">{s.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 bg-brand-green-dark relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#C8102E]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white">{L.readyTitle}</h2>
            <p className="text-white/70 leading-relaxed">{L.readySub}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/quote" variant="gold" size="lg">{L.quote}</Button>
              <Button href="/contact" variant="outline" size="lg">{L.talk}</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
