import Link from "next/link";
import { ReactNode } from "react";

/**
 * Exact Gasable primary button:
 * bg #4B78AD, white text, radius 3px, padding 12px 24px, hover #3d6494.
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
      className={`inline-block bg-[#4B78AD] hover:bg-[#3d6494] text-white text-base font-medium rounded-[3px] px-6 py-3 transition-colors duration-300 ${className}`}
    >
      {children}
    </Link>
  );
}
