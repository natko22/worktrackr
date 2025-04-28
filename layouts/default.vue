<script setup lang="ts">
import Navbar from "~/components/common/Navbar.vue";
import Footer from "~/components/common/Footer.vue";
import { ref, onMounted } from "vue";
import type { User } from "@supabase/supabase-js";

const { $supabase } = useNuxtApp();
const user = ref<User | null>(null);

onMounted(async () => {
  const { data } = await $supabase.auth.getUser();
  user.value = data.user;

  $supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null;
  });
});

const handleLogout = async () => {
  const { error } = await $supabase.auth.signOut();
  if (!error) {
    user.value = null;
    navigateTo("/login");
  }
};
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-leaf-lightest to-leaf-lighter"
  >
    <Navbar :user="user" :handleLogout="handleLogout" />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
