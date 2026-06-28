"use client";
import { useLang } from "@/context/LanguageContext";

const categories = [
  { ar: "أسطوانة غاز", en: "Gas Cylinder" },
  { ar: "شاحن كهربائي", en: "EV Charger" },
  { ar: "تركيب الشحن", en: "Charging Install" },
  { ar: "سيارة كهربائية", en: "EV Car" },
  { ar: "الطاقة الشمسية", en: "Solar Power" },
  { ar: "تخزين الطاقة", en: "Energy Storage" },
  { ar: "إنترنت الأشياء", en: "IoT" },
  { ar: "غازات صناعية", en: "Industrial Gases" },
  { ar: "زيت المحرك", en: "Engine Oil" },
  { ar: "التكييف", en: "Air Conditioning" },
  { ar: "المياه", en: "Water" },
  { ar: "الوقود", en: "Fuel" },
];

function StoreBadge({ top, bottom, bg }: { top: string; bottom: string; bg: string }) {
  return (
    <div
      className={`inline-flex items-center gap-3 ${bg} text-white rounded-lg px-5 py-2.5 min-w-[180px]`}
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current flex-shrink-0">
        <path d="M3 20.5v-17c0-.6.4-1 .9-1.1L14 12 3.9 21.6c-.5-.1-.9-.5-.9-1.1zM16 14l2.8 2.8-9.6 5.5L16 14zM16 10L9.2 1.7l9.6 5.5L16 10zm3.5 5.5L21 13.7c.6-.4.6-1.3 0-1.7L19.5 10.5 17.2 12l2.3 1.5z" />
      </svg>
      <div className="text-start leading-tight">
        <div className="text-[10px] opacity-80">{top}</div>
        <div className="text-sm font-bold">{bottom}</div>
      </div>
    </div>
  );
}

export default function DownloadNow() {
  const { lang } = useLang();
  return (
    <section className="bg-[#E8F7FC] py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left – app mockup */}
          <div className="flex justify-center">
            <div className="relative w-[280px] h-[560px] rounded-[40px] bg-brand-green-dark p-3 shadow-2xl">
              <div className="w-full h-full rounded-[30px] bg-white overflow-hidden">
                <div className="bg-gasable-gradient h-24 flex items-end p-4">
                  <span className="text-white font-extrabold italic text-2xl">Gasable</span>
                </div>
                <div className="grid grid-cols-3 gap-2 p-3">
                  {categories.map((c, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-[#F0FAF5] flex items-center justify-center text-center p-1"
                    >
                      <span className="text-[9px] font-medium text-brand-green-dark leading-tight">
                        {lang === "ar" ? c.ar : c.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right – text + badges */}
          <div>
            <h2 className="font-bold text-4xl md:text-[45px] text-brand-charcoal-mid mb-5">
              <span className="text-brand-green">{lang === "ar" ? "حمّل" : "Download"}</span>{" "}
              <span className="text-brand-green-dark">{lang === "ar" ? "الآن" : "Now"}</span>
            </h2>
            <p className="text-[#54595F] leading-7 mb-8 max-w-md">
              {lang === "ar"
                ? "اطّلع على كل ما تحتاجه في قطاع الطاقة بسهولة. حمّل تطبيق Gasable اليوم للوصول المريح إلى منتجات وحلول الطاقة."
                : "Access everything you need in the energy sector with ease. Download the Gasable app today for convenient access to energy products and solutions."}
            </p>
            <div className="flex flex-wrap gap-4">
              <StoreBadge top={lang === "ar" ? "متوفر على" : "GET IT ON"} bottom="Google Play" bg="bg-[#414141]" />
              <StoreBadge top={lang === "ar" ? "حمّل من" : "Download on the"} bottom="App Store" bg="bg-black" />
              <StoreBadge top={lang === "ar" ? "اكتشفه على" : "EXPLORE IT ON"} bottom="AppGallery" bg="bg-[#C8102E]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
