"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

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
      console.log("there is an error");
      setIsGoogleLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={signInWithGoogle}
      disabled={isGoogleLoading}
      className={`relative ${isGoogleLoading ? 'cursor-not-allowed hover:bg-secondary-bg hover:border-secondary-border text-primary-text/70' : 'cursor-pointer hover:bg-secondary-selection hover:border-secondary-strongerborder text-primary-text'}  space-x-2 text-center font-thin ease-out duration-200 rounded-md outline-none transition-all outline-0 border bg-secondary-bg  border-secondary-border w-full flex items-center justify-center text-base px-4 py-2 h-[42px]`}
    >
      {isGoogleLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
