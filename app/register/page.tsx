import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";

export default async function LoginPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}
