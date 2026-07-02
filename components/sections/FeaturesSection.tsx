"use client";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import { Handshake, BadgeCheck, MapPin, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Handshake,
    title: "وساطة احترافية",
    description:
      "نعمل حلقة وصل بين الموردين والعملاء لضمان أفضل الأسعار وأسرع التوصيل.",
  },
  {
    icon: BadgeCheck,
    title: "موردون معتمدون",
    description:
      "شبكة من الموردين الموثوقين المرخّصين في جميع مناطق التغطية.",
  },
  {
    icon: MapPin,
    title: "تغطية واسعة",
    description:
      "نخدم الرياض، مكة المكرمة، المدينة المنورة، ينبع، وتبوك.",
  },
  {
    icon: HeadphonesIcon,
    title: "دعم متواصل",
    description:
      "فريقنا جاهز للرد على طلباتك وتنسيق الإمداد في أي وقت تحتاج.",
  },
];

const services = [
  { name: "الخدمات البترولية والغاز", pct: 100 },
  { name: "الحلول البيئية والصرف", pct: 100 },
  { name: "الإمداد المائي", pct: 100 },
  { name: "الطاقة البديلة (المولدات)", pct: 100 },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" aria-labelledby="features-title">
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
            <div className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-brand-green to-brand-green-dark p-1">
              <div className="rounded-3xl bg-brand-green-dark/90 p-8 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/50 text-xs font-medium">بتروهوب</p>
                    <p className="text-white font-black">خدماتنا اللوجستية</p>
                  </div>
                  <span className="bg-brand-green/30 text-green-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    متاح الآن
                  </span>
                </div>
                {services.map((item) => (
                  <div key={item.name} className="bg-white/5 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 text-sm font-medium">{item.name}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-green/20 text-green-300">
                        متوفر
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #059669, #34D399)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  {[
                    { v: "5", l: "مناطق تغطية" },
                    { v: "4", l: "خدمات متكاملة" },
                    { v: "24/7", l: "طلبات طارئة" },
                    { v: "100%", l: "التزام بالجودة" },
                  ].map((s) => (
                    <div key={s.l} className="text-center bg-white/5 rounded-xl p-3">
                      <p className="text-white font-black text-sm">{s.v}</p>
                      <p className="text-white/40 text-xs leading-tight">{s.l}</p>
                    </div>
                  ))}
                </div>
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
              <Badge className="mb-4">لماذا بتروهوب</Badge>
              <SectionHeading
                id="features-title"
                text="الوصل الأمثل بين الموردين والعملاء"
                align="right"
                className="mb-4"
              />
              <p className="text-brand-charcoal-light leading-relaxed">
                نضمن حصولك على ما تحتاجه بالسرعة المطلوبة وبأسعار تنافسية من موردين معتمدين.
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
                      className="text-brand-green group-hover:text-white hover-grow transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-brand-charcoal mb-1">{f.title}</h3>
                    <p className="text-brand-charcoal-light text-sm leading-relaxed">{f.description}</p>
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
