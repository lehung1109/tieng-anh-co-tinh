import { createClient } from "@/lib/supabase/server"

export async function loginUser(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return { data, error };
}

export async function handleSignInWithGoogle() {

}