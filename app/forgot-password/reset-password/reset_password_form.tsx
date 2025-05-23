"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPasswordFunc } from "./action";
import { useRouter,useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { passwordSchema } from "@/validation/passwordSchema";
import { ToastSuccess } from "@/components/toast";

// Validation schema for the form
const formSchema = z.object({
  password: passwordSchema,
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
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await resetPasswordFunc({
        password: data.password,
        code, 
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        ToastSuccess({message: "Password reset successfull"})
        router.push("/dashboard");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-lightprimary-bg dark:bg-primary-bg">
      <div className="w-[380px] rounded-md p-6">
        <h2 className="text-2xl font-bold text-center text-lightprimary-text dark:text-primary-text mb-2">Password Reset</h2>
        <p className="text-center text-lightprimary-text dark:text-primary-text mb-4">
          Enter your new password
        </p>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-lightprimary-text/80 dark:text-primary-text/80">
              New password
            </label>
            <input
              type="password"
              id="password"
              {...form.register("password")}
              className="p-2 text-lightprimary-text bg-lightsecondary-bg dark:text-primary-text dark:bg-secondary-bg border border-lightsecondary-border dark:border-secondary-border focus:outline-none focus:border-lightaccent-strongerborder dark:focus:border-accent-strongerborder rounded-md"
              placeholder="Set new password"
            />
            {form.formState.errors.password && (
              <p className="text-red-600 dark:text-red-500 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-red-600 dark:text-red-500 text-sm mt-2">{serverError}</p>
          )}

          <button
            type="submit"
            className="realtive mt-4 cursor-pointer space-x-2 text-center font-light ease-out duration-200 rounded-md outline-none transition-all outline-0 border bg-lightaccent-bg hover:bg-lightaccent-selection text-lightprimary-text border-lightaccent-border hover:border-lightaccent-strongerborder dark:bg-accent-bg dark:hover:bg-accent-selection dark:text-primary-text dark:border-accent-border dark:hover:border-accent-strongerborder w-full flex items-center justify-center text-base px-4 py-2 h-[42px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin text-lightprimary-text dark:text-primary-text" />
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
