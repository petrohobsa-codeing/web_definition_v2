"use client";
import { useLang } from "@/context/LanguageContext";
import { ShieldCheck, FileCheck2, Award, Headset } from "lucide-react";
import { StaggerGroup, StaggerItem } from "./Stagger";

const items = [
  {
    Icon: ShieldCheck,
    ar: { title: "الجودة والسلامة", text: "التزام كامل بأعلى معايير الجودة والسلامة المحلية والدولية في كل خدماتنا." },
    en: { title: "Quality & Safety", text: "Full commitment to the highest local and international quality and safety standards." },
  },
  {
    Icon: FileCheck2,
    ar: { title: "تقنيات حديثة", text: "حلول رقمية ومنصة PetroHub IoT لمراقبة الاستهلاك واتخاذ قرارات دقيقة." },
    en: { title: "Modern Technology", text: "Digital solutions and the PetroHub IoT platform for consumption monitoring and accurate decisions." },
  },
  {
    Icon: Award,
    ar: { title: "حلول مستدامة", text: "حلول طاقة تخفض الانبعاثات وتدعم مستهدفات رؤية المملكة 2030." },
    en: { title: "Sustainable Solutions", text: "Energy solutions that cut emissions and support Saudi Vision 2030 goals." },
  },
  {
    Icon: Headset,
    ar: { title: "دعم على مدار الساعة", text: "فريق متاح 24/7 للطلبات الطارئة والاستفسارات في أي وقت." },
    en: { title: "24/7 Support", text: "A team available 24/7 for urgent orders and inquiries any time." },
  },
];

export default function Credentials() {
  const { lang } = useLang();
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-4">
          <span className="text-brand-green">{lang === "ar" ? "اعتماداتنا" : "Our"}</span>{" "}
          <span className="text-[#C8102E]">{lang === "ar" ? "وثقتنا" : "Credentials"}</span>
        </h2>
        <p className="text-center text-[#54595F] max-w-xl mx-auto mb-12">
          {lang === "ar"
            ? "نبني الثقة من خلال الالتزام والاعتماد والشفافية في كل خدمة نقدّمها."
            : "We build trust through commitment, accreditation and transparency in every service we provide."}
        </p>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ Icon, ...c }, i) => {
            const content = lang === "ar" ? c.ar : c.en;
            return (
              <StaggerItem
                key={i}
                className="rounded-2xl border border-gray-100 p-7 text-center hover:shadow-lg hover:border-[#1B355E]/20 transition-all duration-300"
              >
                <div className="hover-grow mb-5 flex justify-center">
                  <Icon size={48} stroke="url(#fl-grad)" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-brand-green-dark mb-2">{content.title}</h3>
                <p className="text-[#54595F] text-sm leading-6">{content.text}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
