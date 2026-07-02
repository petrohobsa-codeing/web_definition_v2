"use client";
import { useLang } from "@/context/LanguageContext";
import { MapPin } from "lucide-react";

const cities = [
  { ar: "الرياض", en: "Riyadh" },
  { ar: "مكة المكرمة", en: "Makkah" },
  { ar: "المدينة المنورة", en: "Madinah" },
  { ar: "ينبع", en: "Yanbu" },
  { ar: "تبوك", en: "Tabuk" },
];

export default function CoverageRegions() {
  const { lang } = useLang();
  return (
    <section className="bg-[#EAEEF5] py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="font-bold text-4xl md:text-[45px] mb-4">
          <span className="text-brand-green">{lang === "ar" ? "مناطق" : "Our"}</span>{" "}
          <span className="text-[#C8102E]">{lang === "ar" ? "التغطية" : "Coverage"}</span>
        </h2>
        <p className="text-[#54595F] max-w-xl mx-auto mb-12">
          {lang === "ar"
            ? "نغطّي شبكة واسعة من المدن والمناطق الحيوية في المملكة لخدمة عملائنا أينما كانوا."
            : "We cover a wide network of vital cities and regions across the Kingdom to serve our customers wherever they are."}
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          {cities.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl px-8 py-6 shadow-sm flex flex-col items-center min-w-[160px] hover:shadow-md transition-shadow"
            >
              <div className="hover-grow mb-3">
                <MapPin size={36} stroke="url(#fl-grad)" strokeWidth={1.5} />
              </div>
              <p className="text-brand-green-dark font-bold text-lg">
                {lang === "ar" ? c.ar : c.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
