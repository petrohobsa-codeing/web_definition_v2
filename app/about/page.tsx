import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ChevronLeft, Target, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن — Fast Link",
  description:
    "شركة فاست لينك للخدمات اللوجستية والبترولية — شركة وساطة تجارية رائدة في المملكة تربط الموردين بالعملاء بأسرع طريقة وأعلى كفاءة.",
};

const stats = [
  { value: "4", label: "خدمات لوجستية متكاملة" },
  { value: "5+", label: "مناطق تغطية في المملكة" },
  { value: "24/7", label: "متاحون للطلبات الطارئة" },
  { value: "100%", label: "التزام بالمواعيد والجودة" },
];

const values = [
  {
    icon: Heart,
    title: "الموثوقية",
    description: "نلتزم بمواعيد التسليم وجودة المنتجات لأن ثقة عملائنا هي رأس مالنا الأول.",
    color: "from-rose-500 to-rose-400",
  },
  {
    icon: Target,
    title: "السرعة والكفاءة",
    description: "نربط الموردين بالعملاء بأسرع الطرق وأعلى كفاءة لضمان استمرارية العمليات.",
    color: "from-brand-green to-brand-green-mid",
  },
  {
    icon: Eye,
    title: "الشفافية",
    description: "نتعامل بوضوح تام في الأسعار والمواصفات لنبني علاقات طويلة الأمد مع عملائنا.",
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
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} className="rotate-180" />
            <span className="text-white font-medium">من نحن</span>
          </nav>
          <div className="max-w-3xl">
            <Badge variant="gold" className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
              شركة وساطة لوجستية
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              نربط الموردين بالعملاء
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              شركة وساطة تجارية ولوجستية رائدة في المملكة العربية السعودية.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-5">من نحن</Badge>
              <h2 className="text-4xl font-black text-brand-charcoal mb-6">
                شركة فاست لينك للخدمات اللوجستية والبترولية
              </h2>
              <p className="text-brand-charcoal-light leading-loose text-lg mb-6">
                شركة وساطة تجارية ولوجستية رائدة في المملكة العربية السعودية، نعمل كحلقة وصل استراتيجية لربط الموردين بالعملاء بأسرع طريقة وأفضل كفاءة.
              </p>
              <p className="text-brand-charcoal-light leading-loose text-lg mb-8">
                نقدّم خدماتنا في مجالات المنتجات البترولية والغاز، والحلول البيئية وسحب الصرف، والإمداد المائي، وتأجير المولدات الكهربائية — ونغطي شبكة واسعة من المدن والمناطق الحيوية في المملكة.
              </p>
              <blockquote className="border-r-4 border-brand-gold pr-6 py-2 italic text-brand-charcoal text-xl font-bold leading-loose">
                &ldquo;نحن الحلقة التي تربط احتياجاتك بالموردين الموثوقين.&rdquo;
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div key={s.label} className="bg-gradient-to-br from-brand-green-dark to-brand-green-mid rounded-3xl p-8 text-white text-center">
                  <p className="text-4xl md:text-5xl font-black text-brand-gold mb-2">{s.value}</p>
                  <p className="text-white/70 font-medium text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-24 bg-brand-green-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-5">مناطق التغطية</Badge>
            <h2 className="text-4xl font-black text-brand-charcoal mb-4">نغطي المناطق الحيوية في المملكة</h2>
            <p className="text-brand-charcoal-light max-w-xl mx-auto">شبكة واسعة من المدن والمناطق لخدمة عملائنا أينما كانوا</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["الرياض", "مكة المكرمة", "المدينة المنورة", "ينبع", "تبوك"].map((city) => (
              <div key={city} className="bg-white rounded-2xl px-8 py-4 border border-brand-green/20 shadow-sm text-center">
                <p className="text-brand-green-dark font-black text-lg">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-4xl p-10 border border-brand-green/10 hover:shadow-xl hover:shadow-brand-green/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mb-6">
                <Eye size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-4">رؤيتنا</h3>
              <p className="text-brand-charcoal-light leading-loose">
                أن نكون المرجع الأول لخدمات الوساطة اللوجستية والبترولية في المملكة، بشبكة موردين موثوقة وتغطية جغرافية شاملة.
              </p>
            </div>
            <div className="bg-white rounded-4xl p-10 border border-brand-gold/20 hover:shadow-xl hover:shadow-brand-gold/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold flex items-center justify-center mb-6">
                <Target size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-4">رسالتنا</h3>
              <p className="text-brand-charcoal-light leading-loose">
                تمكين المنشآت والمشاريع من الحصول على كل احتياجاتها اللوجستية من مصدر واحد موثوق، بأسعار تنافسية وخدمة فائقة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-5">قيمنا</Badge>
            <h2 className="text-4xl font-black text-brand-charcoal">ما يميّزنا</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="relative bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:border-brand-green/20 transition-all duration-400 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-green-light/50 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-6`}>
                  <v.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-black text-brand-charcoal mb-3">{v.title}</h3>
                <p className="text-brand-charcoal-light leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-green-dark relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-4xl font-black text-white">تواصل معنا اليوم</h2>
          <p className="text-white/70 leading-relaxed text-lg">
            سواء كنت تبحث عن موردٍ للمنتجات البترولية أو تحتاج خدمة لوجستية متخصصة، فريقنا جاهز للمساعدة.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="/quote" variant="gold" size="lg">اطلب عرض سعر</Button>
            <Button href="/contact" variant="outline" size="lg">اتصل بنا</Button>
          </div>
        </div>
      </section>
    </>
  );
}
