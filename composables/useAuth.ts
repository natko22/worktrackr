import { ref, computed } from "vue";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  // State
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed properties
  const isAuthenticated = computed(() => !!user.value);

  const nuxtApp = useNuxtApp();

  // Initialize the user on mount
  const initialize = async () => {
    loading.value = true;
    try {
      const { data } = await nuxtApp.$supabase.auth.getUser();
      user.value = data.user;

      // Listen for auth state changes
      nuxtApp.$supabase.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user ?? null;
      });
    } catch (err: any) {
      error.value = err.message || "Failed to initialize user";
      console.error("Auth initialization error:", err);
    } finally {
      loading.value = false;
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: authError } =
        await nuxtApp.$supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        throw authError;
      }

      user.value = data.user;
      return { success: true, data };
    } catch (err: any) {
      error.value = err.message || "Login failed";
      console.error("Login error:", err);
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  // Signup
  const signup = async (email: string, password: string, fullName: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: authError } = await nuxtApp.$supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (authError) {
        throw authError;
      }

      user.value = data.user;
      return { success: true, data };
    } catch (err: any) {
      error.value = err.message || "Signup failed";
      console.error("Signup error:", err);
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  // Logout
  const logout = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { error: authError } = await nuxtApp.$supabase.auth.signOut();

      if (authError) {
        throw authError;
      }

      user.value = null;
      return { success: true };
    } catch (err: any) {
      error.value = err.message || "Logout failed";
      console.error("Logout error:", err);
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  //  get user profile data
  const getUserProfile = async () => {
    if (!user.value) return null;

    try {
      const { data, error: profileError } = await nuxtApp.$supabase
        .from("profiles")
        .select("*")
        .eq("id", user.value.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      return data;
    } catch (err: any) {
      console.error("Error fetching user profile:", err);
      return null;
    }
  };

  //  check if user is authenticated and redirect if not
  const requireAuth = async (redirectTo = "/login") => {
    if (!loading.value && !user.value) {
      navigateTo(redirectTo);
    }
    return user;
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    initialize,
    login,
    signup,
    logout,
    getUserProfile,
    requireAuth,
  };
}
