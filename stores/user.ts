import { defineStore } from "pinia";

// Define the User interface
interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Define the state interface
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,

    displayName: (state) => {
      if (!state.user) return "Friend";
      return state.user.user_metadata?.full_name || "Friend";
    },
  },

  actions: {
    async fetchUser() {
      this.isLoading = true;
      this.error = null;

      try {
        const { $supabase } = useNuxtApp();
        const { data, error } = await $supabase.auth.getUser();

        if (error) throw error;

        this.user = (data?.user as User) || null;
        return this.user;
      } catch (err: any) {
        this.error = err.message;
        console.error("Error fetching user:", err.message);
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async signOut() {
      this.isLoading = true;
      this.error = null;

      try {
        const { $supabase } = useNuxtApp();
        const { error } = await $supabase.auth.signOut();

        if (error) throw error;

        this.user = null;
        return true;
      } catch (err: any) {
        this.error = err.message;
        console.error("Error signing out:", err.message);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
