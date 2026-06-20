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
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الخدمات", href: "/services" },
        { label: "الطاقة البديلة والمولدات" },
      ]}
      badge="طاقة بديلة"
      title="مولدات كهربائية للإيجار بجميع الأحجام"
      description="نعمل كوسيط متخصص لتأجير المولدات الكهربائية بمختلف الأحجام والأحمال للمشاريع الإنشائية، الفعاليات والمناسبات، المنشآت الصناعية، والمواقع التي تحتاج مصادر طاقة بديلة أو احتياطية."
      iconName="MonitorCheck"
      features={[
        "مولدات بأحجام متعددة (10 KVA – 2000 KVA)",
        "للمشاريع الإنشائية والفعاليات",
        "مولدات احتياطية للمنشآت الحساسة",
        "توصيل وتركيب وصيانة دورية",
        "عقود تأجير مرنة قصيرة وطويلة الأمد",
        "دعم فني متاح على مدار الساعة",
      ]}
    />
  );
}
