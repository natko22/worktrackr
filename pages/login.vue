<script setup lang="ts">
import { ref } from "vue";
import { Lock, Mail, Award, TrendingUp } from "lucide-vue-next";
import { useAuth } from "~/composables/useAuth";

const auth = useAuth();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

definePageMeta({
  layout: "auth",
});
const handleLogin = async () => {
  errorMessage.value = "";
  loading.value = true;

  const { success, error } = await auth.login(email.value, password.value);
  if (success) {
    navigateTo("/dashboard");
  } else {
    errorMessage.value = error || "Login failed. Please try again.";
  }
  loading.value = false;
};
</script>

<template>
  <div
    class="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6 relative"
  >
    <!-- Decorative top bar -->
    <div
      class="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-r from-primary-dark via-primary to-accent rounded-t-xl"
    ></div>

    <div class="flex justify-center mb-2">
      <div class="bg-leaf-light/30 p-3 rounded-full">
        <TrendingUp class="text-primary w-8 h-8" />
      </div>
    </div>

    <h2 class="text-3xl font-bold text-center text-leaf-darker">
      Welcome Back 👋
    </h2>
    <p class="text-center text-leaf-dark text-sm mb-2">
      Log in to track your career growth
    </p>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <div>
        <label class="block text-sm font-medium text-leaf-dark mb-1.5">
          Email
        </label>
        <div
          class="flex items-center border-2 border-leaf-light focus-within:border-primary rounded-lg p-2.5"
        >
          <Mail class="text-leaf-medium w-5 h-5 mr-2" />
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            required
            class="w-full outline-none bg-transparent text-leaf-darker placeholder:text-leaf-medium-light/70"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-leaf-dark mb-1.5">
          Password
        </label>
        <div
          class="flex items-center border-2 border-leaf-light focus-within:border-primary rounded-lg p-2.5"
        >
          <Lock class="text-leaf-medium w-5 h-5 mr-2" />
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            class="w-full outline-none bg-transparent text-leaf-darker placeholder:text-leaf-medium-light/70"
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-dark border-2 border-transparent hover:border-primary transition-all duration-200"
      >
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </form>

    <!-- Show error message -->
    <p v-if="errorMessage" class="text-center text-red-500 text-sm mt-2">
      {{ errorMessage }}
    </p>

    <div class="relative py-3">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-leaf-light/30"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white px-4 text-xs text-leaf-medium">OR</span>
      </div>
    </div>

    <p class="text-center text-leaf-dark">
      Don't have an account?
      <NuxtLink
        to="/signup"
        class="text-primary font-semibold hover:text-primary-light transition-colors"
      >
        Sign Up
      </NuxtLink>
    </p>

    <!-- Decorative background illustration -->
    <div class="absolute -z-10 bottom-4 right-4 opacity-5">
      <Award class="w-32 h-32 text-primary" />
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
}
</style>
