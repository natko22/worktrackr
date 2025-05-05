<script setup lang="ts">
import JobCard from "~/components/jobs/JobCard.vue";
import JobForm from "~/components/jobs/JobForm.vue";
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { useApplicationsStore } from "~/stores/applications";

interface Job {
  id: string;
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
  [key: string]: any;
}

definePageMeta({
  middleware: ["auth"],
});

const userStore = useUserStore();
const applicationsStore = useApplicationsStore();

// UI state
const showForm = ref(false);
const isEditing = ref(false);
const editJobId = ref<string | null>(null);
const currentEditJob = ref({
  title: "",
  company: "",
  url: "",
  status: "Applied",
  salary_min: null as number | null,
  salary_max: null as number | null,
  location: "",
  remote: false,
  applied_date: "",
  description: "",
  notes: "",
});

// Edit job
const handleEdit = (job: Job) => {
  isEditing.value = true;
  editJobId.value = job.id;
  showForm.value = true;

  // Set the current job being edited
  currentEditJob.value = {
    title: job.title || "",
    company: job.company || "",
    url: job.url || "",
    status: job.status || "Applied",
    salary_min: job.salary_min || null,
    salary_max: job.salary_max || null,
    location: job.location || "",
    remote: job.remote || false,
    applied_date: job.applied_date || new Date().toISOString().split("T")[0],
    description: job.description || "",
    notes: job.notes || "",
  };
};

// Save new application
const handleSave = async (job: Partial<Job>) => {
  try {
    await applicationsStore.addApplication(job);
    resetFormState();
  } catch (err) {
    console.error("Error saving application:", err);
  }
};

// Update application
const handleUpdate = async (job: Partial<Job>) => {
  if (!editJobId.value) return;

  try {
    await applicationsStore.updateApplication(editJobId.value, job);
    resetFormState();
  } catch (err) {
    console.error("Error updating application:", err);
  }
};

// Delete application
const handleDelete = async (id: string) => {
  try {
    await applicationsStore.deleteApplication(id);
  } catch (err) {
    console.error("Error deleting application:", err);
  }
};

// Close form without resetting form state
const closeForm = () => {
  showForm.value = false;
};

// Reset form
const resetFormState = () => {
  showForm.value = false;
  isEditing.value = false;
  editJobId.value = null;
  currentEditJob.value = {
    title: "",
    company: "",
    url: "",
    status: "Applied",
    salary_min: null,
    salary_max: null,
    location: "",
    remote: false,
    applied_date: "",
    description: "",
    notes: "",
  };
};

onMounted(async () => {
  // Fetch user and applications data
  await Promise.all([
    userStore.fetchUser(),
    applicationsStore.fetchApplications(),
  ]);
});
</script>

<template>
  <div class="min-h-screen bg-background p-4 md:p-8">
    <!-- Welcome -->
    <div class="text-center mt-4 md:mt-8 mb-8 md:mb-12">
      <h1 class="text-3xl md:text-5xl font-bold text-leaf-dark">
        Welcome back, {{ userStore.displayName }} 🌱
      </h1>
      <p class="text-primary-light mt-2">Track and grow your career journey!</p>
    </div>

    <!-- Add New Job Button -->
    <div class="flex justify-end mb-6">
      <button
        @click="showForm = true"
        class="px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition shadow-md hover:shadow-lg"
      >
        + Add New Job
      </button>
    </div>

    <!-- Loading state -->
    <div
      v-if="
        applicationsStore.isLoading &&
        applicationsStore.applications.length === 0
      "
      class="text-center py-8"
    >
      <p class="text-gray-500">Loading your applications...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="applicationsStore.error" class="text-center py-8">
      <p class="text-red-500">{{ applicationsStore.error }}</p>
      <button
        @click="applicationsStore.fetchApplications()"
        class="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
      >
        Try Again
      </button>
    </div>

    <!-- Board -->
    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
      <!-- Applied -->
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4 text-leaf-dark">Applied 📄</h2>
        <div
          v-if="applicationsStore.applicationsByStatus('Applied').length === 0"
          class="text-center text-gray-400 p-4 bg-white rounded-lg"
        >
          No applications yet!
        </div>
        <div class="flex flex-col gap-3">
          <JobCard
            v-for="job in applicationsStore.applicationsByStatus('Applied')"
            :key="job.id"
            :title="job.title"
            :company="job.company"
            :status="job.status"
            :url="job.url"
            :location="job.location"
            :remote="job.remote"
            :applied_date="job.applied_date"
            @edit="handleEdit(job)"
            @delete="handleDelete(job.id)"
            class="bg-white"
          />
        </div>
      </div>

      <!-- Interview -->
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4 text-yellow-700">Interview 🎤</h2>
        <div
          v-if="
            applicationsStore.applicationsByStatus('Interview').length === 0
          "
          class="text-center text-gray-400 p-4 bg-white rounded-lg"
        >
          No interviews yet!
        </div>
        <div class="flex flex-col gap-3">
          <JobCard
            v-for="job in applicationsStore.applicationsByStatus('Interview')"
            :key="job.id"
            :title="job.title"
            :company="job.company"
            :status="job.status"
            :url="job.url"
            :location="job.location"
            :remote="job.remote"
            :applied_date="job.applied_date"
            @edit="handleEdit(job)"
            @delete="handleDelete(job.id)"
            class="bg-white"
          />
        </div>
      </div>

      <!-- Offer -->
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4 text-green-700">Offer 🎉</h2>
        <div
          v-if="applicationsStore.applicationsByStatus('Offer').length === 0"
          class="text-center text-gray-400 p-4 bg-white rounded-lg"
        >
          No offers yet!
        </div>
        <div class="flex flex-col gap-3">
          <JobCard
            v-for="job in applicationsStore.applicationsByStatus('Offer')"
            :key="job.id"
            :title="job.title"
            :company="job.company"
            :status="job.status"
            :url="job.url"
            :location="job.location"
            :remote="job.remote"
            :applied_date="job.applied_date"
            @edit="handleEdit(job)"
            @delete="handleDelete(job.id)"
            class="bg-white"
          />
        </div>
      </div>

      <!-- Rejected -->
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4 text-gray-700">Rejected ❌</h2>
        <div
          v-if="applicationsStore.applicationsByStatus('Rejected').length === 0"
          class="text-center text-gray-400 p-4 bg-white rounded-lg"
        >
          No rejections yet!
        </div>
        <div class="flex flex-col gap-3">
          <JobCard
            v-for="job in applicationsStore.applicationsByStatus('Rejected')"
            :key="job.id"
            :title="job.title"
            :company="job.company"
            :status="job.status"
            :url="job.url"
            :location="job.location"
            :remote="job.remote"
            :applied_date="job.applied_date"
            @edit="handleEdit(job)"
            @delete="handleDelete(job.id)"
          />
        </div>
      </div>
    </div>

    <!-- Modal with scrollable content -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4 overflow-y-auto"
    >
      <div
        class="bg-white rounded-xl p-6 shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto my-4"
      >
        <button
          @click="resetFormState"
          class="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-xl z-10"
        >
          &times;
        </button>
        <JobForm
          :is-editing="isEditing"
          :edit-job="currentEditJob"
          @save="isEditing ? handleUpdate($event) : handleSave($event)"
          @cancel="resetFormState"
        />
      </div>
    </div>
  </div>
</template>
