// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["var(--font-custom)", "sans-serif"],
      },
      colors: {
        brand: {
          black: "#000000",   // Dark background from logo
          yellow: "#facc15",  // Signature Coding Club Yellow
          white: "#ffffff",   // Stark white for contrast
          grey: "#333333",    // Subtle borders/cards
        },
        arena: {
          900: "#050505",   
        }
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;