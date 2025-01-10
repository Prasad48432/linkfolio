"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "./action";
import { passwordSchema } from "@/validation/passwordSchema";
import { Loader, Quote } from "lucide-react";
import Link from "next/link";
import GoogleSignin from "./GoogleSignin";
import { toast } from "sonner";
import { ToastSuccess } from "@/components/toast";

// Form schema validation
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Please enter your password"),
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
        ToastSuccess({message: "Login successful."})
        router.push("/dashboard/home");
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
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-1 bg-alternative">
        <div className="flex flex-1">
          <main className="flex flex-col bg-primary-bg items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r bg-studio border-secondary-border">
            <div className="w-full xl:w-[70%] p-4">
              <img
                className="w-[124px] h-[24px] mb-2 -ml-1"
                src="headerlogo.png"
                draggable="false"
              />
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
                    className={`${
                      form.formState.errors.email
                        ? "border-danger-border focus:border-danger-strongerborder"
                        : "border-secondary-border focus:border-accent-strongerborder"
                    } w-full px-3 py-2 text-sm bg-secondary-bg border border-secondary-border focus:outline-none rounded-md mt-1`}
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
                    className={`${
                      form.formState.errors.password
                        ? "border-danger-border focus:border-danger-strongerborder"
                        : "border-secondary-border focus:border-accent-strongerborder"
                    } w-full px-3 py-2 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1`}
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

                <div className="flex items-end justify-between">
                  <div className="flex items-center">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-3 h-3 accent-accent-text text-accent-text bg-secondary-bg border-secondary-border rounded focus:ring-accent-border"
                    />
                    <label
                      htmlFor="link-checkbox"
                      className="ms-1 text-xs font-normal text-primary-text"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href={`/forgot-password${
                      email ? `?email=${encodeURIComponent(email)}` : ""
                    }`}
                    className="text-xs font-normal text-accent-text underline cursor-pointer"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative mt-1 cursor-pointer space-x-2 text-center font-thin ease-out duration-200 rounded-md outline-none transition-all outline-0 border bg-accent-bg hover:bg-accent-selection text-primary-text border-accent-border hover:border-accent-strongerborder w-full flex items-center justify-center text-base px-4 py-2 h-[42px]"
                >
                  {isLoading ? (
                    <p className="text-primary-text/80 flex items-center justify-center">
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </p>
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex items-center space-x-2">
                  <hr className="flex-grow border-t border-secondary-border" />
                  <span className="text-primary-text">OR</span>
                  <hr className="flex-grow border-t border-secondary-border" />
                </div>

                <GoogleSignin text="in" />
              </form>
              <div className="mt-8 text-center text-sm text-secondary-text">
                Don't have an account?{" "}
                <Link href="/register" className="underline text-accent-text">
                  Register
                </Link>
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
            <div className="h-screen w-full bg-primary-bg bg-grid-white/[0.1] relative flex items-center justify-center">
              <div className="relative flex flex-col gap-6">
                <div className="absolute select-none -top-12 -left-11">
                  <span className="text-[160px] leading-none text-secondary-text rotate-180">
                    <Quote size={40} className="rotate-180" />
                  </span>
                </div>
                <blockquote className="z-10 max-w-lg text-3xl">
                  I've been using <a href="#" className="text-accent-text transition-all ease-out duration-200">@supabase</a> for two personal projects and it has
                  been amazing being able to use the power of Postgres and don't
                  have to worry about the backend
                </blockquote>
                <a
                  href="https://twitter.com/varlenneto/status/1496595780475535366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <img
                    src="https://supabase.com/images/twitter-profiles/wkXN0t_F_400x400.jpg"
                    alt="varlenneto"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <cite className="not-italic font-medium text-foreground-light whitespace-nowrap">
                      @varlenneto
                    </cite>
                  </div>
                </a>
              </div>

              <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-primary-bg [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#121212)]"></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
