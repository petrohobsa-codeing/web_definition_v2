import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ContactForm from "@/components/sections/ContactForm";
import { ChevronLeft, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "اتصل بنا — Fast Link",
  description:
    "تواصل مع شركة فاست لينك للخدمات اللوجستية والبترولية. نغطي الرياض ومكة المكرمة والمدينة المنورة وينبع وتبوك. فريقنا جاهز للرد على طلباتك.",
};

const contactInfo = [
  {
    icon: Phone,
    label: "الرقم الموحّد",
    value: "+966500000000",
    href: "tel:+966500000000",
    color: "bg-brand-green",
  },
  {
    icon: MessageCircle,
    label: "واتساب للأعمال",
    value: "+966500000000",
    href: "https://wa.me/966500000000",
    color: "bg-[#25D366]",
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "info@fastlink.sa",
    href: "mailto:info@fastlink.sa",
    color: "bg-blue-500",
  },
  {
    icon: Clock,
    label: "ساعات العمل",
    value: "الأحد – الخميس، 8 ص – 6 م",
    href: undefined,
    color: "bg-brand-gold",
  },
  {
    icon: MapPin,
    label: "العنوان",
    value: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
    href: undefined,
    color: "bg-purple-500",
  },
];

const cities = ["الرياض", "مكة المكرمة", "المدينة المنورة", "ينبع", "تبوك"];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft size={14} className="rotate-180" />
            <span className="text-white font-medium">اتصل بنا</span>
          </nav>
          <div className="max-w-2xl">
            <Badge
              variant="gold"
              className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30"
            >
              تواصل معنا
            </Badge>
            <h1 className="text-5xl font-black text-white mb-4">اتصل بنا</h1>
            <p className="text-white/70 text-lg leading-relaxed">
              فريقنا جاهز للرد على استفساراتك خلال ساعات العمل.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-brand-charcoal mb-6">
                  معلومات التواصل
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div
                      key={info.label}
                      className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-brand-green/20 hover:shadow-md transition-all duration-200"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <info.icon size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-brand-charcoal-light text-xs font-medium mb-0.5">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-brand-charcoal font-bold hover:text-brand-green transition-colors"
                            target={
                              info.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              info.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-brand-charcoal font-bold">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cities served */}
              <div className="bg-white rounded-3xl p-7 border border-gray-100">
                <h3 className="font-black text-brand-charcoal mb-4">
                  المدن التي نخدمها
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cities.map((city) => (
                    <span
                      key={city}
                      className="px-5 py-2.5 bg-brand-green-light text-brand-green rounded-full font-bold text-sm border border-brand-green/20"
                    >
                      {city}
                    </span>
                  ))}
                </div>
                <p className="text-brand-charcoal-light text-sm mt-4">
                  هذه المناطق هي نطاق التغطية الحالي — تواصل معنا لأي استفسار عن مناطق أخرى.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-4xl p-8 shadow-xl shadow-brand-green/5 border border-gray-100">
              <h2 className="text-2xl font-black text-brand-charcoal mb-7">
                أرسل رسالة
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
