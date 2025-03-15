import { z } from "zod";

const EmployeeSchemaValidation = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  employeeIdNumber: z
    .string()
    .min(3, { message: "Employee ID must be at least 3 characters" }),
  workingHours: z
    .number()
    .min(0, { message: "Working hours must be at least 1" })
    .max(24, { message: "Working hours cannot exceed 24" }),
});

export type EmployeeSchemaType = z.infer<typeof EmployeeSchemaValidation>;
export { EmployeeSchemaValidation };