import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";

export const metadata: Metadata = {
  title: "تزويد الغاز — بترونير",
  description:
    "حلول غاز آمنة وموثوقة للمنشآت الصناعية والتجارية مع فحص دوري وامتثال لاشتراطات الدفاع المدني.",
};

export default function GasSupplyPage() {
  return (
    <ServiceDetail
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الخدمات", href: "/services" },
        { label: "تزويد الغاز" },
      ]}
      badge="تزويد الغاز"
      title="حلول غاز آمنة وموثوقة لمنشأتك"
      description="نزوّد المنشآت الصناعية والتجارية بالغاز وفق أعلى معايير السلامة، مع فحص دوري للخزانات والتمديدات والامتثال لاشتراطات الدفاع المدني."
      iconName="Flame"
      features={[
        "توريد منتظم",
        "فحوصات سلامة دورية",
        "امتثال للدفاع المدني",
        "دعم طوارئ على مدار الساعة",
      ]}
    />
  );
}
