import { z } from "zod";

export const passwordSchema = z
.string()
.min(8, "Password must be at least 8 characters long")
.regex(
  /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
  "Password must have uppercase letter, special character"
);
