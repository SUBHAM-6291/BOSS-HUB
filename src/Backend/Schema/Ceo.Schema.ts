// Backend/Schema/Ceo.Schema.ts
import { z } from 'zod';

export const CeoZodvalidation = z.object({
  UserId: z.string().min(1, 'User ID is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  name: z.string().optional(),
  image: z.string().optional(),       
  profilePic: z.string().optional(),  
});

export type CeoFormData = z.infer<typeof CeoZodvalidation>;