"use client";
import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export default function StatCard({ value, label, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="glass rounded-3xl border border-brand-green/10 p-8 text-center hover:border-brand-green/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/10">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-green-light/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <p className="relative text-4xl md:text-5xl font-black text-brand-green mb-2">
          {value}
        </p>
        <p className="relative text-brand-charcoal-mid font-medium">{label}</p>
      </div>
    </motion.div>
  );
}
