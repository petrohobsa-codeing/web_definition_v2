import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";

export const metadata: Metadata = {
  title: "الحلول البيئية والصرف — Fast Link",
  description:
    "تأمين صهاريج سحب مياه الصرف الصحي والبيارات والمياه العادمة للمواقع والمنشآت في المملكة.",
};

export default function EnvironmentPage() {
  return (
    <ServiceDetail
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الخدمات", href: "/services" },
        { label: "الحلول البيئية والصرف" },
      ]}
      badge="حلول بيئية"
      title="سحب الصرف الصحي والبيارات بكفاءة واحترافية"
      description="نوفّر صهاريج متخصصة لسحب مياه الصرف الصحي والبيارات والمياه العادمة من جميع أنواع المواقع: المجمعات السكنية والتجارية، مواقع البناء، المصانع، والمنشآت."
      iconName="Flame"
      features={[
        "سحب البيارات ومياه الصرف الصحي",
        "صهاريج بأحجام متعددة حسب الحاجة",
        "استجابة سريعة للحالات الطارئة",
        "تغطية واسعة في جميع المناطق",
        "التزام تام بمعايير السلامة البيئية",
        "خدمة على مدار الساعة",
      ]}
    />
  );
}
