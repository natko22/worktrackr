<script setup lang="ts">
import {
  Leaf,
  TrendingUp,
  Sun,
  Award,
  Bell,
  ArrowRight,
} from "lucide-vue-next";
import { ref, onMounted } from "vue";

const quotes = [
  "Growth happens when you stay consistent 🌱",
  "Plant your dreams, water your goals 🌿",
  "Stay calm, stay focused, success blooms ☀️",
  "Level up your career one application at a time 🚀",
  "Achievement unlocked: One step closer to your dream job! ✨",
];
const currentQuote = ref(quotes[0]);
const statsCount = ref({
  applications: 0,
  interviews: 0,
  offers: 0,
});

// Animated counter for stats
const animateCount = (
  target: { applications: number; interviews: number; offers: number },
  duration: number
) => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    statsCount.value.applications = Math.floor(progress * 1253);
    statsCount.value.interviews = Math.floor(progress * 486);
    statsCount.value.offers = Math.floor(progress * 132);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

onMounted(() => {
  // Rotate quotes
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote.value = quotes[randomIndex];
  }, 4000);

  // Start stats counter animation after a delay
  setTimeout(() => {
    animateCount(statsCount.value, 2000);
  }, 500);
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-leaf-lightest to-leaf-light text-gray-800"
  >
    <!-- Main Content -->
    <main class="flex-1">
      <!-- Hero Section -->
      <section class="relative overflow-hidden pt-16 pb-20">
        <!-- Hero Content -->
        <div class="container mx-auto px-4 flex flex-col items-center">
          <div
            class="py-2 px-5 rounded-full bg-leaf-light text-leaf-darker font-medium mb-6 animate-pulse"
          >
            {{ currentQuote }}
          </div>

          <h1
            class="text-5xl md:text-7xl font-bold text-center mb-6 text-leaf-darker"
          >
            Grow Your Career <span class="text-leaf-medium-dark">🌱</span>
          </h1>

          <p class="text-xl text-center max-w-2xl mb-10 text-gray-700">
            Track your applications, visualize your progress, and gamify your
            job search journey. Stay motivated and achieve your dream career.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mb-16">
            <NuxtLink
              to="/signup"
              class="px-8 py-4 bg-leaf-medium-dark hover:bg-leaf-medium text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition duration-300 flex items-center justify-center gap-2"
            >
              Start Your Journey <ArrowRight class="h-5 w-5" />
            </NuxtLink>
            <NuxtLink
              to="/features"
              class="px-8 py-4 bg-white hover:bg-leaf-lightest text-leaf-dark border border-leaf-light rounded-full font-bold text-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center"
            >
              See Features
            </NuxtLink>
          </div>

          <!-- Stats Bar -->
          <div
            class="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          >
            <div
              class="absolute -top-3 left-0 right-0 h-2 bg-gradient-to-r from-leaf-medium-dark via-leaf-medium to-accent rounded-t-2xl"
            ></div>

            <div class="text-center">
              <div class="text-4xl font-bold text-primary mb-2">
                {{ statsCount.applications }}
              </div>
              <div class="text-gray-600">Applications Tracked</div>
            </div>

            <div
              class="text-center border-t md:border-t-0 md:border-l md:border-r border-gray-100 py-4 md:py-0"
            >
              <div class="text-4xl font-bold text-leaf-dark mb-2">
                {{ statsCount.interviews }}
              </div>
              <div class="text-gray-600">Interviews Secured</div>
            </div>

            <div class="text-center border-t md:border-t-0 py-4 md:py-0">
              <div class="text-4xl font-bold text-accent mb-2">
                {{ statsCount.offers }}
              </div>
              <div class="text-gray-600">Job Offers Received</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
            How WorkTrackr Helps You Succeed
          </h2>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div
              class="bg-gradient-to-br from-leaf-lighter to-leaf-light rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 hover:translate-y-[-5px] group"
            >
              <div
                class="bg-white p-4 rounded-full inline-block mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:bg-primary group-hover:text-white"
              >
                <Leaf class="h-8 w-8 text-primary group-hover:text-white" />
              </div>

              <h3 class="text-2xl font-bold mb-3 text-leaf-darker">
                Plant Your Goals
              </h3>
              <p class="text-gray-600 mb-4">
                Set job application goals with progress tracking and visual
                growth indicators. Watch your career garden bloom.
              </p>

              <!-- Progress Visual -->
              <div
                class="w-full h-4 bg-white rounded-full overflow-hidden shadow-inner mt-4"
              >
                <div
                  class="h-full bg-gradient-to-r from-leaf-medium-dark to-leaf-medium rounded-full"
                  style="width: 65%"
                ></div>
              </div>
              <div
                class="mt-2 text-right text-sm text-primary-dark font-medium"
              >
                13 of 20 weekly applications
              </div>
            </div>

            <!-- Feature 2 -->
            <div
              class="bg-gradient-to-br from-leaf-light to-leaf-medium-light rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 hover:translate-y-[-5px] group"
            >
              <div
                class="bg-white p-4 rounded-full inline-block mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:bg-leaf-medium-dark group-hover:text-white"
              >
                <TrendingUp
                  class="h-8 w-8 text-leaf-medium-dark group-hover:text-white"
                />
              </div>

              <h3 class="text-2xl font-bold mb-3 text-leaf-darker">
                Track Your Progress
              </h3>
              <p class="text-gray-600 mb-4">
                See your career journey visualized with interactive charts and
                milestone celebrations. Never miss a follow-up.
              </p>

              <!-- Level Visual -->
              <div class="flex justify-between items-center gap-2 mt-4">
                <div class="text-center p-2 rounded-lg bg-white shadow-sm">
                  <div class="text-xs text-gray-500">Level</div>
                  <div class="font-bold text-leaf-dark">7</div>
                </div>
                <div
                  class="flex-1 h-2 bg-white rounded-full overflow-hidden shadow-inner"
                >
                  <div
                    class="h-full bg-gradient-to-r from-leaf-medium to-leaf-medium-light rounded-full"
                    style="width: 35%"
                  ></div>
                </div>
                <div class="text-center p-2 rounded-lg bg-white shadow-sm">
                  <div class="text-xs text-gray-500">Next</div>
                  <div class="font-bold text-leaf-dark">8</div>
                </div>
              </div>
            </div>

            <!-- Feature 3 -->
            <div
              class="bg-gradient-to-br from-leaf-medium-light to-leaf-medium rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 hover:translate-y-[-5px] group"
            >
              <div
                class="bg-white p-4 rounded-full inline-block mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:bg-leaf-dark group-hover:text-white"
              >
                <Award class="h-8 w-8 text-leaf-dark group-hover:text-white" />
              </div>

              <h3 class="text-2xl font-bold mb-3 text-leaf-darker">
                Earn Achievements
              </h3>
              <p class="text-gray-600 mb-4">
                Celebrate your wins with badges and achievements that keep you
                motivated through the job search process.
              </p>

              <!-- Badges Visual -->
              <div class="flex justify-center gap-3 mt-4">
                <div class="p-2 bg-white rounded-full shadow-md">
                  <Sun class="h-6 w-6 text-accent" />
                </div>
                <div class="p-2 bg-white rounded-full shadow-md">
                  <TrendingUp class="h-6 w-6 text-leaf-medium-dark" />
                </div>
                <div
                  class="p-2 bg-gradient-to-br from-leaf-dark to-leaf-darker rounded-full shadow-md"
                >
                  <Award class="h-6 w-6 text-white" />
                </div>
                <div class="p-2 bg-gray-200 rounded-full shadow-inner">
                  <Leaf class="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section
        class="py-16 bg-gradient-to-br from-leaf-medium-dark to-leaf-darker text-white"
      >
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            Ready to Level Up Your Job Search?
          </h2>
          <p class="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of job seekers who have turned their job search from
            stressful to successful with WorkTrackr.
          </p>

          <NuxtLink
            to="/signup"
            class="px-8 py-4 bg-white text-leaf-dark hover:bg-leaf-lightest rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition duration-300 inline-flex items-center gap-2"
          >
            Get Started for Free <ArrowRight class="h-5 w-5" />
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 3s ease-in-out infinite;
}
</style>
