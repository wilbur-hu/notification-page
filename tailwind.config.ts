import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#F65552",
        blue: "#0A327B",
        "very-dark-grey-blue": "#1C202B",
        "dark-grey-blue": "#5E6778",
        "grey-blue": "#939CAD",
        "light-grey-blue": "#E5EFFA",
        "very-light-grey-blue": "#DDE7EE",
        snow: "#F7FAFD",
      },
    },
  },
  plugins: [],
};
export default config;
