"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/ServiceCard";
import Badge from "@/components/ui/Badge";
import { Fuel, Cpu, Flame, MonitorCheck } from "lucide-react";
import { getServices } from "@/lib/store";
import type { ServiceItem } from "@/lib/types";

const iconMap = { Fuel, Cpu, Flame, MonitorCheck } as const;

export default function ServicesGrid() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    setServices(getServices());
  }, []);
  return (
    <section className="py-24 bg-brand-green-light/40" aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="mb-5">خدماتنا</Badge>
          <h2
            id="services-title"
            className="text-4xl md:text-5xl font-black text-brand-charcoal mb-5"
          >
            حلول طاقة ذكية ومتكاملة
          </h2>
          <p className="text-brand-charcoal-light max-w-2xl mx-auto leading-relaxed">
            نجمع بين الخدمات اللوجستية التقليدية وتقنيات الجيل القادم لضمان
            كفاءة عملياتك.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              icon={iconMap[service.iconName] ?? Fuel}
              title={service.title}
              description={service.description}
              href={service.href}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
