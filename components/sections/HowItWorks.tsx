"use client";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import StepCard from "@/components/ui/StepCard";
import { Building2, Cpu, Fuel, Truck } from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "سجّل منشأتك",
    description: "إنشاء حساب وإضافة مواقع الخزانات",
  },
  {
    icon: Cpu,
    title: "ركّب الحساس",
    description: "تركيب حساسات IoT لمراقبة المستوى",
  },
  {
    icon: Fuel,
    title: "اطلب الوقود",
    description: "اطلب يدوياً أو دع النظام يطلب تلقائياً",
  },
  {
    icon: Truck,
    title: "استلم وقودك",
    description: "توصيل سريع مع تتبّع حي للصهريج",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-24 bg-brand-green-dark relative overflow-hidden"
      aria-labelledby="how-title"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 dot-bg opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-green/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="gold" className="mb-5 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
            كيف نعمل
          </Badge>
          <h2
            id="how-title"
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            خطوات بسيطة لإمداد مستمر
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            ابدأ في دقائق وتمتّع بإمداد وقود لا ينقطع من أول يوم.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {steps.map((step, i) => (
            <StepCard
              key={step.title}
              number={i + 1}
              {...step}
              delay={i * 0.12}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
