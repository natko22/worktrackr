<script setup lang="ts">
import {
  Briefcase,
  MapPin,
  Calendar,
  Eye,
  Edit2,
  Trash2,
} from "lucide-vue-next";
import { defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["edit", "delete"]);

const showDeleteConfirm = ref(false);
const showDetailsModal = ref(false);
const isDeleting = ref(false);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  remote: {
    type: Boolean,
    default: false,
  },
  applied_date: {
    type: String,
    default: "",
  },
  salary_min: {
    type: Number,
    default: null,
  },
  salary_max: {
    type: Number,
    default: null,
  },
  description: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
});

// Handle delete with confirmation
const handleDelete = () => {
  showDeleteConfirm.value = true;
};

// View details
const viewDetails = () => {
  showDetailsModal.value = true;
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

// Format date
const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (e) {
    return dateString;
  }
};

// Format salary
const formatSalary = () => {
  if (!props.salary_min && !props.salary_max) return "";

  if (props.salary_min && props.salary_max) {
    return `$${props.salary_min.toLocaleString()} - $${props.salary_max.toLocaleString()}`;
  } else if (props.salary_min) {
    return `$${props.salary_min.toLocaleString()}+`;
  } else if (props.salary_max) {
    return `Up to $${props.salary_max.toLocaleString()}`;
  }

  return "";
};
</script>

<template>
  <div
    class="bg-white rounded-lg p-3 sm:p-5 shadow-md hover:shadow-lg transition border-l-4 relative w-full h-[180px] sm:h-[220px] md:h-[200px] flex flex-col justify-between overflow-hidden"
    :class="{
      'border-leaf-dark': status === 'Applied',
      'border-yellow-600': status === 'Interview',
      'border-green-600': status === 'Offer',
      'border-red-500': status === 'Rejected',
    }"
  >
    <!-- Job Details - Simplified View -->
    <div>
      <h3 class="font-bold text-base sm:text-xl text-leaf-dark truncate">
        {{ title }}
      </h3>
      <p
        class="text-primary-light flex items-center gap-1 truncate mb-1 text-sm sm:text-lg"
      >
        <Briefcase class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        <span class="truncate">{{ company }}</span>
      </p>

      <!-- Most important additional info -->
      <div
        class="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-1"
      >
        <Calendar class="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <span>{{ formatDate(applied_date) }}</span>
      </div>

      <div
        v-if="location || remote"
        class="flex items-center gap-1 text-xs sm:text-sm text-gray-600 truncate"
      >
        <MapPin class="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <span
          v-if="location"
          class="truncate max-w-[120px] sm:max-w-[180px] md:max-w-[150px] lg:max-w-full"
          >{{ location }}</span
        >
        <span
          v-if="remote"
          class="text-green-600 font-medium flex-shrink-0 text-xs sm:text-sm"
        >
          {{ location ? "· Remote" : "Remote" }}
        </span>
      </div>
    </div>

    <!-- Status Badge and Actions -->
    <div class="flex justify-between items-center mt-auto pt-2">
      <span
        class="text-xs sm:text-base font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex-shrink-0"
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
      <div class="flex items-center gap-1 sm:gap-3 flex-shrink-0">
        <button
          @click="viewDetails"
          class="text-gray-400 hover:text-primary transition p-1 sm:p-1.5"
          title="View details"
        >
          <Eye class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          @click="$emit('edit')"
          class="text-gray-400 hover:text-primary transition p-1 sm:p-1.5"
          title="Edit application"
        >
          <Edit2 class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          @click="handleDelete"
          class="text-gray-400 hover:text-red-500 transition p-1 sm:p-1.5"
          title="Delete application"
        >
          <Trash2 class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>

    <!-- Details Modal -->
    <div
      v-if="showDetailsModal"
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-3 sm:p-4 overflow-y-auto"
    >
      <div
        class="bg-white rounded-xl p-4 sm:p-6 shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto mx-2 my-2 sm:my-4"
      >
        <button
          @click="showDetailsModal = false"
          class="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-xl"
        >
          &times;
        </button>

        <div class="mb-4 sm:mb-6">
          <h2 class="text-xl sm:text-2xl font-bold text-leaf-dark mb-1">
            {{ title }}
          </h2>
          <p
            class="text-primary-light flex items-center gap-1 text-base sm:text-lg"
          >
            <Briefcase class="w-4 h-4 sm:w-5 sm:h-5" />
            {{ company }}
          </p>

          <div
            class="inline-block mt-3 px-2 sm:px-3 py-1 rounded-full text-sm font-medium"
            :class="{
              'bg-leaf-light/30 text-leaf-dark': status === 'Applied',
              'bg-yellow-100 text-yellow-800': status === 'Interview',
              'bg-green-100 text-green-800': status === 'Offer',
              'bg-red-100 text-red-800': status === 'Rejected',
            }"
          >
            {{ status }}
          </div>
        </div>

        <!-- Detailed Info -->
        <div class="space-y-4">
          <div v-if="url" class="flex flex-col">
            <span class="text-sm font-semibold text-gray-500"
              >Application Link</span
            >
            <a
              :href="url"
              target="_blank"
              class="text-primary hover:underline truncate text-sm sm:text-base"
            >
              {{ url }}
            </a>
          </div>

          <div class="flex flex-col">
            <span class="text-sm font-semibold text-gray-500"
              >Applied Date</span
            >
            <span class="text-sm sm:text-base">{{
              formatDate(applied_date)
            }}</span>
          </div>

          <div v-if="location || remote" class="flex flex-col">
            <span class="text-sm font-semibold text-gray-500">Location</span>
            <div class="flex items-center flex-wrap gap-1 text-sm sm:text-base">
              <span v-if="location">{{ location }}</span>
              <span v-if="location && remote"> · </span>
              <span v-if="remote" class="text-green-600 font-medium"
                >Remote</span
              >
            </div>
          </div>

          <div v-if="salary_min || salary_max" class="flex flex-col">
            <span class="text-sm font-semibold text-gray-500"
              >Salary Range</span
            >
            <span class="text-sm sm:text-base">{{ formatSalary() }}</span>
          </div>

          <div v-if="description" class="flex flex-col">
            <span class="text-sm font-semibold text-gray-500"
              >Job Description</span
            >
            <p class="whitespace-pre-line text-gray-700 text-sm sm:text-base">
              {{ description }}
            </p>
          </div>

          <div v-if="notes" class="flex flex-col">
            <span class="text-sm font-semibold text-gray-500">Notes</span>
            <p class="whitespace-pre-line text-gray-700 text-sm sm:text-base">
              {{ notes }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex justify-end gap-2 sm:gap-3 mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100"
        >
          <button
            @click="showDetailsModal = false"
            class="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
          >
            Close
          </button>
          <button
            @click="
              $emit('edit');
              showDetailsModal = false;
            "
            class="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition text-sm sm:text-base"
          >
            Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-3 sm:p-4"
    >
      <div
        class="bg-white rounded-xl p-4 sm:p-5 shadow-xl w-full max-w-md relative mx-2"
      >
        <h3 class="text-lg sm:text-xl font-bold text-leaf-dark mb-3">
          Confirm Deletion
        </h3>
        <p class="text-gray-600 mb-4 text-sm sm:text-base">
          Are you sure you want to delete the application for
          <span class="font-semibold">{{ title }}</span> at
          <span class="font-semibold">{{ company }}</span
          >?
        </p>
        <div class="flex justify-end gap-2 sm:gap-3">
          <button
            @click="cancelDelete"
            class="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition flex items-center gap-2 text-sm sm:text-base"
            :disabled="isDeleting"
          >
            <span
              v-if="isDeleting"
              class="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></span>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
