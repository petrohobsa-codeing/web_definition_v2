"use client";
import { useLang } from "@/context/LanguageContext";

export default function GasableHero() {
  const { lang } = useLang();
  const tagline =
    lang === "ar" ? "لكل احتياجاتك من الطاقة." : "For all your energy needs.";

  return (
    <section className="relative w-full h-[100vh] min-h-[560px] overflow-hidden">
      {/* Background video with image fallback */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-solar-panels-on-a-field-2633/1080p.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

      {/* Text overlay – bottom start */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-[1200px] mx-auto w-full px-6 pb-24">
          <h1 className="text-white font-extrabold italic text-5xl md:text-7xl drop-shadow-lg leading-none">
            Gasable
          </h1>
          <p className="text-white text-xl md:text-2xl mt-4 font-light drop-shadow">
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
