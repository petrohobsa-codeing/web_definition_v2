import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Fuel, Flame, Cpu, MonitorCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "الخدمات — Fast Link",
  description:
    "تزويد الديزل والغاز، حساسات IoT الذكية، وحلول المراقبة عن بُعد. إدارة وقود متكاملة من اللتر الأول حتى آخر تقرير.",
};

const services = [
  {
    icon: Fuel,
    title: "توصيل الديزل السريع",
    description:
      "نوصّل الديزل عالي الجودة لمولّداتك ومعداتك الثقيلة بأي كمية وفي أي موقع داخل المملكة. خيار التوصيل المجدول أو الفوري مع فواتير ضريبية إلكترونية متوافقة مع هيئة الزكاة والضريبة.",
    href: "/services/diesel-supply",
    gradient: "from-brand-green-dark to-brand-green",
    features: ["توصيل مجدول أو فوري", "فواتير ضريبية إلكترونية", "تتبّع الشاحنة لحظياً"],
  },
  {
    icon: Flame,
    title: "تزويد الغاز الصناعي",
    description:
      "نزوّد المنشآت الصناعية والتجارية بالغاز الصناعي وفق أعلى معايير السلامة، مع فحص دوري للخزانات والتمديدات وامتثال كامل لاشتراطات الدفاع المدني.",
    href: "/services/gas-supply",
    gradient: "from-amber-700 to-amber-500",
    features: ["فحوصات سلامة دورية", "امتثال الدفاع المدني", "دعم فني 24/7"],
  },
  {
    icon: Cpu,
    title: "حساسات القياس الذكي",
    description:
      "أجهزة استشعار دقيقة تُثبَّت على خزاناتك لقياس المستوى لحظياً، مع تنبيهات فورية عند الاقتراب من النفاد وكشف أي سحب غير مبرر وطلب تلقائي للإمداد.",
    href: "/services/smart-sensors",
    gradient: "from-blue-700 to-blue-500",
    features: ["دقة قياس ±1%", "تنبيهات لحظية", "طلب إمداد تلقائي"],
  },
  {
    icon: MonitorCheck,
    title: "إدارة الطاقة الرقمية",
    description:
      "منصة سحابية متكاملة تعرض بيانات جميع خزاناتك ومواقعك في لوحة واحدة، مع تقارير الاستهلاك وتحليلات التكلفة وصلاحيات متعددة المستخدمين وتصدير البيانات.",
    href: "/services/remote-monitoring",
    gradient: "from-purple-700 to-purple-500",
    features: ["لوحة تحكم موحّدة", "تقارير وتحليلات", "تكامل API مفتوح"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Badge
            variant="gold"
            className="mb-6 !bg-brand-gold/20 !text-brand-gold !border-brand-gold/30"
          >
            خدماتنا
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            الخدمات
          </h1>
          <p className="text-white/70 text-xl mb-4 max-w-2xl mx-auto">
            حلول طاقة متكاملة: توصيل سريع، مراقبة ذكية، وشفافية تامة.
          </p>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
            نجمع بين أسطول توصيل متطور وأنظمة مراقبة رقمية لضمان استمرارية عملياتك.
          </p>
        </div>
      </section>

      {/* Services cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.href}
                className="group relative bg-white rounded-4xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-400"
              >
                {/* Gradient bar */}
                <div
                  className={`h-2 bg-gradient-to-r ${service.gradient}`}
                />
                <div className="p-8">
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <service.icon size={26} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-brand-charcoal mb-1">
                        {service.title}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((f) => (
                          <span
                            key={f}
                            className="text-xs font-bold text-brand-green bg-brand-green-light px-3 py-1 rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-brand-charcoal-light leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-brand-green font-black hover:gap-3 transition-all duration-200"
                  >
                    اعرف المزيد
                    <ArrowLeft size={18} className="rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-brand-charcoal-light mb-6 text-lg">
              لا تجد ما تبحث عنه؟ تحدّث مع فريقنا
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button href="/quote" size="lg">
                اطلب عرض سعر
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                اتصل بنا
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
