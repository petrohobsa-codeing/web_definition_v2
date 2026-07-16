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
          // Petrohub identity: teal #00D4A7 → blue #0067E3 → purple #701DFF
          green: "#0C2D6B",          // deep brand blue (primary — headings, accents)
          "green-dark": "#081B45",   // dark indigo (footer, dark blocks)
          "green-mid": "#0A2458",    // indigo mid (hovers)
          "green-light": "#F3F6FC",  // near-white blue tint
          "green-pale": "#E8EEF9",   // light blue tint
          gold: "#0067E3",           // brand blue (accent — buttons)
          "gold-dark": "#004FB0",    // darker blue (button hover)
          "gold-light": "#E5F0FF",   // light blue tint
          teal: "#00D4A7",           // brand teal (gradient start)
          purple: "#701DFF",         // brand purple (gradient end)
          charcoal: "#333333",       // body text
          "charcoal-mid": "#0C2D6B", // headings -> deep blue
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
          "radial-gradient(circle, rgba(12,45,107,0.12) 1px, transparent 1px)",
        "hero-gradient":
          "linear-gradient(151deg, #0C2D6B 0%, #081B45 89%)",
        "gold-gradient": "linear-gradient(135deg, #0067E3 0%, #004FB0 100%)",
        "emerald-gradient": "linear-gradient(135deg, #0C2D6B 0%, #081B45 100%)",
        "section-gradient": "linear-gradient(180deg, #F3F6FC 0%, #ffffff 100%)",
        "gasable-gradient": "linear-gradient(151deg, #0C2D6B 0%, #081B45 89%)",
        "navy-red-gradient": "linear-gradient(135deg, #00D4A7 0%, #0067E3 50%, #701DFF 100%)",
        "brand-gradient": "linear-gradient(135deg, #00D4A7 0%, #0067E3 50%, #701DFF 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
