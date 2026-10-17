// lib/validations/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Enter your admission number or email").max(100),
  password: z.string().min(1, "Enter your password").max(200),
});