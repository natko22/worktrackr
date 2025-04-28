import { createClient } from "@supabase/supabase-js";
import { useRuntimeConfig } from "#app";

export const supabase = createClient(
  useRuntimeConfig().public.supabaseUrl as string,
  useRuntimeConfig().public.supabaseKey as string
);
