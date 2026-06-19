"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  delay?: number;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="group relative"
    >
      <Link href={href} className="block h-full">
        <div className="h-full bg-white rounded-3xl border border-gray-100 p-8 hover:border-brand-green/30 hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-400 relative overflow-hidden">
          {/* Background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green-light/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl" />

          {/* Icon container */}
          <div className="relative w-16 h-16 mb-6 rounded-2xl bg-brand-green-light flex items-center justify-center group-hover:bg-brand-green transition-colors duration-300">
            <Icon
              size={28}
              className="text-brand-green group-hover:text-white transition-colors duration-300"
            />
          </div>

          <h3 className="relative text-xl font-black text-brand-charcoal mb-3 group-hover:text-brand-green-dark transition-colors duration-300">
            {title}
          </h3>
          <p className="relative text-brand-charcoal-light leading-relaxed text-sm mb-6">
            {description}
          </p>

          <div className="relative flex items-center gap-2 text-brand-green font-bold text-sm group-hover:gap-3 transition-all duration-300">
            <span>اعرف المزيد</span>
            <ArrowLeft size={16} className="rotate-180" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
