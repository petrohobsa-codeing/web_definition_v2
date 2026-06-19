"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Zap, Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="دعوة للعمل"
    >
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 -translate-y-px">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 8C120 16 240 32 360 34.7C480 37.3 600 26.7 720 21.3C840 16 960 16 1080 21.3C1200 26.7 1320 37.3 1380 42.7L1440 48V0H0Z" fill="#f9fafb" />
        </svg>
      </div>

      <div className="bg-gradient-to-br from-brand-green-dark via-brand-green-mid to-brand-green py-28 relative">
        {/* Background */}
        <div className="absolute inset-0 dot-bg opacity-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-gold/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-5 py-2.5 rounded-full text-sm font-bold border border-brand-gold/30">
              <Zap size={14} className="fill-brand-gold" />
              ابدأ اليوم مجاناً
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              جاهز لإمداد
              <span className="relative inline-block mx-3">
                <span className="relative z-10">لا ينقطع؟</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-gold/30 rounded-full -z-0" />
              </span>
            </h2>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              أكثر من 600 منشأة في المملكة تعتمد على فاست لينك لضمان وصول الوقود قبل النفاد بأنظمة ذكية ودعم لا ينقطع.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button href="/quote" variant="gold" size="lg" className="shadow-2xl shadow-brand-gold/30">
                ابدأ مع فاست لينك اليوم
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                <Phone size={16} />
                تحدّث مع خبير
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-6 border-t border-white/10">
              {[
                { v: "+600", l: "منشأة عميلة" },
                { v: "99.8٪", l: "رضا العملاء" },
                { v: "24/7", l: "دعم متواصل" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p className="text-2xl font-black text-white">{s.v}</p>
                  <p className="text-white/50 text-xs">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
