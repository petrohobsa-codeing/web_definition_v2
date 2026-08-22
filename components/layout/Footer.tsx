"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { getSettings, getFooterContent } from "@/lib/db";
import { defaultFooterContent } from "@/lib/store";
import type { SiteSettings, FooterContent } from "@/lib/types";
import Logo from "@/components/ui/Logo";

const staticLabels = {
  ar: {
    hq: "المقر الرئيسي",
    hqValue: "الرياض - المملكة العربية السعودية",
    phoneLabel: "رقم التواصل",
    websiteLabel: "الموقع الإلكتروني",
    emailLabel: "البريد الإلكتروني",
    rights: "جميع الحقوق محفوظة.",
  },
  en: {
    hq: "Head Office",
    hqValue: "Riyadh - Kingdom of Saudi Arabia",
    phoneLabel: "Phone",
    websiteLabel: "Website",
    emailLabel: "Email",
    rights: "All rights reserved.",
  },
};

const defaultContact = {
  phone: "+966 55 885 5824",
  website: "petrohub.com.sa",
  email: "Info@petrohub.com.sa",
};

export default function Footer() {
  const { lang } = useLang();
  const L = staticLabels[lang];
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [footer, setFooter] = useState<FooterContent>(defaultFooterContent);
  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
    getFooterContent().then(setFooter).catch(() => {});
  }, []);

  const pick = (ar: string, en?: string) => (lang === "en" ? en || ar : ar);
  const tagline = pick(footer.tagline, footer.taglineEn);
  const heading = pick(footer.heading, footer.headingEn);
  const paragraph = pick(footer.paragraph, footer.paragraphEn);
  const closing = pick(footer.closing, footer.closingEn);

  const hqValue = lang === "en" ? L.hqValue : (settings?.address || L.hqValue);

  const rows = [
    { label: L.hq, value: hqValue, icon: MapPin },
    { label: L.phoneLabel, value: settings?.phone || defaultContact.phone, icon: Phone, href: `tel:${(settings?.phone || defaultContact.phone).replace(/\s/g, "")}` },
    { label: L.websiteLabel, value: settings?.website || defaultContact.website, icon: Globe, href: `https://${settings?.website || defaultContact.website}` },
    { label: L.emailLabel, value: settings?.email || defaultContact.email, icon: Mail, href: `mailto:${settings?.email || defaultContact.email}` },
  ];

  return (
    <footer className="relative overflow-hidden text-white" role="contentinfo">
      <div className="absolute inset-0">
        <Image
          src="/images/about/riyadh-skyline.jpg"
          alt="Riyadh"
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, #1A2047 15%, rgba(8,27,69,0.75) 45%, rgba(8,27,69,0.25) 75%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        <div className="max-w-xl me-auto">
          <Link href="/" className="inline-flex items-center gap-3 mb-3" aria-label="Petrohub">
            <Logo variant="light" lang={lang} />
          </Link>
          <p className="text-white/70 text-sm mb-10">{tagline}</p>

          <h2 className="text-h2 font-black mb-5 leading-tight">{heading}</h2>
          <p className="text-body text-white/75 leading-loose mb-10">{paragraph}</p>

          <div className="divide-y divide-white/15 border-t border-b border-white/15 mb-10">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-4 py-3.5">
                <span className="text-white/60 text-sm font-medium flex items-center gap-2">
                  <r.icon size={15} className="flex-shrink-0" />
                  {r.label}
                </span>
                {r.href ? (
                  <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-white font-bold text-sm hover:text-[#3BBA9F] transition-colors" dir="ltr">
                    {r.value}
                  </a>
                ) : (
                  <span className="text-white font-bold text-sm">{r.value}</span>
                )}
              </div>
            ))}
          </div>

          <p className="text-white/60 text-sm mb-12">{closing}</p>
        </div>

        <div className="pt-6 border-t border-white/15 text-center text-xs">
          <p className="text-white/40">
            © {new Date().getFullYear()} Petrohub — {L.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
