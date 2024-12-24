"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { forgotPassword } from "./action";

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
        router.push("/forgot-password/confirmation");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-[380px] bg-white shadow-md p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
        <p className="mb-6 text-sm text-gray-600">
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
              className="border rounded-md p-2 text-sm"
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
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Forget password"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <div>
            Remember your password?{" "}
            <Link href="/login" className="text-blue-500 underline">
              Login
            </Link>
          </div>
          <div>
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
