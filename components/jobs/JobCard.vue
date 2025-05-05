<script setup lang="ts">
import { Briefcase, Link as LinkIcon, Edit2, Trash2 } from "lucide-vue-next";
import { defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["edit", "delete"]);

const showDeleteConfirm = ref(false);
const isDeleting = ref(false);

defineProps<{
  title: string;
  company: string;
  status: string;
  url?: string;
}>();

// Handle delete with confirmation
const handleDelete = () => {
  showDeleteConfirm.value = true;
};

// Confirm delete action
const confirmDelete = () => {
  isDeleting.value = true;
  emit("delete");
  // Close the dialog after emitting the event
  showDeleteConfirm.value = false;
  isDeleting.value = false;
};

// Cancel delete action
const cancelDelete = () => {
  showDeleteConfirm.value = false;
};
</script>

<template>
  <div
    class="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition border-l-4 relative"
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
          @click="handleDelete"
          class="text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-xl p-6 shadow-xl w-full max-w-md relative">
        <h3 class="text-xl font-bold text-leaf-dark mb-3">Confirm Deletion</h3>
        <p class="text-gray-600 mb-4">
          Are you sure you want to delete the application for
          <span class="font-semibold">{{ title }}</span> at
          <span class="font-semibold">{{ company }}</span
          >?
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="cancelDelete"
            class="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition flex items-center gap-2"
            :disabled="isDeleting"
          >
            <span
              v-if="isDeleting"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></span>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
