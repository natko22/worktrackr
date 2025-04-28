<script setup lang="ts">
const route = useRoute();
const jobId = route.params.id;
</script>

<template>
  <div class="flex flex-col p-4">
    <h1 class="text-3xl font-bold">Job Details</h1>
    <p class="mt-2">Viewing job with ID: {{ jobId }}</p>
  </div>
</template>
