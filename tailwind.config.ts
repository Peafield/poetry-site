import type { Config } from "tailwindcss";
import textShadowPlugin from "@designbycode/tailwindcss-text-shadow";
import plugin from "tailwindcss/plugin";

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
      },
      fontFamily: {
        playfair_display: "var(--font-playfair-display)",
        lato: "var(--font-lato)",
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
  plugins: [
    textShadowPlugin,
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari, and Opera */
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        /* Hide scrollbar for IE, Edge, and Firefox */
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    }),
  ],
} satisfies Config;
