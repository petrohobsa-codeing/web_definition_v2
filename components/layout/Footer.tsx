import Link from "next/link";
import { Fuel, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الخدمات", href: "/services" },
  { label: "من نحن", href: "/about" },
  { label: "اتصل بنا", href: "/contact" },
  { label: "اطلب عرض سعر", href: "/quote" },
];

const serviceLinks = [
  { label: "تزويد الديزل", href: "/services/diesel-supply" },
  { label: "تزويد الغاز", href: "/services/gas-supply" },
  { label: "حساسات ذكية", href: "/services/smart-sensors" },
  { label: "المراقبة عن بُعد", href: "/services/remote-monitoring" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-green-dark text-white" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 mb-4"
              aria-label="بترونير"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-green flex items-center justify-center">
                <Fuel size={22} className="text-white" />
              </div>
              <span className="text-2xl font-black">بترونير</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              وقودك لا ينفد بعد اليوم
            </p>
            <p className="text-white/50 text-xs leading-relaxed">
              المنظومة الرائدة في السعودية لإدارة الطاقة الصناعية المدعومة
              بإنترنت الأشياء.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-brand-gold mb-5">
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-brand-gold mb-5">
              خدماتنا
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-brand-gold mb-5">
              تواصل معنا
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@petronear.sa"
                  className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors duration-200"
                  aria-label="البريد الإلكتروني"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={14} />
                  </div>
                  info@petronear.sa
                </a>
              </li>
              <li>
                <a
                  href="tel:+966500000000"
                  className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors duration-200"
                  aria-label="رقم الهاتف"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} />
                  </div>
                  +966500000000
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/70 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} />
                  </div>
                  <span>طريق الملك فهد، الرياض، المملكة العربية السعودية</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-sm">
            © 2024 بترونير. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-1 text-white/30 text-xs">
            <span>مرخّص ومعتمد في المملكة العربية السعودية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
