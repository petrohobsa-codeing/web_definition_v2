"use client";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { CheckCircle2 } from "lucide-react";

const points = [
  "إمداد منتظم وموثوق لأي موقع في المملكة",
  "تقنية IoT متقدمة لمراقبة الخزانات لحظياً",
  "فواتير إلكترونية متوافقة مع هيئة الزكاة والضريبة",
  "فريق دعم ميداني جاهز على مدار الساعة",
  "تقارير استهلاك مفصّلة وشفافة",
  "امتثال كامل لاشتراطات الجهات الحكومية",
];

export default function WhyUs() {
  return (
    <section
      className="py-24 bg-white"
      aria-labelledby="whyus-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-5">لماذا بترونير</Badge>
            <h2
              id="whyus-title"
              className="text-4xl md:text-5xl font-black text-brand-charcoal mb-6"
            >
              لماذا تختار بترونير؟
            </h2>
            <p className="text-brand-charcoal-light leading-loose text-lg mb-8">
              نحن لا نوفّر الوقود فحسب، بل نوفّر راحة البال. نظامنا مصمّم
              ليكون شريكك الخفي الذي يضمن استدامة عملك في السوق السعودي.
            </p>
            <div className="space-y-4">
              {points.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="text-brand-green flex-shrink-0"
                  />
                  <span className="text-brand-charcoal font-medium">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Large decorative card */}
            <div className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid rounded-4xl p-10 text-white overflow-hidden">
              <div className="absolute inset-0 dot-bg opacity-15" />
              <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-brand-gold/20 blur-2xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-4 py-2 rounded-full text-sm font-bold mb-8">
                  <span className="w-2 h-2 bg-brand-gold rounded-full" />
                  شريكك الموثوق منذ 2018
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { v: "500+", l: "عميل نشط" },
                    { v: "99.9%", l: "ضمان التشغيل" },
                    { v: "15M", l: "لتر متتبَّع" },
                    { v: "24/7", l: "دعم ميداني" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="bg-white/10 rounded-2xl p-5 text-center"
                    >
                      <p className="text-3xl font-black text-brand-gold mb-1">
                        {s.v}
                      </p>
                      <p className="text-white/70 text-sm">{s.l}</p>
                    </div>
                  ))}
                </div>

                <blockquote className="text-white/80 text-lg leading-loose border-r-4 border-brand-gold pr-5 italic">
                  &ldquo;الدقة ليست مجرد مقياس لدينا — بل هي أساس الثقة.&rdquo;
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
