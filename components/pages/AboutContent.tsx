"use client";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ChevronLeft, Target, Eye, Heart } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const stats = [
  { value: "4", ar: "خدمات لوجستية متكاملة", en: "Integrated Logistics Services" },
  { value: "5+", ar: "مناطق تغطية في المملكة", en: "Coverage Regions" },
  { value: "24/7", ar: "متاحون للطلبات الطارئة", en: "Available for Urgent Orders" },
  { value: "100%", ar: "التزام بالمواعيد والجودة", en: "Commitment to Quality" },
];

const values = [
  {
    icon: Heart, color: "from-[#C8102E] to-[#A00C24]",
    ar: { title: "الموثوقية", description: "نلتزم بمواعيد التسليم وجودة المنتجات لأن ثقة عملائنا هي رأس مالنا الأول." },
    en: { title: "Reliability", description: "We honor delivery times and product quality because our customers' trust is our greatest asset." },
  },
  {
    icon: Target, color: "from-[#1B355E] to-[#0C1B33]",
    ar: { title: "السرعة والكفاءة", description: "نربط الموردين بالعملاء بأسرع الطرق وأعلى كفاءة لضمان استمرارية العمليات." },
    en: { title: "Speed & Efficiency", description: "We connect suppliers with customers in the fastest, most efficient way to keep operations running." },
  },
  {
    icon: Eye, color: "from-[#24487B] to-[#1B355E]",
    ar: { title: "الشفافية", description: "نتعامل بوضوح تام في الأسعار والمواصفات لنبني علاقات طويلة الأمد مع عملائنا." },
    en: { title: "Transparency", description: "We are fully transparent on pricing and specifications to build long-term relationships with our customers." },
  },
];

const cities = [
  { ar: "الرياض", en: "Riyadh" },
  { ar: "مكة المكرمة", en: "Makkah" },
  { ar: "المدينة المنورة", en: "Madinah" },
  { ar: "ينبع", en: "Yanbu" },
  { ar: "تبوك", en: "Tabuk" },
];

const t = {
  ar: {
    home: "الرئيسية", about: "من نحن", heroBadge: "شركة وساطة لوجستية",
    heroTitle: "نربط الموردين بالعملاء",
    heroSub: "شركة وساطة تجارية ولوجستية رائدة في المملكة العربية السعودية.",
    storyBadge: "من نحن",
    storyTitle: "شركة بتروهوب للخدمات اللوجستية والبترولية",
    storyP1: "شركة وساطة تجارية ولوجستية رائدة في المملكة العربية السعودية، نعمل كحلقة وصل استراتيجية لربط الموردين بالعملاء بأسرع طريقة وأفضل كفاءة.",
    storyP2: "نقدّم خدماتنا في مجالات المنتجات البترولية والغاز، والحلول البيئية وسحب الصرف، والإمداد المائي، وتأجير المولدات الكهربائية — ونغطي شبكة واسعة من المدن والمناطق الحيوية في المملكة.",
    quote: "نحن الحلقة التي تربط احتياجاتك بالموردين الموثوقين.",
    coverageBadge: "مناطق التغطية",
    coverageTitle: "نغطي المناطق الحيوية في المملكة",
    coverageSub: "شبكة واسعة من المدن والمناطق لخدمة عملائنا أينما كانوا",
    visionTitle: "رؤيتنا",
    visionText: "أن نكون المرجع الأول لخدمات الوساطة اللوجستية والبترولية في المملكة، بشبكة موردين موثوقة وتغطية جغرافية شاملة.",
    missionTitle: "رسالتنا",
    missionText: "تمكين المنشآت والمشاريع من الحصول على كل احتياجاتها اللوجستية من مصدر واحد موثوق، بأسعار تنافسية وخدمة فائقة.",
    valuesBadge: "قيمنا", valuesTitle: "ما يميّزنا",
    ctaTitle: "تواصل معنا اليوم",
    ctaSub: "سواء كنت تبحث عن موردٍ للمنتجات البترولية أو تحتاج خدمة لوجستية متخصصة، فريقنا جاهز للمساعدة.",
    quoteBtn: "اطلب عرض سعر", contactBtn: "اتصل بنا",
  },
  en: {
    home: "Home", about: "About Us", heroBadge: "Logistics Brokerage",
    heroTitle: "We Connect Suppliers with Customers",
    heroSub: "A leading commercial and logistics brokerage in the Kingdom of Saudi Arabia.",
    storyBadge: "About Us",
    storyTitle: "PetroHop for Logistics & Petroleum Services",
    storyP1: "A leading commercial and logistics brokerage in Saudi Arabia, acting as a strategic link connecting suppliers with customers in the fastest, most efficient way.",
    storyP2: "We provide services across petroleum and gas products, environmental and sewage solutions, water supply and generator rental — covering a wide network of vital cities and regions across the Kingdom.",
    quote: "We are the link connecting your needs with trusted suppliers.",
    coverageBadge: "Coverage Regions",
    coverageTitle: "We Cover the Vital Regions of the Kingdom",
    coverageSub: "A wide network of cities and regions to serve our customers wherever they are",
    visionTitle: "Our Vision",
    visionText: "To be the primary reference for logistics and petroleum brokerage in the Kingdom, with a trusted supplier network and comprehensive geographic coverage.",
    missionTitle: "Our Mission",
    missionText: "Empowering facilities and projects to obtain all their logistics needs from one trusted source, at competitive prices with outstanding service.",
    valuesBadge: "Our Values", valuesTitle: "What Sets Us Apart",
    ctaTitle: "Contact Us Today",
    ctaSub: "Whether you are looking for a supplier of petroleum products or need a specialized logistics service, our team is ready to help.",
    quoteBtn: "Get a Quote", contactBtn: "Contact Us",
  },
};

export default function AboutContent() {
  const { lang } = useLang();
  const L = t[lang];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#C8102E]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">{L.home}</Link>
            <ChevronLeft size={14} className="rtl:rotate-180" />
            <span className="text-white font-medium">{L.about}</span>
          </nav>
          <div className="max-w-3xl">
            <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
              {L.heroBadge}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">{L.heroTitle}</h1>
            <p className="text-white/70 text-xl leading-relaxed">{L.heroSub}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-5">{L.storyBadge}</Badge>
              <h2 className="text-4xl font-black text-brand-charcoal mb-6">{L.storyTitle}</h2>
              <p className="text-brand-charcoal-light leading-loose text-lg mb-6">{L.storyP1}</p>
              <p className="text-brand-charcoal-light leading-loose text-lg mb-8">{L.storyP2}</p>
              <blockquote className="border-s-4 border-brand-gold ps-6 py-2 italic text-brand-charcoal text-xl font-bold leading-loose">
                &ldquo;{L.quote}&rdquo;
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div key={s.en} className="bg-gradient-to-br from-brand-green-dark to-brand-green-mid rounded-3xl p-8 text-white text-center">
                  <p className="text-4xl md:text-5xl font-black text-brand-gold mb-2">{s.value}</p>
                  <p className="text-white/70 font-medium text-sm">{lang === "ar" ? s.ar : s.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-24 bg-brand-green-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-5">{L.coverageBadge}</Badge>
            <h2 className="text-4xl font-black text-brand-charcoal mb-4">{L.coverageTitle}</h2>
            <p className="text-brand-charcoal-light max-w-xl mx-auto">{L.coverageSub}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city) => (
              <div key={city.en} className="bg-white rounded-2xl px-8 py-4 border border-brand-green/20 shadow-sm text-center">
                <p className="text-brand-green-dark font-black text-lg">{lang === "ar" ? city.ar : city.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-4xl p-10 border border-brand-green/10 hover:shadow-xl hover:shadow-brand-green/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mb-6">
                <Eye size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-4">{L.visionTitle}</h3>
              <p className="text-brand-charcoal-light leading-loose">{L.visionText}</p>
            </div>
            <div className="bg-white rounded-4xl p-10 border border-brand-gold/20 hover:shadow-xl hover:shadow-brand-gold/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold flex items-center justify-center mb-6">
                <Target size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-4">{L.missionTitle}</h3>
              <p className="text-brand-charcoal-light leading-loose">{L.missionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-5">{L.valuesBadge}</Badge>
            <h2 className="text-4xl font-black text-brand-charcoal">{L.valuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => {
              const c = lang === "ar" ? v.ar : v.en;
              return (
                <div key={c.title} className="relative bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:border-brand-green/20 transition-all duration-400 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-green-light/50 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-6`}>
                    <v.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-brand-charcoal mb-3">{c.title}</h3>
                  <p className="text-brand-charcoal-light leading-relaxed">{c.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-green-dark relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#C8102E]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-4xl font-black text-white">{L.ctaTitle}</h2>
          <p className="text-white/70 leading-relaxed text-lg">{L.ctaSub}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="/quote" variant="gold" size="lg">{L.quoteBtn}</Button>
            <Button href="/contact" variant="outline" size="lg">{L.contactBtn}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
