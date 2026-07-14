import type { Metadata } from "next";
import ServicesContent from "@/components/pages/ServicesContent";

export const metadata: Metadata = {
  title: "الخدمات — Petrohub",
  description:
    "شركة بتروهب للخدمات اللوجستية والبترولية — منتجات بترولية، حلول بيئية، إمداد مائي، وتأجير مولدات في المملكة.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
