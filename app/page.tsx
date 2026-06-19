import type { Metadata } from "next";
import HeroSlider from "@/components/sections/HeroSlider";
import StatsSection from "@/components/sections/StatsSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FeaturesSection from "@/components/sections/FeaturesSection";
import WhyUs from "@/components/sections/WhyUs";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "بترونير — تزويد الوقود الذكي في السعودية",
  description:
    "بترونير — المنظومة الرائدة في السعودية لإدارة وتزويد الوقود الذكي. ديزل وغاز لجميع المنشآت مع حساسات IoT ومراقبة لحظية على مدار الساعة.",
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <StatsSection />
      <ServicesGrid />
      <FeaturesSection />
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
    </>
  );
}
