"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "./action";
import { useRouter } from "next/navigation";
import { Loader, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import GoogleSignin from "./GoogleSignin";
import { Quote } from "lucide-react";
import { toast } from "sonner";
import { passwordSchema } from "@/validation/passwordSchema";
import { ToastSuccess } from "@/components/toast";

const formSchema = z.object({
  email: z.string().email(),
  fullname: z.string().min(1, "Full name is required"),
  password: passwordSchema,
});

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        fullname: data.fullname,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        ToastSuccess({message: "Registration successful."})
        router.push("/register/confirmation");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-1 bg-alternative">
        <div className="flex flex-1">
          <main className="flex flex-col bg-lightprimary-bg dark:bg-primary-bg items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r bg-studio border-secondary-border">
            <div className="w-full xl:w-[70%] p-4">
            <img
                className="w-[124px] h-[24px] mb-2 -ml-1 block dark:hidden"
                src="darkheaderlogo.png"
                draggable="false"
              />
              <img
                className="w-[124px] h-[24px] mb-2 -ml-1 hidden dark:block"
                src="headerlogo.png"
                draggable="false"
              />
              <p className="text-base text-lightsecondary-text dark:text-secondary-text mt-1">
                Create a new account
              </p>

              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-3 mt-3"
              >
                <div>
                  <label className="block text-sm font-medium text-lightsecondary-text dark:text-secondary-text">
                    Full Name
                  </label>
                  <input
                    {...form.register("fullname")}
                    className={`${
                      form.formState.errors.fullname
                        ? "text-lightdanger-border dark:text-danger-border border-lightdanger-border focus:border-lightdanger-strongerborder dark:border-danger-border dark:focus:border-danger-strongerborder"
                        : "text-lightprimary-text dark:text-primary-text border-lightsecondary-border dark:border-secondary-border focus:border-lightaccent-strongerborder dark:focus:border-accent-strongerborder"
                    } w-full px-3 py-2 text-sm bg-lightsecondary-bg dark:bg-secondary-bg border focus:outline-none rounded-md mt-1`}
                    placeholder="Enter your full name"
                  />
                  {form.formState.errors.fullname && (
                    <span className="text-red-600 dark:text-red-500 text-sm mt-1">
                      {form.formState.errors.fullname?.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-lightsecondary-text dark:text-secondary-text">
                    Email
                  </label>
                  <input
                    {...form.register("email")}
                    className={`${
                      form.formState.errors.email
                        ? "text-lightdanger-border dark:text-danger-border border-lightdanger-border focus:border-lightdanger-strongerborder dark:border-danger-border dark:focus:border-danger-strongerborder"
                        : "text-lightprimary-text dark:text-primary-text border-lightsecondary-border dark:border-secondary-border focus:border-lightaccent-strongerborder dark:focus:border-accent-strongerborder"
                    } w-full px-3 py-2 text-sm bg-lightsecondary-bg dark:bg-secondary-bg border focus:outline-none rounded-md mt-1`}
                    placeholder="you@example.com"
                  />
                  {form.formState.errors.email && (
                    <span className="text-red-600 dark:text-red-500 text-sm mt-1">
                      {form.formState.errors.email?.message}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-lightsecondary-text dark:text-secondary-text">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      {...form.register("password")}
                      type={isPasswordVisible ? "text" : "password"}
                      className={`${
                        form.formState.errors.password
                          ? "text-lightdanger-border dark:text-danger-border border-lightdanger-border focus:border-lightdanger-strongerborder dark:border-danger-border dark:focus:border-danger-strongerborder"
                          : "text-lightprimary-text dark:text-primary-text border-lightsecondary-border focus:border-lightaccent-strongerborder dark:border-secondary-border dark:focus:border-accent-strongerborder"
                      } w-full px-3 py-2 text-sm bg-lightsecondary-bg dark:bg-secondary-bg border focus:outline-none rounded-md`}
                      placeholder="Set your password"
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center"
                    >
                      {isPasswordVisible ? (
                        <EyeOff className="h-5 w-5 text-lightsecondary-text dark:text-secondary-text" />
                      ) : (
                        <Eye className="h-5 w-5 text-lightsecondary-text dark:text-secondary-text" />
                      )}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <span className="text-red-600 dark:text-red-500 text-xs mt-1">
                      {form.formState.errors.password?.message}
                    </span>
                  )}
                </div>

                {serverError && (
                  <p className="text-red-600 dark:text-red-500 text-sm">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative mt-2 cursor-pointer space-x-2 text-center font-light ease-out duration-200 rounded-md outline-none transition-all outline-0 border bg-lightaccent-bg hover:bg-lightaccent-selection text-lightprimary-text border-lightaccent-border hover:border-lightaccent-strongerborder dark:bg-accent-bg dark:hover:bg-accent-selection dark:text-primary-text dark:border-accent-border dark:hover:border-accent-strongerborder w-full flex items-center justify-center text-base px-4 py-2 h-[42px]"
                >
                  {isLoading ? (
                    <p className="text-lightprimary-text/80 dark:text-primary-text/80 flex items-center justify-center">
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </p>
                  ) : (
                    "Register"
                  )}
                </button>
                <div className="flex items-center space-x-2">
                  <hr className="flex-grow border-t border-lightsecondary-border dark:border-secondary-border" />
                  <span className="text-lightprimary-text dark:text-primary-text">OR</span>
                  <hr className="flex-grow border-t border-lightsecondary-border dark:border-secondary-border" />
                </div>

                <GoogleSignin text="up" />
              </form>

              <div className="flex flex-col gap-2 mt-6 text-center">
                <p className="text-sm text-lightsecondary-text dark:text-secondary-text">
                  Already have an account?{" "}
                  <Link href="/login" className="underline text-lightaccent-text dark:text-accent-text">
                    Login
                  </Link>
                </p>
              </div>

              <div className="text-center mt-8">
                <p className="text-xs text-lightsecondary-text/80 dark:text-secondary-text/80 sm:mx-auto sm:max-w-sm">
                  By continuing, you agree to Linkfolio's{" "}
                  <a className="underline hover:text-lightprimary-text/70 dark:hover:text-primary-text/70" href="#">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a className="underline hover:text-lightprimary-text/70 dark:hover:text-primary-text/70" href="#">
                    Privacy Policy
                  </a>
                  , and to receive periodic emails with updates.
                </p>
              </div>
            </div>
          </main>
          <aside className="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex">
            <div className="h-screen w-full bg-lightprimary-bg dark:bg-primary-bg dark:bg-grid-white/[0.1] relative flex items-center justify-center">
              <div className="relative flex flex-col gap-6">
                <div className="absolute select-none z-30 -top-12 -left-11">
                  <span className="text-[160px] leading-none text-lightprimary-text dark:text-secondary-text rotate-180">
                    <Quote size={40} className="rotate-180" />
                  </span>
                </div>
                <blockquote className="z-10 max-w-lg text-3xl text-lightsecondary-text dark:text-primary-text">
                  I've been using {" "}
                  <a
                    href="#"
                    className="text-lightaccent-text dark:text-accent-text transition-all ease-out duration-200"
                  >
                    @supabase
                  </a>{" "} for two personal projects and it has
                  been amazing being able to use the power of Postgres and don't
                  have to worry about the backend
                </blockquote>
                <a
                  href="https://twitter.com/varlenneto/status/1496595780475535366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex z-30 items-center gap-4 text-lightprimary-text dark:text-primary-text"
                >
                  <img
                    src="https://supabase.com/images/twitter-profiles/wkXN0t_F_400x400.jpg"
                    alt="varlenneto"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <cite className="not-italic font-medium text-lightprimary-text dark:text-primary-text whitespace-nowrap">
                      @varlenneto
                    </cite>
                  </div>
                </a>
              </div>

              <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-lightprimary-bg dark:bg-primary-bg dark:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,#121212)]"></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
