"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
