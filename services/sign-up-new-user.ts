import { createClient } from "@/lib/supabase/server"

export async function signUpNewUser(email: string, password: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return { data, error };
}