<script setup lang="ts">
import JobCard from "~/components/jobs/JobCard.vue";
import JobForm from "~/components/jobs/JobForm.vue";
import { ref, onMounted } from "vue";

const { $supabase } = useNuxtApp();

interface Job {
  id: string;
  title: string;
  company: string;
  url: string;
  status: string;
}

definePageMeta({
  middleware: ["auth"],
});
const applications = ref<Job[]>([]);
const username = ref("");
const showForm = ref(false);
const isEditing = ref(false);
const editJobId = ref<string | null>(null);
const currentEditJob = ref({
  title: "",
  company: "",
  url: "",
  status: "Applied",
});

const formRef = ref();

// FETCH applications from Supabase
const fetchApplications = async () => {
  const { data: userData } = await $supabase.auth.getUser();
  if (!userData?.user) return;

  const { data, error } = await $supabase
    .from("applications")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching applications:", error.message);
    return;
  }

  applications.value = data || [];
};

// SAVE (Add New Application)
const handleSave = async (job: any) => {
  const { data: userData, error: userError } = await $supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    return;
  }

  if (!userData?.user) {
    console.error("No user logged in");
    return;
  }

  console.log("Saving job for user:", userData.user.id, job);

  const { data, error } = await $supabase
    .from("applications")
    .insert([
      {
        user_id: userData.user.id,
        title: job.title,
        company: job.company,
        url: job.url,
        status: job.status,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting into Supabase:", error.message);
    return;
  }

  console.log("Inserted successfully:", data);

  await fetchApplications();
  resetFormState();
};

// UPDATE an application
const handleUpdate = async (job: any) => {
  if (!editJobId.value) return;

  const { error } = await $supabase
    .from("applications")
    .update({
      title: job.title,
      company: job.company,
      url: job.url,
      status: job.status,
    })
    .eq("id", editJobId.value);

  if (error) {
    console.error("Error updating application:", error.message);
    return;
  }

  await fetchApplications();
  resetFormState();
};

// DELETE application
const handleDelete = async (id: string) => {
  const { error } = await $supabase.from("applications").delete().eq("id", id);

  if (error) {
    console.error("Error deleting application:", error.message);
    return;
  }

  fetchApplications(); // Refresh after delete!
};

// EDIT job
const handleEdit = (job: any) => {
  isEditing.value = true;
  editJobId.value = job.id;
  showForm.value = true;

  // Set the current job being edited
  currentEditJob.value = {
    title: job.title,
    company: job.company,
    url: job.url || "",
    status: job.status,
  };
};

// RESET form
const resetFormState = () => {
  showForm.value = false;
  isEditing.value = false;
  editJobId.value = null;
  currentEditJob.value = {
    title: "",
    company: "",
    url: "",
    status: "Applied",
  };
};

onMounted(async () => {
  const { data } = await $supabase.auth.getUser();
  if (data?.user) {
    username.value = data.user.user_metadata.full_name || "Friend";
  }

  fetchApplications(); // Fetch on page load
});
</script>

<template>
  <div class="min-h-screen bg-background p-8">
    <!-- Welcome -->
    <div class="text-center mt-8 mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-leaf-dark">
        Welcome back, {{ username }} 🌱
      </h1>
      <p class="text-primary-light mt-2">Track and grow your career journey!</p>
    </div>

    <!-- Add New Job Button -->
    <div class="flex justify-end mb-6">
      <button
        @click="showForm = true"
        class="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition shadow-md hover:shadow-lg"
      >
        + Add New Job
      </button>
    </div>

    <!-- Board -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Applied -->
      <div>
        <h2 class="text-2xl font-bold mb-4 text-leaf-dark">Applied 📄</h2>
        <div
          v-if="
            applications.filter((job) => job.status === 'Applied').length === 0
          "
          class="text-center text-gray-400"
        >
          No applications yet!
        </div>
        <div class="flex flex-col gap-4">
          <JobCard
            v-for="job in applications.filter(
              (job) => job.status === 'Applied'
            )"
            :key="job.id"
            :title="job.title"
            :company="job.company"
            :status="job.status"
            :url="job.url"
            @edit="handleEdit(job)"
            @delete="handleDelete(job.id)"
          />
        </div>
      </div>

      <!-- Interview -->
      <div>
        <h2 class="text-2xl font-bold mb-4 text-yellow-700">Interview 🎤</h2>
        <div
          v-if="
            applications.filter((job) => job.status === 'Interview').length ===
            0
          "
          class="text-center text-gray-400"
        >
          No interviews yet!
        </div>
        <div class="flex flex-col gap-4">
          <JobCard
            v-for="job in applications.filter(
              (job) => job.status === 'Interview'
            )"
            :key="job.id"
            :title="job.title"
            :company="job.company"
            :status="job.status"
            :url="job.url"
            @edit="handleEdit(job)"
            @delete="handleDelete(job.id)"
          />
        </div>
      </div>

      <!-- Offer -->
      <div>
        <h2 class="text-2xl font-bold mb-4 text-green-700">Offer 🎉</h2>
        <div
          v-if="
            applications.filter((job) => job.status === 'Offer').length === 0
          "
          class="text-center text-gray-400"
        >
          No offers yet!
        </div>
        <div class="flex flex-col gap-4">
          <JobCard
            v-for="job in applications.filter((job) => job.status === 'Offer')"
            :key="job.id"
            :title="job.title"
            :company="job.company"
            :status="job.status"
            :url="job.url"
            @edit="handleEdit(job)"
            @delete="handleDelete(job.id)"
          />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-xl p-8 shadow-xl w-full max-w-lg relative">
        <button
          @click="resetFormState"
          class="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-xl"
        >
          &times;
        </button>
        <JobForm
          ref="formRef"
          :is-editing="isEditing"
          :edit-job="currentEditJob"
          @save="isEditing ? handleUpdate($event) : handleSave($event)"
          @cancel="resetFormState"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
