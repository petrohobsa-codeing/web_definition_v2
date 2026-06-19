"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StepCardProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  isLast?: boolean;
}

export default function StepCard({
  number,
  icon: Icon,
  title,
  description,
  delay = 0,
  isLast = false,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gradient-to-l from-brand-green/30 to-transparent z-0" />
      )}

      {/* Step number bubble */}
      <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-brand-green to-brand-green-mid flex items-center justify-center shadow-xl shadow-brand-green/30 mb-6">
        <Icon size={28} className="text-white" />
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-gold flex items-center justify-center text-white text-xs font-black">
          {number}
        </div>
      </div>

      <h3 className="text-lg font-black text-brand-charcoal mb-2">{title}</h3>
      <p className="text-brand-charcoal-light text-sm leading-relaxed max-w-48">
        {description}
      </p>
    </motion.div>
  );
}
