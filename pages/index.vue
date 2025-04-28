<script setup lang="ts">
import { Leaf, TrendingUp, Sun } from "lucide-vue-next";
import { ref, onMounted } from "vue";

// Motivational Quotes Rotation
const quotes = [
  "Growth happens when you stay consistent 🌱",
  "Plant your dreams, water your goals 🌿",
  "Stay calm, stay focused, success blooms ☀️",
];
const currentQuote = ref(quotes[0]);

onMounted(() => {
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote.value = quotes[randomIndex];
  }, 3000);
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-cream text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-all"
  >
    <!-- Navbar -->
    <header class="flex justify-between items-center p-6">
      <h1 class="text-2xl font-bold text-sage">WorkTrackr</h1>
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/login"
          class="px-4 py-2 bg-sage hover:bg-olive text-white rounded-lg transition-transform transform hover:scale-105"
        >
          Login
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="px-4 py-2 bg-sand hover:bg-moss text-gray-800 rounded-lg transition-transform transform hover:scale-105"
        >
          Signup
        </NuxtLink>
      </div>
    </header>

    <!-- Motivational Quote Section -->
    <div class="text-center text-moss italic mt-4 animate-fade-in">
      {{ currentQuote }}
    </div>

    <!-- Hero Section -->
    <section
      class="p-6 md:p-8 lg:p-12 flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-r from-sage to-cream text-gray-900 transition-all duration-500"
    >
      <h2 class="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
        Grow Your Career 🌱
      </h2>
      <p class="text-lg md:text-2xl mb-8 max-w-xl">
        Track your applications. Stay motivated. Achieve your dreams.
      </p>
      <NuxtLink
        to="/signup"
        class="px-8 py-4 bg-white text-sage font-semibold rounded-full text-lg shadow-md hover:shadow-2xl hover:scale-105 hover:bg-olive transition-transform transition-all duration-300"
      >
        Start Your Journey
      </NuxtLink>
    </section>

    <!-- SVG Wave Separator -->
    <div class="w-full overflow-hidden leading-none rotate-180">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        class="w-full h-12"
      >
        <path
          d="M321.39 56.6C188.33 87.5 0 20 0 20v100h1200V0c0 0-103.68 75.64-297.15 36.23-179.04-36.8-276.22-14.2-381.46 16.37z"
          fill="#FEFFE5"
        ></path>
      </svg>
    </div>

    <!-- Features Section -->
    <section
      class="p-6 md:p-8 lg:p-12 grid gap-8 md:grid-cols-3 text-center bg-cream dark:bg-gray-800 transition-all"
    >
      <div class="p-4 hover:scale-105 transform transition">
        <div class="flex justify-center mb-2 animate-bounce">
          <Leaf class="text-sage w-10 h-10" />
        </div>
        <h3 class="text-2xl font-semibold mb-2 text-sage">Plant Your Goals</h3>
        <p>Set job application goals and grow them into successes.</p>
      </div>
      <div class="p-4 hover:scale-105 transform transition">
        <div class="flex justify-center mb-2 animate-bounce">
          <TrendingUp class="text-sage w-10 h-10" />
        </div>
        <h3 class="text-2xl font-semibold mb-2 text-sage">
          Track Your Progress
        </h3>
        <p>See your career journey bloom with every step you take.</p>
      </div>
      <div class="p-4 hover:scale-105 transform transition">
        <div class="flex justify-center mb-2 animate-bounce">
          <Sun class="text-sage w-10 h-10" />
        </div>
        <h3 class="text-2xl font-semibold mb-2 text-sage">Shine Brighter</h3>
        <p>Celebrate your wins and keep your energy strong and positive.</p>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="text-center p-6 text-gray-500 bg-cream dark:bg-gray-900 dark:text-gray-400"
    >
      Built with 🌱 and ❤️ by Anastasia
    </footer>
  </div>
</template>

<style scoped>
/* Soft fade-in animation for quotes */
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 1s ease-in;
}
</style>
