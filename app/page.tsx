import type { Metadata } from "next";
import GasableHero from "@/components/gasable/GasableHero";
import Reveal from "@/components/gasable/Reveal";
import AboutCompanySection from "@/components/gasable/AboutCompanySection";
import ChairmanWordSection from "@/components/gasable/ChairmanWordSection";
import MissionVisionStory from "@/components/gasable/MissionVisionStory";
import InFigures from "@/components/gasable/InFigures";
import Challenges from "@/components/gasable/Challenges";
import OperatingModel from "@/components/gasable/OperatingModel";
import SectorsSection from "@/components/gasable/SectorsSection";
import Speciality from "@/components/gasable/Speciality";
import CoverageRegions from "@/components/gasable/CoverageRegions";
import ExtensiveNetwork from "@/components/gasable/ExtensiveNetwork";
import Credentials from "@/components/gasable/Credentials";
import Faq from "@/components/gasable/Faq";
import WhereToFindUs from "@/components/gasable/WhereToFindUs";

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
      <ChairmanWordSection />
      <Reveal><MissionVisionStory /></Reveal>
      <Reveal><InFigures /></Reveal>
      <Reveal><Challenges /></Reveal>
      <Reveal><OperatingModel /></Reveal>
      <Reveal><SectorsSection /></Reveal>
      <Reveal><Speciality /></Reveal>
      <Reveal><CoverageRegions /></Reveal>
      <Reveal><ExtensiveNetwork /></Reveal>
      <Reveal><Credentials /></Reveal>
      <Reveal><Faq /></Reveal>
      <Reveal><WhereToFindUs /></Reveal>
    </>
  );
}
