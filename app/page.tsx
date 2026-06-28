import type { Metadata } from "next";
import GasableHero from "@/components/gasable/GasableHero";
import MissionVisionStory from "@/components/gasable/MissionVisionStory";
import InFigures from "@/components/gasable/InFigures";
import Speciality from "@/components/gasable/Speciality";
import DownloadNow from "@/components/gasable/DownloadNow";
import ExtensiveNetwork from "@/components/gasable/ExtensiveNetwork";
import UNContribution from "@/components/gasable/UNContribution";
import WhereToFindUs from "@/components/gasable/WhereToFindUs";

export const metadata: Metadata = {
  title: "Gasable — Your Sustainable Energy Marketplace",
  description:
    "Gasable — a sustainable energy marketplace delivering cutting-edge, AI-powered energy solutions to over 1.6 million customers.",
};

export default function HomePage() {
  return (
    <>
      <GasableHero />
      <MissionVisionStory />
      <InFigures />
      <Speciality />
      <DownloadNow />
      <ExtensiveNetwork />
      <UNContribution />
      <WhereToFindUs />
    </>
  );
}
