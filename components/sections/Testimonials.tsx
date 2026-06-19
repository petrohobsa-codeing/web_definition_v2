"use client";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import TestimonialCard from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    text: "بترونير غيّرت طريقة إدارتنا للوقود تماماً. لم نعد نقلق بشأن نفاد الديزل المفاجئ الذي كان يعطّل العمل لساعات.",
    name: "م. أحمد القحطاني",
    role: "مدير العمليات",
    company: "شركة إنشاءات كبرى",
  },
  {
    text: "الحساسات الذكية كشفت لنا عن هدر كبير في الاستهلاك لم نكن نلاحظه. نظام الشفافية لديهم لا يُعلى عليه.",
    name: "سلطان الراشد",
    role: "المدير اللوجستي",
    company: "مصنع صناعات غذائية",
  },
  {
    text: "سرعة الاستجابة والدقة في المواعيد هي ما جعلنا نعتمد عليهم كشريك أساسي لجميع مواقعنا في المنطقة الشرقية.",
    name: "فهد المطيري",
    role: "رئيس المشتريات",
    company: "مجموعة خدمات لوجستية",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-24 bg-gray-50 relative overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand-green-light/60 blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="mb-5">آراء العملاء</Badge>
          <h2
            id="testimonials-title"
            className="text-4xl md:text-5xl font-black text-brand-charcoal mb-4"
          >
            ماذا يقول شركاؤنا
          </h2>
          <p className="text-brand-charcoal-light max-w-xl mx-auto leading-relaxed">
            أكثر من 500 منشأة تثق بنا لتأمين طاقتها على مدار الساعة.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
