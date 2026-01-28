import { createClient } from "@/lib/supabase/server"

export async function loginUser(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return { data, error };
}

export async function signInWithGoogle(nonce: string, response: google.accounts.id.CredentialResponse) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
    nonce: nonce,
  });

  return { error };
}
