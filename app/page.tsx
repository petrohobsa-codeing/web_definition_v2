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
  title: "Fast Link — خدمات لوجستية وبترولية في المملكة",
  description:
    "شركة فاست لينك للخدمات اللوجستية والبترولية — وساطة تجارية رائدة تربط الموردين بالعملاء. منتجات بترولية، حلول بيئية، إمداد مائي، ومولدات كهربائية في الرياض ومكة والمدينة وينبع وتبوك.",
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
