import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1024px",
          "2xl": "1024px",
        },
      },
      colors: {
        background: "#0E0E10",
        accent: "#87C8FE",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "15%": { transform: "rotate(14.0deg)" },
          "30%": { transform: "rotate(-8.0deg)" },
          "40%": { transform: "rotate(14.0deg)" },
          "50%": { transform: "rotate(-4.0deg)" },
          "60%": { transform: "rotate(10.0deg)" },
          "70%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)", opacity: "0.5" },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
            opacity: "0.7",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
            opacity: "1",
          },
          "100%": { transform: "translate(0px, 0px) scale(1)", opacity: "0.5" },
        },
      },
      animation: {
        wave: "wave 2s infinite",
        blob: "blob 10s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
