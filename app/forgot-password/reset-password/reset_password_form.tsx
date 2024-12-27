"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPasswordFunc } from "./action";
import { useRouter,useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// Validation schema for the form
const formSchema = z.object({
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
});

export default function ResetPassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!code) {
    setServerError("Invalid recovery link. Please try again.");
    setIsLoading(false);
    return;
  }


  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await resetPasswordFunc({
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        code, 
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        // Redirect to the dashboard page after successful password reset
        router.push("/dashboard");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-primary-bg">
      <div className="w-[380px] rounded-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Password Reset</h2>
        <p className="text-center text-primary-text mb-6">
          Enter your new password to update your password
        </p>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              New password
            </label>
            <input
              type="password"
              id="password"
              {...form.register("password")}
              className="p-2 text-primary-text bg-secondary-bg border border-secondary-border focus:outline-none focus:border-accent-strongerborder rounded-md"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="passwordConfirm" className="text-sm font-medium">
              Confirm password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              {...form.register("passwordConfirm")}
              className="p-2 text-primary-text bg-secondary-bg border border-secondary-border focus:outline-none focus:border-accent-strongerborder rounded-md"
            />
            {form.formState.errors.passwordConfirm && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm mt-2">{serverError}</p>
          )}

          <button
            type="submit"
            className="realtive mt-4 cursor-pointer space-x-2 text-center font-thin ease-out duration-200 rounded-md outline-none transition-all outline-0 border bg-accent-bg hover:bg-accent-selection text-primary-text border-accent-border hover:border-accent-strongerborder w-full flex items-center justify-center text-base px-4 py-2 h-[42px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
