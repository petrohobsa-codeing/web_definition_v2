interface LogoProps {
  /** "dark" for light backgrounds (navy text), "light" for dark backgrounds (white text) */
  variant?: "dark" | "light";
  /** show the tagline under the wordmark */
  tagline?: boolean;
  className?: string;
  lang?: "ar" | "en";
}

/**
 * PetroHop brand logo: a droplet mark (navy -> red gradient) + wordmark
 * "Petro" (navy/white) + "Hop" (red). Pure SVG/CSS, no image asset needed.
 */
export default function Logo({
  variant = "dark",
  tagline = false,
  className = "",
  lang = "ar",
}: LogoProps) {
  const petroColor = variant === "light" ? "#FFFFFF" : "#1B355E";
  const subColor = variant === "light" ? "rgba(255,255,255,0.7)" : "#54595F";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="PetroHop">
      {/* Mark */}
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" className="flex-shrink-0">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1B355E" />
            <stop offset="100%" stopColor="#C8102E" />
          </linearGradient>
        </defs>
        {/* droplet */}
        <path
          d="M20 3C20 3 32 16 32 25a12 12 0 11-24 0C8 16 20 3 20 3z"
          fill="url(#logo-grad)"
        />
        {/* spark / hop accent */}
        <path
          d="M19 17l-4 7h4l-1 6 6-9h-4l3-4z"
          fill="#fff"
          fillOpacity="0.95"
        />
      </svg>

      {/* Wordmark */}
      <span className="leading-none">
        <span className="text-2xl font-extrabold tracking-tight">
          <span style={{ color: petroColor }}>Petro</span>
          <span style={{ color: "#C8102E" }}>Hop</span>
        </span>
        {tagline && (
          <span className="block text-[10px] font-medium mt-0.5" style={{ color: subColor }}>
            {lang === "ar" ? "للطاقة والخدمات المتكاملة" : "Energy & Integrated Services"}
          </span>
        )}
      </span>
    </span>
  );
}
