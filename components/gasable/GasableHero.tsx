"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80",
    ar: { title: "Fast Link", sub: "نربط الموردين بالعملاء في أنحاء المملكة." },
    en: { title: "Fast Link", sub: "Connecting suppliers with customers across the Kingdom." },
  },
  {
    img: "https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&fit=crop&w=1920&q=80",
    ar: { title: "خدمات بترولية", sub: "بنزين وديزل وغاز مسال لجميع المشاريع والأساطيل." },
    en: { title: "Petroleum Services", sub: "Petrol, diesel and LPG for all projects and fleets." },
  },
  {
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=80",
    ar: { title: "حلول متكاملة", sub: "بيئية، مائية، ومولدات — بأعلى كفاءة وأسرع استجابة." },
    en: { title: "Integrated Solutions", sub: "Environmental, water and generators — fast and efficient." },
  },
];

export default function GasableHero() {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];
  const content = lang === "ar" ? slide.ar : slide.en;

  return (
    <section className="relative w-full h-[100vh] min-h-[560px] overflow-hidden">
      {/* Rotating background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.img})` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Navy overlay (keeps brand tone) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B33]/85 via-[#0C1B33]/45 to-[#0C1B33]/25" />

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
                {content.title}
              </h1>
              <div className="w-20 h-1.5 bg-[#C8102E] rounded-full mt-5" />
              <p className="text-white text-xl md:text-2xl mt-4 font-light drop-shadow max-w-xl">
                {content.sub}
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
              i === current ? "w-8 bg-[#C8102E]" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
