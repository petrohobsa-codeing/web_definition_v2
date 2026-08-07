"use client";
import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ChevronLeft, Target, Eye, Search, CheckCircle2, Users, Clock } from "lucide-react";
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

const stats = [
  { value: "2004", ar: "عام التأسيس", en: "Established" },
  { value: "500+", ar: "شريك استراتيجي", en: "Strategic Partners" },
  { value: "7", ar: "خدمات وحلول متكاملة", en: "Integrated Services" },
  { value: "5+", ar: "مناطق تغطية في المملكة", en: "Coverage Regions" },
];

const values = [
  {
    icon: Search, color: "from-[#0067E3] to-[#004FB0]",
    ar: { title: "الوضوح", description: "نجعل حالة الطلب والكميات والمسؤوليات أكثر قابلية للفهم والمتابعة." },
    en: { title: "Clarity", description: "We make demand status, quantities and responsibilities easier to understand and track." },
  },
  {
    icon: CheckCircle2, color: "from-[#0C2D6B] to-[#081B45]",
    ar: { title: "المصداقية", description: "نقول ما نستطيع تنفيذه، ونلتزم بما نتعهد به." },
    en: { title: "Credibility", description: "We say what we can deliver, and commit to what we promise." },
  },
  {
    icon: Users, color: "from-[#24487B] to-[#0C2D6B]",
    ar: { title: "الشراكة والتطوير", description: "نتعامل مع احتياج العميل كمسؤولية مشتركة، ونطوّر أدواتنا باستمرار." },
    en: { title: "Partnership & Development", description: "We treat client needs as a shared responsibility and continuously improve our tools." },
  },
  {
    icon: Clock, color: "from-[#0C2D6B] to-[#0067E3]",
    ar: { title: "الانضباط", description: "نبني العمل على إجراءات محددة وتنسيق واضح بين الأطراف." },
    en: { title: "Discipline", description: "We build our work on defined procedures and clear coordination between parties." },
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
    home: "الرئيسية", about: "من نحن", heroBadge: "نبذة عن Petrohub",
    heroTitle: "حلول الطاقة والخدمات اللوجستية المتكاملة",
    heroSub: "شركة رائدة متخصصة في توفير حلول الطاقة والخدمات اللوجستية المتكاملة محلياً ودولياً.",
    storyBadge: "من نحن",
    storyTitle: "عن الشركة",
    storyP1: "BetroHob شركة تتخذ من الرياض مقرًا رئيسيًا، وتمتد خبرتها منذ عام 2004. تعمل داخل المملكة العربية السعودية وخارجها، وتخدم المنشآت والمشروعات عبر مزيج متكامل من إمدادات الطاقة والمياه، والإدارة اللوجستية والتشغيلية، وأنظمة المراقبة والتحكم الذكي.",
    storyP2: "لا ننظر إلى الطلب كعملية منفصلة، بل كدورة تبدأ بفهم الاحتياج، وتمر بالتخطيط والتنفيذ والتحقق، وتنتهي بصورة أوضح تساعد العميل على اتخاذ قرار أفضل.",
    quote: "نحو إدارة أكثر وعيًا بكل وحدة طاقة.",
    coverageBadge: "مناطق التغطية",
    coverageTitle: "حضورنا في جميع أنحاء المملكة",
    coverageSub: "الفرع الرئيسي في الرياض مع شبكة تشغيل تغطي المناطق الحيوية",
    visionTitle: "رؤيتنا",
    visionText: "أن نكون من أبرز الشركات في تطوير نماذج متقدمة لإدارة الطاقة، ورفع معايير الوضوح والانضباط والكفاءة في القطاع.",
    missionTitle: "رسالتنا",
    missionText: "تمكين المنشآت من إدارة احتياجاتها بثقة، عبر تنفيذ ميداني منظم، ومتابعة فعالة، وأنظمة تمنحها بيانات أدق وتحكمًا أكبر.",
    valuesBadge: "القيم الأساسية", valuesTitle: "قيمنا الأساسية",
    ctaTitle: "تواصل معنا اليوم",
    ctaSub: "سواء كنت تبحث عن حلول طاقة أو خدمات لوجستية متخصصة، فريق Petrohub جاهز لمساعدتك.",
    quoteBtn: "اطلب عرض سعر", contactBtn: "اتصل بنا",
  },
  en: {
    home: "Home", about: "About Us", heroBadge: "About Petrohub",
    heroTitle: "Integrated Energy & Logistics Solutions",
    heroSub: "A leading company specialized in providing integrated energy and logistics solutions locally and internationally.",
    storyBadge: "About Us",
    storyTitle: "About the Company",
    storyP1: "BetroHob is headquartered in Riyadh, with experience dating back to 2004. It operates within and beyond the Kingdom of Saudi Arabia, serving facilities and projects through an integrated mix of energy and water supply, logistics and operational management, and smart monitoring and control systems.",
    storyP2: "We don't see demand as a standalone transaction, but as a cycle that begins with understanding the need, moves through planning, execution and verification, and ends with a clearer picture that helps the client make a better decision.",
    quote: "Toward managing every unit of energy with greater awareness.",
    coverageBadge: "Coverage Regions",
    coverageTitle: "Our Presence Across the Kingdom",
    coverageSub: "Head office in Riyadh with an operational network covering the vital regions",
    visionTitle: "Our Vision",
    visionText: "To be among the leading companies in developing advanced energy management models, raising the sector's standards of clarity, discipline and efficiency.",
    missionTitle: "Our Mission",
    missionText: "Enabling facilities to manage their needs with confidence, through organized field execution, effective follow-up, and systems that give them more accurate data and greater control.",
    valuesBadge: "Core Values", valuesTitle: "Our Core Values",
    ctaTitle: "Contact Us Today",
    ctaSub: "Whether you need energy solutions or specialized logistics services, the Petrohub team is ready to help.",
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

      {/* Chairman's Word */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
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
