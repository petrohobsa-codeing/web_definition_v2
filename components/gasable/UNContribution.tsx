"use client";
import { useLang } from "@/context/LanguageContext";
import { Award } from "lucide-react";

export default function UNContribution() {
  const { lang } = useLang();
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        <h2 className="font-bold text-3xl md:text-[40px] text-brand-charcoal-mid mb-5 leading-tight">
          {lang === "ar"
            ? "مساهمة Gasable في بيئة مستدامة"
            : "Gasable's Contribution to a Sustainable Environment"}
        </h2>
        <p className="text-[#54595F] leading-7 max-w-2xl mx-auto mb-10">
          {lang === "ar"
            ? "في عام 2019، تم تكريم Gasable من قبل برنامج الأمم المتحدة للبيئة لمساهماتها الاستثنائية في حماية البيئة."
            : "In 2019, Gasable was recognized by the United Nations Environment Program for its exceptional contributions to environmental protection."}
        </p>

        {/* Certificate placeholder */}
        <div className="max-w-xl mx-auto bg-[#F0FAF5] border border-gray-200 rounded-xl p-10 shadow-sm relative">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-brand-green-dark flex items-center justify-center">
              <Award size={36} className="text-brand-green-dark" />
            </div>
          </div>
          <p className="text-brand-charcoal-mid font-bold mb-1">
            United Nations Environment Programme
          </p>
          <p className="text-[#54595F] text-sm mb-6">Amman, Jordan</p>
          <div className="text-start text-[#54595F] text-sm leading-6 border-t border-gray-200 pt-6">
            <p className="italic mb-4">
              {lang === "ar"
                ? "« تقديراً لمساهماتها المتميّزة في حماية البيئة. »"
                : "“In recognition of its exceptional contributions to environmental protection.”"}
            </p>
            <p className="font-bold text-brand-charcoal-mid">Sami Dimassi</p>
            <p className="text-xs">
              Director and Regional Representative, United Nations Environment, West Asia Office
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
