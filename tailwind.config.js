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
        // Light to dark progression - olive/sage warm greens
        "leaf-lightest": "#E9EFD6", // Very light warm sage (paper-like)
        "leaf-lighter": "#CDE1CB", // Light sage with warmth
        "leaf-light": "#A9BE8C", // Warm olive green
        "leaf-medium-light": "#80A590", // Medium sage olive
        "leaf-medium": "#557D69", // Medium olive green

        // Dark shades - richer forest greens
        "leaf-medium-dark": "#406952", // Medium dark forest green
        "leaf-dark": "#2D4A3E", // Dark forest green
        "leaf-darker": "#1B332A", // Very dark forest green
        "leaf-darkest": "#0D1F19", // Nearly black green

        // Functional aliases
        primary: "#557D69", // Medium olive green
        "primary-light": "#80A590", // Medium sage olive
        "primary-dark": "#406952", // Medium dark forest green
        background: "#F4F7ED", // Extremely light warm sage
        accent: "#D4AD5A", // Warm golden accent
      },
    },
  },
  plugins: [],
};
