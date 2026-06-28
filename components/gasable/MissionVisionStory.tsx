"use client";
import { useLang } from "@/context/LanguageContext";
import GasableButton from "./GasableButton";

const grad = (id: string) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#51B957" />
      <stop offset="100%" stopColor="#0E549A" />
    </linearGradient>
  </defs>
);

const LeafIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px]" fill="none" strokeWidth="3">
    {grad("g1")}
    <circle cx="50" cy="50" r="38" stroke="url(#g1)" />
    <path
      d="M38 60c0-14 11-26 26-28-1 15-11 27-26 28z"
      stroke="url(#g1)"
      strokeLinejoin="round"
    />
    <path d="M40 58c6-6 13-11 22-13" stroke="url(#g1)" strokeLinecap="round" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px]" fill="none" strokeWidth="3">
    {grad("g2")}
    <circle cx="50" cy="50" r="18" stroke="url(#g2)" />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4;
      const x1 = 50 + Math.cos(a) * 26;
      const y1 = 50 + Math.sin(a) * 26;
      const x2 = 50 + Math.cos(a) * 36;
      const y2 = 50 + Math.sin(a) * 36;
      return (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#g2)" strokeLinecap="round" />
      );
    })}
  </svg>
);

const HouseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px]" fill="none" strokeWidth="3">
    {grad("g3")}
    <path d="M22 48 50 24l28 24" stroke="url(#g3)" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M30 46v28h40V46" stroke="url(#g3)" strokeLinejoin="round" />
    <path d="M50 70c0-8 5-15 13-16-1 9-6 16-13 16z" stroke="url(#g3)" strokeLinejoin="round" />
  </svg>
);

const cards = [
  {
    Icon: LeafIcon,
    ar: {
      title: "مهمتنا",
      text: "نعمل كحلقة وصل استراتيجية تربط الموردين بالعملاء بأسرع طريقة وأعلى كفاءة لضمان استمرارية العمليات.",
    },
    en: {
      title: "Our Mission",
      text: "We act as a strategic link connecting suppliers with customers in the fastest, most efficient way to keep operations running.",
    },
  },
  {
    Icon: SunIcon,
    ar: {
      title: "رؤيتنا",
      text: "أن نكون شركة الوساطة اللوجستية الرائدة في المملكة، والخيار الأول للموردين والعملاء على حدّ سواء.",
    },
    en: {
      title: "Our Vision",
      text: "To be the leading logistics brokerage in the Kingdom and the first choice for both suppliers and customers.",
    },
  },
  {
    Icon: HouseIcon,
    ar: {
      title: "قصّتنا",
      text: "شركة فاست لينك للخدمات اللوجستية والبترولية — وساطة تجارية رائدة تخدم المنشآت والمشاريع في أنحاء المملكة.",
    },
    en: {
      title: "Our Story",
      text: "Fast Link for Logistics & Petroleum Services — a leading commercial brokerage serving facilities and projects across the Kingdom.",
    },
  },
];

export default function MissionVisionStory() {
  const { lang } = useLang();
  return (
    <section className="bg-[#F0FAF5] py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map(({ Icon, ...c }, i) => {
            const content = lang === "ar" ? c.ar : c.en;
            return (
              <div key={i} className="text-center flex flex-col items-center">
                <div className="hover-grow mb-5">
                  <Icon />
                </div>
                <h3 className="title-underline text-[22px] font-semibold text-brand-charcoal-mid mb-5">
                  {content.title}
                </h3>
                <p className="text-[#54595F] leading-7 max-w-xs">{content.text}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <GasableButton href="/about">
            {lang === "ar" ? "اقرأ المزيد" : "Read More"}
          </GasableButton>
        </div>
      </div>
    </section>
  );
}
