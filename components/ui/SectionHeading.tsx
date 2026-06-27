import { ReactNode } from "react";

interface SectionHeadingProps {
  text: string;
  id?: string;
  align?: "center" | "right" | "left";
  className?: string;
  children?: ReactNode;
}

/**
 * Gasable-style section heading: first word in green (#51B957),
 * last word in dark blue (#0E549A), middle words in dark gray.
 */
export default function SectionHeading({
  text,
  id,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const words = text.trim().split(/\s+/);
  const alignClass =
    align === "center" ? "text-center" : align === "left" ? "text-left" : "text-right";

  return (
    <h2
      id={id}
      className={`text-4xl md:text-5xl font-black text-brand-charcoal-mid leading-tight ${alignClass} ${className}`}
    >
      {words.map((word, i) => {
        const isFirst = i === 0;
        const isLast = i === words.length - 1 && words.length > 1;
        const color = isFirst
          ? "text-brand-green"
          : isLast
          ? "text-brand-green-dark"
          : "text-brand-charcoal-mid";
        return (
          <span key={i} className={color}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </h2>
  );
}
