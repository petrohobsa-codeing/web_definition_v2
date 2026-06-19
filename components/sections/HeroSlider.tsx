"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { getSlides } from "@/lib/store";
import type { HeroSlide } from "@/lib/types";

const gradients = [
  "from-brand-green-dark via-brand-green-mid to-brand-green",
  "from-[#065F46] via-[#047857] to-[#059669]",
  "from-[#022C22] via-[#064E3B] to-[#065F46]",
  "from-[#064E3B] via-[#047857] to-[#10B981]",
  "from-[#022C22] via-[#064E3B] to-[#059669]",
];

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setSlides(getSlides());
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % (slides.length || 1));
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + (slides.length || 1)) % (slides.length || 1));
  }, [slides.length]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [isPlaying, next]);

  const slide = slides[current];
  const gradient = gradients[current % gradients.length];

  if (!slide) return null;

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      aria-label="عرض شرائح الصفحة الرئيسية"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-bg opacity-20" />

      {/* Geometric decorations */}
      <div className="absolute top-20 left-[-100px] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-50px] w-[400px] h-[400px] rounded-full bg-brand-gold/10 blur-3xl" />

      {/* Large decorative circle */}
      <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 hidden xl:block" />
      <div className="absolute left-[60px] top-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-white/5 hidden xl:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col justify-center py-32">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-7"
            >
              {/* Badge */}
              <Badge variant="gold" className="!bg-white/15 !text-white !border-white/30">
                {slide.badge}
              </Badge>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                {slide.heading}
              </h1>

              {/* Description */}
              <p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button href={slide.cta1Href} variant="gold" size="lg">
                  {slide.cta1Label}
                </Button>
                <Button href={slide.cta2Href} variant="outline" size="lg">
                  {slide.cta2Label}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating visual card */}
        <motion.div
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="glass-dark rounded-3xl p-6 w-72 border border-white/15">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-black">مستوى الخزان</p>
                <p className="text-white/50 text-xs">تحديث لحظي</p>
              </div>
              <div className="mr-auto">
                <span className="inline-flex items-center gap-1 bg-brand-green/30 text-green-300 text-xs font-bold px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  مباشر
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {["الخزان أ - الرياض", "الخزان ب - جدة", "الخزان ج - الدمام"].map(
                (tank, i) => (
                  <div key={tank}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{tank}</span>
                      <span className="text-white font-bold">
                        {[78, 45, 91][i]}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${[78, 45, 91][i]}%`,
                          background:
                            [78, 45, 91][i] < 50
                              ? "#F59E0B"
                              : "linear-gradient(90deg, #059669, #34D399)",
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Slide counter */}
        <div className="absolute bottom-12 right-6 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`الشريحة ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-brand-gold"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Nav arrows */}
        <div className="absolute bottom-8 left-6 flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="الشريحة السابقة"
            className="w-10 h-10 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white flex items-center justify-center transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
          <button
            onClick={next}
            aria-label="الشريحة التالية"
            className="w-10 h-10 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white flex items-center justify-center transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
