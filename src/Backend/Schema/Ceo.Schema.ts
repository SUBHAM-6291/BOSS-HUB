import { z } from "zod";

export const CeoZodvalidation = z.object({
  ceoIdNumber: z.string().min(1, "CEO ID is required"),
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  profilePicture: z.string().optional(),
});

export type CeoFormData = z.infer<typeof CeoZodvalidation>;