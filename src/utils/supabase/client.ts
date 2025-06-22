
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );


export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();
  console.log('Signing in with email:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  return { data, err: error };
}
