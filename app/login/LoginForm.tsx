"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "./action";
import { passwordSchema } from "@/validation/passwordSchema";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import GoogleSignin from "./GoogleSignin";
import { toast } from "sonner";

// Form schema validation
const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true); // Set loading to true when submission starts

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        toast.success("Login successful", {
          duration: 1500,
          style: {
            background: "#1a1a1a",
            color: "#89e15a",
            border: "1px solid #363636",
          },
        });
        router.push("/dashboard");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

  // Pass the email value to forgot password page
  const email = form.getValues("email");

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-[380px] p-4">
        <h2 className="text-3xl font-semiboldtext-accent-text">Welcome back</h2>
        <p className="text-base text-secondary-text mt-1">
          Login to your account
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
              type="email"
              className="w-full px-3 py-2 text-sm bg-secondary-bg border border-secondary-border focus:outline-none focus:border-accent-strongerborder rounded-md mt-1"
              placeholder="you@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
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
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
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
              "Login"
            )}
          </button>
          <GoogleSignin />
        </form>
        <div className="mt-4 text-center text-sm text-secondary-text">
          Don't have an account?{" "}
          <Link href="/register" className="underline text-accent-text">
            Register
          </Link>
        </div>
        <div className="mt-2 text-center text-sm text-secondary-text">
          Forgot password?{" "}
          <Link
            href={`/forgot-password${
              email ? `?email=${encodeURIComponent(email)}` : ""
            }`}
            className="underline text-accent-text"
          >
            Reset my password
          </Link>
        </div>
      </div>
    </main>
  );
}
