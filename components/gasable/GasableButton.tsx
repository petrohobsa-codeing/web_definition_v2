import Link from "next/link";
import { ReactNode } from "react";

/**
 * Primary button (accent — the 10% red):
 * bg #C8102E, white text, radius 3px, padding 12px 24px, hover #A00C24.
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
      className={`inline-block bg-[#C8102E] hover:bg-[#A00C24] text-white text-base font-medium rounded-[3px] px-6 py-3 transition-colors duration-300 ${className}`}
    >
      {children}
    </Link>
  );
}
