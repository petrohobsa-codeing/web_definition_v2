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
  metadataBase: new URL("https://petrohub.sa"),
  title: {
    default: "Petrohub — خدمات لوجستية وبترولية في المملكة",
    template: "%s | Petrohub",
  },
  description:
    "بتروهب — شركة سعودية متخصصة في حلول الطاقة الذكية والمياه والخدمات اللوجستية. منتجات بترولية، حلول بيئية، إمداد مائي، ومولدات في الرياض ومكة والمدينة وينبع وتبوك. حلول ذكية... وطاقة تصل بثقة.",
  keywords: ["بتروهب", "Petrohub", "خدمات بترولية", "مياه تحلية", "سحب بيارات", "مولدات كهربائية", "لوجستيات السعودية"],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://petrohub.sa",
    siteName: "Petrohub",
    title: "Petrohub — خدمات لوجستية وبترولية",
    description: "شركة وساطة لوجستية رائدة في المملكة العربية السعودية",
  },
  twitter: {
    card: "summary_large_image",
    title: "Petrohub — خدمات لوجستية وبترولية",
    description: "شركة وساطة لوجستية رائدة في المملكة العربية السعودية",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-arabic antialiased bg-white text-brand-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Petrohub",
              alternateName: "بتروهب",
              url: "https://petrohub.sa",
              description:
                "شركة وساطة تجارية ولوجستية رائدة في المملكة العربية السعودية للخدمات البترولية والبيئية والمائية والطاقة البديلة.",
              areaServed: ["Riyadh", "Makkah", "Madinah", "Yanbu", "Tabuk"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "King Fahd Road",
                addressLocality: "Riyadh",
                addressCountry: "SA",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+966500000000",
                contactType: "customer service",
                availableLanguage: ["Arabic", "English"],
              },
            }),
          }}
        />
        <LanguageProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
