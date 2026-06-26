import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // =====================================================================
        // Paleta "Oceano Calmo"
        // Pensada pra alguém abrindo o app às 2h da manhã, em crise.
        // Tons quietos, baixo contraste, evocando mar profundo, brisa e areia.
        // =====================================================================

        fundo: {
          // Espuma quase branca (light) e azul-petróleo profundo (dark, dormente)
          claro: "#F4F8FA",
          escuro: "#142028",
        },

        // Tons principais — azul-petróleo, profundidade emocional clínico-amigável
        // Ancorada em #1B6C79 (500) e #283C49 (800) da paleta Oceano Calmo
        oceano: {
          50: "#ECF5F7",
          100: "#D0E8ED",
          200: "#A5D3DC",
          300: "#6FBDC9",
          400: "#2E96A8",
          500: "#1B6C79",
          600: "#195A66",
          700: "#224B5A",
          800: "#283C49",
          900: "#1A2B35",
        },

        // Verde-água / teal — regulação somática, respiração, alívio
        brisa: {
          50: "#EDF7F4",
          100: "#D2EBE4",
          200: "#A6D6C8",
          300: "#76BCAB",
          400: "#4FA08C",
          500: "#338670",
          600: "#266856",
          700: "#1B4C3F",
          800: "#11332A",
          900: "#0A1F1A",
        },

        // Cinza cool — superfícies neutras, divisores, texto sobre fundo escuro
        // Ancorada em #BBBBBB (300) e #ACB3B3 (400) da paleta Oceano Calmo
        areia: {
          50: "#F8F9F9",
          100: "#ECEDED",
          200: "#D5D7D7",
          300: "#BBBBBB",
          400: "#ACB3B3",
          500: "#8E9494",
          600: "#6F7575",
          700: "#525858",
          800: "#383C3C",
          900: "#1F2222",
        },

        // Alerta gentil — coral acolhedor, usado SOMENTE em risco/emergência.
        // Contrasta com o azul sem a agressividade do vermelho.
        coral: {
          400: "#EE9784",
          500: "#E07D6A",
          600: "#C56350",
          700: "#9F4F40",
        },
      },

      fontFamily: {
        sans: ["var(--fonte-base)", "system-ui", "sans-serif"],
      },

      animation: {
        respirar: "respirar 8s ease-in-out infinite",
        ondular: "ondular 12s ease-in-out infinite",
      },

      keyframes: {
        respirar: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.15)", opacity: "1" },
        },
        ondular: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
