import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F0C1E1",
        secondary: "#CB9DF0",
        "scrim-dark": "rgba(0, 0, 0, 0.64)",
        "scrim-light": "rgba(0, 0, 0, 0.32)",
      },
      fontFamily: {
        playfair: "var(--font-playfair)",
        playfair_display: "var(--font-playfair-display)",
      },
    },
  },
  plugins: [],
} satisfies Config;
