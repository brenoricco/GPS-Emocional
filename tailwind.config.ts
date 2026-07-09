import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // =====================================================================
        // Paleta "Aurora Pastel" (v3 — extraída da nova logo GPS Emocional)
        // Fundo cremoso quente + violeta profundo + rosa mauve + dourado suave.
        // Substitui a paleta "Céu Noturno" (v2).
        // =====================================================================

        // Escala do violeta profundo — usada como cor DE texto/dark accent.
        // Manteve o nome "noite" para compatibilidade com o resto do código.
        noite: {
          DEFAULT: "#3D2A5A",
          50: "#F5F0FA",
          100: "#E7DDF0",
          200: "#CFBADD",
          300: "#B097C3",
          400: "#8770A5",
          500: "#3D2A5A",
          600: "#2E1F45",
          700: "#1F1530",
          800: "#150E21",
          900: "#0A0710",
        },

        // Escala do creme quente — usada como cor DE fundo / superfícies claras.
        // Manteve o nome "bruma" para compatibilidade.
        bruma: {
          DEFAULT: "#FBF2EE",
          soft: "#F5E9E6",
          muted: "#7C6883",
        },

        // Superfícies cremes com nomes explícitos (aliases semânticos)
        creme: {
          DEFAULT: "#FBF2EE",
          claro: "#FDF7F5",
          medio: "#F5E9E6",
          escuro: "#EBD9D0",
        },

        // Violeta principal (do cabelo e "GPS" na logo)
        violeta: {
          DEFAULT: "#5C3E8C",
          400: "#7B5EAA",
          500: "#5C3E8C",
          600: "#432B6E",
          700: "#301D50",
        },

        // Rosa mauve (do "EMOCIONAL" na logo) — CTA secundária suave
        mauve: {
          DEFAULT: "#B58AAA",
          400: "#C9A2BE",
          500: "#B58AAA",
          600: "#96708D",
          700: "#725371",
        },

        // Rosa suave (do brilho do coração)
        blush: {
          DEFAULT: "#F5D3D3",
          400: "#FADDDE",
          500: "#F5D3D3",
          600: "#E5B1B2",
        },

        // Rosa flor — CTA principal (já harmoniza com a nova paleta)
        "rosa-flor": {
          DEFAULT: "#E39CB0",
          50: "#FCF3F5",
          100: "#F8E1E7",
          200: "#F0C4D0",
          300: "#E39CB0",
          400: "#D67F98",
          500: "#C56480",
          600: "#A44E67",
          700: "#7D3A4D",
        },

        // Lavanda suave
        lavanda: {
          DEFAULT: "#C8A5DF",
          400: "#D6BAE7",
          500: "#C8A5DF",
          600: "#A683C2",
          700: "#7D6099",
        },

        orquidea: {
          DEFAULT: "#C77DFF",
          400: "#DBA5FF",
          500: "#C77DFF",
          600: "#A85BE5",
          700: "#8340B8",
        },

        "azul-ceu": {
          DEFAULT: "#8FB8DC",
          400: "#AECAE6",
          500: "#8FB8DC",
          600: "#6A96BD",
          700: "#4E7595",
        },

        "amarelo-sol": {
          DEFAULT: "#F0D97C",
          400: "#F5E29A",
          500: "#F0D97C",
          600: "#D0B855",
          700: "#A08A3B",
        },

        // Dourado suave — inspirado nos raios da bússola da logo
        dourado: {
          DEFAULT: "#C9A46A",
          400: "#D9BB8B",
          500: "#C9A46A",
          600: "#A6864F",
          700: "#7A6338",
        },

        // ---- Alertas ----
        atencao: {
          DEFAULT: "#E8A855",
          400: "#F0BC7A",
          500: "#E8A855",
          600: "#C48739",
          700: "#94682B",
        },

        emergencia: {
          DEFAULT: "#D96262",
          400: "#E28787",
          500: "#D96262",
          600: "#B54848",
          700: "#8A3535",
        },

        // ---- Paleta pastel do Quiz (Tela 2) e botões suaves de exercícios ----
        // Definida pela Rejane — devem sempre carregar texto escuro (text-noite).
        "azul-claro": "#D4E8FF",
        "laranja-claro": "#F2D6CA",
        "lavanda-claro": "#D0C3F1",
        "amarelo-claro": "#FFFFC5",
        "verde-claro": "#DBEFE1",
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
        "petala-flutuando": "petala-flutuando 12s ease-in-out infinite",
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
        "petala-flutuando": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.4" },
          "50%": { transform: "translateY(-10px) rotate(6deg)", opacity: "0.7" },
        },
        aparecer: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulsar-cta": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(227,156,176,0.35)" },
          "50%": { transform: "scale(1.02)", boxShadow: "0 0 0 12px rgba(227,156,176,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
