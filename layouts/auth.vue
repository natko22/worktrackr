<script setup lang="ts">
import Navbar from "~/components/common/Navbar.vue";
import Footer from "~/components/common/Footer.vue";
import { useAuth } from "~/composables/useAuth";

const auth = useAuth();

const handleLogout = () => {};
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-leaf-lightest to-leaf-lighter"
  >
    <Navbar :user="auth.user.value" :handleLogout="handleLogout" />

    <div class="flex-1 flex justify-center items-center p-6">
      <slot />
    </div>

    <Footer />
  </div>
</template>
