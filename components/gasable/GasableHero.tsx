"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSlides } from "@/lib/db";
import type { HeroSlide } from "@/lib/types";

export default function GasableHero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);

useEffect(() => {
    getSlides().then(setSlides);
}, []);

  useEffect(() => {
      if (slides.length === 0) return;
      const timer = setInterval(() => {
            setCurrent((c) => (c + 1) % slides.length);
      }, 5500);
      return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[current];
  
  return (
    <section className="relative w-full aspect-video min-h-[560px] max-h-[100vh] overflow-hidden">
      {/* Rotating background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image || "/images/hero/bg.jpg"})` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Navy overlay (keeps brand tone) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#081B45]/85 via-[#081B45]/45 to-[#081B45]/25" />

      {/* Text overlay – bottom start */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-[1200px] mx-auto w-full px-6 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-white font-extrabold italic text-5xl md:text-7xl drop-shadow-lg leading-none">
                {slide.heading}
              </h1>
              <div className="w-20 h-1.5 bg-[#0067E3] rounded-full mt-5" />
              <p className="text-white text-xl md:text-2xl mt-4 font-light drop-shadow max-w-xl">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-10 inset-x-0 flex justify-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-[#0067E3]" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
