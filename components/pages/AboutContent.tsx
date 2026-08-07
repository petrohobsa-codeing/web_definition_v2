"use client";
import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
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

const chairman = {
  photo: "/images/chairman/naif-bin-haidarah.jpg",
  ar: {
    badge: "كلمة رئيس مجلس الإدارة",
    title: "رؤية تبدأ بفهم الواقع، وندعمها بجودة التنفيذ",
    subtitle: "نحو علاقة أكثر وضوحًا بين المنشآت واحتياجاتها من الطاقة",
    paragraphs: [
      "يشهد قطاع الطاقة تحولًا متسارعًا؛ فلم تعد احتياجات المنشآت تتوقف عند توافر المنتج، بل أصبحت ترتبط بانتظام الإمداد، ودقة الكميات، وسلامة الإجراءات، وسرعة الوصول إلى المعلومة التي تُبنى عليها القرارات التشغيلية.",
      "من هذا الفهم انطلقت BetroHob لبناء أسلوب عمل يربط الاحتياج بالتخطيط والتنفيذ والمتابعة والتوثيق. هدفنا أن نخفف التعقيد عن العميل، وأن نجعل كل مرحلة أكثر وضوحًا؛ من لحظة استلام الطلب حتى إتمام التسليم، ثم تحويل ما يحدث ميدانيًا إلى بيانات تساعد على التخطيط والتحكم.",
      "ومنذ عام 2004، راكمنا خبراتٍ عملية في خدمة قطاعات متعددة، وطوّرنا قدراتنا بما يواكب تغير السوق وارتفاع توقعات العملاء. وخلال هذه المسيرة، ظل الالتزام والجودة والمصداقية أساسًا لعلاقاتنا وشراكاتنا.",
      "نؤمن بأن مستقبل القطاع لا يصنعه التوريد وحده، بل تصنعه القدرة على الجمع بين الكفاءة الميدانية، والمتابعة المنضبطة، وأنظمة المراقبة والقياس التي تمنح المنشأة رؤية أشمل لأصولها واستهلاكها. لذلك نواصل تطوير خدماتنا ومنتجاتنا بما يرفع مستوى الثقة، ويمنح عملاءنا قدرة أكبر على السيطرة على عملياتهم.",
      "طموحنا أن تكون BetroHob شريكًا مؤسسيًا يُعتمد عليه؛ داخل المملكة العربية السعودية وخارجها، وأن نسهم في بناء نموذج أكثر تطورًا لإدارة الطاقة، يقوم على الوضوح، والدقة، والاستجابة، والقيمة المستدامة.",
    ],
    name: "نايف بن حيدره",
    role: "رئيس مجلس الإدارة",
  },
  en: {
    badge: "Chairman's Word",
    title: "A vision that begins with understanding reality, backed by quality execution",
    subtitle: "Toward a clearer relationship between facilities and their energy needs",
    paragraphs: [
      "The energy sector is undergoing rapid transformation; facilities' needs are no longer limited to product availability, but now hinge on supply regularity, quantity accuracy, procedural safety, and fast access to the information behind operational decisions.",
      "From this understanding, BetroHob set out to build a way of working that links need to planning, execution, follow-up and documentation. Our goal is to take complexity off the client's shoulders and make every stage clearer — from the moment a request is received to the completion of delivery — then turn what happens on the ground into data that supports planning and control.",
      "Since 2004, we have accumulated practical experience serving multiple sectors and developed our capabilities to keep pace with a changing market and rising customer expectations. Throughout this journey, commitment, quality and credibility have remained the foundation of our relationships and partnerships.",
      "We believe the future of this sector is not shaped by supply alone, but by the ability to combine field efficiency, disciplined follow-up, and monitoring and measurement systems that give the facility a fuller view of its assets and consumption. That is why we continue developing our services and products to raise the level of trust and give our clients greater control over their operations.",
      "Our ambition is for BetroHob to be a dependable institutional partner — inside the Kingdom of Saudi Arabia and beyond — and to contribute to building a more advanced model for energy management, one built on clarity, accuracy, responsiveness and sustainable value.",
    ],
    name: "Naif bin Haidarah",
    role: "Chairman of the Board",
  },
};

const aboutCompany = {
  photo: "/images/about/team-refinery.jpg",
  ar: {
    titleTop: "عن",
    titleBottom: "الشركة",
    eyebrow: "خبرة ميدانية، تنفيذ منضبط، ومعلومة يمكن الاعتماد عليها",
    headline: "نحو إدارة أكثر وعيًا بكل وحدة طاقة",
    paragraph:
      "BetroHob شركة تتخذ من الرياض مقرًا رئيسيًا، وتمتد خبرتها منذ عام 2004. تعمل داخل المملكة العربية السعودية وخارجها، وتخدم المنشآت والمشروعات عبر مزيج متكامل من إمدادات الطاقة والمياه، والإدارة اللوجستية والتشغيلية، وأنظمة المراقبة والتحكم الذكي. لا ننظر إلى الطلب كعملية منفصلة، بل كدورة تبدأ بفهم الاحتياج، وتمر بالتخطيط والتنفيذ والتحقق، وتنتهي بصورة أوضح تساعد العميل على اتخاذ قرار أفضل.",
    visionLabel: "رؤيتنا",
    visionText:
      "أن نكون من أبرز الشركات في تطوير نماذج متقدمة لإدارة الطاقة، ورفع معايير الوضوح والانضباط والكفاءة في القطاع.",
    missionLabel: "رسالتنا",
    missionText:
      "تمكين المنشآت من إدارة احتياجاتها بثقة، عبر تنفيذ ميداني منظم، ومتابعة فعالة، وأنظمة تمنحها بيانات أدق وتحكمًا أكبر.",
  },
  en: {
    titleTop: "About",
    titleBottom: "the Company",
    eyebrow: "Field experience, disciplined execution, and information you can rely on",
    headline: "Toward managing every unit of energy with greater awareness",
    paragraph:
      "BetroHob is headquartered in Riyadh, with experience dating back to 2004. It operates within and beyond the Kingdom of Saudi Arabia, serving facilities and projects through an integrated mix of energy and water supply, logistics and operational management, and smart monitoring and control systems. We don't see demand as a standalone transaction, but as a cycle that begins with understanding the need, moves through planning, execution and verification, and ends with a clearer picture that helps the client make a better decision.",
    visionLabel: "Our Vision",
    visionText:
      "To be among the leading companies in developing advanced energy management models, raising the sector's standards of clarity, discipline and efficiency.",
    missionLabel: "Our Mission",
    missionText:
      "Enabling facilities to manage their needs with confidence, through organized field execution, effective follow-up, and systems that give them more accurate data and greater control.",
  },
};

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
  const A = aboutCompany[lang];
  const V = customerValue[lang];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
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

      {/* 1. About the Company — matches "عن الشركة" profile page */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <p className="text-brand-charcoal font-bold text-lg mb-2">{A.eyebrow}</p>
              <h2 className="text-2xl md:text-3xl font-black text-brand-charcoal mb-5 leading-snug">
                {A.headline}
              </h2>
              <p className="text-brand-charcoal-light leading-loose text-base md:text-lg">{A.paragraph}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 pt-8 border-t border-gray-100">
                <div>
                  <p className="text-[#0067E3] font-black text-lg mb-2">{A.visionLabel}</p>
                  <p className="text-brand-charcoal-light leading-relaxed text-sm md:text-base">{A.visionText}</p>
                </div>
                <div>
                  <p className="text-[#0067E3] font-black text-lg mb-2">{A.missionLabel}</p>
                  <p className="text-brand-charcoal-light leading-relaxed text-sm md:text-base">{A.missionText}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black leading-[1.05] mb-6">
                <span className="block text-brand-charcoal">{A.titleTop}</span>
                <span className="block text-[#0067E3]">{A.titleBottom}</span>
              </h2>
              <div className="relative w-full aspect-[4/3] rounded-4xl overflow-hidden shadow-xl">
                <Image src={aboutCompany.photo} alt={A.titleBottom} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Chairman's Word */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-4xl border border-gray-100 shadow-xl shadow-brand-green/5 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <h2 className="text-3xl md:text-5xl font-black text-brand-charcoal mb-4 leading-tight">
                  {chairman[lang].badge}
                </h2>
                <p className="text-xl md:text-2xl font-bold text-brand-gold mb-3 leading-snug">
                  {chairman[lang].title}
                </p>
                <p className="text-base md:text-lg font-bold text-brand-gold mb-6">{chairman[lang].subtitle}</p>
                <div className="space-y-4">
                  {chairman[lang].paragraphs.map((p, i) => (
                    <p key={i} className="text-brand-charcoal-light leading-loose text-base md:text-lg">{p}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <p className="text-brand-charcoal font-black text-xl">{chairman[lang].name}</p>
                  <p className="text-brand-gold font-bold text-base">{chairman[lang].role}</p>
                </div>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-28">
                <div className="relative max-w-sm mx-auto aspect-[3/4] drop-shadow-lg">
                  <div
                    className="relative w-full h-full overflow-hidden"
                    style={{ clipPath: "polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)" }}
                  >
                    <Image src={chairman.photo} alt={chairman[lang].name} fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Value the Client Gets — matches "القيمة التي يحصل عليها العميل" profile page */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative w-full h-[260px] md:h-[340px] rounded-4xl overflow-hidden shadow-xl mb-8">
            <Image src={customerValue.photo} alt={V.badge} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
              <span className="inline-block bg-[#0067E3] text-white font-black text-lg md:text-2xl px-6 py-3 rounded-2xl shadow-lg">
                {V.badge}
              </span>
            </div>
          </div>

          <p className="text-brand-charcoal-light text-sm md:text-base mb-10">{V.eyebrow}</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <h2 className="text-2xl md:text-3xl font-black text-brand-charcoal leading-snug">{V.heading}</h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-brand-charcoal-light leading-loose text-base md:text-lg">{V.paragraph}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {customerValueItems.map((item) => {
              const c = lang === "ar" ? item.ar : item.en;
              return (
                <div key={c.title} className="bg-gray-50 rounded-3xl border border-gray-100 p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0067E3]/10 flex items-center justify-center mb-4">
                    <item.icon size={22} className="text-[#0067E3]" />
                  </div>
                  <h3 className="text-base font-black text-brand-charcoal mb-2">{c.title}</h3>
                  <p className="text-brand-charcoal-light text-sm leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>

          <p className="text-center text-brand-charcoal font-bold text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            {V.closing}
          </p>
        </div>
      </section>
    </>
  );
}
