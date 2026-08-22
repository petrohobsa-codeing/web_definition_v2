"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import ContactForm from "@/components/sections/ContactForm";
import { ChevronLeft, Phone, Mail, MapPin, Globe } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import type { SiteSettings, SocialLinks } from "@/lib/types";
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
    send: "أرسل رسالة", socialTitle: "تابعنا على السوشل ميديا",
    hqLabel: "المقر الرئيسي", hqValue: "الرياض - المملكة العربية السعودية",
    phoneLabel: "رقم التواصل", websiteLabel: "الموقع الإلكتروني", emailLabel: "البريد الإلكتروني",
  },
  en: {
    home: "Home", contact: "Contact", badge: "Get in touch",
    heroDesc: "Our team is ready to answer your inquiries during working hours.",
    info: "Contact Information", citiesTitle: "Cities We Serve",
    citiesNote: "These regions are our current coverage area — contact us for any inquiry about other regions.",
    send: "Send a Message", socialTitle: "Follow Us",
    hqLabel: "Head Office", hqValue: "Riyadh - Kingdom of Saudi Arabia",
    phoneLabel: "Phone", websiteLabel: "Website", emailLabel: "Email",
  },
};

const socialMeta: { key: keyof SocialLinks; label: string; color: string; icon: React.ReactNode }[] = [
  {
    key: "instagram",
    label: "Instagram",
    color: "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    key: "twitter",
    label: "X",
    color: "bg-black",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    color: "bg-[#0A66C2]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "facebook",
    label: "Facebook",
    color: "bg-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    color: "bg-[#FF0000]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: "tiktok",
    label: "TikTok",
    color: "bg-black",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    key: "snapchat",
    label: "Snapchat",
    color: "bg-[#FFFC00]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#000]">
        <path d="M12.065.026C9.396.026 6.583 1.37 5.005 3.763c-.957 1.493-1.073 3.267-.88 4.986-.403.218-.826.307-1.258.307-.412 0-.825-.118-1.202-.282-.094-.043-.188-.064-.274-.064-.35 0-.607.247-.607.553 0 .36.3.615.657.721.832.25 1.767.317 2.465.818.094.064.133.154.14.247-.036.336-.346.522-.656.522-.188 0-.389-.065-.54-.065-.207 0-.377.08-.377.263 0 .218.226.337.495.432.905.327 1.72.63 2.222 1.49.036.065.057.12.057.173 0 .058-.028.124-.093.177-1.258 1.01-2.892 1.1-4.298 1.814-.282.14-.545.347-.545.677 0 .33.226.6.54.6.132 0 .263-.032.395-.032.395 0 .807.065 1.2.218.28.108.545.282.553.59.008.305-.226.59-.534.77-1.018.58-2.524.905-4.373 1.1-.188.025-.356.182-.356.388 0 .075.025.16.064.24.637 1.295 2.023 1.587 3.337 1.753.31.04.6.21.73.51.154.364.258.77.674.77.152 0 .318-.05.502-.1.497-.137 1.032-.308 1.758-.308.405 0 .838.054 1.3.173.73.188 1.284.59 2.064.59.735 0 1.33-.395 2.05-.58.461-.118.894-.172 1.3-.172.726 0 1.26.17 1.757.308.185.05.351.1.503.1.416 0 .52-.406.674-.77.13-.3.42-.47.73-.51 1.314-.166 2.7-.458 3.337-1.753.04-.08.064-.165.064-.24 0-.206-.168-.363-.356-.388-1.849-.195-3.355-.52-4.373-1.1-.308-.18-.542-.465-.534-.77.008-.308.273-.482.553-.59.393-.153.805-.218 1.2-.218.132 0 .263.032.395.032.314 0 .54-.27.54-.6 0-.33-.263-.537-.545-.677-1.406-.714-3.04-.804-4.298-1.814a.285.285 0 01-.093-.177c0-.053.021-.108.057-.173.502-.86 1.317-1.163 2.222-1.49.27-.095.495-.214.495-.432 0-.183-.17-.263-.377-.263-.15 0-.352.065-.54.065-.31 0-.62-.186-.656-.522.007-.093.046-.183.14-.247.698-.501 1.633-.568 2.465-.818.357-.106.657-.36.657-.721 0-.306-.257-.553-.607-.553-.086 0-.18.021-.274.064-.377.164-.79.282-1.202.282-.432 0-.855-.089-1.258-.307.193-1.719.077-3.493-.88-4.986C17.482 1.37 14.669.026 12 .026h.065z" />
      </svg>
    ),
  },
];

export default function ContactContent() {
  const { lang } = useLang();
  const L = t[lang];
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  useEffect(() => {
    fetch("/api/public/contact")
      .then((r) => r.json())
      .then((s) => setSettings(s as SiteSettings))
      .catch(() => {});
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

  const activeSocials = socialMeta.filter((s) => settings?.socialLinks?.[s.key]);

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

              {activeSocials.length > 0 && (
                <div className="bg-white rounded-3xl p-7 border border-gray-100">
                  <h3 className="text-h4 font-black text-brand-charcoal mb-5">{L.socialTitle}</h3>
                  <div className="flex flex-wrap gap-3">
                    {activeSocials.map((s) => (
                      <a
                        key={s.key}
                        href={settings!.socialLinks![s.key]!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-white font-bold text-sm ${s.color} hover:opacity-90 transition-opacity shadow-sm`}
                      >
                        {s.icon}
                        <span>{s.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

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
