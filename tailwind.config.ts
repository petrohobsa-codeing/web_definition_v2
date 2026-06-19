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
          green: "#059669",
          "green-dark": "#064E3B",
          "green-mid": "#065F46",
          "green-light": "#ECFDF5",
          "green-pale": "#D1FAE5",
          gold: "#F59E0B",
          "gold-dark": "#D97706",
          "gold-light": "#FEF3C7",
          charcoal: "#111827",
          "charcoal-mid": "#374151",
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
          "radial-gradient(circle, rgba(5,150,105,0.15) 1px, transparent 1px)",
        "hero-gradient":
          "linear-gradient(135deg, #022C22 0%, #064E3B 40%, #065F46 100%)",
        "gold-gradient": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        "emerald-gradient": "linear-gradient(135deg, #059669 0%, #047857 100%)",
        "section-gradient": "linear-gradient(180deg, #ECFDF5 0%, #ffffff 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
