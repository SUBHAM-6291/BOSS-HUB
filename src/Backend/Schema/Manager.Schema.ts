import { z } from "zod";

interface Response {
    name: string;
    email: string;
    employeeUID: string;
    phoneNumber: number;
    department: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const ManagerSchemaValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    employeeUID: z.string().length(13, { message: "Employee UID must be exactly 6 characters long" }),
    phoneNumber: z.number().min(1000000000, { message: "Phone number must be at least 10 digits" }).max(9999999999, { message: "Phone number must not exceed 10 digits" }),
    department: z.string().min(2, { message: "Department must be at least 2 characters long" }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type ManagerSchemaType = z.infer<typeof ManagerSchemaValidation>;