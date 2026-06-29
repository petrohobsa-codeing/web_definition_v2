"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteImages } from "@/lib/images";
import { useLang } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

const serviceLinks = [
  { ar: "جميع الخدمات ←", en: "All Services →", href: "/services" },
  { ar: "الخدمات البترولية والغاز", en: "Petroleum & Gas", href: "/services/diesel-supply" },
  { ar: "الحلول البيئية والصرف", en: "Environmental & Sewage", href: "/services/gas-supply" },
  { ar: "الإمداد المائي", en: "Water Supply", href: "/services/water-supply" },
  { ar: "الطاقة البديلة (مولدات)", en: "Generators", href: "/services/generators" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { lang, toggle } = useLang();
  const tr = t[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinks = [
    { label: tr.nav.home, href: "/" },
    { label: tr.nav.services, href: "/services", dropdown: true },
    { label: tr.nav.projects, href: "/projects" },
    { label: tr.nav.news, href: "/news" },
    { label: tr.nav.about, href: "/about" },
    { label: tr.nav.contact, href: "/contact" },
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
            <Link href="/" className="flex items-center gap-3 group" aria-label="بتروهوب">
              {siteImages.logo ? (
                <Image src={siteImages.logo} alt="PetroHop" width={140} height={44}
                  className="h-11 w-auto object-contain" priority />
              ) : (
                <div>
                  <span className="text-3xl font-extrabold tracking-tight">
                    <span className="text-brand-green">Petro</span>
                    <span className={scrolled ? "text-brand-green-dark" : "text-white"}>Hop</span>
                  </span>
                  <span className={`block text-[11px] font-medium leading-none transition-colors duration-300 ${scrolled ? "text-brand-green-dark/80" : "text-white/80"}`}>
                    {lang === "ar" ? "للخدمات اللوجستية والبترولية" : "Logistics & Petroleum Services"}
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="القائمة الرئيسية">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.href} className="relative">
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                        isActive(link.href)
                          ? "text-brand-green bg-brand-green-light"
                          : scrolled
                          ? "text-brand-charcoal hover:text-brand-green hover:bg-brand-green-light"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen && (
                      <div
                        className="absolute top-full right-0 mt-2 w-56 glass rounded-2xl shadow-2xl shadow-brand-green/10 border border-brand-green/10 overflow-hidden py-2"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        {serviceLinks.map((item) => (
                          <Link key={item.href} href={item.href}
                            className="block px-5 py-3 text-sm font-medium text-brand-charcoal hover:text-brand-green hover:bg-brand-green-light/60 transition-colors duration-200">
                            {lang === "ar" ? item.ar : item.en}
                          </Link>
                        ))}
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
              <Button href="/quote" size="sm">{tr.nav.quote}</Button>
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
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileOpen ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-brand-charcoal/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <nav
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          aria-label="القائمة المتنقلة"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-brand-green">Petro</span>
                <span className="text-brand-green-dark">Hop</span>
              </span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl text-brand-charcoal-light hover:bg-gray-100" aria-label="إغلاق القائمة">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.href}>
                  <Link href={link.href}
                    className={`flex items-center px-4 py-3 rounded-xl font-bold mb-1 ${isActive(link.href) ? "text-brand-green bg-brand-green-light" : "text-brand-charcoal hover:bg-gray-50"}`}>
                    {link.label}
                  </Link>
                  <div className="mr-4 border-r-2 border-brand-green-pale pr-4 mb-2">
                    {serviceLinks.map((s) => (
                      <Link key={s.href} href={s.href}
                        className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-brand-charcoal-mid hover:text-brand-green hover:bg-brand-green-light mb-0.5">
                        {lang === "ar" ? s.ar : s.en}
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
            <Button href="/quote" className="w-full justify-center">{tr.nav.quote}</Button>
            <button onClick={toggle} className="w-full text-center text-sm font-bold text-brand-charcoal-light hover:text-brand-charcoal py-2 border border-gray-200 rounded-xl">
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
