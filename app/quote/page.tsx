import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import QuoteForm from "@/components/sections/QuoteForm";
import { ChevronLeft, Clock, CheckCircle2, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "اطلب عرض سعر — Fast Link",
  description:
    "احصل على عرض سعر مخصّص من فاست لينك للخدمات اللوجستية والبترولية. منتجات بترولية، حلول بيئية، إمداد مائي، ومولدات كهربائية.",
};

const promises = [
  {
    icon: Clock,
    title: "خلال 24 ساعة",
    description: "نردّ عليك بعرض مخصّص خلال يوم عمل واحد",
  },
  {
    icon: CheckCircle2,
    title: "مخصّص لك",
    description: "كل عرض مُصمَّم حسب احتياجات منشأتك تحديداً",
  },
  {
    icon: Headphones,
    title: "دعم مستمر",
    description: "فريق متخصص جاهز للإجابة على أسئلتك",
  },
];

export default function QuotePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft size={14} className="rotate-180" />
            <span className="text-white font-medium">اطلب عرض سعر</span>
          </nav>
          <div className="max-w-2xl">
            <Badge
              variant="gold"
              className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30"
            >
              عرض سعر مجاني
            </Badge>
            <h1 className="text-5xl font-black text-white mb-4">
              اطلب عرض سعر
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              أخبرنا باحتياجك وسنعدّ لك عرضاً مخصّصاً خلال 24 ساعة.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar promises */}
            <div className="space-y-5">
              <h2 className="text-xl font-black text-brand-charcoal mb-6">
                وعدنا لك
              </h2>
              {promises.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-green-light flex items-center justify-center flex-shrink-0">
                    <p.icon size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="font-black text-brand-charcoal mb-1">
                      {p.title}
                    </p>
                    <p className="text-brand-charcoal-light text-sm leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Coverage badge */}
              <div className="bg-gradient-to-br from-brand-green-dark to-brand-green-mid rounded-3xl p-7 text-white">
                <p className="font-black text-brand-gold text-lg mb-4">مناطق التغطية</p>
                <div className="flex flex-wrap gap-2">
                  {["الرياض", "مكة المكرمة", "المدينة المنورة", "ينبع", "تبوك"].map((city) => (
                    <span key={city} className="bg-white/15 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-4xl p-8 md:p-10 shadow-xl shadow-brand-green/5 border border-gray-100">
              <h2 className="text-2xl font-black text-brand-charcoal mb-8">
                تفاصيل طلبك
              </h2>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
