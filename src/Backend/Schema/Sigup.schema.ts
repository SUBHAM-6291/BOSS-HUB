import { z } from "zod";

export const SignupPageValidation = z.string()
  .min(3, { message: "Must be 3 or more characters long" })
  .regex(/^[a-zA-Z0-9_]+$/, { message: "Username must not contain special characters" });

export const signupSchema = z.object({
  username: SignupPageValidation,
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});