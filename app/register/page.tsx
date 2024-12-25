"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { registerUser } from "./action";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z
  .object({
    email: z.string().email(),
  })
  .and(passwordMatchSchema);

export default function Register() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true); // Set loading to true when submission starts

    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        // Redirect to the confirmation page
        router.push("/register/confirmation");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-[380px] p-6">
        <h2 className="text-3xl font-semiboldtext-accent-text">Get started</h2>
        <p className="text-base text-secondary-text mt-1">
          Create a new account
        </p>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div>
            <label className="block text-sm font-medium text-secondary-text">
              Email
            </label>
            <input
              {...form.register("email")}
              className="w-full px-3 py-2 text-sm bg-secondary-bg border border-secondary-border focus:outline-none focus:border-accent-strongerborder rounded-md mt-1"
              placeholder="you@example.com"
            />
            {form.formState.errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {form.formState.errors.email?.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-text">
              Password
            </label>
            <input
              {...form.register("password")}
              type="password"
              className="w-full px-3 py-2 text-sm bg-secondary-bg border border-secondary-border focus:outline-none focus:border-accent-strongerborder rounded-md mt-1"
              placeholder="Enter your password"
            />
            {form.formState.errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {form.formState.errors.password?.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-text">
              Confirm your password
            </label>
            <input
              {...form.register("passwordConfirm")}
              type="password"
              className="w-full px-3 py-2 text-sm bg-secondary-bg border border-secondary-border focus:outline-none focus:border-accent-strongerborder rounded-md mt-1"
              placeholder="Confirm your password"
            />
            {form.formState.errors.passwordConfirm && (
              <span className="text-red-500 text-xs mt-1">
                {form.formState.errors.passwordConfirm?.message}
              </span>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="relative mt-1 cursor-pointer space-x-2 text-center font-thin ease-out duration-200 rounded-md outline-none transition-all outline-0 border bg-accent-bg hover:bg-accent-selection text-primary-text border-accent-border hover:border-accent-strongerborder w-full flex items-center justify-center text-base px-4 py-2 h-[42px]"
          >
            {isLoading ? (
              <p className="text-primary-text/80 flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </p>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="flex flex-col gap-2 mt-6 text-center">
          <p className="text-sm text-secondary-text">
            Already have an account?{" "}
            <Link href="/login" className="text-accent-text underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
