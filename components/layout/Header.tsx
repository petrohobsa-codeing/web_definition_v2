"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Fuel } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteImages } from "@/lib/images";

const services = [
  { label: "جميع الخدمات ←", href: "/services" },
  { label: "تزويد الديزل", href: "/services/diesel-supply" },
  { label: "تزويد البترول", href: "/services/gas-supply" },
];

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الخدمات", href: "/services", dropdown: services },
  { label: "من نحن", href: "/about" },
  { label: "اتصل بنا", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

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
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="فاست لينك - الصفحة الرئيسية"
            >
              {siteImages.logo ? (
                <Image
                  src={siteImages.logo}
                  alt="Fast Link"
                  width={140}
                  height={44}
                  className="h-11 w-auto object-contain"
                  priority
                />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center group-hover:bg-brand-green-mid transition-colors duration-300 shadow-lg shadow-brand-green/20">
                    <Fuel size={20} className="text-white" />
                  </div>
                  <div>
                    <span
                      className={`text-2xl font-black tracking-tight transition-colors duration-300 ${
                        scrolled ? "text-brand-green-dark" : "text-white"
                      }`}
                    >
                      Fast Link
                    </span>
                    <span
                      className={`block text-xs font-medium leading-none transition-colors duration-300 ${
                        scrolled ? "text-brand-charcoal-light" : "text-white/70"
                      }`}
                    >
                      فاست لينك للطاقة
                    </span>
                  </div>
                </>
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
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {dropdownOpen && (
                      <div
                        className="absolute top-full right-0 mt-2 w-52 glass rounded-2xl shadow-2xl shadow-brand-green/10 border border-brand-green/10 overflow-hidden py-2"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-5 py-3 text-sm font-medium text-brand-charcoal hover:text-brand-green hover:bg-brand-green-light/60 transition-colors duration-200"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                      isActive(link.href)
                        ? "text-brand-green bg-brand-green-light"
                        : scrolled
                        ? "text-brand-charcoal hover:text-brand-green hover:bg-brand-green-light"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                className={`text-sm font-bold transition-colors duration-300 ${
                  scrolled ? "text-brand-charcoal-light hover:text-brand-charcoal" : "text-white/70 hover:text-white"
                }`}
              >
                English
              </button>
              <Button href="/quote" size="sm">
                اطلب عرض سعر
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-colors duration-300 ${
                scrolled ? "text-brand-charcoal" : "text-white"
              }`}
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
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-brand-charcoal/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <nav
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="القائمة المتنقلة"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-9 h-9 rounded-xl bg-brand-green flex items-center justify-center">
                <Fuel size={18} className="text-white" />
              </div>
              <span className="text-xl font-black text-brand-green-dark">
                Fast Link
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-xl text-brand-charcoal-light hover:bg-gray-100"
              aria-label="إغلاق القائمة"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <Link
              href="/"
              className={`flex items-center px-4 py-3 rounded-xl font-bold mb-1 ${
                pathname === "/"
                  ? "text-brand-green bg-brand-green-light"
                  : "text-brand-charcoal hover:bg-gray-50"
              }`}
            >
              الرئيسية
            </Link>

            <div>
              <Link
                href="/services"
                className={`flex items-center px-4 py-3 rounded-xl font-bold mb-1 ${
                  isActive("/services")
                    ? "text-brand-green bg-brand-green-light"
                    : "text-brand-charcoal hover:bg-gray-50"
                }`}
              >
                الخدمات
              </Link>
              <div className="mr-4 border-r-2 border-brand-green-pale pr-4 mb-2">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-brand-charcoal-mid hover:text-brand-green hover:bg-brand-green-light mb-0.5"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              className={`flex items-center px-4 py-3 rounded-xl font-bold mb-1 ${
                isActive("/about")
                  ? "text-brand-green bg-brand-green-light"
                  : "text-brand-charcoal hover:bg-gray-50"
              }`}
            >
              من نحن
            </Link>
            <Link
              href="/contact"
              className={`flex items-center px-4 py-3 rounded-xl font-bold mb-1 ${
                isActive("/contact")
                  ? "text-brand-green bg-brand-green-light"
                  : "text-brand-charcoal hover:bg-gray-50"
              }`}
            >
              اتصل بنا
            </Link>
          </div>

          {/* Drawer footer */}
          <div className="p-6 border-t border-gray-100 space-y-3">
            <Button href="/quote" className="w-full justify-center">
              اطلب عرض سعر
            </Button>
            <button className="w-full text-center text-sm font-bold text-brand-charcoal-light hover:text-brand-charcoal py-2">
              English
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
