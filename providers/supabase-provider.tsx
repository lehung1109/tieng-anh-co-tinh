"use client";

import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

export const SupabaseContext = createContext<SupabaseClient | null>(null);

export function SupabaseProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SupabaseContext value={createClient()}>{children}</SupabaseContext>;
}
