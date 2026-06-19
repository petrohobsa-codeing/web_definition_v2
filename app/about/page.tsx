import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ChevronLeft, Target, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن — بترونير",
  description:
    "تعرّف على بترونير — المنظومة الرائدة في السعودية لإدارة الطاقة الصناعية المدعومة بإنترنت الأشياء منذ 2018.",
};

const stats = [
  { value: "500+", label: "عميل نشط" },
  { value: "99.9%", label: "ضمان التشغيل" },
  { value: "15M", label: "لتر متتبَّع" },
  { value: "24h", label: "دعم ميداني" },
];

const values = [
  {
    icon: Heart,
    title: "نزاهة مطلقة",
    description:
      "شفافية في كل لتر يُسلَّم وكل نقطة بيانات تُسجَّل.",
    color: "from-rose-500 to-rose-400",
  },
  {
    icon: Target,
    title: "مرونة صناعية",
    description:
      "استجابة سريعة لأكثر الجداول الزمنية تطلباً في المملكة.",
    color: "from-brand-green to-brand-green-mid",
  },
  {
    icon: Eye,
    title: "اتصال ذكي",
    description:
      "توظيف أحدث تقنيات إنترنت الأشياء لتبسيط الخدمات اللوجستية المعقّدة.",
    color: "from-blue-500 to-blue-400",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full bg-brand-gold/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft size={14} className="rotate-180" />
            <span className="text-white font-medium">من نحن</span>
          </nav>

          <div className="max-w-3xl">
            <Badge
              variant="gold"
              className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30"
            >
              منذ 2018
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              نُعيد ابتكار إدارة الوقود
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              المنظومة الرائدة في السعودية لإدارة الطاقة الصناعية المدعومة
              بإنترنت الأشياء.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-5">قصتنا</Badge>
              <h2 className="text-4xl font-black text-brand-charcoal mb-6">
                منذ 2018 — قصتنا
              </h2>
              <p className="text-brand-charcoal-light leading-loose text-lg mb-8">
                وُلدت بترونير من ملاحظة بسيطة: المنشآت تخسر آلاف الريالات
                يومياً بسبب توقّف العمليات عند نفاد الوقود، أو بسبب الهدر
                والسرقة غير المراقبة. فجمعنا بين خبرة الإمداد اللوجستي
                وتقنيات الاستشعار الذكية لنبني منظومة تضمن ألّا يتوقّف عمل
                عملائنا أبداً.
              </p>
              <blockquote className="border-r-4 border-brand-gold pr-6 py-2 italic text-brand-charcoal text-xl font-bold leading-loose">
                &ldquo;الدقة ليست مجرد مقياس لدينا — بل هي أساس الثقة.&rdquo;
              </blockquote>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-gradient-to-br from-brand-green-dark to-brand-green-mid rounded-3xl p-8 text-white text-center"
                >
                  <p className="text-4xl md:text-5xl font-black text-brand-gold mb-2">
                    {s.value}
                  </p>
                  <p className="text-white/70 font-medium text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-brand-green-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-4xl p-10 border border-brand-green/10 hover:shadow-xl hover:shadow-brand-green/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mb-6">
                <Eye size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-4">
                رؤيتنا
              </h3>
              <p className="text-brand-charcoal-light leading-loose">
                أن نكون الجهاز العصبي المركزي لإدارة الطاقة الصناعية في
                السعودية، ممكّنين مستقبلاً خالياً من الهدر ومبنياً على
                البيانات لكل مشروع بنية تحتية كبير.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-4xl p-10 border border-brand-gold/20 hover:shadow-xl hover:shadow-brand-gold/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold flex items-center justify-center mb-6">
                <Target size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-4">
                رسالتنا
              </h3>
              <p className="text-brand-charcoal-light leading-loose">
                تمكين المنشآت بحساسات إنترنت الأشياء اللحظية وسلاسل إمداد
                ديزل سلسة تضمن صفر توقّف وأقصى كفاءة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-5">قيمنا</Badge>
            <h2 className="text-4xl font-black text-brand-charcoal">
              قيمنا الأساسية
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="relative bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:border-brand-green/20 transition-all duration-400 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-green-light/50 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-6`}
                >
                  <v.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-black text-brand-charcoal mb-3">
                  {v.title}
                </h3>
                <p className="text-brand-charcoal-light leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-green-dark relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-4xl font-black text-white">
            انضم إلى عائلة بترونير
          </h2>
          <p className="text-white/70 leading-relaxed text-lg">
            كن جزءاً من أكثر من 500 منشأة تثق بنا لتأمين طاقتها على مدار
            الساعة.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="/quote" variant="gold" size="lg">
              اطلب عرض سعر
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              اتصل بنا
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
