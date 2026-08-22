"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import ContactForm from "@/components/sections/ContactForm";
import { ChevronLeft, Phone, Mail, MapPin, Globe } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { getSettings } from "@/lib/db";
import type { SiteSettings } from "@/lib/types";
import { useAutoTranslate } from "@/lib/useAutoTranslate";

const defaultContact = {
  phone: "+966 55 885 5824",
  website: "petrohub.com.sa",
  email: "Info@petrohub.com.sa",
};

const cities = [
  { ar: "الرياض", en: "Riyadh" },
  { ar: "مكة المكرمة", en: "Makkah" },
  { ar: "المدينة المنورة", en: "Madinah" },
  { ar: "ينبع", en: "Yanbu" },
  { ar: "تبوك", en: "Tabuk" },
];

const t = {
  ar: {
    home: "الرئيسية", contact: "اتصل بنا", badge: "تواصل معنا",
    heroDesc: "فريقنا جاهز للرد على استفساراتك خلال ساعات العمل.",
    info: "معلومات التواصل", citiesTitle: "المدن التي نخدمها",
    citiesNote: "هذه المناطق هي نطاق التغطية الحالي — تواصل معنا لأي استفسار عن مناطق أخرى.",
    send: "أرسل رسالة",
    hqLabel: "المقر الرئيسي", hqValue: "الرياض - المملكة العربية السعودية",
    phoneLabel: "رقم التواصل", websiteLabel: "الموقع الإلكتروني", emailLabel: "البريد الإلكتروني",
  },
  en: {
    home: "Home", contact: "Contact", badge: "Get in touch",
    heroDesc: "Our team is ready to answer your inquiries during working hours.",
    info: "Contact Information", citiesTitle: "Cities We Serve",
    citiesNote: "These regions are our current coverage area — contact us for any inquiry about other regions.",
    send: "Send a Message",
    hqLabel: "Head Office", hqValue: "Riyadh - Kingdom of Saudi Arabia",
    phoneLabel: "Phone", websiteLabel: "Website", emailLabel: "Email",
  },
};

export default function ContactContent() {
  const { lang } = useLang();
  const L = t[lang];
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  const at = useAutoTranslate([settings?.address]);
  const hqValue = lang === "en"
    ? (at(settings?.address) || L.hqValue)
    : (settings?.address || L.hqValue);

  const contactInfo = [
    { icon: MapPin, label: L.hqLabel, value: hqValue, href: undefined, color: "bg-[#24487B]" },
    { icon: Phone, label: L.phoneLabel, value: settings?.phone || defaultContact.phone, href: `tel:${(settings?.phone || defaultContact.phone).replace(/\s/g, "")}`, color: "bg-brand-green" },
    { icon: Globe, label: L.websiteLabel, value: settings?.website || defaultContact.website, href: `https://${settings?.website || defaultContact.website}`, color: "bg-[#3BBA9F]" },
    { icon: Mail, label: L.emailLabel, value: settings?.email || defaultContact.email, href: `mailto:${settings?.email || defaultContact.email}`, color: "bg-[#252C5D]" },
  ];

  return (
    <>
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#3BBA9F]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">{L.home}</Link>
            <ChevronLeft size={14} className="rtl:rotate-180" />
            <span className="text-white font-medium">{L.contact}</span>
          </nav>
          <div className="max-w-2xl">
            <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
              {L.badge}
            </Badge>
            <h1 className="text-display font-black text-white mb-4">{L.contact}</h1>
            <p className="text-body-lg text-white/70 leading-relaxed">{L.heroDesc}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-h2 font-black text-brand-charcoal mb-6">{L.info}</h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => {
                    return (
                      <div key={info.label} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-brand-green/20 hover:shadow-md transition-all duration-200">
                        <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0`}>
                          <info.icon size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-brand-charcoal-light text-xs font-medium mb-0.5">{info.label}</p>
                          {info.href ? (
                            <a href={info.href} className="text-brand-charcoal font-bold hover:text-brand-green transition-colors" dir="ltr"
                              target={info.href.startsWith("http") ? "_blank" : undefined}
                              rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-brand-charcoal font-bold">{info.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-gray-100">
                <h3 className="text-h4 font-black text-brand-charcoal mb-4">{L.citiesTitle}</h3>
                <div className="flex flex-wrap gap-3">
                  {cities.map((city) => (
                    <span key={city.en} className="px-5 py-2.5 bg-brand-green-light text-brand-green rounded-full font-bold text-sm border border-brand-green/20">
                      {lang === "ar" ? city.ar : city.en}
                    </span>
                  ))}
                </div>
                <p className="text-brand-charcoal-light text-sm mt-4">{L.citiesNote}</p>
              </div>
            </div>

            <div className="bg-white rounded-4xl p-8 shadow-xl shadow-brand-green/5 border border-gray-100">
              <h2 className="text-h2 font-black text-brand-charcoal mb-7">{L.send}</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
