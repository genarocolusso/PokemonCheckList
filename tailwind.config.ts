import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        poke: {
          red: "#EE1515",
          darkred: "#CC0000",
          white: "#F0F0F0",
          black: "#222224",
          gold: "#FFD700",
        },
      },
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [],
};
export default config;
