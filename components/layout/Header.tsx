"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { siteImages } from "@/lib/images";
import { useLang } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import { tr } from "@/lib/i18n";
import { getServices } from "@/lib/db";
import { useAutoTranslate } from "@/lib/useAutoTranslate";
import type { ServiceItem } from "@/lib/types";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const pathname = usePathname();
  const { lang, toggle } = useLang();
  const tr_ = t[lang];
  const at = useAutoTranslate(services.flatMap((s) => [s.title]));

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const serviceLinks = [
    ...services.slice(0, 4).map((s) => ({ label: at(tr(lang, s.title, s.titleEn)), href: s.href })),
    { label: lang === "ar" ? "أخرى ←" : "Others →", href: "/services" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinks = [
    { label: tr_.nav.home, href: "/" },
    { label: tr_.nav.services, href: "/services", dropdown: true },
    { label: tr_.nav.projects, href: "/projects" },
    { label: tr_.nav.news, href: "/news" },
    { label: tr_.nav.activities, href: "/activities" },
    { label: tr_.nav.about, href: "/about" },
    { label: tr_.nav.contact, href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-lg shadow-brand-green/5 border-b border-brand-green/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="بتروهب">
              {siteImages.logo ? (
                <Image src={siteImages.logo} alt="Petrohub" width={140} height={44}
                  className="h-11 w-auto object-contain" priority />
              ) : (
                <Logo variant={scrolled ? "dark" : "light"} tagline lang={lang} />
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="القائمة الرئيسية">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                        isActive(link.href)
                          ? "text-brand-green bg-brand-green-light"
                          : scrolled
                          ? "text-brand-charcoal hover:text-brand-green hover:bg-brand-green-light"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full right-0 pt-2 w-56">
                        <div className="glass rounded-2xl shadow-2xl shadow-brand-green/10 border border-brand-green/10 overflow-hidden py-2">
                          {serviceLinks.map((item) => (
                            <Link key={item.href} href={item.href}
                              className="block px-5 py-3 text-sm font-medium text-brand-charcoal hover:text-brand-green hover:bg-brand-green-light/60 transition-colors duration-200">
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.href} href={link.href}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                      isActive(link.href)
                        ? "text-brand-green bg-brand-green-light"
                        : scrolled
                        ? "text-brand-charcoal hover:text-brand-green hover:bg-brand-green-light"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}>
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggle}
                className={`text-sm font-bold transition-colors duration-300 border px-3 py-1 rounded-lg ${
                  scrolled
                    ? "text-brand-charcoal-light border-gray-200 hover:text-brand-green hover:border-brand-green"
                    : "text-white/70 border-white/20 hover:text-white hover:border-white"
                }`}
              >
                {lang === "ar" ? "EN" : "عربي"}
              </button>
              <Button href="/quote" size="sm">{tr_.nav.quote}</Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-colors duration-300 ${scrolled ? "text-brand-charcoal" : "text-white"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-brand-charcoal/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              aria-label="القائمة المتنقلة"
            >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <Logo variant="dark" lang={lang} />
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl text-brand-charcoal-light hover:bg-gray-100" aria-label="إغلاق القائمة">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.href}>
                  <button
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold mb-1 ${isActive(link.href) ? "text-brand-green bg-brand-green-light" : "text-brand-charcoal hover:bg-gray-50"}`}
                    aria-expanded={mobileServicesOpen}
                  >
                    {link.label}
                    <ChevronDown size={16} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className={`mr-4 border-r-2 border-brand-green-pale pr-4 overflow-hidden transition-all duration-300 ${mobileServicesOpen ? "max-h-96 opacity-100 mb-2" : "max-h-0 opacity-0"}`}
                  >
                    {serviceLinks.map((s) => (
                      <Link key={s.href} href={s.href}
                        className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-brand-charcoal-mid hover:text-brand-green hover:bg-brand-green-light mb-0.5">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href}
                  className={`flex items-center px-4 py-3 rounded-xl font-bold mb-1 ${isActive(link.href) ? "text-brand-green bg-brand-green-light" : "text-brand-charcoal hover:bg-gray-50"}`}>
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="p-6 border-t border-gray-100 space-y-3">
            <Button href="/quote" className="w-full justify-center">{tr_.nav.quote}</Button>
            <button onClick={toggle} className="w-full text-center text-sm font-bold text-brand-charcoal-light hover:text-brand-charcoal py-2 border border-gray-200 rounded-xl">
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
