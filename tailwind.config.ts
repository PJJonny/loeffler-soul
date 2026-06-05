import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Naturtöne – warm, ruhig, gebrochen.
        // rgb(var(--x) / <alpha-value>) erlaubt Modifier wie text-ink/70.
        cream: "rgb(var(--cream) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        sand: "rgb(var(--sand) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        espresso: "rgb(var(--espresso) / <alpha-value>)",
        cognac: "rgb(var(--cognac) / <alpha-value>)",
        "cognac-deep": "rgb(var(--cognac-deep) / <alpha-value>)",
        stone: "rgb(var(--stone) / <alpha-value>)",
        line: "var(--line)", // fester Haarlinien-Wert, ohne Modifier
      },
      fontFamily: {
        // Display = Fraunces (warm, editorial), Body = Hanken Grotesk (ruhig, klar)
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
        wide: "0.06em",
      },
      maxWidth: {
        container: "84rem",
        prose: "38rem",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
