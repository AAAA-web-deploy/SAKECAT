import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0d0906",
        espresso: "#21150e",
        cognac: "#472c1c",
        parchment: "#eadbbe",
        amber: "#c39757",
        champagne: "#efc67b",
        faded: "#ae9270",
        blood: "#9e332a",
      },
      fontFamily: {
        display: ["Georgia", "Baskerville", "Times New Roman", "serif"],
        body: ["Arial", "Helvetica Neue", "sans-serif"],
      },
      letterSpacing: { club: "0.24em" },
      boxShadow: { gold: "0 0 24px #c397572d", dark: "0 24px 90px #0009" },
      maxWidth: { site: "1260px" },
    },
  },
  plugins: [],
} satisfies Config;
