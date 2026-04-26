import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f8ff",
          500: "#316dff",
          600: "#2658d4"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
