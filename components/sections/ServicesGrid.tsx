"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import { Fuel, Cpu, Flame, MonitorCheck, Droplets, Zap, Truck, ArrowLeft } from "lucide-react";
import { getServices } from "@/lib/db";
import { siteImages } from "@/lib/images";
import type { ServiceItem } from "@/lib/types";

const iconMap = { Fuel, Cpu, Flame, MonitorCheck, Droplets, Zap, Truck } as const;

const serviceImages: Record<string, string | null> = {
  "1": siteImages.services.diesel,
  "2": siteImages.services.gas,
  "3": siteImages.services.sensors,
  "4": siteImages.services.monitoring,
};

const cardColors = [
  { from: "from-[#51B957]", to: "to-[#0E549A]", light: "bg-brand-green-light", text: "text-brand-green" },
  { from: "from-[#0E549A]", to: "to-[#51B957]", light: "bg-brand-green-pale", text: "text-brand-green-dark" },
  { from: "from-[#51B957]", to: "to-[#2E86A8]", light: "bg-brand-green-light", text: "text-brand-green" },
  { from: "from-[#0E549A]", to: "to-[#357FB0]", light: "bg-brand-green-pale", text: "text-brand-green-dark" },
];

export default function ServicesGrid() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" aria-labelledby="services-title">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-green-light/60 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-gold-light/30 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="mb-5">خدماتنا</Badge>
          <SectionHeading id="services-title" text="حلول طاقة ذكية ومتكاملة" className="mb-5" />
          <p className="text-brand-charcoal-light max-w-2xl mx-auto leading-relaxed">
            نجمع بين الخدمات اللوجستية التقليدية وتقنيات الجيل القادم لضمان كفاءة عملياتك.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.iconName] ?? Fuel;
            const color = cardColors[i % cardColors.length];
            const imgSrc = serviceImages[service.id] ?? null;
            const num = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative"
              >
                <Link href={service.href} className="block h-full">
                  <div className="h-full bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-brand-green/20 hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-400">
                    {/* Top image or gradient */}
                    <div className={`relative h-44 bg-gradient-to-br ${color.from} ${color.to} overflow-hidden`}>
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={service.title}
                          fill
                          className="object-cover opacity-80 mix-blend-luminosity group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 dot-bg opacity-20" />
                          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">
                              <Icon size={36} className="text-white" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Number badge */}
                      <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-1.5">
                        <span className="text-white font-black text-sm font-mono">{num}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className={`w-10 h-10 rounded-xl ${color.light} flex items-center justify-center mb-4 hover-grow`}>
                        <Icon size={20} className={color.text} />
                      </div>
                      <h3 className="text-lg font-black text-brand-charcoal mb-2 group-hover:text-brand-green-dark transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-brand-charcoal-light text-sm leading-relaxed mb-4 line-clamp-3">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-brand-green font-bold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>اعرف المزيد</span>
                        <ArrowLeft size={15} className="rotate-180" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
