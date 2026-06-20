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
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الخدمات", href: "/services" },
        { label: "الإمداد المائي" },
      ]}
      badge="إمداد مائي"
      title="مياه التحلية والشرب تصل لموقعك"
      description="نوفّر خدمات توزيع وتوريد مياه التحلية ومياه الشرب العذبة للمشاريع الإنشائية والأحياء والمجمعات في مناطق الرياض، مكة المكرمة، المدينة المنورة، ينبع، وتبوك."
      iconName="Cpu"
      features={[
        "مياه تحلية معتمدة وعالية الجودة",
        "مياه شرب عذبة للمواقع والمشاريع",
        "صهاريج بأحجام مناسبة لجميع الاحتياجات",
        "توصيل منتظم أو عند الطلب",
        "تغطية: الرياض، مكة، المدينة، ينبع، تبوك",
        "أسعار تنافسية وعقود دورية",
      ]}
    />
  );
}
