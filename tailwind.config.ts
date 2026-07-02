import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // =====================================================================
        // Paleta "Céu Noturno" (v2 — definida pela consultora Rejane)
        // Fundo escuro constante como identidade visual — não é dark mode toggle.
        // =====================================================================

        noite: {
          DEFAULT: "#0B132B",
          50: "#E7E9F0",
          100: "#C7CCDA",
          200: "#8F98B6",
          300: "#576692",
          400: "#2E3D6C",
          500: "#0B132B",
          600: "#090F22",
          700: "#070C1A",
          800: "#050811",
          900: "#020408",
        },

        bruma: {
          DEFAULT: "#F4F6F9",
          soft: "#E4E8EF",
          muted: "#B7BFCE",
        },

        "rosa-flor": {
          DEFAULT: "#FFB7C5",
          50: "#FFF4F7",
          100: "#FFE4EB",
          200: "#FFCFDB",
          300: "#FFB7C5",
          400: "#FF95AA",
          500: "#F27390",
          600: "#D95778",
          700: "#B34362",
        },

        orquidea: {
          DEFAULT: "#C77DFF",
          400: "#DBA5FF",
          500: "#C77DFF",
          600: "#A85BE5",
          700: "#8340B8",
        },

        "azul-ceu": {
          DEFAULT: "#4A90E2",
          400: "#7AB0EE",
          500: "#4A90E2",
          600: "#3670BE",
          700: "#265693",
        },

        lavanda: {
          DEFAULT: "#B39DDB",
          400: "#C8B7E5",
          500: "#B39DDB",
          600: "#957BC1",
          700: "#725D96",
        },

        "amarelo-sol": {
          DEFAULT: "#FFE082",
          400: "#FFE99E",
          500: "#FFE082",
          600: "#E5C351",
          700: "#B99A34",
        },

        dourado: {
          DEFAULT: "#D4AF37",
          400: "#E5C558",
          500: "#D4AF37",
          600: "#AF8E2A",
          700: "#856B1F",
        },

        // ---- Alertas ----
        atencao: {
          DEFAULT: "#FFA726",
          400: "#FFBB5A",
          500: "#FFA726",
          600: "#D68613",
          700: "#A56610",
        },

        emergencia: {
          DEFAULT: "#EF5350",
          400: "#F58583",
          500: "#EF5350",
          600: "#D03B38",
          700: "#A22B29",
        },
      },

      fontFamily: {
        sans: ["var(--fonte-base)", "system-ui", "sans-serif"],
      },

      // Escala tipográfica mobile-first — base 16px, corpo confortável em 4G brasileiro
      fontSize: {
        // acolhimento (corpo com peso emocional) — leitura calma
        acolhimento: ["1.0625rem", { lineHeight: "1.65", letterSpacing: "0.005em" }],
        ancora: ["1.125rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
      },

      spacing: {
        // safe-area bottom (iOS notch) — usado em CTAs fixos
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-top": "env(safe-area-inset-top)",
        // touch target mínimo (Apple HIG)
        touch: "44px",
      },

      minHeight: {
        touch: "44px",
        screen: "100svh",
      },
      minWidth: {
        touch: "44px",
      },

      borderRadius: {
        "cta": "9999px", // botões CTA arredondados totais
      },

      animation: {
        respirar: "respirar 8s ease-in-out infinite",
        "brilho-suave": "brilho-suave 3s ease-in-out infinite",
        "estrela-cadente": "estrela-cadente 2.5s ease-out forwards",
        "aparecer": "aparecer 400ms ease-out both",
        "pulsar-cta": "pulsar-cta 2.4s ease-in-out infinite",
      },

      keyframes: {
        respirar: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.12)", opacity: "1" },
        },
        "brilho-suave": {
          "0%, 100%": { opacity: "0.7", filter: "blur(0px)" },
          "50%": { opacity: "1", filter: "blur(2px)" },
        },
        "estrela-cadente": {
          "0%": { transform: "translate(0, 0) scale(0.5)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": {
            transform: "translate(60vw, -80vh) scale(0.2)",
            opacity: "0",
          },
        },
        aparecer: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulsar-cta": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(255,183,197,0.35)" },
          "50%": { transform: "scale(1.02)", boxShadow: "0 0 0 12px rgba(255,183,197,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
