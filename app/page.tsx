import type { Metadata } from "next";
import GasableHero from "@/components/gasable/GasableHero";
import Reveal from "@/components/gasable/Reveal";
import MissionVisionStory from "@/components/gasable/MissionVisionStory";
import InFigures from "@/components/gasable/InFigures";
import Speciality from "@/components/gasable/Speciality";
import CoverageRegions from "@/components/gasable/CoverageRegions";
import DownloadNow from "@/components/gasable/DownloadNow";
import ExtensiveNetwork from "@/components/gasable/ExtensiveNetwork";
import Credentials from "@/components/gasable/Credentials";
import Faq from "@/components/gasable/Faq";
import WhereToFindUs from "@/components/gasable/WhereToFindUs";

export const metadata: Metadata = {
  title: "PetroHop — حلول متكاملة للطاقة والخدمات اللوجستية",
  description:
    "PetroHop — حلول متكاملة للطاقة والخدمات اللوجستية: غاز LPG، منتجات بترولية، مياه وبيئة، حلول طاقة، منصة PetroHub IoT، لوجستيات، وأنظمة تتبع المركبات في المملكة العربية السعودية.",
};

export default function HomePage() {
  return (
    <>
      <GasableHero />
      <Reveal><MissionVisionStory /></Reveal>
      <Reveal><InFigures /></Reveal>
      <Reveal><Speciality /></Reveal>
      <Reveal><CoverageRegions /></Reveal>
      <Reveal><DownloadNow /></Reveal>
      <Reveal><ExtensiveNetwork /></Reveal>
      <Reveal><Credentials /></Reveal>
      <Reveal><Faq /></Reveal>
      <Reveal><WhereToFindUs /></Reveal>
    </>
  );
}
