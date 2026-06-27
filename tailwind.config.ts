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
          // Gasable palette
          green: "#51B957",          // primary green
          "green-dark": "#0E549A",   // dark blue / teal (logo, headings, footer end)
          "green-mid": "#0E549A",    // deep blue used for hovers
          "green-light": "#F0FAF5",  // light mint background
          "green-pale": "#E8F7FC",   // light blue background
          gold: "#4B78AD",           // steel blue (buttons / accents)
          "gold-dark": "#3d6494",    // darker steel blue (button hover)
          "gold-light": "#E8F7FC",   // light blue accent
          charcoal: "#333333",       // body text
          "charcoal-mid": "#54595F", // headings dark gray
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
          "radial-gradient(circle, rgba(81,185,87,0.15) 1px, transparent 1px)",
        "hero-gradient":
          "linear-gradient(151deg, #51B957 0%, #0E549A 89%)",
        "gold-gradient": "linear-gradient(135deg, #4B78AD 0%, #3d6494 100%)",
        "emerald-gradient": "linear-gradient(135deg, #51B957 0%, #0E549A 100%)",
        "section-gradient": "linear-gradient(180deg, #F0FAF5 0%, #ffffff 100%)",
        "gasable-gradient": "linear-gradient(151deg, #51B957 0%, #0E549A 89%)",
      },
    },
  },
  plugins: [],
};
export default config;
