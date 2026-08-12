"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/gasable/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/gasable/Stagger";
import { Eye, Target, Calendar } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const aboutCompany = {
  photo: "/images/about/team-refinery.jpg",
  ar: {
    titleTop: "عن",
    titleBottom: "Petrohob",
    eyebrow: "خبرة ميدانية، تنفيذ منضبط، ومعلومة يمكن الاعتماد عليها",
    headline: "نحو إدارة أكثر وعيًا بكل وحدة طاقة",
    paragraph:
      "Petrohob شركة تتخذ من الرياض مقرًا رئيسيًا، وتمتد خبرتها منذ عام 2004. تعمل داخل المملكة العربية السعودية وخارجها، وتخدم المنشآت والمشروعات عبر مزيج متكامل من إمدادات الطاقة والمياه، والإدارة اللوجستية والتشغيلية، وأنظمة المراقبة والتحكم الذكي. لا ننظر إلى الطلب كعملية منفصلة، بل كدورة تبدأ بفهم الاحتياج، وتمر بالتخطيط والتنفيذ والتحقق، وتنتهي بصورة أوضح تساعد العميل على اتخاذ قرار أفضل.",
    since: "منذ عام 2004",
    visionLabel: "رؤيتنا",
    visionText:
      "أن نكون من أبرز الشركات في تطوير نماذج متقدمة لإدارة الطاقة، ورفع معايير الوضوح والانضباط والكفاءة في القطاع.",
    missionLabel: "رسالتنا",
    missionText:
      "تمكين المنشآت من إدارة احتياجاتها بثقة، عبر تنفيذ ميداني منظم، ومتابعة فعالة، وأنظمة تمنحها بيانات أدق وتحكمًا أكبر.",
  },
  en: {
    titleTop: "About",
    titleBottom: "Petrohob",
    eyebrow: "Field experience, disciplined execution, and information you can rely on",
    headline: "Toward managing every unit of energy with greater awareness",
    paragraph:
      "Petrohob is headquartered in Riyadh, with experience dating back to 2004. It operates within and beyond the Kingdom of Saudi Arabia, serving facilities and projects through an integrated mix of energy and water supply, logistics and operational management, and smart monitoring and control systems. We don't see demand as a standalone transaction, but as a cycle that begins with understanding the need, moves through planning, execution and verification, and ends with a clearer picture that helps the client make a better decision.",
    since: "Since 2004",
    visionLabel: "Our Vision",
    visionText:
      "To be among the leading companies in developing advanced energy management models, raising the sector's standards of clarity, discipline and efficiency.",
    missionLabel: "Our Mission",
    missionText:
      "Enabling facilities to manage their needs with confidence, through organized field execution, effective follow-up, and systems that give them more accurate data and greater control.",
  },
};

export default function AboutCompanySection() {
  const { lang } = useLang();
  const A = aboutCompany[lang];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-green-light/40 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-7 order-2 lg:order-2" delay={0.05}>
            <p className="text-[#3BBA9F] font-bold text-lg mb-2 tracking-wide">{A.eyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-black text-brand-charcoal mb-5 leading-snug">
              {A.headline}
            </h2>
            <p className="text-brand-charcoal-light leading-loose text-base md:text-lg">{A.paragraph}</p>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              <StaggerItem>
                <div className="group h-full bg-white rounded-3xl border border-gray-100 p-7 hover:border-[#3BBA9F]/30 hover:shadow-2xl hover:shadow-[#3BBA9F]/10 transition-all duration-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3BBA9F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="relative w-12 h-12 rounded-2xl bg-[#3BBA9F]/10 flex items-center justify-center mb-5 group-hover:bg-[#3BBA9F] transition-colors duration-300">
                    <Eye size={22} className="text-[#3BBA9F] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="relative text-brand-charcoal font-black text-lg mb-2">{A.visionLabel}</p>
                  <p className="relative text-brand-charcoal-light leading-relaxed text-sm md:text-base">{A.visionText}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="group h-full bg-white rounded-3xl border border-gray-100 p-7 hover:border-brand-gold/40 hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold-light/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="relative w-12 h-12 rounded-2xl bg-brand-gold-light flex items-center justify-center mb-5 group-hover:bg-brand-gold transition-colors duration-300">
                    <Target size={22} className="text-brand-gold-dark group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="relative text-brand-charcoal font-black text-lg mb-2">{A.missionLabel}</p>
                  <p className="relative text-brand-charcoal-light leading-relaxed text-sm md:text-base">{A.missionText}</p>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </Reveal>

          <Reveal className="lg:col-span-5 order-1 lg:order-1" delay={0.15}>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] mb-6">
              <span className="block text-brand-charcoal">{A.titleTop}</span>
              <span className="block text-[#3BBA9F]">{A.titleBottom}</span>
            </h2>
            <div className="relative">
              <div
                className="relative w-full aspect-[4/3] overflow-hidden shadow-2xl shadow-brand-charcoal/10 group rounded-tr-3xl rounded-br-3xl rounded-bl-3xl"
                style={{ borderTopLeftRadius: "140px" }}
              >
                <Image
                  src={aboutCompany.photo}
                  alt={A.titleBottom}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl shadow-brand-charcoal/10 p-4 border border-gray-100 flex items-center gap-3"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#3BBA9F]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-[#3BBA9F]" />
                </div>
                <p className="font-black text-brand-charcoal text-sm whitespace-nowrap">{A.since}</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
