import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabasetypes";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
