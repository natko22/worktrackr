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

const resetForm = () => {
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
};

defineExpose({ resetForm, title, company, url, status });
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="text-center mb-4">
      <h2 class="text-3xl font-bold text-leaf-dark mb-1">
        {{ isEditing ? "Edit Application" : "Add New Application" }} 🌱
      </h2>
      <p class="text-sm text-primary-light">
        Track your opportunity from seed to success
      </p>
    </div>

    <!-- Job Title -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-semibold text-leaf-medium-dark"
        >Job Title</label
      >
      <input
        v-model="title"
        type="text"
        placeholder="Frontend Developer"
        class="input"
      />
    </div>

    <!-- Company -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-semibold text-leaf-medium-dark">Company</label>
      <input
        v-model="company"
        type="text"
        placeholder="Google, Amazon, etc."
        class="input"
      />
    </div>

    <!-- URL -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-semibold text-leaf-medium-dark"
        >Application Link (Optional)</label
      >
      <input
        v-model="url"
        type="url"
        placeholder="https://linkedin.com/jobs/..."
        class="input"
      />
    </div>

    <!-- Status -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-semibold text-leaf-medium-dark"
        >Application Status</label
      >
      <select v-model="status" class="input">
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
    </div>

    <!-- Buttons -->
    <div class="flex justify-end gap-4 mt-6">
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
  @apply border-2 border-leaf-light bg-background rounded-lg p-3 placeholder:text-leaf-medium-light/70 text-leaf-dark focus:ring-2 focus:ring-primary focus:outline-none transition;
}
.btn-primary {
  @apply px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition;
}
.btn-cancel {
  @apply px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition;
}
</style>
