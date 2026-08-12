import type { Metadata } from "next";
import GasableHero from "@/components/gasable/GasableHero";
import Reveal from "@/components/gasable/Reveal";
import AboutCompanySection from "@/components/gasable/AboutCompanySection";
import MissionVisionStory from "@/components/gasable/MissionVisionStory";
import InFigures from "@/components/gasable/InFigures";
import Challenges from "@/components/gasable/Challenges";
import OperatingModel from "@/components/gasable/OperatingModel";
import SectorsSection from "@/components/gasable/SectorsSection";
import Speciality from "@/components/gasable/Speciality";
import CoverageRegions from "@/components/gasable/CoverageRegions";
import Credentials from "@/components/gasable/Credentials";
import Faq from "@/components/gasable/Faq";

export const metadata: Metadata = {
  title: "Petrohub — حلول متكاملة للطاقة والخدمات اللوجستية",
  description:
    "Petrohub — حلول متكاملة للطاقة والخدمات اللوجستية: غاز LPG، منتجات بترولية، مياه وبيئة، حلول طاقة، منصة PetroHub IoT، لوجستيات، وأنظمة تتبع المركبات في المملكة العربية السعودية.",
};

export default function HomePage() {
  return (
    <>
      <GasableHero />
      <AboutCompanySection />
      <Reveal><MissionVisionStory /></Reveal>
      <Reveal><InFigures /></Reveal>
      <Reveal><Challenges /></Reveal>
      <Reveal><OperatingModel /></Reveal>
      <Reveal><SectorsSection /></Reveal>
      <Reveal><Speciality /></Reveal>
      <Reveal><CoverageRegions /></Reveal>
      <Reveal><Credentials /></Reveal>
      <Reveal><Faq /></Reveal>
    </>
  );
}
