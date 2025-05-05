import { defineStore } from "pinia";

// Define the Job/Application interface
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
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

// Define the store state interface
interface ApplicationsState {
  applications: Job[];
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useApplicationsStore = defineStore("applications", {
  state: (): ApplicationsState => ({
    applications: [],
    isLoaded: false,
    isLoading: false,
    error: null,
  }),

  getters: {
    applicationsByStatus: (state) => (status: string) => {
      return state.applications.filter((app) => app.status === status);
    },
  },

  actions: {
    async fetchApplications() {
      // Only fetch if not already loaded
      if (this.isLoaded && !this.isLoading) return this.applications;

      this.isLoading = true;
      this.error = null;

      try {
        const { $supabase } = useNuxtApp();
        const { data: userData } = await $supabase.auth.getUser();

        if (!userData?.user) {
          throw new Error("User not authenticated");
        }

        const { data, error } = await $supabase
          .from("applications")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        this.applications = (data as Job[]) || [];
        this.isLoaded = true;
        return this.applications;
      } catch (err: any) {
        this.error = err.message;
        console.error("Error fetching applications:", err.message);
        return [];
      } finally {
        this.isLoading = false;
      }
    },

    async addApplication(job: Partial<Job>) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $supabase } = useNuxtApp();
        const { data: userData } = await $supabase.auth.getUser();

        if (!userData?.user) {
          throw new Error("User not authenticated");
        }

        const { data, error } = await $supabase
          .from("applications")
          .insert([
            {
              user_id: userData.user.id,
              title: job.title,
              company: job.company,
              url: job.url,
              status: job.status,
              salary_min: job.salary_min,
              salary_max: job.salary_max,
              location: job.location,
              remote: job.remote,
              applied_date: job.applied_date,
              description: job.description,
              notes: job.notes,
            },
          ])
          .select();

        if (error) throw error;

        // Update store state
        if (data && data.length > 0) {
          this.applications = [data[0] as Job, ...this.applications];
        }

        return data?.[0] as Job;
      } catch (err: any) {
        this.error = err.message;
        console.error("Error adding application:", err.message);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async updateApplication(id: string, job: Partial<Job>) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $supabase } = useNuxtApp();

        const { error } = await $supabase
          .from("applications")
          .update({
            title: job.title,
            company: job.company,
            url: job.url,
            status: job.status,
            salary_min: job.salary_min,
            salary_max: job.salary_max,
            location: job.location,
            remote: job.remote,
            applied_date: job.applied_date,
            description: job.description,
            notes: job.notes,
          })
          .eq("id", id);

        if (error) throw error;

        // Update local state
        const index = this.applications.findIndex((app) => app.id === id);
        if (index !== -1) {
          this.applications[index] = { ...this.applications[index], ...job };
        }

        return true;
      } catch (err: any) {
        this.error = err.message;
        console.error("Error updating application:", err.message);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteApplication(id: string) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $supabase } = useNuxtApp();

        const { error } = await $supabase
          .from("applications")
          .delete()
          .eq("id", id);

        if (error) throw error;

        // Update local state
        this.applications = this.applications.filter((app) => app.id !== id);

        return true;
      } catch (err: any) {
        this.error = err.message;
        console.error("Error deleting application:", err.message);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
