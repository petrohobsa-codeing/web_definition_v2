"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { getTestimonials } from "@/lib/store";
import type { Testimonial } from "@/lib/types";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setTestimonials(getTestimonials());
  }, []);
  return (
    <section
      className="py-24 bg-gray-50 relative overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand-green-light/60 blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} text={t.text} name={t.name} role={t.role} company={t.company} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
