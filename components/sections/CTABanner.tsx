"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section
      className="py-24 bg-gradient-to-br from-brand-green-dark via-brand-green-mid to-brand-green relative overflow-hidden"
      aria-label="دعوة للعمل"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 dot-bg opacity-15" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-7"
        >
          {/* Decorative pill */}
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-5 py-2 rounded-full text-sm font-bold">
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
            ابدأ اليوم
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            جاهز لإمداد لا ينقطع؟
          </h2>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            انضم إلى مئات المنشآت التي تعتمد على بترونير لضمان استمرارية أعمالها
            بأذكى الوسائل التقنية.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button href="/quote" variant="gold" size="lg">
              ابدأ مع بترونير اليوم
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              تحدّث مع خبير
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
