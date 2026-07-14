import Link from "next/link";
import { ReactNode } from "react";

/**
 * Primary button (accent — the 10% red):
 * bg #0067E3, white text, radius 3px, padding 12px 24px, hover #004FB0.
 */
export default function GasableButton({
  children,
  href = "#",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-block bg-[#0067E3] hover:bg-[#004FB0] text-white text-base font-medium rounded-[3px] px-6 py-3 transition-colors duration-300 ${className}`}
    >
      {children}
    </Link>
  );
}
