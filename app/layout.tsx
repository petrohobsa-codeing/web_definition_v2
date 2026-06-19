import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fast Link - تزويد الوقود الذكي",
  description:
    "Fast Link — المنظومة الرائدة في السعودية لإدارة وتزويد الوقود الذكي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-arabic antialiased bg-white text-brand-charcoal">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
