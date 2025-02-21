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

  const { data: existingSubscribers } = await supabase
    .from("newsletter_subscribers")
    .select("id")
    .eq("user_id", user?.id)
    .eq("email", email)
    .single();

  if (existingSubscribers) {
    ToastError({ message: "You are already subscribed." });
    return;
  }

  // Insert new subscription
  const { error: insertError } = await supabase
    .from("newsletter_subscribers")
    .insert({
      user_id: user?.id,
      email: email,
      status: true,
    });

  if (insertError) {
    ToastError({ message: "Error adding subscriber." });
    return;
  }

  ToastSuccess({ message: "Added Subscriber." });
  setEmail("");
  // const res = await fetch("/api/mailchimp-subscribe", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email }),
  // });

  // const data = await res.json();
};
