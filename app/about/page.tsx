import type { Metadata } from "next";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "من نحن — Fast Link",
  description:
    "شركة فاست لينك للخدمات اللوجستية والبترولية — شركة وساطة تجارية رائدة في المملكة تربط الموردين بالعملاء بأسرع طريقة وأعلى كفاءة.",
};

export default function AboutPage() {
  return <AboutContent />;
}
