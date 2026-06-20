import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";

export const metadata: Metadata = {
  title: "الخدمات البترولية والغاز — Fast Link",
  description:
    "وساطة وتوريد المنتجات البترولية: بنزين (91، 95)، ديزل، وغاز مسال للمنشآت والمشاريع في جميع مناطق المملكة.",
};

export default function PetroleumPage() {
  return (
    <ServiceDetail
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الخدمات", href: "/services" },
        { label: "الخدمات البترولية والغاز" },
      ]}
      badge="خدمات بترولية"
      title="وسيطك الموثوق للمنتجات البترولية"
      description="نعمل كحلقة وصل استراتيجية بين الموردين والعملاء لتوريد المنتجات البترولية بجميع أنواعها: بنزين 91، بنزين 95، ديزل، وغاز مسال للمنشآت الصناعية والتجارية والمشاريع والأساطيل."
      iconName="Fuel"
      features={[
        "بنزين 91 و95 بجميع الكميات",
        "ديزل للمولدات والمعدات الثقيلة",
        "غاز مسال للمنشآت الصناعية",
        "أسعار تنافسية من موردين معتمدين",
        "توصيل سريع لجميع مناطق التغطية",
        "فواتير ضريبية إلكترونية",
      ]}
    />
  );
}
