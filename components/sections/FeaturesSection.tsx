"use client";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { Zap, Eye, ShieldAlert, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "الإمداد التلقائي",
    description:
      "الحساسات تطلب الوقود بذكاء قبل وصول الخزان لمرحلة الحرج.",
  },
  {
    icon: Eye,
    title: "شفافية كاملة",
    description:
      "تتبّع الأسعار والفواتير والاستهلاك في لوحة تحكم واحدة لحظياً.",
  },
  {
    icon: ShieldAlert,
    title: "منع السرقة",
    description:
      "تنبيهات فورية عند أي سحب غير معتاد أو تلاعب في مستويات الوقود.",
  },
  {
    icon: Clock,
    title: "استجابة سريعة",
    description:
      "فريقنا جاهز للتوصيل خلال ساعات لضمان عدم توقّف عملياتك.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" aria-labelledby="features-title">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-green-light/60 blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-gold-light/40 blur-3xl -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-brand-green-dark to-brand-green-mid p-1">
              <div className="rounded-3xl bg-brand-green-dark/90 p-8 space-y-4">
                {/* Mock dashboard */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/50 text-xs font-medium">لوحة التحكم</p>
                    <p className="text-white font-black">مستويات الخزانات</p>
                  </div>
                  <span className="bg-brand-green/30 text-green-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    مباشر
                  </span>
                </div>
                {[
                  { name: "موقع A - الرياض", pct: 82, status: "جيد" },
                  { name: "موقع B - جدة", pct: 35, status: "تنبيه" },
                  { name: "موقع C - الدمام", pct: 67, status: "جيد" },
                  { name: "موقع D - الخبر", pct: 91, status: "ممتاز" },
                ].map((item) => (
                  <div key={item.name} className="bg-white/5 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 text-sm font-medium">{item.name}</span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          item.pct < 40
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-brand-green/20 text-green-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            item.pct < 40
                              ? "linear-gradient(90deg, #F59E0B, #FCD34D)"
                              : "linear-gradient(90deg, #059669, #34D399)",
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                    <p className="text-white/50 text-xs mt-1">{item.pct}% ممتلئ</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Features list */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <Badge className="mb-4">مزايا النظام</Badge>
              <h2
                id="features-title"
                className="text-4xl md:text-5xl font-black text-brand-charcoal mb-4"
              >
                امتثال تام وشفافية
              </h2>
              <p className="text-brand-charcoal-light leading-relaxed">
                منظومة متكاملة تضمن لك السيطرة الكاملة على مخزون الوقود بدقة
                غير مسبوقة.
              </p>
            </motion.div>

            <div className="space-y-5">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-brand-green-light/50 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green-light flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green transition-colors duration-300">
                    <f.icon
                      size={22}
                      className="text-brand-green group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-brand-charcoal mb-1">
                      {f.title}
                    </h3>
                    <p className="text-brand-charcoal-light text-sm leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
