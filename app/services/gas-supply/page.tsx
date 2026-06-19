import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";

export const metadata: Metadata = {
  title: "تزويد البترول — Fast Link",
  description:
    "توصيل البترول عالي الجودة للمنشآت الصناعية والتجارية وأساطيل النقل بأعلى معايير السلامة وفواتير ضريبية إلكترونية.",
};

export default function PetrolSupplyPage() {
  return (
    <ServiceDetail
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الخدمات", href: "/services" },
        { label: "تزويد البترول" },
      ]}
      badge="تزويد البترول"
      title="بترول عالي الجودة في موقعك، بالكمية الصحيحة"
      description="نوصّل البترول للمنشآت الصناعية والتجارية وأساطيل النقل في جميع مناطق المملكة. إمداد منتظم أو عند الطلب، مع معايير جودة صارمة وفواتير ضريبية إلكترونية متوافقة مع هيئة الزكاة والضريبة."
      iconName="Flame"
      features={[
        "توصيل منتظم أو عند الطلب",
        "جودة مضمونة وموثّقة",
        "فواتير ضريبية إلكترونية",
        "تتبّع الشحنة لحظياً",
        "تقارير استهلاك شهرية",
        "دعم طوارئ على مدار الساعة",
      ]}
    />
  );
}
