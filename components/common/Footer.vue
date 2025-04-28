<script setup lang="ts">
import { Leaf } from "lucide-vue-next";
</script>

<template>
  <footer class="bg-leaf-darkest text-leaf-lighter py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center gap-2 mb-4 md:mb-0">
          <Leaf class="h-5 w-5 text-leaf-light" />
          <span class="text-white font-medium">WorkTrackr</span>
        </div>

        <div class="flex items-center gap-6">
          <NuxtLink
            to="/about"
            class="text-leaf-lighter hover:text-white text-sm transition-colors"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/privacy"
            class="text-leaf-lighter hover:text-white text-sm transition-colors"
          >
            Privacy
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-leaf-lighter hover:text-white text-sm transition-colors"
          >
            Terms
          </NuxtLink>
        </div>

        <div class="text-center md:text-right text-sm mt-4 md:mt-0">
          Built with <span class="text-leaf-light">🌱</span> and
          <span class="text-red-400">❤️</span> by Anastasia
        </div>
      </div>
    </div>
  </footer>
</template>
