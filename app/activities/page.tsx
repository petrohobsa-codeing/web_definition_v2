"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { Calendar, Tag } from "lucide-react";
import { getActivities } from "@/lib/db";
import type { ActivityItem } from "@/lib/types";
import { useLang } from "@/context/LanguageContext";

const tn = {
  ar: { badge: "أنشطتنا", title: "أنشطة بتروهب", sub: "أبرز الفعاليات والأنشطة التي تنظمها أو تشارك بها بتروهب.", empty: "لا توجد أنشطة حالياً." },
  en: { badge: "Our Activities", title: "Petrohub Activities", sub: "Highlights of the events and activities organized or attended by Petrohub.", empty: "No activities yet." },
};

export default function ActivitiesPage() {
  const { lang } = useLang();
  const L = tn[lang];
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => { getActivities().then(setActivities); }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
            {L.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">{L.title}</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">{L.sub}</p>
        </div>
      </section>

      {/* Activities grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {activities.length === 0 ? (
            <p className="text-center text-brand-charcoal-light py-16">{L.empty}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-brand-green/10 hover:border-brand-green/20 transition-all duration-400 h-full"
                >
                  {activity.image ? (
                    <img src={activity.image} alt={activity.title} className="w-full h-44 object-cover" />
                  ) : (
                    <div className="h-2 bg-gradient-to-r from-brand-green-dark to-brand-green" />
                  )}
                  <div className="p-7 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      {activity.category && (
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-brand-green-light text-brand-green flex items-center gap-1.5">
                          <Tag size={11} />
                          {activity.category}
                        </span>
                      )}
                      {activity.date && (
                        <span className="text-xs text-brand-charcoal-light flex items-center gap-1">
                          <Calendar size={11} />
                          {activity.date}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-black text-brand-charcoal mb-3 leading-snug flex-1">
                      {activity.title}
                    </h2>
                    <p className="text-brand-charcoal-light text-sm leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
