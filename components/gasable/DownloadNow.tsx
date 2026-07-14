"use client";
import { useLang } from "@/context/LanguageContext";

const categories = [
  { ar: "غاز LPG", en: "LPG" },
  { ar: "منتجات بترولية", en: "Oil" },
  { ar: "مياه وبيئة", en: "Water" },
  { ar: "حلول طاقة", en: "Energy" },
  { ar: "PetroHub IoT", en: "IoT" },
  { ar: "لوجستيات", en: "Logistics" },
  { ar: "تتبع المركبات", en: "Tracking" },
  { ar: "الأساطيل", en: "Fleets" },
  { ar: "التقارير", en: "Reports" },
  { ar: "الطلبات", en: "Orders" },
  { ar: "التنبيهات", en: "Alerts" },
  { ar: "دعم 24/7", en: "24/7 Support" },
];

function StoreBadge({ top, bottom, bg }: { top: string; bottom: string; bg: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${bg} text-white rounded-lg px-5 py-2.5 min-w-[170px]`}>
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
    <section className="bg-[#E8EEF9] py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left – app mockup */}
          <div className="flex justify-center">
            <div className="relative w-[280px] h-[560px] rounded-[40px] bg-[#081B45] p-3 shadow-2xl">
              <div className="w-full h-full rounded-[30px] bg-white overflow-hidden">
                <div className="bg-gasable-gradient h-24 flex items-end p-4 relative">
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
                  <span className="text-white font-extrabold italic text-2xl">Petrohub</span>
                </div>
                <div className="grid grid-cols-3 gap-2 p-3">
                  {categories.map((c, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-[#F3F6FC] flex items-center justify-center text-center p-1">
                      <span className="text-[9px] font-semibold text-brand-green-dark leading-tight">
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
            <h2 className="font-bold text-4xl md:text-[45px] mb-5">
              <span className="text-brand-green">{lang === "ar" ? "حمّل" : "Download"}</span>{" "}
              <span className="text-[#0067E3]">{lang === "ar" ? "تطبيقنا" : "Our App"}</span>
            </h2>
            <p className="text-[#54595F] leading-7 mb-8 max-w-md">
              {lang === "ar"
                ? "اطلب كل خدماتك اللوجستية والبترولية بسهولة من مكان واحد. حمّل تطبيق Petrohub وتابع طلباتك لحظة بلحظة."
                : "Order all your logistics and petroleum services easily from one place. Download the Petrohub app and track your orders in real time."}
            </p>
            <div className="flex flex-wrap gap-4">
              <StoreBadge top={lang === "ar" ? "متوفر على" : "GET IT ON"} bottom="Google Play" bg="bg-[#0C2D6B]" />
              <StoreBadge top={lang === "ar" ? "حمّل من" : "Download on the"} bottom="App Store" bg="bg-[#081B45]" />
              <StoreBadge top={lang === "ar" ? "اكتشفه على" : "EXPLORE IT ON"} bottom="AppGallery" bg="bg-[#0067E3]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
