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
      <div className="w-[380px] border rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        <p className="text-center text-gray-600 mb-6">Register for a new account</p>
        
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-2">Email</label>
            <input
              {...form.register("email")}
              id="email"
              type="email"
              className="p-2 border rounded-md"
            />
            {form.formState.errors.email && (
              <span className="text-red-500 text-xs mt-1">{form.formState.errors.email?.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-2">Password</label>
            <input
              {...form.register("password")}
              id="password"
              type="password"
              className="p-2 border rounded-md"
            />
            {form.formState.errors.password && (
              <span className="text-red-500 text-xs mt-1">{form.formState.errors.password?.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="passwordConfirm" className="text-sm font-medium mb-2">Password Confirm</label>
            <input
              {...form.register("passwordConfirm")}
              id="passwordConfirm"
              type="password"
              className="p-2 border rounded-md"
            />
            {form.formState.errors.passwordConfirm && (
              <span className="text-red-500 text-xs mt-1">{form.formState.errors.passwordConfirm?.message}</span>
            )}
          </div>

          {serverError && <p className="text-red-500 text-sm mt-2">{serverError}</p>}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="flex flex-col gap-2 mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
