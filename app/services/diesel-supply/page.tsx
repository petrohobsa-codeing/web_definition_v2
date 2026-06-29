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
      serviceName={{ ar: "الخدمات البترولية والغاز", en: "Petroleum & Gas Services" }}
      badge={{ ar: "خدمات بترولية", en: "Petroleum Services" }}
      title={{
        ar: "وسيطك الموثوق للمنتجات البترولية",
        en: "Your Trusted Broker for Petroleum Products",
      }}
      description={{
        ar: "نعمل كحلقة وصل استراتيجية بين الموردين والعملاء لتوريد المنتجات البترولية بجميع أنواعها: بنزين 91، بنزين 95، ديزل، وغاز مسال للمنشآت الصناعية والتجارية والمشاريع والأساطيل.",
        en: "We act as a strategic link between suppliers and customers to supply all types of petroleum products: petrol 91, petrol 95, diesel and LPG for industrial and commercial facilities, projects and fleets.",
      }}
      iconName="Fuel"
      features={{
        ar: [
          "بنزين 91 و95 بجميع الكميات",
          "ديزل للمولدات والمعدات الثقيلة",
          "غاز مسال للمنشآت الصناعية",
          "أسعار تنافسية من موردين معتمدين",
          "توصيل سريع لجميع مناطق التغطية",
          "فواتير ضريبية إلكترونية",
        ],
        en: [
          "Petrol 91 & 95 in all quantities",
          "Diesel for generators and heavy equipment",
          "LPG for industrial facilities",
          "Competitive prices from certified suppliers",
          "Fast delivery to all coverage regions",
          "Electronic tax invoices",
        ],
      }}
    />
  );
}
