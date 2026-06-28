"use client";
import { useLang } from "@/context/LanguageContext";
import { ShieldCheck, FileCheck2, Award, Headset } from "lucide-react";

const items = [
  {
    Icon: ShieldCheck,
    ar: { title: "مرخّصة ومعتمدة", text: "شركة وساطة لوجستية مرخّصة ومعتمدة في المملكة العربية السعودية." },
    en: { title: "Licensed & Certified", text: "A licensed and certified logistics brokerage in the Kingdom of Saudi Arabia." },
  },
  {
    Icon: FileCheck2,
    ar: { title: "فوترة إلكترونية", text: "فواتير ضريبية إلكترونية متوافقة مع متطلبات هيئة الزكاة والضريبة." },
    en: { title: "E-Invoicing", text: "Compliant electronic tax invoices aligned with ZATCA requirements." },
  },
  {
    Icon: Award,
    ar: { title: "موردون موثوقون", text: "شبكة واسعة من الموردين المعتمدين لضمان الجودة والالتزام." },
    en: { title: "Trusted Suppliers", text: "A wide network of certified suppliers ensuring quality and reliability." },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ Icon, ...c }, i) => {
            const content = lang === "ar" ? c.ar : c.en;
            return (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 p-7 text-center hover:shadow-lg hover:border-[#1B355E]/20 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-navy-red-gradient flex items-center justify-center mb-5">
                  <Icon size={30} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-brand-green-dark mb-2">{content.title}</h3>
                <p className="text-[#54595F] text-sm leading-6">{content.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
