<script setup lang="ts">
import { Leaf } from "lucide-vue-next";
import type { User } from "@supabase/supabase-js";

const props = defineProps<{
  user: User | null;
  handleLogout: () => void;
}>();
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
        <!-- Show these links only when user is NOT logged in -->
        <template v-if="!user">
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

        <!-- Show these links when user IS logged in -->
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
          <button
            @click="props.handleLogout"
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
