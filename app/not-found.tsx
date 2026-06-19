import Link from "next/link";
import { Fuel, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-green-dark to-brand-green-mid flex items-center justify-center relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute inset-0 dot-bg opacity-15" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-green flex items-center justify-center">
            <Fuel size={32} className="text-white" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-[120px] md:text-[160px] font-black text-white/10 leading-none mb-0">
          404
        </h1>

        <div className="-mt-10 mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-white/60 leading-relaxed">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها. دعنا
            نعيدك للطريق الصحيح.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-green-dark px-7 py-4 rounded-full font-black hover:bg-brand-gold-dark transition-colors duration-200"
          >
            <Home size={18} />
            العودة للرئيسية
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-7 py-4 rounded-full font-bold hover:bg-white/20 transition-colors duration-200"
          >
            <ArrowLeft size={18} className="rotate-180" />
            تواصل معنا
          </Link>
        </div>
      </div>
    </div>
  );
}
