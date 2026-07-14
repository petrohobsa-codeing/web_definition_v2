"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MapPin, Tag } from "lucide-react";
import { getProjects } from "@/lib/db";
import type { ProjectItem } from "@/lib/types";
import { useLang } from "@/context/LanguageContext";

const tp = {
  ar: {
    badge: "أعمالنا", title: "مشاريعنا وأعمالنا",
    sub: "نماذج من المشاريع التي خدمناها عبر مناطق المملكة المختلفة.",
    all: "الكل", empty: "لا توجد مشاريع في هذا التصنيف.",
    ctaText: "هل تريد أن يكون مشروعك التالي معنا؟",
    quote: "اطلب عرض سعر", contact: "تواصل معنا",
  },
  en: {
    badge: "Our Work", title: "Our Projects & Work",
    sub: "Examples of projects we have served across the Kingdom's regions.",
    all: "All", empty: "No projects in this category.",
    ctaText: "Want your next project to be with us?",
    quote: "Get a Quote", contact: "Contact Us",
  },
};

const categoryColors: Record<string, string> = {
  "خدمات بترولية": "bg-[#E8EEF9] text-[#0C2D6B]",
  "حلول بيئية": "bg-[#E8EEF9] text-[#24487B]",
  "إمداد مائي": "bg-[#E8EEF9] text-[#0C2D6B]",
  "طاقة بديلة": "bg-[#E5F0FF] text-[#0067E3]",
  "حلول متكاملة": "bg-[#E5F0FF] text-[#004FB0]",
};

export default function ProjectsPage() {
  const { lang } = useLang();
  const L = tp[lang];
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [filter, setFilter] = useState("__all__");

  useEffect(() => { getProjects().then(setProjects); }, []);

  const categories = ["__all__", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "__all__" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
            {L.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">{L.title}</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">{L.sub}</p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
                  filter === cat
                    ? "bg-brand-green text-white shadow-lg shadow-brand-green/30"
                    : "bg-gray-100 text-brand-charcoal-mid hover:bg-brand-green-light hover:text-brand-green"
                }`}
              >
                {cat === "__all__" ? L.all : cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-brand-green/10 hover:border-brand-green/20 transition-all duration-400"
              >
                {/* Top color bar */}
                <div className="h-2 bg-gradient-to-r from-brand-green-dark to-brand-green" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${categoryColors[project.category] ?? "bg-gray-100 text-gray-600"}`}>
                      <Tag size={11} />
                      {project.category}
                    </span>
                    <span className="text-xs font-medium text-brand-charcoal-light flex items-center gap-1">
                      <MapPin size={11} />
                      {project.city}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-brand-charcoal mb-3 group-hover:text-brand-green-dark transition-colors duration-300 leading-snug">
                    {project.title}
                  </h2>
                  <p className="text-brand-charcoal-light text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-brand-charcoal-light py-16">{L.empty}</p>
          )}

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-brand-charcoal-light mb-6 text-lg">{L.ctaText}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button href="/quote" size="lg">{L.quote}</Button>
              <Button href="/contact" variant="secondary" size="lg">{L.contact}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
