// src/Backend/Schema/Manager.Schema.ts
import { z } from "zod";

export const ManagerSchemaValidation = z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    employeeUID: z.string().min(1, "Employee UID is required"),
    department: z.enum(['Manager', 'CTO', 'Senior Engineer (8-10 years)', 'Engineering Manager'], {
        errorMap: () => ({ message: "Invalid department" }),
    }),
    profilePicture: z.any().optional(),
});
export type ManagerSchemaType = z.infer<typeof ManagerSchemaValidation>;