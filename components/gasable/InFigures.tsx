"use client";
import { useLang } from "@/context/LanguageContext";
import CountUp from "@/components/ui/CountUp";
import { Users, MousePointerClick, Star, PackageCheck, Lightbulb } from "lucide-react";

const stats = [
  { Icon: Users, value: "+1.6 M", ar: "العملاء المسجّلون", en: "Registered Customers" },
  { Icon: MousePointerClick, value: "30 M", ar: "زيارات الموقع", en: "Website Visits" },
  { Icon: Star, value: "93%", ar: "معدّل رضا العملاء", en: "Customer Satisfaction Rate" },
  { Icon: PackageCheck, value: "1.8 M", ar: "الطلبات المنفّذة", en: "Orders Fulfilled" },
  { Icon: Lightbulb, value: "+3", ar: "سنوات الخبرة", en: "Years of Experience" },
];

export default function InFigures() {
  const { lang } = useLang();
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-12">
          <span className="text-brand-green">Gasable</span>{" "}
          <span className="text-brand-charcoal-mid">{lang === "ar" ? "في" : "in"}</span>{" "}
          <span className="text-brand-green-dark">{lang === "ar" ? "أرقام" : "Figures"}</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map(({ Icon, value, ar, en }, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center p-6 ${
                i === 4 ? "col-span-2 lg:col-span-1 lg:col-start-2" : ""
              }`}
            >
              <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#51B957]/10 to-[#0E549A]/10 flex items-center justify-center mb-5">
                <Icon size={52} className="text-brand-green" strokeWidth={1.5} />
              </div>
              <CountUp
                value={value}
                className="text-5xl md:text-6xl font-black text-gasable-gradient"
              />
              <p className="text-[#54595F] font-medium mt-3">{lang === "ar" ? ar : en}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
