"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { Quote } from "lucide-react";
import { getTestimonials } from "@/lib/store";
import { siteImages } from "@/lib/images";
import type { Testimonial } from "@/lib/types";

function Stars() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setTestimonials(getTestimonials());
  }, []);

  return (
    <section
      className="py-24 bg-white relative overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-green-light/50 blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-brand-gold-light/30 blur-3xl -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="mb-5">آراء العملاء</Badge>
          <h2
            id="testimonials-title"
            className="text-4xl md:text-5xl font-black text-brand-charcoal mb-4"
          >
            ماذا يقول شركاؤنا
          </h2>
          <p className="text-brand-charcoal-light max-w-xl mx-auto leading-relaxed">
            أكثر من 500 منشأة تثق بنا لتأمين طاقتها على مدار الساعة.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const photoSrc = siteImages.testimonials[i] ?? null;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="relative group"
              >
                <div className="h-full bg-white rounded-3xl border border-gray-100 p-7 hover:border-brand-green/20 hover:shadow-xl hover:shadow-brand-green/10 transition-all duration-300 flex flex-col">
                  {/* Top accent */}
                  <div className="absolute top-0 right-6 left-6 h-0.5 bg-gradient-to-l from-brand-gold via-brand-green to-transparent rounded-full group-hover:from-brand-green group-hover:via-brand-gold transition-all duration-500" />

                  <div className="flex items-start justify-between mb-4">
                    <Stars />
                    <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center opacity-60">
                      <Quote size={16} className="text-brand-green" />
                    </div>
                  </div>

                  <p className="text-brand-charcoal-mid leading-relaxed text-sm flex-1 mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    {photoSrc ? (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={photoSrc} alt={t.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-green to-brand-green-mid flex items-center justify-center text-white font-black text-base flex-shrink-0">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-black text-brand-charcoal text-sm">{t.name}</p>
                      <p className="text-brand-charcoal-light text-xs">
                        {t.role}
                        {t.company && <> · <span className="text-brand-green">{t.company}</span></>}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
