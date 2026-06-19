"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { CheckCircle2, Award, Users, BarChart3 } from "lucide-react";
import { siteImages } from "@/lib/images";

const points = [
  "توصيل الوقود في الوقت المحدد لأي موقع في المملكة",
  "حساسات IoT دقيقة لمراقبة مستوى الخزانات لحظياً",
  "فواتير ضريبية إلكترونية متوافقة مع متطلبات هيئة الزكاة",
  "دعم فني ميداني متاح على مدار الساعة طوال الأسبوع",
  "تقارير استهلاك مفصّلة تُساعدك على تخفيض التكاليف",
  "امتثال تام لاشتراطات الدفاع المدني والجهات الرسمية",
];

const badges = [
  { icon: Award, title: "معتمد رسمياً", desc: "من الجهات المختصة" },
  { icon: Users, title: "+600 منشأة", desc: "تثق بنا يومياً" },
  { icon: BarChart3, title: "99.9٪ دقة", desc: "في كل عملية توصيل" },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" aria-labelledby="whyus-title">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-brand-green-light/60 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-brand-gold-light/30 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-5">لماذا Fast Link</Badge>
            <h2
              id="whyus-title"
              className="text-4xl md:text-5xl font-black text-brand-charcoal mb-5 leading-tight"
            >
              لماذا تختار
              <span className="text-brand-green block">Fast Link؟</span>
            </h2>
            <p className="text-brand-charcoal-light leading-loose text-lg mb-8">
              نحن لا نوفّر الوقود فحسب، بل نوفّر راحة البال. نظامنا مصمّم
              ليكون شريكك الاستراتيجي الذي يضمن استمرارية عملياتك وتحكّمك الكامل في تكاليف الطاقة.
            </p>
            <div className="space-y-3 mb-10">
              {points.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-green-light/50 transition-colors duration-200"
                >
                  <CheckCircle2 size={20} className="text-brand-green flex-shrink-0 mt-0.5" />
                  <span className="text-brand-charcoal font-medium text-sm">{point}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {badges.map((b) => (
                <div
                  key={b.title}
                  className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-gray-100 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-green-light flex items-center justify-center flex-shrink-0">
                    <b.icon size={18} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-brand-charcoal font-black text-sm">{b.title}</p>
                    <p className="text-brand-charcoal-light text-xs">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {siteImages.whyUs ? (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-green/10 border border-gray-100">
                <Image
                  src={siteImages.whyUs}
                  alt="لماذا Fast Link"
                  width={600}
                  height={500}
                  className="object-cover w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/40 to-transparent" />
              </div>
            ) : (
              <div className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid rounded-3xl p-10 text-white overflow-hidden shadow-2xl shadow-brand-green/20">
                <div className="absolute inset-0 dot-bg opacity-15" />
                <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-brand-gold/20 blur-2xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-4 py-2 rounded-full text-sm font-bold mb-8">
                    <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
                    شريكك الموثوق منذ 2018
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { v: "500+", l: "عميل نشط" },
                      { v: "99.9%", l: "ضمان التشغيل" },
                      { v: "15M", l: "لتر متتبَّع" },
                      { v: "24/7", l: "دعم ميداني" },
                    ].map((s) => (
                      <div key={s.l} className="bg-white/10 rounded-2xl p-5 text-center hover:bg-white/15 transition-colors">
                        <p className="text-3xl font-black text-brand-gold mb-1">{s.v}</p>
                        <p className="text-white/60 text-sm">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="text-white/75 text-base leading-loose border-r-4 border-brand-gold pr-5">
                    &ldquo;الدقة ليست مجرد مقياس لدينا — بل هي أساس الثقة.&rdquo;
                  </blockquote>
                </div>
              </div>
            )}

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl shadow-brand-green/15 p-4 border border-gray-100 flex items-center gap-3"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center">
                <CheckCircle2 size={20} className="text-brand-green" />
              </div>
              <div>
                <p className="font-black text-brand-charcoal text-sm">معتمد ومرخّص</p>
                <p className="text-brand-charcoal-light text-xs">كل العمليات موثّقة</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
