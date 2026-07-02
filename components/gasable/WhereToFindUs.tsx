"use client";
import { useLang } from "@/context/LanguageContext";
import { MessageCircle, Phone } from "lucide-react";

export default function WhereToFindUs() {
  const { lang } = useLang();
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm min-h-[360px]">
            <iframe
              title="Riyadh location"
              src="https://www.google.com/maps?q=Al+Masif,+Riyadh,+Saudi+Arabia&output=embed"
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[28px] font-bold text-brand-green mb-6">
              {lang === "ar" ? "أين تجدنا؟" : "Where to find us?"}
            </h2>
            <p className="text-brand-charcoal-mid font-bold text-lg mb-1">
              {lang === "ar" ? "الرياض - المملكة العربية السعودية" : "Riyadh - Saudi Arabia"}
            </p>
            <p className="text-[#54595F] mb-6">
              {lang === "ar"
                ? "طريق أبو بكر الصديق – المعذر"
                : "Abu Bakr Al Siddiq Road – Al Masif"}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4F6FA] flex items-center justify-center">
                  <MessageCircle size={18} className="text-brand-green" />
                </div>
                <div>
                  <p className="text-[#54595F] text-sm">{lang === "ar" ? "واتساب" : "WhatsApp"}</p>
                  <a href="tel:+966112160308" className="text-brand-charcoal-mid font-bold" dir="ltr">
                    +966 11 2160308
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4F6FA] flex items-center justify-center">
                  <Phone size={18} className="text-brand-green-dark" />
                </div>
                <div>
                  <p className="text-[#54595F] text-sm">
                    {lang === "ar" ? "الرقم الموحّد" : "Unified number"}
                  </p>
                  <a href="tel:920005469" className="text-brand-charcoal-mid font-bold" dir="ltr">
                    920005469
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
