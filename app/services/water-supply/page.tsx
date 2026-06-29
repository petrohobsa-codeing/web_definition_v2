import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";

export const metadata: Metadata = {
  title: "الإمداد المائي — Fast Link",
  description:
    "توزيع وتوريد مياه التحلية ومياه الشرب العذبة للمشاريع والمواقع في الرياض ومكة والمدينة وينبع وتبوك.",
};

export default function WaterSupplyPage() {
  return (
    <ServiceDetail
      serviceName={{ ar: "الإمداد المائي", en: "Water Supply" }}
      badge={{ ar: "إمداد مائي", en: "Water Supply" }}
      title={{
        ar: "مياه التحلية والشرب تصل لموقعك",
        en: "Desalinated and Drinking Water Delivered to Your Site",
      }}
      description={{
        ar: "نوفّر خدمات توزيع وتوريد مياه التحلية ومياه الشرب العذبة للمشاريع الإنشائية والأحياء والمجمعات في مناطق الرياض، مكة المكرمة، المدينة المنورة، ينبع، وتبوك.",
        en: "We provide distribution and supply of desalinated and fresh drinking water for construction projects, neighborhoods and complexes in Riyadh, Makkah, Madinah, Yanbu and Tabuk.",
      }}
      iconName="Droplets"
      features={{
        ar: [
          "مياه تحلية معتمدة وعالية الجودة",
          "مياه شرب عذبة للمواقع والمشاريع",
          "صهاريج بأحجام مناسبة لجميع الاحتياجات",
          "توصيل منتظم أو عند الطلب",
          "تغطية: الرياض، مكة، المدينة، ينبع، تبوك",
          "أسعار تنافسية وعقود دورية",
        ],
        en: [
          "Certified high-quality desalinated water",
          "Fresh drinking water for sites and projects",
          "Tankers sized for every need",
          "Regular or on-demand delivery",
          "Coverage: Riyadh, Makkah, Madinah, Yanbu, Tabuk",
          "Competitive prices and periodic contracts",
        ],
      }}
    />
  );
}
