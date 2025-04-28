<script setup lang="ts">
import { Lock, Mail, Leaf } from "lucide-vue-next";

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div
    class="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6 relative"
  >
    <div
      class="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-r from-primary-dark via-primary to-accent rounded-t-xl"
    ></div>
    <!-- Login form -->
    <div class="flex justify-center mb-2">
      <div class="bg-leaf-light/30 p-3 rounded-full">
        <Leaf class="text-primary w-8 h-8" />
      </div>
    </div>
    <h2 class="text-3xl font-bold text-center text-leaf-darker">
      Welcome Back 🌿
    </h2>
    <p class="text-center text-leaf-dark text-sm mb-2">
      Sign in to continue your tracking
    </p>
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-leaf-dark mb-1.5"
          >Email</label
        >
        <div
          class="flex items-center border-2 border-leaf-light focus-within:border-primary rounded-lg p-2.5 transition-colors duration-200"
        >
          <Mail class="text-leaf-medium w-5 h-5 mr-2" />
          <input
            type="email"
            placeholder="you@example.com"
            class="w-full outline-none bg-transparent text-leaf-darker placeholder:text-leaf-medium-light/70"
          />
        </div>
      </div>
      <div>
        <div class="flex justify-between mb-1.5">
          <label class="block text-sm font-medium text-leaf-dark"
            >Password</label
          >
          <a href="#" class="text-xs text-primary hover:text-primary-light"
            >Forgot password?</a
          >
        </div>
        <div
          class="flex items-center border-2 border-leaf-light focus-within:border-primary rounded-lg p-2.5 transition-colors duration-200"
        >
          <Lock class="text-leaf-medium w-5 h-5 mr-2" />
          <input
            type="password"
            placeholder="••••••••"
            class="w-full outline-none bg-transparent text-leaf-darker placeholder:text-leaf-medium-light/70"
          />
        </div>
      </div>
      <button
        type="submit"
        class="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-dark border-2 border-transparent hover:border-primary transition-all duration-200"
      >
        Login
      </button>
    </form>
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
    <!-- Decorative pattern -->
    <div class="absolute -z-10 bottom-6 right-6 opacity-10">
      <Leaf class="text-primary w-32 h-32" />
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
}
</style>
