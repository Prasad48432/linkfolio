import { ToastError, ToastSuccess } from "@/components/toast";
import type { SupabaseClient } from "@supabase/supabase-js";

export const subscribeUser = async ({
  supabase,
  email,
  setEmail,
}: {
  supabase: SupabaseClient<any, "public", any>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regex.test(email)) {
    ToastError({ message: "Invalid email." });
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("newsletter_subscribers").insert({
    user_id: user?.id,
    email: email,
    status: true,
  });

  // const res = await fetch("/api/mailchimp-subscribe", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email }),
  // });

  // const data = await res.json();
  ToastSuccess({ message: "Added Subscriber." });
  setEmail("");
};
