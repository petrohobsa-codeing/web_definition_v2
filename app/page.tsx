import type { Metadata } from "next";
import GasableHero from "@/components/gasable/GasableHero";
import MissionVisionStory from "@/components/gasable/MissionVisionStory";
import InFigures from "@/components/gasable/InFigures";
import Speciality from "@/components/gasable/Speciality";
import CoverageRegions from "@/components/gasable/CoverageRegions";
import ExtensiveNetwork from "@/components/gasable/ExtensiveNetwork";
import WhereToFindUs from "@/components/gasable/WhereToFindUs";

export const metadata: Metadata = {
  title: "Fast Link — خدمات لوجستية وبترولية في المملكة",
  description:
    "شركة فاست لينك للخدمات اللوجستية والبترولية — وساطة تجارية رائدة تربط الموردين بالعملاء. منتجات بترولية، حلول بيئية، إمداد مائي، ومولدات في الرياض ومكة والمدينة وينبع وتبوك.",
};

export default function HomePage() {
  return (
    <>
      <GasableHero />
      <MissionVisionStory />
      <InFigures />
      <Speciality />
      <CoverageRegions />
      <ExtensiveNetwork />
      <WhereToFindUs />
    </>
  );
}
