import Image from "next/image";

interface LogoProps {
  /** "dark" for light backgrounds (black wordmark), "light" for dark backgrounds (white wordmark) */
  variant?: "dark" | "light";
  /** show the tagline under the wordmark */
  tagline?: boolean;
  className?: string;
  lang?: "ar" | "en";
}

/**
 * Petrohub (بتروهب) brand logo — official identity assets:
 * gradient droplet + lightning mark with AR/EN wordmark.
 */
export default function Logo({
  variant = "dark",
  tagline = false,
  className = "",
  lang = "ar",
}: LogoProps) {
  const src =
    lang === "ar"
      ? variant === "light"
        ? "/images/brand/logo-ar-white.png"
        : "/images/brand/logo-ar.png"
      : variant === "light"
        ? "/images/brand/logo-en-white.png"
        : "/images/brand/logo-en.png";

  const subColor = variant === "light" ? "rgba(255,255,255,0.7)" : "#54595F";

  return (
    <span
      className={`inline-flex flex-col items-start gap-1 ${className}`}
      aria-label="Petrohub بتروهب"
    >
      <Image
        src={src}
        alt={lang === "ar" ? "بتروهب" : "Petrohub"}
        width={800}
        height={116}
        priority
        className="h-9 w-auto"
      />
      {tagline && (
        <span
          className="block text-[10px] font-medium"
          style={{ color: subColor }}
        >
          {lang === "ar"
            ? "حلول ذكية... وطاقة تصل بثقة"
            : "Smart solutions… energy delivered with trust"}
        </span>
      )}
    </span>
  );
}
