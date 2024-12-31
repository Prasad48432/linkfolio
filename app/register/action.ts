"use server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { passwordSchema } from "@/validation/passwordSchema";



export const registerUser = async ({
  email,
  password,
  fullname,
}: {
  email: string;
  password: string;
  fullname: string;
}) => {
  const newUserSchema = z.object({
    email: z.string().email(),
    password: passwordSchema,
  });

  const newUserValidation = newUserSchema.safeParse({
    email,
    password,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  const supabase = createClient();

  const avatarUrls = [
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Liam",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Ryker",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Caleb",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Eliza",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Nolan",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Maria",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Liliana",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=George",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Kimberly",
  ];

  const randomAvatarUrl = avatarUrls[Math.floor(Math.random() * avatarUrls.length)];

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullname,
        email: email,
        avatar_url: randomAvatarUrl,
      },
    },
  });

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return {
      error: true,
      message: "Email already in use",
    };
  }

  return {
    success: true,
    message: "Check your email for the confirmation link",
  };
};
