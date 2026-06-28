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
          // 60-30-10 palette: white (60%) / navy (30%) / red (10%)
          green: "#1B355E",          // navy (primary 30% — headings, accents)
          "green-dark": "#0C1B33",   // deep navy (footer, dark blocks)
          "green-mid": "#14284B",    // navy mid (hovers)
          "green-light": "#F4F6FA",  // near-white navy tint (keeps 60% white)
          "green-pale": "#EAEEF5",   // light navy tint
          gold: "#C8102E",           // red (accent 10% — buttons)
          "gold-dark": "#A00C24",    // darker red (button hover)
          "gold-light": "#FCE9EC",   // light red tint
          charcoal: "#333333",       // body text
          "charcoal-mid": "#1B355E", // headings -> navy
          "charcoal-light": "#6B7280",
        },
      },
      fontFamily: {
        arabic: ["var(--font-tajawal)", "Tajawal", "sans-serif"],
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
          "radial-gradient(circle, rgba(27,53,94,0.12) 1px, transparent 1px)",
        "hero-gradient":
          "linear-gradient(151deg, #1B355E 0%, #0C1B33 89%)",
        "gold-gradient": "linear-gradient(135deg, #C8102E 0%, #A00C24 100%)",
        "emerald-gradient": "linear-gradient(135deg, #1B355E 0%, #0C1B33 100%)",
        "section-gradient": "linear-gradient(180deg, #F4F6FA 0%, #ffffff 100%)",
        "gasable-gradient": "linear-gradient(151deg, #1B355E 0%, #0C1B33 89%)",
        "navy-red-gradient": "linear-gradient(135deg, #1B355E 0%, #C8102E 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
