<script setup lang="ts">
import { Leaf, TrendingUp, Sun } from "lucide-vue-next";
// (Optional dark mode toggle if you want later)
// const colorMode = useColorMode()
// const toggleDark = () => {
//   colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
// }
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-beige text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-all"
  >
    <!-- Navbar -->
    <header class="flex justify-between items-center p-6">
      <h1 class="text-2xl font-bold">WorkTrackr</h1>
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/login"
          class="px-4 py-2 bg-mint hover:bg-emerald-300 text-gray-800 rounded-lg transition"
        >
          Login
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="px-4 py-2 bg-tealsoft hover:bg-teal-300 text-gray-800 rounded-lg transition"
        >
          Signup
        </NuxtLink>
      </div>
    </header>

    <!-- Hero Section -->
    <section
      class="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-r from-mint to-limepastel text-gray-900 transition-all duration-500"
    >
      <h2 class="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
        Grow Your Career 🌱
      </h2>
      <p class="text-lg md:text-2xl mb-8 max-w-xl">
        Track your applications. Stay motivated. Achieve your dreams.
      </p>
      <NuxtLink
        to="/signup"
        class="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full text-lg shadow-md hover:shadow-2xl hover:bg-emerald-50 transition-all"
      >
        Start Your Journey
      </NuxtLink>
    </section>

    <!-- Features Section -->
    <section
      class="p-8 grid gap-8 md:grid-cols-3 text-center bg-beige dark:bg-gray-800 transition-all"
    >
      <div class="p-4 hover:scale-105 transform transition">
        <div class="flex justify-center mb-2">
          <Leaf class="text-emerald-400 w-10 h-10" />
        </div>
        <h3 class="text-2xl font-semibold mb-2">Plant Your Goals</h3>
        <p>Set job application goals and grow them into successes.</p>
      </div>
      <div class="p-4 hover:scale-105 transform transition">
        <div class="flex justify-center mb-2">
          <TrendingUp class="text-teal-400 w-10 h-10" />
        </div>
        <h3 class="text-2xl font-semibold mb-2">Track Your Progress</h3>
        <p>See your career journey bloom with every step you take.</p>
      </div>
      <div class="p-4 hover:scale-105 transform transition">
        <div class="flex justify-center mb-2">
          <Sun class="text-lime-400 w-10 h-10" />
        </div>
        <h3 class="text-2xl font-semibold mb-2">Shine Brighter</h3>
        <p>Celebrate your wins and keep your energy strong and positive.</p>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="text-center p-6 text-gray-500 bg-beige dark:bg-gray-900 dark:text-gray-400"
    >
      Built with 🌱 and ❤️ by Anastasia
    </footer>
  </div>
</template>
