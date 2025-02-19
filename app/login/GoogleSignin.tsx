"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { ToastError } from "@/components/toast";

export default function GoogleSignin({ text }: { text: string }) {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      ToastError({ message: `Error ${error}` });
      setIsGoogleLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={signInWithGoogle}
      disabled={isGoogleLoading}
      className={`relative ${
        isGoogleLoading
          ? "cursor-not-allowed hover:bg-lightsecondary-bg hover:border-lightsecondary-border text-lightprimary-text/70 dark:hover:bg-secondary-bg dark:hover:border-secondary-border dark:text-primary-text/70"
          : "cursor-pointer hover:bg-lightsecondary-selection hover:border-lightsecondary-strongerborder text-lightprimary-text dark:hover:bg-secondary-selection dark:hover:border-secondary-strongerborder dark:text-primary-text"
      }  space-x-2 text-center font-light ease-out duration-200 rounded-md outline-none transition-all outline-0 border bg-lightsecondary-bg  border-lightsecondary-border dark:bg-secondary-bg  dark:border-secondary-border w-full flex items-center justify-center text-base px-4 py-2 h-[42px]`}
    >
      {isGoogleLoading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin text-lightprimary-text  dark:text-primary-text" />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2"
        />
      )}
      Sign {text} with google
    </button>
  );
}
