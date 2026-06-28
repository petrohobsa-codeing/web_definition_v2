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
      <Reveal><MissionVisionStory /></Reveal>
      <Reveal><InFigures /></Reveal>
      <Reveal><Speciality /></Reveal>
      <Reveal><CoverageRegions /></Reveal>
      <Reveal><DownloadNow /></Reveal>
      <Reveal><ExtensiveNetwork /></Reveal>
      <Reveal><Credentials /></Reveal>
      <Reveal><WhereToFindUs /></Reveal>
    </>
  );
}
