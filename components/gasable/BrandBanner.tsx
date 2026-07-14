"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import GasableButton from "./GasableButton";

/**
 * Closing brand banner — facility render from the Petrohub identity
 * (final page of the brand guidelines) with the brand tagline and CTAs.
 */
export default function BrandBanner() {
  const { lang } = useLang();

  return (
    <section className="relative overflow-hidden" aria-label="بتروهب">
      {/* Facility background */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner-facility.jpg"
          alt={lang === "ar" ? "منشأة بتروهب" : "Petrohub facility"}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#081B45]/65" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 text-center">
        {/* Brand logo */}
        <Image
          src="/images/brand/logo-en-white.png"
          alt="Petrohub"
          width={800}
          height={116}
          className="h-12 md:h-14 w-auto mx-auto mb-8"
        />

        <h2 className="text-white font-extrabold text-3xl md:text-5xl leading-tight mb-4">
          {lang === "ar"
            ? "حلول ذكية... وطاقة تصل بثقة"
            : "Smart solutions… energy delivered with trust"}
        </h2>

        <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {lang === "ar"
            ? "شركة سعودية متخصصة في حلول الطاقة الذكية والمياه والخدمات اللوجستية — بتركيز على الابتكار والكفاءة والاستدامة."
            : "A Saudi company specializing in smart energy, water, and logistics solutions — with a focus on innovation, efficiency, and sustainability."}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <GasableButton href="/quote">
            {lang === "ar" ? "اطلب عرض سعر" : "Request a Quote"}
          </GasableButton>
          <GasableButton href="/contact">
            {lang === "ar" ? "تواصل معنا" : "Contact Us"}
          </GasableButton>
        </div>
      </div>
    </section>
  );
}
