import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        naty: {
          rose: "#D98A99",       // Cor principal
          "rose-deep": "#C76D80", // Secundária
          gold: "#C9A15A",        // Destaque
          blush: "#F8EFF1",       // Fundo
          blushSoft: "#FBF6F7",   // Fundo alternativo
          text: "#5A5A5A",        // Texto
          muted: "#8a8a8a",       // Texto suave
          line: "#ead7db",        // Linhas / divisores
          dark: "#3a2e30",        // Footer
          whats: "#25D366",       // WhatsApp
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        brand: "0.32em",
        wider2: "0.24em",
        widest2: "0.36em",
      },
      backgroundImage: {
        "naty-stripe":
          "repeating-linear-gradient(135deg, rgba(201,161,90,0.08) 0 1px, transparent 1px 14px), linear-gradient(180deg, #F2E1E5 0%, #EAD2D8 100%)",
        "naty-stripe-cream":
          "repeating-linear-gradient(135deg, rgba(201,161,90,0.10) 0 1px, transparent 1px 14px), linear-gradient(180deg, #F8EFF1 0%, #EFE2E5 100%)",
        "naty-stripe-dark":
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 14px), linear-gradient(180deg, #4a3a3d 0%, #2f2326 100%)",
        "naty-hairline":
          "linear-gradient(90deg, transparent, #C9A15A 20%, #C9A15A 80%, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
