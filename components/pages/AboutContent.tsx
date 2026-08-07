"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/gasable/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/gasable/Stagger";
import AboutCompanySection from "@/components/gasable/AboutCompanySection";
import ChairmanWordSection from "@/components/gasable/ChairmanWordSection";
import {
  ChevronLeft,
  Eye,
  Target,
  ListChecks,
  UserCheck,
  ClipboardList,
  Gauge,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const customerValue = {
  photo: "/images/about/team-refinery.jpg",
  ar: {
    badge: "القيمة التي يحصل عليها العميل",
    eyebrow: "الفرق يظهر في التجربة اليومية، لا في العبارات التسويقية",
    heading: "ماذا يتغير عندما تصبح المتابعة أكثر انضباطًا؟",
    paragraph:
      "تبني BetroHob علاقتها مع العميل حول نتائج قابلة للملاحظة في التنفيذ والمتابعة والقرار. القيمة لا تقتصر على إيصال المنتج، بل تشمل تقليل الجهد، ورفع مستوى الوضوح، وتعزيز القدرة على التصرف في الوقت المناسب.",
    closing:
      "شريك واحد يفهم الاحتياج، يتابع التنفيذ، ويوفر الأدوات التي تساعد العميل على السيطرة على الصورة كاملة.",
  },
  en: {
    badge: "The Value the Client Gets",
    eyebrow: "The difference shows up in the day-to-day experience, not in marketing lines",
    heading: "What changes when follow-up becomes more disciplined?",
    paragraph:
      "BetroHob builds its client relationships around observable results in execution, follow-up, and decision-making. The value isn't limited to delivering the product — it extends to reducing effort, raising the level of clarity, and strengthening the ability to act at the right time.",
    closing:
      "One partner that understands the need, follows up on execution, and provides the tools that help the client stay in control of the full picture.",
  },
};

const customerValueItems = [
  {
    icon: Eye,
    ar: { title: "حالة طلب واضحة", desc: "معرفة ما تم تنفيذه، وما هو قيد التنفيذ، وما ينتظر إجراء." },
    en: { title: "Clear order status", desc: "Know what's been completed, what's in progress, and what's pending action." },
  },
  {
    icon: UserCheck,
    ar: { title: "عبء متابعة أقل", desc: "فريق متابعة يتولى التنسيق والتحديث بدلاً من تشتيت العميل بين جهات واتصالات متعددة." },
    en: { title: "Less follow-up burden", desc: "A dedicated team handles coordination and updates instead of the client juggling multiple contacts." },
  },
  {
    icon: ListChecks,
    ar: { title: "وضوح الكميات", desc: "مستندات وبيانات قياس تساعد على مطابقة الكميات المطلوبة والمحملة والمستلمة." },
    en: { title: "Clarity of quantities", desc: "Documents and measurement data help reconcile requested, loaded and received quantities." },
  },
  {
    icon: Zap,
    ar: { title: "استجابة أسرع", desc: "معالجة الملاحظات والاحتياجات العاجلة في وقت أقصر وبمسؤوليات محددة." },
    en: { title: "Faster response", desc: "Urgent needs and feedback are handled faster, with clear ownership." },
  },
  {
    icon: ShieldCheck,
    ar: { title: "تقليل فرص التعطل", desc: "التحرك مبكرًا قبل أن يتحول النقص أو التأخير إلى توقف تشغيلي." },
    en: { title: "Reduced downtime risk", desc: "Acting early before a shortage or delay turns into an operational stoppage." },
  },
  {
    icon: Target,
    ar: { title: "تخطيط أدق", desc: "الاستفادة من بيانات الاستهلاك والرصيد والتوقيت في توقع الاحتياج القادم." },
    en: { title: "More accurate planning", desc: "Using consumption, balance and timing data to forecast the next need." },
  },
  {
    icon: Gauge,
    ar: { title: "رؤية موحدة للأصول", desc: "ربط أجهزة القياس والتتبع والمراقبة عبر BetroHob Monitor بحسب نطاق المشروع." },
    en: { title: "Unified view of assets", desc: "Measurement, tracking and monitoring devices connected via BetroHob Monitor, scoped to the project." },
  },
  {
    icon: ClipboardList,
    ar: { title: "سجل قابل للمراجعة", desc: "توثيق المراحل والكميات والقراءات والملاحظات للرجوع إليها عند الحاجة." },
    en: { title: "Reviewable record", desc: "Stages, quantities, readings and notes are documented for reference whenever needed." },
  },
];

const t = {
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    heroBadge: "نبذة عن الشركة",
    heroTitle: "BetroHob",
    heroSub: "إعادة تعريف إدارة الطاقة: إمداد منضبط، متابعة تشغيلية، ورؤية موحدة للأصول والاستهلاك.",
  },
  en: {
    home: "Home",
    about: "About Us",
    heroBadge: "About the Company",
    heroTitle: "BetroHob",
    heroSub: "Redefining energy management: disciplined supply, operational follow-up, and a unified view of assets and consumption.",
  },
};

export default function AboutContent() {
  const { lang } = useLang();
  const L = t[lang];
  const V = customerValue[lang];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-[#0067E3]/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">{L.home}</Link>
            <ChevronLeft size={14} className="rtl:rotate-180" />
            <span className="text-white font-medium">{L.about}</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
              {L.heroBadge}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">{L.heroTitle}</h1>
            <p className="text-white/70 text-xl leading-relaxed">{L.heroSub}</p>
          </motion.div>
        </div>
      </section>

      {/* 1. About the Company — matches "عن الشركة" profile page */}
      <AboutCompanySection />

      {/* 2. Chairman's Word */}
      <ChairmanWordSection />

      {/* 3. The Value the Client Gets — matches "القيمة التي يحصل عليها العميل" profile page */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#0067E3]/5 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="relative w-full h-[260px] md:h-[340px] rounded-4xl overflow-hidden shadow-2xl shadow-brand-charcoal/10 mb-8 group">
              <Image
                src={customerValue.photo}
                alt={V.badge}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                <span className="inline-block bg-[#0067E3] text-white font-black text-lg md:text-2xl px-6 py-3 rounded-2xl shadow-lg shadow-[#0067E3]/30">
                  {V.badge}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-brand-charcoal-light text-sm md:text-base mb-10">{V.eyebrow}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
              <div className="lg:col-span-5">
                <h2 className="text-2xl md:text-3xl font-black text-brand-charcoal leading-snug">{V.heading}</h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-brand-charcoal-light leading-loose text-base md:text-lg">{V.paragraph}</p>
              </div>
            </div>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {customerValueItems.map((item) => {
              const c = lang === "ar" ? item.ar : item.en;
              return (
                <StaggerItem key={c.title}>
                  <div className="group relative h-full bg-gray-50 rounded-3xl border border-gray-100 p-7 hover:bg-white hover:border-[#0067E3]/30 hover:shadow-2xl hover:shadow-[#0067E3]/10 transition-all duration-400 overflow-hidden">
                    <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-[#0067E3]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="relative w-12 h-12 rounded-xl bg-[#0067E3]/10 flex items-center justify-center mb-5 group-hover:bg-[#0067E3] transition-colors duration-300">
                      <item.icon size={22} className="text-[#0067E3] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="relative text-base font-black text-brand-charcoal mb-2">{c.title}</h3>
                    <p className="relative text-brand-charcoal-light text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <p className="text-center text-brand-charcoal font-bold text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
              {V.closing}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
