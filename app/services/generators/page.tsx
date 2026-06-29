import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";

export const metadata: Metadata = {
  title: "الطاقة البديلة والمولدات — Fast Link",
  description:
    "وساطة لتأجير المولدات الكهربائية بمختلف الأحجام للمشاريع والفعاليات والمنشآت في المملكة.",
};

export default function GeneratorsPage() {
  return (
    <ServiceDetail
      serviceName={{ ar: "الطاقة البديلة والمولدات", en: "Alternative Energy & Generators" }}
      badge={{ ar: "طاقة بديلة", en: "Alternative Energy" }}
      title={{
        ar: "مولدات كهربائية للإيجار بجميع الأحجام",
        en: "Electrical Generators for Rent in All Sizes",
      }}
      description={{
        ar: "نعمل كوسيط متخصص لتأجير المولدات الكهربائية بمختلف الأحجام والأحمال للمشاريع الإنشائية، الفعاليات والمناسبات، المنشآت الصناعية، والمواقع التي تحتاج مصادر طاقة بديلة أو احتياطية.",
        en: "We act as a specialized broker for renting electrical generators of all sizes and loads for construction projects, events, industrial facilities, and sites needing alternative or backup power.",
      }}
      iconName="Zap"
      features={{
        ar: [
          "مولدات بأحجام متعددة (10 KVA – 2000 KVA)",
          "للمشاريع الإنشائية والفعاليات",
          "مولدات احتياطية للمنشآت الحساسة",
          "توصيل وتركيب وصيانة دورية",
          "عقود تأجير مرنة قصيرة وطويلة الأمد",
          "دعم فني متاح على مدار الساعة",
        ],
        en: [
          "Generators of multiple sizes (10 KVA – 2000 KVA)",
          "For construction projects and events",
          "Backup generators for critical facilities",
          "Delivery, installation and periodic maintenance",
          "Flexible short and long-term rental contracts",
          "Technical support available 24/7",
        ],
      }}
    />
  );
}
