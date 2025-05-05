export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;

  const { $supabase } = useNuxtApp();
  const {
    data: { session },
  } = await $supabase.auth.getSession();

  if (!session) {
    const redirectPath = to.fullPath;
    return navigateTo(`/login?redirect=${encodeURIComponent(redirectPath)}`);
  }
});
