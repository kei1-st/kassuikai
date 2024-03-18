import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        p: "1px 1px 3px 0px rgba(171, 171, 171, 0.90) inset, -1px -1px 2px 0px rgba(255, 255, 255, 0.90) inset, 1px -1px 2px 0px rgba(171, 171, 171, 0.20) inset, -1px 1px 2px 0px rgba(171, 171, 171, 0.20) inset, -1px -1px 2px 0px rgba(171, 171, 171, 0.50), 2px 2px 4px 0px rgba(255, 255, 255, 0.30)",
        np: "5px 5px 13px 0px rgba(220, 220, 220, 0.90), -5px -5px 10px 0px rgba(255, 255, 255, 0.90), 5px -5px 10px 0px rgba(220, 220, 220, 0.20), -5px 5px 10px 0px rgba(220, 220, 220, 0.20), -1px -1px 2px 0px rgba(220, 220, 220, 0.50) inset, 1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset",
      },
    },
  },
  plugins: [],
};
export default config;
