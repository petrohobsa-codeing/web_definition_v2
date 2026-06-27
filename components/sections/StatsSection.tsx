"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStats } from "@/lib/db";
import CountUp from "@/components/ui/CountUp";
import type { StatItem } from "@/lib/types";

export default function StatsSection() {
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  return (
    <section
      className="relative bg-white overflow-hidden py-20"
      aria-label="إحصائيات Fast Link"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 dot-bg opacity-[0.07]" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-green-light/70 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-brand-green-pale/70 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-brand-green font-bold text-sm tracking-widest uppercase mb-2">
            أرقامنا تتحدث
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-brand-charcoal-mid">
            <span className="text-brand-green">ثقة</span> مبنية على{" "}
            <span className="text-brand-green-dark">النتائج</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-x-reverse divide-gray-100">
          {stats.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="px-8 py-6 text-center group"
            >
              <div className="relative inline-block mb-3">
                <CountUp
                  value={s.value}
                  className="block text-5xl md:text-6xl font-black text-gasable-gradient group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-brand-green/40 rounded-full" />
              </div>
              <p className="text-brand-charcoal-light font-medium text-sm mt-3">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
