"use server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { passwordSchema } from "@/validation/passwordSchema";

export const resetPasswordFunc = async ({
  password,
  code,
}: {
  password: string;
  code: string;
}) => {
  const newUserSchema = z.object({
    password: passwordSchema,
  });

  const newUserValidation = newUserSchema.safeParse({
    password,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0]?.message ?? "An error occured",
    };
  }

  // supabase authentication from here
  const supabase = createClient();

  const { data: session, error: sessionError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (sessionError) {
    return {
      error: true,
      message: "Invalid or expired recovery link.",
    };
  }

  // Now update the user's password
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  // User successfully created
  return {
    success: true,
    message: "Password reset successful",
  };
};
