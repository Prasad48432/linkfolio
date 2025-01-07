"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import Link from "next/link";
import { forgotPassword } from "./action";
import { toast } from "sonner";

// Schema validation
const formSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: decodeURIComponent(searchParams.get("email") ?? ""),
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await forgotPassword({ email: data.email });

      if (response.error) {
        setServerError(response.message);
      } else {
        toast.success("Password reset email sent!", {
          duration: 1500,
          style: {
            background: "#1a1a1a",
            color: "#89e15a",
            border: "1px solid #363636",
          },
        });
        form.reset({ email: "" });
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-primary-bg">
      <div className="w-[380px] p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-1 text-primary-text">Password Reset</h2>
        <p className="mb-6 text-sm text-secondary-text">
          Enter your email address to reset your password
        </p>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              {...form.register("email")}
              type="email"
              id="email"
              className="p-2 text-sm bg-secondary-bg border border-secondary-border focus:outline-none focus:border-accent-strongerborder rounded-md"
            />
            {form.formState.errors.email && (
              <span className="text-red-500 text-xs">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm mt-2">{serverError}</p>
          )}

          <button
            type="submit"
            className="bg-accent-bg flex items-center justify-center text-primary-text p-2 rounded-md hover:bg-acccent-selection disabled:bg-accent-selection disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Send email"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-secondary-text">
          <div>
            Remember your password?{" "}
            <Link href="/login" className="text-accent-text underline">
              Login
            </Link>
          </div>
          <div>
            Don't have an account?{" "}
            <Link href="/register" className="text-accent-text underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
