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
        // Redirect to the dashboard page
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
      <div className="w-[380px] p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Login</h2>
        <p className="text-sm text-gray-500">Login to your account</p>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...form.register("email")}
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              placeholder="Enter your email"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              {...form.register("password")}
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              placeholder="Enter your password"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm mt-2">{serverError}</p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center p-2 bg-blue-600 text-white rounded-md mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Login"
            )}
          </button>
          <GoogleSignin />
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="underline text-blue-600">
            Register
          </Link>
        </div>
        <div className="mt-2 text-center text-sm text-gray-500">
          Forgot password?{" "}
          <Link
            href={`/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ""}`}
            className="underline text-blue-600"
          >
            Reset my password
          </Link>
        </div>
      </div>
    </main>
  );
}

