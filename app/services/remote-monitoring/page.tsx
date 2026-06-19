import type { Metadata } from "next";
import ServiceDetail from "@/components/sections/ServiceDetail";

export const metadata: Metadata = {
  title: "حلول المراقبة عن بُعد — Fast Link",
  description:
    "لوحة تحكم سحابية لمراقبة جميع خزاناتك ومواقعك لحظياً مع تقارير متقدمة وتنبيهات ذكية وصلاحيات متعددة المستخدمين.",
};

export default function RemoteMonitoringPage() {
  return (
    <ServiceDetail
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الخدمات", href: "/services" },
        { label: "حلول المراقبة عن بُعد" },
      ]}
      badge="حلول المراقبة عن بُعد"
      title="مراقبة مركزية لكل خزاناتك ومواقعك من شاشة واحدة"
      description="لوحة تحكم سحابية تجمع بيانات كل الحساسات في مكان واحد: مستويات لحظية، اتجاهات استهلاك، تنبيهات ذكية، وتقارير قابلة للتصدير — مع صلاحيات متعددة المستخدمين."
      iconName="MonitorCheck"
      features={[
        "لوحة موحّدة لكل المواقع",
        "تنبيهات قابلة للتخصيص",
        "تقارير وتحليلات متقدمة",
        "صلاحيات وأدوار للمستخدمين",
        "تكامل API مع أنظمة ERP",
      ]}
    />
  );
}
