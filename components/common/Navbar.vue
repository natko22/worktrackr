<script setup lang="ts">
import { Leaf } from "lucide-vue-next";

// Determine if we should show auth links (login/signup)
// This would be replaced with your actual auth logic
const showAuthLinks = true;
</script>

<template>
  <nav
    class="w-full bg-white/90 backdrop-blur-sm px-4 py-3 shadow-sm fixed top-0 left-0 z-50 transition-all duration-300"
  >
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink
        to="/"
        class="text-2xl font-bold text-primary flex items-center gap-2"
      >
        <Leaf class="h-6 w-6" />WorkTrackr
      </NuxtLink>

      <div class="flex items-center gap-3">
        <!-- Show these links only when user is not logged in -->
        <template v-if="showAuthLinks">
          <NuxtLink
            to="/login"
            class="px-4 py-2 text-primary-dark hover:text-primary font-medium transition-colors"
            :class="{ 'bg-leaf-lightest rounded-lg': $route.path === '/login' }"
          >
            Login
          </NuxtLink>
          <NuxtLink
            to="/signup"
            class="px-5 py-2 bg-primary text-white rounded-full shadow-md hover:bg-primary-dark hover:shadow-lg transition-all duration-200"
          >
            Sign Up
          </NuxtLink>
        </template>

        <!-- Show these links when user is logged in (hidden by default) -->
        <template v-else>
          <NuxtLink
            to="/dashboard"
            class="px-4 py-2 text-primary-dark hover:text-primary font-medium transition-colors"
            :class="{
              'bg-leaf-lightest rounded-lg': $route.path === '/dashboard',
            }"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/applications"
            class="px-4 py-2 text-primary-dark hover:text-primary font-medium transition-colors"
            :class="{
              'bg-leaf-lightest rounded-lg': $route.path === '/applications',
            }"
          >
            Applications
          </NuxtLink>
          <button
            class="px-4 py-2 text-primary-dark hover:text-primary font-medium transition-colors"
          >
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>

  <!-- Spacer to prevent content from being hidden behind fixed navbar -->
  <div class="h-16"></div>
</template>
