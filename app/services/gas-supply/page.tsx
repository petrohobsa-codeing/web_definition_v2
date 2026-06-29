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
      serviceName={{ ar: "الحلول البيئية والصرف", en: "Environmental & Sewage Solutions" }}
      badge={{ ar: "حلول بيئية", en: "Environmental Solutions" }}
      title={{
        ar: "سحب الصرف الصحي والبيارات بكفاءة واحترافية",
        en: "Sewage & Septic Pumping with Efficiency and Professionalism",
      }}
      description={{
        ar: "نوفّر صهاريج متخصصة لسحب مياه الصرف الصحي والبيارات والمياه العادمة من جميع أنواع المواقع: المجمعات السكنية والتجارية، مواقع البناء، المصانع، والمنشآت.",
        en: "We provide specialized tankers for pumping sewage, septic tanks and wastewater from all kinds of sites: residential and commercial complexes, construction sites, factories and facilities.",
      }}
      iconName="Flame"
      features={{
        ar: [
          "سحب البيارات ومياه الصرف الصحي",
          "صهاريج بأحجام متعددة حسب الحاجة",
          "استجابة سريعة للحالات الطارئة",
          "تغطية واسعة في جميع المناطق",
          "التزام تام بمعايير السلامة البيئية",
          "خدمة على مدار الساعة",
        ],
        en: [
          "Septic tank and sewage pumping",
          "Tankers of various sizes as needed",
          "Fast response for emergencies",
          "Wide coverage across all regions",
          "Full compliance with environmental safety standards",
          "Round-the-clock service",
        ],
      }}
    />
  );
}
