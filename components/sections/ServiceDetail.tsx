"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, Fuel, Flame, Cpu, MonitorCheck } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const iconMap = {
  Fuel,
  Flame,
  Cpu,
  MonitorCheck,
} as const;

type IconName = keyof typeof iconMap;

interface HowStep {
  title: string;
  description: string;
}

interface ServiceDetailProps {
  breadcrumbs: { label: string; href?: string }[];
  badge: string;
  title: string;
  description: string;
  iconName: IconName;
  features: string[];
  howItWorks?: HowStep[];
}

export default function ServiceDetail({
  breadcrumbs,
  badge,
  title,
  description,
  iconName,
  features,
  howItWorks,
}: ServiceDetailProps) {
  const Icon = iconMap[iconName];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronLeft size={14} className="rotate-180" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge
                variant="gold"
                className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30"
              >
                {badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/quote" variant="gold" size="lg">
                  اطلب عرض سعر
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  تحدّث مع خبير
                </Button>
              </div>
            </div>

            {/* Icon visual */}
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
                {/* Orbit ring */}
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
            <Badge className="mb-4">المزايا</Badge>
            <h2
              id="features-title"
              className="text-3xl md:text-4xl font-black text-brand-charcoal"
            >
              أبرز المزايا
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
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
              <Badge className="mb-4">كيف يعمل</Badge>
              <h2
                id="how-title"
                className="text-3xl md:text-4xl font-black text-brand-charcoal"
              >
                كيف يعمل الحساس
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative bg-white rounded-3xl p-7 border border-gray-100 hover:border-brand-green/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-green flex items-center justify-center text-white font-black text-lg mb-5">
                    {i + 1}
                  </div>
                  <h3 className="font-black text-brand-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-charcoal-light text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 bg-brand-green-dark relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white">
              جاهز للبدء؟
            </h2>
            <p className="text-white/70 leading-relaxed">
              تواصل معنا الآن واحصل على عرض سعر مخصّص لاحتياجاتك خلال 24
              ساعة.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/quote" variant="gold" size="lg">
                اطلب عرض سعر
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                تحدّث مع خبير
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
