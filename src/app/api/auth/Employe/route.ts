// pages/api/auth/Employe.ts

import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/Backend/lib/Db.connect";
import Employee from "@/Backend/Models/Employes.Model";
import { handleImageUpload } from "@/Backend/Middleware/Cloudinary/cloud.middleware";
import { EmployeeSchemaValidation } from "@/Backend/Schema/Employe.Schema";
import { z } from "zod";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const formData = await req.formData();

  // Extract and validate data
  const rawData = {
    fullName: formData.get("fullName")?.toString() || "Unknown User",
    email: formData.get("email")?.toString() || `user-${Date.now()}@example.com`,
    employeeIdNumber: formData.get("employeeIdNumber")?.toString() || `Employee-UID-${Date.now()}`,
    workingHours: Number(formData.get("workingHours")) || 6,
  };

  try {
    const validatedData = EmployeeSchemaValidation.parse(rawData);
    const employeeId = validatedData.employeeIdNumber;
    const file = formData.get("profilePicture") as File | null;
    const sessionImage = formData.get("sessionImage")?.toString() || null;

    // Check for existing employee
    const existingEmployee = await Employee.findOne({
      $or: [{ email: validatedData.email }, { employeeIdNumber: validatedData.employeeIdNumber }],
    });

    if (existingEmployee) {
      return NextResponse.json(
        { status: "success", message: "Welcome back!", data: existingEmployee },
        { status: 200 }
      );
    }

    // Upload image and save new employee
    const profilePictureUrl = await handleImageUpload(file, sessionImage, employeeId);
    const newEmployee = new Employee({
      employeeId,
      ...validatedData,
      profilePicture: profilePictureUrl,
    });
    await newEmployee.save();

    return NextResponse.json(
      { status: "success", message: "Employee registered successfully!", data: newEmployee },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { status: "error", message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export const config = { api: { bodyParser: false } };