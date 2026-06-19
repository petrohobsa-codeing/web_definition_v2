"use client";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/ServiceCard";
import Badge from "@/components/ui/Badge";
import { Fuel, Cpu, Flame, MonitorCheck } from "lucide-react";

const services = [
  {
    icon: Fuel,
    title: "تزويد الديزل الذكي",
    description:
      "إمداد منتظم بأي كمية، لأي موقع، في الوقت المحدد. نخدم المولّدات والمعدّات الثقيلة وأساطيل النقل بفواتير إلكترونية متكاملة.",
    href: "/services/diesel-supply",
  },
  {
    icon: Cpu,
    title: "حساسات IoT",
    description:
      "راقب مستوى خزانك من جوّالك، وامنع السرقة والهدر. تنبيهات فورية وطلب تلقائي قبل النفاد.",
    href: "/services/smart-sensors",
  },
  {
    icon: Flame,
    title: "تزويد الغاز",
    description:
      "حلول غاز آمنة وموثوقة للمنشآت الصناعية والتجارية مع فحص دوري وامتثال كامل للدفاع المدني.",
    href: "/services/gas-supply",
  },
  {
    icon: MonitorCheck,
    title: "المراقبة عن بُعد",
    description:
      "لوحة تحكم سحابية تجمع كل خزاناتك ومواقعك وتقاريرك في مكان واحد.",
    href: "/services/remote-monitoring",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-brand-green-light/40" aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="mb-5">خدماتنا</Badge>
          <h2
            id="services-title"
            className="text-4xl md:text-5xl font-black text-brand-charcoal mb-5"
          >
            حلول طاقة ذكية ومتكاملة
          </h2>
          <p className="text-brand-charcoal-light max-w-2xl mx-auto leading-relaxed">
            نجمع بين الخدمات اللوجستية التقليدية وتقنيات الجيل القادم لضمان
            كفاءة عملياتك.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.href} {...service} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
