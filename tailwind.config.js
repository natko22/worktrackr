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
        mint: "#a7f3d0", // soft mint
        tealsoft: "#99f6e4", // soft teal
        limepastel: "#d9f99d", // pastel lime
        beige: "#fefce8", // light background
      },
    },
  },
  plugins: [],
};
