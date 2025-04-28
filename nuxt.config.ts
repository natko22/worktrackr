export default defineNuxtConfig({
  compatibilityDate: "2025-04-28",
  devtools: {
    enabled: true,
  },
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/color-mode"],
});
