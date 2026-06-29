import type { Metadata } from "next";
import QuoteContent from "@/components/pages/QuoteContent";

export const metadata: Metadata = {
  title: "اطلب عرض سعر — PetroHop",
  description:
    "احصل على عرض سعر مخصّص من بتروهوب للخدمات اللوجستية والبترولية. منتجات بترولية، حلول بيئية، إمداد مائي، ومولدات كهربائية.",
};

export default function QuotePage() {
  return <QuoteContent />;
}
