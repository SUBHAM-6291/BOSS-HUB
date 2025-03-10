import { z } from "zod";

export const CeoZodvalidation = z.object({
  email: z.string().min(1, { message: "Email or username is required" }),
  username: z.string().min(1, { message: "pls enter your username in correct format " }),
  UserId: z.string().min(10, { message: "Please click on generate" }),
  name:z.string().min(5,{message:"pls enter your username atlest 5 charchters"})
});

export type CeoZodtype = z.infer<typeof CeoZodvalidation>;
