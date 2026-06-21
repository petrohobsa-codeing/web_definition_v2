"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ChevronRight, ChevronLeft, TrendingUp, Shield, Clock } from "lucide-react";
import { getSlides } from "@/lib/db";
import { siteImages } from "@/lib/images";
import type { HeroSlide } from "@/lib/types";

const gradients = [
  "from-[#022C22] via-[#064E3B] to-[#065F46]",
  "from-[#064E3B] via-[#047857] to-[#059669]",
  "from-[#022C22] via-[#064E3B] to-[#065F46]",
  "from-[#065F46] via-[#059669] to-[#047857]",
  "from-[#022C22] via-[#064E3B] to-[#059669]",
];

const trustItems = [
  { icon: Shield, text: "موردون موثوقون", sub: "شبكة واسعة من الموردين المعتمدين" },
  { icon: Clock, text: "استجابة سريعة", sub: "للطلبات العاجلة على مدار الساعة" },
  { icon: TrendingUp, text: "5 مناطق تغطية", sub: "الرياض، مكة، المدينة، ينبع، تبوك" },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    getSlides().then(setSlides);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % (slides.length || 1));
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + (slides.length || 1)) % (slides.length || 1));
  }, [slides.length]);

  useEffect(() => {
    if (!isPlaying || slides.length === 0) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [isPlaying, next, slides.length]);

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
          transition={{ duration: 0.9 }}
        />
      </AnimatePresence>

      {/* Hero background image */}
      {siteImages.hero.background && (
        <div className="absolute inset-0">
          <Image
            src={siteImages.hero.background}
            alt="خلفية"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
          />
        </div>
      )}

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-bg opacity-15" />

      {/* Decorative orbs */}
      <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full bg-brand-green/20 blur-[100px]" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-brand-gold/10 blur-[80px]" />

      {/* Decorative rings */}
      <div className="absolute left-[-100px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5 hidden xl:block" />
      <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-white/5 hidden xl:block" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col justify-center py-28">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">

          {/* Text content */}
          <div className="max-w-2xl xl:max-w-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-7"
              >
                <Badge variant="gold" className="!bg-white/15 !text-white !border-white/30 backdrop-blur-sm">
                  {slide.badge}
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                  {slide.heading}
                </h1>

                <p className="text-white/70 text-lg md:text-xl leading-loose font-light max-w-xl">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button href={slide.cta1Href} variant="gold" size="lg">
                    {slide.cta1Label}
                  </Button>
                  <Button href={slide.cta2Href} variant="outline" size="lg">
                    {slide.cta2Label}
                  </Button>
                </div>

                {/* Trust items */}
                <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10">
                  {trustItems.map((item) => (
                    <div key={item.text} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <item.icon size={15} className="text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-bold leading-none">{item.text}</p>
                        <p className="text-white/50 text-xs mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual panel */}
          <div className="hidden xl:flex items-center justify-center">
            {siteImages.hero.side ? (
              <motion.div
                className="relative w-full max-w-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                  <Image
                    src={siteImages.hero.side}
                    alt="صورة الخدمة"
                    width={600}
                    height={450}
                    className="object-cover w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/60 to-transparent" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="relative w-full max-w-md"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-brand-green/20 blur-3xl scale-110" />

                {/* Dashboard card */}
                <div className="relative glass-dark rounded-3xl border border-white/15 overflow-hidden shadow-2xl shadow-black/40">
                  {/* Header bar */}
                  <div className="bg-white/5 px-5 py-4 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/70" />
                      <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                      <div className="w-3 h-3 rounded-full bg-green-400/70" />
                    </div>
                    <span className="text-white/40 text-xs font-mono">fastlink.sa</span>
                    <span className="inline-flex items-center gap-1.5 bg-brand-green/30 text-green-300 text-xs font-bold px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      مباشر
                    </span>
                  </div>

                  <div className="p-6 space-y-5">
                    <div>
                      <p className="text-white/40 text-xs mb-1">خدماتنا اللوجستية</p>
                      <p className="text-white text-xl font-black">شركة فاست لينك</p>
                      <p className="text-green-400 text-xs font-bold mt-1 flex items-center gap-1">
                        <TrendingUp size={11} /> وساطة تجارية ولوجستية
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: "الخدمات البترولية والغاز", color: "from-brand-green to-emerald-400" },
                        { name: "الحلول البيئية والصرف", color: "from-blue-500 to-blue-400" },
                        { name: "الإمداد المائي", color: "from-cyan-600 to-cyan-400" },
                        { name: "الطاقة البديلة (المولدات)", color: "from-amber-500 to-amber-300" },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-white/70">{item.name}</span>
                            <span className="font-bold text-green-300">متوفر</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-l ${item.color}`}
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.2, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10">
                      {[
                        { v: "٤", l: "خدمات" },
                        { v: "٥", l: "مناطق" },
                        { v: "٢٤/٧", l: "طوارئ" },
                      ].map((s) => (
                        <div key={s.l} className="text-center">
                          <p className="text-white font-black text-sm">{s.v}</p>
                          <p className="text-white/40 text-xs leading-tight">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Client logos bar */}
      {siteImages.clients.length > 0 && (
        <div className="absolute bottom-24 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-8 overflow-x-auto">
              <span className="text-white/30 text-xs whitespace-nowrap flex-shrink-0">شركاؤنا</span>
              {siteImages.clients.map((src, i) => (
                <div key={i} className="relative h-8 w-24 flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity">
                  <Image src={src} alt={`عميل ${i + 1}`} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Slide dots */}
      <div className="absolute bottom-10 right-6 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`الشريحة ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-8 h-2 bg-brand-gold" : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <div className="absolute bottom-8 left-6 flex items-center gap-2 z-10">
        <button
          onClick={prev}
          aria-label="الشريحة السابقة"
          className="w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white hover:bg-white/10 flex items-center justify-center transition-all duration-200"
        >
          <ChevronRight size={18} />
        </button>
        <button
          onClick={next}
          aria-label="الشريحة التالية"
          className="w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white hover:bg-white/10 flex items-center justify-center transition-all duration-200"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 72C120 64 240 48 360 45.3C480 42.7 600 53.3 720 58.7C840 64 960 64 1080 58.7C1200 53.3 1320 42.7 1380 37.3L1440 32V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
