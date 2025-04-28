<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from "vue";

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
  editJob: {
    type: Object,
    default: () => ({
      title: "",
      company: "",
      url: "",
      status: "Applied",
    }),
  },
});

const emit = defineEmits(["save", "cancel"]);

const title = ref(props.editJob.title || "");
const company = ref(props.editJob.company || "");
const url = ref(props.editJob.url || "");
const status = ref(props.editJob.status || "Applied");

// Watch for changes to editJob prop
watch(
  () => props.editJob,
  (newVal) => {
    if (props.isEditing && newVal) {
      title.value = newVal.title || "";
      company.value = newVal.company || "";
      url.value = newVal.url || "";
      status.value = newVal.status || "Applied";
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
  });
};

const resetForm = () => {
  title.value = "";
  company.value = "";
  url.value = "";
  status.value = "Applied";
};

defineExpose({ resetForm, title, company, url, status });
</script>

<template>
  <div class="bg-white rounded-2xl p-8 shadow-xl flex flex-col gap-6 w-full">
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
