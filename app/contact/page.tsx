import type { Metadata } from "next";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "اتصل بنا — Fast Link",
  description:
    "تواصل مع شركة فاست لينك للخدمات اللوجستية والبترولية. نغطي الرياض ومكة المكرمة والمدينة المنورة وينبع وتبوك. فريقنا جاهز للرد على طلباتك.",
};

export default function ContactPage() {
  return <ContactContent />;
}
