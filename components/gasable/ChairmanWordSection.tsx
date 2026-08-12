"use client";
import Image from "next/image";
import Reveal from "@/components/gasable/Reveal";
import { useLang } from "@/context/LanguageContext";

const chairman = {
  photo: "/images/chairman/naif-bin-haidarah.jpg",
  ar: {
    badge: "كلمة رئيس مجلس الإدارة",
    title: "رؤية تبدأ بفهم الواقع، وندعمها بجودة التنفيذ",
    subtitle: "نحو علاقة أكثر وضوحًا بين المنشآت واحتياجاتها من الطاقة",
    paragraphs: [
      "يشهد قطاع الطاقة تحولًا متسارعًا؛ فلم تعد احتياجات المنشآت تتوقف عند توافر المنتج، بل أصبحت ترتبط بانتظام الإمداد، ودقة الكميات، وسلامة الإجراءات، وسرعة الوصول إلى المعلومة التي تُبنى عليها القرارات التشغيلية.",
      "من هذا الفهم انطلقت Petrohub لبناء أسلوب عمل يربط الاحتياج بالتخطيط والتنفيذ والمتابعة والتوثيق. هدفنا أن نخفف التعقيد عن العميل، وأن نجعل كل مرحلة أكثر وضوحًا؛ من لحظة استلام الطلب حتى إتمام التسليم، ثم تحويل ما يحدث ميدانيًا إلى بيانات تساعد على التخطيط والتحكم.",
      "ومنذ عام 2004، راكمنا خبراتٍ عملية في خدمة قطاعات متعددة، وطوّرنا قدراتنا بما يواكب تغير السوق وارتفاع توقعات العملاء. وخلال هذه المسيرة، ظل الالتزام والجودة والمصداقية أساسًا لعلاقاتنا وشراكاتنا.",
      "نؤمن بأن مستقبل القطاع لا يصنعه التوريد وحده، بل تصنعه القدرة على الجمع بين الكفاءة الميدانية، والمتابعة المنضبطة، وأنظمة المراقبة والقياس التي تمنح المنشأة رؤية أشمل لأصولها واستهلاكها. لذلك نواصل تطوير خدماتنا ومنتجاتنا بما يرفع مستوى الثقة، ويمنح عملاءنا قدرة أكبر على السيطرة على عملياتهم.",
      "طموحنا أن تكون Petrohub شريكًا مؤسسيًا يُعتمد عليه؛ داخل المملكة العربية السعودية وخارجها، وأن نسهم في بناء نموذج أكثر تطورًا لإدارة الطاقة، يقوم على الوضوح، والدقة، والاستجابة، والقيمة المستدامة.",
    ],
    name: "نايف بن حيدره",
    role: "رئيس مجلس الإدارة",
  },
  en: {
    badge: "Chairman's Address",
    title: "A vision that commences with a comprehension of reality, which we bolster through quality execution",
    subtitle: "Towards a more transparent relationship between facilities and their energy requirements",
    paragraphs: [
      "The energy sector is experiencing a swift transformation; the requirements of facilities extend beyond mere product availability to encompass the consistency of supply, the precision of quantities, the safety of procedures, and the promptness of access to information that informs operational decisions.",
      "From this understanding, Petrohub has developed a work methodology that connects needs with planning, execution, follow-up, and documentation. Our objective is to simplify the process for the client and clarify each stage, from the moment the order is received until delivery is finalized, subsequently transforming on-site occurrences into data that supports planning and control.",
      "Since 2004, we have amassed practical experience across various sectors and enhanced our capabilities to adapt to market changes and increasing customer expectations. Throughout this journey, commitment, quality and credibility have remained the cornerstone of our relationships and partnerships.",
      "We believe the future of this sector is not shaped by supply alone, but by the ability to combine field efficiency, disciplined follow-up, and monitoring and measurement systems that give the facility a fuller view of its assets and consumption. That is why we continue developing our services and products to raise the level of trust and give our clients greater control over their operations.",
      "Our ambition is for Petrohub to be a dependable institutional partner — inside the Kingdom of Saudi Arabia and beyond — and to contribute to building a more advanced model for energy management, one built on clarity, accuracy, responsiveness and sustainable value.",
    ],
    name: "Naif bin Haidarah",
    role: "Chairman of the Board",
  },
};

export default function ChairmanWordSection() {
  const { lang } = useLang();

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="bg-white rounded-4xl border border-gray-100 shadow-xl shadow-brand-green/5 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <h2 className="text-2xl md:text-4xl font-black text-brand-charcoal mb-3 leading-tight">
                  {chairman[lang].title}
                </h2>
                <p className="text-base md:text-lg font-bold text-brand-gold mb-6">{chairman[lang].subtitle}</p>
                <div className="space-y-4">
                  {chairman[lang].paragraphs.map((p, i) => (
                    <p key={i} className="text-brand-charcoal-light leading-loose text-base md:text-lg">{p}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <p className="text-brand-charcoal font-black text-xl">{chairman[lang].name}</p>
                  <p className="text-brand-gold font-bold text-base">{chairman[lang].role}</p>
                </div>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-28">
                <div className="relative max-w-sm mx-auto aspect-[3/4] drop-shadow-lg group">
                  <div
                    className="relative w-full h-full overflow-hidden"
                    style={{ clipPath: "polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)" }}
                  >
                    <Image
                      src={chairman.photo}
                      alt={chairman[lang].name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
