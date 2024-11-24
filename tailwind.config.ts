import type { Config } from "tailwindcss";
import textShadowPlugin from "@designbycode/tailwindcss-text-shadow";

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
      screens: {
        mobile: "400px",
      },
      textShadow: {
        lg: "0px 8px 16px rbga(0, 0, 0, 0)",
      },
      boxShadow: {
        "inner-lg": "inset 0 4px 4px 0px rgb(0 0 0 / 0.3)",
      },
    },
  },
  plugins: [textShadowPlugin],
} satisfies Config;
