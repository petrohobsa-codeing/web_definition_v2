"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import GasableButton from "./GasableButton";

/**
 * Closing brand banner — the final page of the Petrohub brand guidelines
 * shown in full (facility render with PETROHUB | THANK YOU), followed by
 * a seamless CTA strip in the same dark tone.
 */
export default function BrandBanner() {
  const { lang } = useLang();

  return (
    <section className="bg-[#081B45]" aria-label="بتروهب">
      <Image
        src="/images/banner-facility.jpg"
        alt={
          lang === "ar"
            ? "بتروهب — منشأة الشركة | شكراً لكم"
            : "Petrohub facility | Thank You"
        }
        width={2000}
        height={1125}
        sizes="100vw"
        className="w-full h-auto"
      />

      <div className="max-w-[1200px] mx-auto px-6 py-10 text-center">
        <p className="text-white/80 text-lg md:text-xl mb-6">
          {lang === "ar"
            ? "حلول ذكية... وطاقة تصل بثقة"
            : "Smart solutions… energy delivered with trust"}
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
