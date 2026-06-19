import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";

export const metadata: Metadata = {
  title: "تزويد الديزل — بترونير",
  description:
    "توصيل الديزل عالي الجودة لجميع المنشآت بأي كمية وفي الوقت المحدد. فواتير إلكترونية متوافقة مع هيئة الزكاة والضريبة وتتبّع لحظي.",
};

export default function DieselSupplyPage() {
  return (
    <ServiceDetail
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الخدمات", href: "/services" },
        { label: "تزويد الديزل" },
      ]}
      badge="تزويد الديزل"
      title="ديزل في موقعك، في الوقت المحدد، بالكمية الصحيحة"
      description="نوفّر الديزل عالي الجودة لجميع أنواع المنشآت: المولّدات، المعدّات الثقيلة، أساطيل النقل، والمصانع. توصيل مجدول أو عند الطلب، مع فواتير إلكترونية متوافقة مع هيئة الزكاة والضريبة."
      iconName="Fuel"
      features={[
        "توصيل مجدول أو فوري",
        "أي كمية من 200 لتر فأكثر",
        "تتبّع الشاحنة لحظياً",
        "فواتير ضريبية إلكترونية",
        "تقارير استهلاك شهرية",
      ]}
    />
  );
}
