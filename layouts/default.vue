<script setup lang="ts">
import Navbar from "~/components/common/Navbar.vue";
import Footer from "~/components/common/Footer.vue";
import { onMounted, ref } from "vue";
import { useAuth } from "~/composables/useAuth";

const auth = useAuth();
const isAuthLoading = ref(true); // Add loading state

onMounted(async () => {
  isAuthLoading.value = true;
  await auth.initialize();
  isAuthLoading.value = false;
});

const handleLogout = async () => {
  const { success } = await auth.logout();
  if (success) {
    navigateTo("/login");
  }
};
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-leaf-lightest to-leaf-lighter"
  >
    <Navbar
      :user="auth.user.value"
      :handleLogout="handleLogout"
      :isLoading="isAuthLoading"
    />
    <main class="flex-1">
      <!-- Show loading state or content based on auth status -->
      <div
        v-if="isAuthLoading && $route.path.includes('/dashboard')"
        class="flex items-center justify-center h-screen"
      >
        <div class="text-center">
          <div
            class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
          ></div>
          <p class="text-primary-dark">Loading your data...</p>
        </div>
      </div>
      <slot v-else />
    </main>
    <Footer />
  </div>
</template>
