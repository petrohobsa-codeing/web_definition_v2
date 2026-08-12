import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          /* Petrohub identity — colours sampled from the supplied vector
             print files (business card / invoice), gradient runs
             teal #3BBA9F -> blue #306AB2 -> purple #6055A4. */
          green: "#252C5D",          // brand navy (primary — headings, accents)
          "green-dark": "#1A2047",   // deepest navy (footer, dark blocks)
          "green-mid": "#2E3868",    // navy mid (hovers)
          "green-light": "#F2F7F6",  // near-white teal tint
          "green-pale": "#E4F0EC",   // light teal tint
          gold: "#3BBA9F",           // brand teal (accent — buttons)
          "gold-dark": "#2E9B84",    // darker teal (button hover)
          "gold-light": "#E4F4EF",   // light teal tint
          teal: "#3BBA9F",           // gradient start
          blue: "#306AB2",           // gradient middle
          purple: "#6055A4",         // gradient end
          charcoal: "#28355E",       // body text
          "charcoal-mid": "#252C5D", // headings
          "charcoal-light": "#6B7280",
        },
      },
      fontFamily: {
        arabic: ["var(--font-tajawal)", "Tajawal", "sans-serif"],
        display: ["var(--font-ge-ss)", "var(--font-bricolage)", "var(--font-tajawal)", "sans-serif"],
        latin: ["var(--font-poppins)", "var(--font-bricolage)", "sans-serif"],
        wordmark: ["var(--font-conthrax)", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backgroundImage: {
        "dot-pattern":
          "radial-gradient(circle, rgba(37,44,93,0.12) 1px, transparent 1px)",
        "hero-gradient":
          "linear-gradient(151deg, #252C5D 0%, #1A2047 89%)",
        "gold-gradient": "linear-gradient(135deg, #3BBA9F 0%, #2E9B84 100%)",
        "emerald-gradient": "linear-gradient(135deg, #252C5D 0%, #1A2047 100%)",
        "section-gradient": "linear-gradient(180deg, #F2F7F6 0%, #ffffff 100%)",
        "gasable-gradient": "linear-gradient(151deg, #252C5D 0%, #1A2047 89%)",
        "navy-red-gradient": "linear-gradient(135deg, #3BBA9F 0%, #306AB2 50%, #6055A4 100%)",
        "brand-gradient": "linear-gradient(135deg, #3BBA9F 0%, #306AB2 50%, #6055A4 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
