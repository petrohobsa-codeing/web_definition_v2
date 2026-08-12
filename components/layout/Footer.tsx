"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { getSettings } from "@/lib/db";
import type { SiteSettings } from "@/lib/types";

const t = {
  ar: {
    tagline: "ابدأ برؤية أوضح لاحتياجك التشغيلي",
    heading: "القيمة التي يحصل عليها العميل",
    paragraph:
      "سواء كان احتياجكم مرتبطًا بإمدادات الطاقة والمياه، أو بالتنسيق الميداني والمتابعة التشغيلية، أو ببناء نظام موحد للمراقبة والقياس، يعمل فريق Petrohub على فهم طبيعة عملياتكم وتقديم نطاق يناسب مواقعكم وأولوياتكم ومتطلباتكم.",
    hq: "المقر الرئيسي",
    hqValue: "الرياض - المملكة العربية السعودية",
    phoneLabel: "رقم التواصل",
    websiteLabel: "الموقع الإلكتروني",
    emailLabel: "البريد الإلكتروني",
    closing: "Petrohub — من الاحتياج إلى التنفيذ، ومن التنفيذ إلى رؤية يمكن الاعتماد عليها.",
    rights: "جميع الحقوق محفوظة.",
    admin: "لوحة التحكم",
  },
  en: {
    tagline: "Start with a clearer view of your operational need",
    heading: "The Value the Client Gets",
    paragraph:
      "Whether your need relates to energy and water supply, field coordination and operational follow-up, or building a unified monitoring and measurement system, the Petrohub team works to understand your operations and offer a scope that fits your sites, priorities and requirements.",
    hq: "Head Office",
    hqValue: "Riyadh - Kingdom of Saudi Arabia",
    phoneLabel: "Phone",
    websiteLabel: "Website",
    emailLabel: "Email",
    closing: "Petrohub — from need to execution, and from execution to a vision you can rely on.",
    rights: "All rights reserved.",
    admin: "Admin Panel",
  },
};

const defaultContact = {
  phone: "+966 55 885 5824",
  website: "www.petrohob-sa.com",
  email: "Info@petrohob-sa.com",
};

export default function Footer() {
  const { lang } = useLang();
  const L = t[lang];
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  const rows = [
    { label: L.hq, value: settings?.address || L.hqValue, icon: MapPin },
    { label: L.phoneLabel, value: settings?.phone || defaultContact.phone, icon: Phone, href: `tel:${(settings?.phone || defaultContact.phone).replace(/\s/g, "")}` },
    { label: L.websiteLabel, value: defaultContact.website, icon: Globe, href: `https://${defaultContact.website}` },
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
        <div className="max-w-xl mr-auto">
          <Link href="/" className="inline-flex items-center gap-3 mb-3" aria-label="Petrohub">
            <Image
              src="/images/brand/logo-ar-white.png"
              alt="Petrohub"
              width={140}
              height={44}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <p className="text-white/70 text-sm mb-10">{L.tagline}</p>

          <h2 className="text-h2 font-black mb-5 leading-tight">{L.heading}</h2>
          <p className="text-body text-white/75 leading-loose mb-10">{L.paragraph}</p>

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

          <p className="text-white/60 text-sm mb-12">{L.closing}</p>
        </div>

        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-white/40">
            © {new Date().getFullYear()} Petrohub — {L.rights}
          </p>
          <Link href="/admin" className="text-white/25 hover:text-white/50 transition-colors flex items-center gap-1">
            <ExternalLink size={11} />
            {L.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
