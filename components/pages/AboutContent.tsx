"use client";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ChevronLeft, Target, Eye, Heart } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const stats = [
  { value: "7", ar: "خدمات وحلول متكاملة", en: "Integrated Services" },
  { value: "5+", ar: "مناطق تغطية في المملكة", en: "Coverage Regions" },
  { value: "24/7", ar: "تشغيل ودعم متواصل", en: "Operation & Support" },
  { value: "100%", ar: "التزام بالجودة والسلامة", en: "Quality & Safety" },
];

const values = [
  {
    icon: Heart, color: "from-[#C8102E] to-[#A00C24]",
    ar: { title: "الجودة والسلامة", description: "نلتزم بأعلى معايير الجودة والسلامة المحلية والدولية في كل خدمة نقدّمها." },
    en: { title: "Quality & Safety", description: "We uphold the highest local and international quality and safety standards in every service we deliver." },
  },
  {
    icon: Target, color: "from-[#1B355E] to-[#0C1B33]",
    ar: { title: "الابتكار", description: "نوظّف التقنيات الحديثة وإنترنت الأشياء لرفع كفاءة التشغيل وخفض الاستهلاك." },
    en: { title: "Innovation", description: "We leverage modern technologies and IoT to boost operational efficiency and cut consumption." },
  },
  {
    icon: Eye, color: "from-[#24487B] to-[#1B355E]",
    ar: { title: "الاستدامة", description: "نقدّم حلولاً مستدامة تخفض الانبعاثات وتدعم مستهدفات رؤية المملكة 2030." },
    en: { title: "Sustainability", description: "We deliver sustainable solutions that reduce emissions and support Saudi Vision 2030 goals." },
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
    home: "الرئيسية", about: "من نحن", heroBadge: "حلول طاقة وخدمات متكاملة",
    heroTitle: "نبني مستقبلاً أكثر استدامة",
    heroSub: "PetroHop — حلول متكاملة للطاقة والخدمات اللوجستية في المملكة العربية السعودية.",
    storyBadge: "من نحن",
    storyTitle: "شركة PetroHop للطاقة والخدمات المتكاملة",
    storyP1: "تقدم PetroHop مجموعة متكاملة من الخدمات والحلول التي تلبي احتياجات القطاعات السكنية والتجارية والصناعية، من خلال منظومة تشغيل متطورة تعتمد على الجودة والسلامة والابتكار.",
    storyP2: "تشمل خدماتنا توريد غاز البترول المسال والمنتجات البترولية، وخدمات المياه والبيئة، وحلول الطاقة، ومنصة PetroHub IoT، والخدمات اللوجستية وأنظمة تتبع المركبات — بما يضمن خدمات موثوقة تعزز كفاءة الأعمال وتحقق قيمة مضافة مستدامة.",
    quote: "لا نقدّم خدمات فحسب، بل نبني شراكات استراتيجية طويلة الأمد مع عملائنا.",
    coverageBadge: "مناطق التغطية",
    coverageTitle: "نغطي المناطق الحيوية في المملكة",
    coverageSub: "شبكة تشغيل واسعة من المدن والمناطق لخدمة عملائنا أينما كانوا",
    visionTitle: "رؤيتنا",
    visionText: "أن نكون الشريك الأول في حلول الطاقة والخدمات المتكاملة في المملكة، بما يتوافق مع مستهدفات رؤية 2030.",
    missionTitle: "رسالتنا",
    missionText: "تقديم خدمات وحلول موثوقة عالية الجودة تعزز كفاءة الأعمال، وتدعم الاستدامة، وتحقق قيمة مضافة لعملائنا.",
    valuesBadge: "قيمنا", valuesTitle: "ما يميّزنا",
    ctaTitle: "تواصل معنا اليوم",
    ctaSub: "سواء كنت تبحث عن حلول طاقة أو خدمات لوجستية متخصصة، فريق PetroHop جاهز لمساعدتك.",
    quoteBtn: "اطلب عرض سعر", contactBtn: "اتصل بنا",
  },
  en: {
    home: "Home", about: "About Us", heroBadge: "Integrated Energy & Services",
    heroTitle: "Building a More Sustainable Future",
    heroSub: "PetroHop — integrated energy and logistics solutions in the Kingdom of Saudi Arabia.",
    storyBadge: "About Us",
    storyTitle: "PetroHop for Energy & Integrated Services",
    storyP1: "PetroHop offers an integrated range of services and solutions meeting the needs of the residential, commercial and industrial sectors through an advanced operating system built on quality, safety and innovation.",
    storyP2: "Our services span LPG and petroleum products, water and environmental services, energy solutions, the PetroHub IoT platform, logistics and vehicle-tracking systems — delivering reliable services that boost efficiency and create sustainable added value.",
    quote: "We don't just provide services — we build long-term strategic partnerships with our clients.",
    coverageBadge: "Coverage Regions",
    coverageTitle: "We Cover the Vital Regions of the Kingdom",
    coverageSub: "A wide operational network of cities and regions to serve our customers wherever they are",
    visionTitle: "Our Vision",
    visionText: "To be the leading partner in integrated energy and services solutions in the Kingdom, aligned with Vision 2030 goals.",
    missionTitle: "Our Mission",
    missionText: "Delivering reliable, high-quality services and solutions that boost business efficiency, support sustainability and create added value for our clients.",
    valuesBadge: "Our Values", valuesTitle: "What Sets Us Apart",
    ctaTitle: "Contact Us Today",
    ctaSub: "Whether you need energy solutions or specialized logistics services, the PetroHop team is ready to help.",
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
