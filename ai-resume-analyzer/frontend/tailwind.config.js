/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      colors: {
        surface: "#111111",
        border: "#222222",
        muted: "#666666",
        accent: "#ffffff",
      },
    },
  },
  plugins: [],
};
