<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from "vue";

// Define job interface
interface JobFormData {
  title: string;
  company: string;
  url?: string;
  status: string;
  salary_min?: number | null;
  salary_max?: number | null;
  location?: string;
  remote?: boolean;
  applied_date?: string;
  description?: string;
  notes?: string;
}

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
  editJob: {
    type: Object as () => JobFormData,
    default: () => ({
      title: "",
      company: "",
      url: "",
      status: "Applied",
      salary_min: null,
      salary_max: null,
      location: "",
      remote: false,
      applied_date: new Date().toISOString().split("T")[0],
      description: "",
      notes: "",
    }),
  },
});

const emit = defineEmits<{
  (e: "save", job: JobFormData): void;
  (e: "cancel"): void;
}>();

const title = ref(props.editJob.title || "");
const company = ref(props.editJob.company || "");
const url = ref(props.editJob.url || "");
const status = ref(props.editJob.status || "Applied");
const salary_min = ref<number | null>(props.editJob.salary_min || null);
const salary_max = ref<number | null>(props.editJob.salary_max || null);
const location = ref(props.editJob.location || "");
const remote = ref(props.editJob.remote || false);
const applied_date = ref(
  props.editJob.applied_date || new Date().toISOString().split("T")[0]
);
const description = ref(props.editJob.description || "");
const notes = ref(props.editJob.notes || "");

// Watch for changes to editJob prop
watch(
  () => props.editJob,
  (newVal) => {
    if (props.isEditing && newVal) {
      title.value = newVal.title || "";
      company.value = newVal.company || "";
      url.value = newVal.url || "";
      status.value = newVal.status || "Applied";
      salary_min.value = newVal.salary_min || null;
      salary_max.value = newVal.salary_max || null;
      location.value = newVal.location || "";
      remote.value = newVal.remote || false;
      applied_date.value =
        newVal.applied_date || new Date().toISOString().split("T")[0];
      description.value = newVal.description || "";
      notes.value = newVal.notes || "";
    }
  },
  { deep: true }
);

const handleSubmit = () => {
  emit("save", {
    title: title.value,
    company: company.value,
    url: url.value,
    status: status.value,
    salary_min: salary_min.value,
    salary_max: salary_max.value,
    location: location.value,
    remote: remote.value,
    applied_date: applied_date.value,
    description: description.value,
    notes: notes.value,
  });
};

defineExpose({
  resetForm() {
    title.value = "";
    company.value = "";
    url.value = "";
    status.value = "Applied";
    salary_min.value = null;
    salary_max.value = null;
    location.value = "";
    remote.value = false;
    applied_date.value = new Date().toISOString().split("T")[0];
    description.value = "";
    notes.value = "";
  },
});
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="text-center mb-2">
      <h2 class="text-2xl font-bold text-leaf-dark mb-1">
        {{ isEditing ? "Edit Application" : "Add New Application" }} 🌱
      </h2>
      <p class="text-sm text-primary-light">
        Track your opportunity from seed to success
      </p>
    </div>

    <!-- Basic Job Details Section -->
    <div class="space-y-4">
      <!-- Job Title -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-leaf-medium-dark"
          >Job Title*</label
        >
        <input
          v-model="title"
          type="text"
          placeholder="Frontend Developer"
          class="input"
          required
        />
      </div>

      <!-- Company -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-leaf-medium-dark"
          >Company*</label
        >
        <input
          v-model="company"
          type="text"
          placeholder="Google, Amazon, etc."
          class="input"
          required
        />
      </div>

      <!-- URL -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-leaf-medium-dark"
          >Application Link</label
        >
        <input
          v-model="url"
          type="url"
          placeholder="https://linkedin.com/jobs/..."
          class="input"
        />
      </div>

      <!-- Status -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-leaf-medium-dark"
          >Application Status*</label
        >
        <select v-model="status" class="input" required>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>
    </div>

    <!-- Additional Details Section -->
    <div class="pt-2 space-y-4">
      <h3 class="text-md font-semibold text-leaf-dark">Additional Details</h3>

      <!-- Salary Range -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-leaf-medium-dark"
          >Salary Range</label
        >
        <div class="flex gap-3">
          <div class="flex-1">
            <input
              v-model.number="salary_min"
              type="number"
              placeholder="Min"
              class="input w-full"
            />
          </div>
          <div class="flex-1">
            <input
              v-model.number="salary_max"
              type="number"
              placeholder="Max"
              class="input w-full"
            />
          </div>
        </div>
      </div>

      <!-- Location & Remote -->
      <div class="flex gap-4">
        <div class="flex-1 flex flex-col gap-1">
          <label class="text-sm font-semibold text-leaf-medium-dark"
            >Location</label
          >
          <input
            v-model="location"
            type="text"
            placeholder="City, Country"
            class="input"
          />
        </div>
        <div class="flex items-end pb-3 ml-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              v-model="remote"
              class="form-checkbox h-5 w-5 text-primary"
            />
            <span class="text-sm font-semibold text-leaf-medium-dark"
              >Remote?</span
            >
          </label>
        </div>
      </div>

      <!-- Applied Date -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-leaf-medium-dark"
          >Applied Date</label
        >
        <input v-model="applied_date" type="date" class="input" />
      </div>
    </div>

    <!-- Notes Section -->
    <div class="pt-2 space-y-4">
      <h3 class="text-md font-semibold text-leaf-dark">Notes & Description</h3>

      <!-- Job Description -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-leaf-medium-dark"
          >Job Description</label
        >
        <textarea
          v-model="description"
          rows="3"
          placeholder="Enter job details, requirements, etc."
          class="input"
        ></textarea>
      </div>

      <!-- Notes -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-leaf-medium-dark"
          >Your Notes</label
        >
        <textarea
          v-model="notes"
          rows="3"
          placeholder="Add your personal notes, interview impressions, etc."
          class="input"
        ></textarea>
      </div>
    </div>

    <!-- Buttons -  -->
    <div
      class="flex justify-end gap-4 sticky bottom-0 border-t border-gray-100 mt-6 mx-[-24px] px-6"
    >
      <button @click="$emit('cancel')" type="button" class="btn-cancel">
        Cancel
      </button>
      <button @click="handleSubmit" type="button" class="btn-primary">
        {{ isEditing ? "Update" : "Save" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply border-2 border-leaf-light bg-background rounded-lg p-2 placeholder:text-leaf-medium-light/70 text-leaf-dark focus:ring-2 focus:ring-primary focus:outline-none transition;
}
.btn-primary {
  @apply px-5 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition;
}
.btn-cancel {
  @apply px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition;
}
</style>
