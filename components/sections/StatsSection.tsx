"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";
import { getStats } from "@/lib/store";
import type { StatItem } from "@/lib/types";

export default function StatsSection() {
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    setStats(getStats());
  }, []);

  return (
    <section
      className="relative py-20 bg-white"
      aria-label="إحصائيات بترونير"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-brand-charcoal-light font-medium">
            أرقام تتحدث عن موثوقيتنا
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.id} value={s.value} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
