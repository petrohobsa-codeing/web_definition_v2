import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { LanguageProvider } from "@/context/LanguageContext";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fast Link — خدمات لوجستية وبترولية في المملكة",
    template: "%s | Fast Link",
  },
  description:
    "شركة فاست لينك للخدمات اللوجستية والبترولية — وساطة تجارية رائدة تربط الموردين بالعملاء. منتجات بترولية، حلول بيئية، إمداد مائي، ومولدات في الرياض ومكة والمدينة وينبع وتبوك.",
  keywords: ["فاست لينك", "خدمات بترولية", "مياه تحلية", "سحب بيارات", "مولدات كهربائية", "لوجستيات السعودية"],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "Fast Link",
    title: "Fast Link — خدمات لوجستية وبترولية",
    description: "شركة وساطة لوجستية رائدة في المملكة العربية السعودية",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-arabic antialiased bg-white text-brand-charcoal">
        <LanguageProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
