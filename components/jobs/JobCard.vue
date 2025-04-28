<script setup lang="ts">
import { Briefcase, Link as LinkIcon, Edit2, Trash2 } from "lucide-vue-next";
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["edit", "delete"]);

defineProps<{
  title: string;
  company: string;
  status: string;
  url?: string;
}>();
</script>

<template>
  <div
    class="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition border-l-4"
    :class="{
      'border-leaf-dark': status === 'Applied',
      'border-yellow-600': status === 'Interview',
      'border-green-600': status === 'Offer',
      'border-red-500': status === 'Rejected',
    }"
  >
    <!-- Job Details -->
    <div class="mb-3">
      <h3 class="font-bold text-lg text-leaf-dark">{{ title }}</h3>
      <p class="text-primary-light flex items-center gap-1">
        <Briefcase class="w-4 h-4" />
        {{ company }}
      </p>
    </div>

    <!-- Status Badge -->
    <div class="flex justify-between items-center">
      <span
        class="text-sm font-medium px-2.5 py-0.5 rounded-full"
        :class="{
          'bg-leaf-light/30 text-leaf-dark': status === 'Applied',
          'bg-yellow-100 text-yellow-800': status === 'Interview',
          'bg-green-100 text-green-800': status === 'Offer',
          'bg-red-100 text-red-800': status === 'Rejected',
        }"
      >
        {{ status }}
      </span>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <a
          v-if="url"
          :href="url"
          target="_blank"
          class="text-primary hover:text-primary-dark transition"
        >
          <LinkIcon class="w-5 h-5" />
        </a>

        <button
          @click="$emit('edit')"
          class="text-gray-400 hover:text-primary transition"
        >
          <Edit2 class="w-5 h-5" />
        </button>

        <button
          @click="$emit('delete')"
          class="text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
