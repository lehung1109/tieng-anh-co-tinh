import { useContext } from "react";
import { SupabaseContext } from "@/providers/supabase-provider";
import { SupabaseClient } from "@supabase/supabase-js";

export const useSupabaseClient = () => {
  const supabase = useContext<SupabaseClient | null>(SupabaseContext);

  if (!supabase) {
    throw new Error("Supabase client not found");
  }

  return supabase;
};