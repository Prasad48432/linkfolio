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
    fullname: z.string().min(1, "Full name is required"),
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
      fullname: "",
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
        fullname: data.fullname,
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
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-1 bg-alternative">
        <div className="flex flex-1">
          <main className="flex flex-col bg-primary-bg items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r bg-studio border-secondary-border">
            <div className="w-full xl:w-[70%] p-4">
              <img
                className="w-[124px] h-[24px] mb-2 -ml-1"
                src="headerlogo.png"
              />
              <p className="text-base text-secondary-text mt-1">
                Create a new account
              </p>

              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-3 mt-3"
              >
                <div>
                  <label className="block text-sm font-medium text-secondary-text">
                    Full Name
                  </label>
                  <input
                    {...form.register("fullname")}
                    className="w-full px-3 py-2 text-sm bg-secondary-bg border border-secondary-border focus:outline-none focus:border-accent-strongerborder rounded-md mt-1"
                    placeholder="Enter your full name"
                  />
                  {form.formState.errors.fullname && (
                    <span className="text-red-500 text-xs mt-1">
                      {form.formState.errors.fullname?.message}
                    </span>
                  )}
                </div>

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
                    Confirm password
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
                  className="relative mt-2 cursor-pointer space-x-2 text-center font-thin ease-out duration-200 rounded-md outline-none transition-all outline-0 border bg-accent-bg hover:bg-accent-selection text-primary-text border-accent-border hover:border-accent-strongerborder w-full flex items-center justify-center text-base px-4 py-2 h-[42px]"
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

              <div className="text-center mt-8">
                <p className="text-xs text-secondary-text/80 sm:mx-auto sm:max-w-sm">
                  By continuing, you agree to Linkfolio's{" "}
                  <a className="underline hover:text-primary-text/70" href="#">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a className="underline hover:text-primary-text/70" href="#">
                    Privacy Policy
                  </a>
                  , and to receive periodic emails with updates.
                </p>
              </div>
            </div>
          </main>
          <aside className="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex">
            <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
              {/* Radial gradient for the container to give a faded look */}
              <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <img className="w-[80%] animate-slideIn " src="headerlogo.png" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
