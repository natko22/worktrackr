/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        sage: "#819d75", // soft sage green
        olive: "#c7d2b5", // soft olive
        cream: "#FEFFE5", // light cream background
        sand: "#f5ebe0", // warm sand background
        moss: "#b7c2a1", // mild moss accent
      },
    },
  },
  plugins: [],
};
