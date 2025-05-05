<script setup lang="ts">
import Navbar from "~/components/common/Navbar.vue";
import Footer from "~/components/common/Footer.vue";
import { onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";

const auth = useAuth();

onMounted(async () => {
  await auth.initialize();
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
    <Navbar :user="auth.user.value" :handleLogout="handleLogout" />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
