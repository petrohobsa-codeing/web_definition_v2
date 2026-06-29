"use client";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Fuel, Droplets, Truck, Zap, ArrowLeft } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const services = [
  {
    icon: Fuel, href: "/services/diesel-supply", gradient: "from-[#1B355E] to-[#0C1B33]",
    ar: { title: "الخدمات البترولية والغاز", description: "وساطة وتوريد المنتجات البترولية: بنزين (91 و95)، ديزل، وغاز مسال للمنشآت والمشاريع والأساطيل بأسعار تنافسية من موردين معتمدين.", features: ["بنزين 91 و95", "ديزل وغاز مسال", "فواتير ضريبية"] },
    en: { title: "Petroleum & Gas Services", description: "Brokerage and supply of petroleum products: petrol (91 & 95), diesel and LPG for facilities, projects and fleets at competitive prices from certified suppliers.", features: ["Petrol 91 & 95", "Diesel & LPG", "Tax Invoices"] },
  },
  {
    icon: Droplets, href: "/services/gas-supply", gradient: "from-[#24487B] to-[#1B355E]",
    ar: { title: "الحلول البيئية والصرف", description: "تأمين صهاريج سحب مياه الصرف الصحي (البيارات) والمياه العادمة للمواقع والمنشآت والمجمعات السكنية والتجارية.", features: ["سحب البيارات", "المياه العادمة", "طوارئ 24/7"] },
    en: { title: "Environmental & Sewage Solutions", description: "Sewage and wastewater tanker services for sites, facilities, and residential or commercial complexes.", features: ["Septic Pumping", "Wastewater", "24/7 Emergency"] },
  },
  {
    icon: Truck, href: "/services/water-supply", gradient: "from-[#1B355E] to-[#3A4E8C]",
    ar: { title: "الإمداد المائي", description: "توزيع وتوريد مياه التحلية ومياه الشرب العذبة للمشاريع والمواقع الإنشائية في الرياض، مكة، المدينة، ينبع، وتبوك.", features: ["مياه تحلية", "مياه شرب عذبة", "توصيل منتظم"] },
    en: { title: "Water Supply", description: "Distribution and supply of desalinated and fresh drinking water for projects and construction sites in Riyadh, Makkah, Madinah, Yanbu and Tabuk.", features: ["Desalinated Water", "Fresh Drinking Water", "Regular Delivery"] },
  },
  {
    icon: Zap, href: "/services/generators", gradient: "from-[#1B355E] to-[#C8102E]",
    ar: { title: "الطاقة البديلة (المولدات)", description: "وساطة لتأجير المولدات الكهربائية بمختلف الأحجام والأحمال للمشاريع والفعاليات والمنشآت التي تحتاج طاقة بديلة أو احتياطية.", features: ["10 KVA – 2000 KVA", "للمشاريع والفعاليات", "تركيب وصيانة"] },
    en: { title: "Alternative Energy (Generators)", description: "Brokerage for renting electrical generators of all sizes and loads for projects, events and facilities needing alternative or backup power.", features: ["10 KVA – 2000 KVA", "Projects & Events", "Install & Maintain"] },
  },
];

const t = {
  ar: {
    badge: "خدماتنا", title: "خدماتنا اللوجستية",
    sub: "حلول لوجستية متكاملة — من المنتجات البترولية إلى المياه والطاقة.",
    sub2: "نعمل كحلقة وصل استراتيجية بين الموردين والعملاء بأسرع طريقة وأعلى كفاءة في المملكة.",
    more: "اعرف المزيد", notFound: "لا تجد ما تبحث عنه؟ تحدّث مع فريقنا",
    quote: "اطلب عرض سعر", contact: "اتصل بنا",
  },
  en: {
    badge: "Our Services", title: "Our Logistics Services",
    sub: "Integrated logistics solutions — from petroleum products to water and energy.",
    sub2: "We act as a strategic link between suppliers and customers in the fastest, most efficient way across the Kingdom.",
    more: "Learn More", notFound: "Can't find what you're looking for? Talk to our team",
    quote: "Get a Quote", contact: "Contact Us",
  },
};

export default function ServicesContent() {
  const { lang } = useLang();
  const L = t[lang];

  return (
    <>
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#C8102E]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
            {L.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">{L.title}</h1>
          <p className="text-white/70 text-xl mb-4 max-w-2xl mx-auto">{L.sub}</p>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed">{L.sub2}</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const c = lang === "ar" ? service.ar : service.en;
              return (
                <div key={service.href} className="group relative bg-white rounded-4xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-400">
                  <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
                  <div className="p-8">
                    <div className="flex items-start gap-5 mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}>
                        <service.icon size={26} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-brand-charcoal mb-1">{c.title}</h2>
                        <div className="flex flex-wrap gap-2">
                          {c.features.map((f) => (
                            <span key={f} className="text-xs font-bold text-brand-green bg-brand-green-light px-3 py-1 rounded-full">{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-brand-charcoal-light leading-relaxed mb-8">{c.description}</p>
                    <Link href={service.href} className="inline-flex items-center gap-2 text-brand-green font-black hover:gap-3 transition-all duration-200">
                      {L.more}
                      <ArrowLeft size={18} className="rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-brand-charcoal-light mb-6 text-lg">{L.notFound}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button href="/quote" size="lg">{L.quote}</Button>
              <Button href="/contact" variant="secondary" size="lg">{L.contact}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
