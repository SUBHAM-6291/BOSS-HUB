import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/Backend/lib/Db.connect";
import Employee from "@/Backend/Models/Employes.Model";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { EmployeeSchemaValidation, EmployeeSchemaType } from "@/Backend/Schema/Employe.Schema";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "your_default_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "your_default_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "your_default_api_secret",
});

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const rawData = {
      fullName: formData.get("fullName") as string || "Unknown User",
      email: formData.get("email") as string || `user-${Date.now()}@example.com`,
      employeeIdNumber:
        (formData.get("employeeIdNumber") as string) ||
        (formData.get("employeeId") as string) ||
        `Employee-UID-${Date.now()}`,
      workingHours: parseInt(formData.get("workingHours") as string, 10) || 6,
    };

    const validatedData = EmployeeSchemaValidation.parse(rawData);

    const employeeId = formData.get("employeeId") as string || validatedData.employeeIdNumber;
    const file = formData.get("profilePicture") as File | null;
    const sessionImage = formData.get("sessionImage") as string | null;

    const existingEmployee = await Employee.findOne({
      $or: [{ email: validatedData.email }, { employeeIdNumber: validatedData.employeeIdNumber }],
    });
    if (existingEmployee) {
      return NextResponse.json(
        {
          message: "Welcome back! 👋",
          data: existingEmployee,
          success: true,
          isExisting: true,
        },
        { status: 200 }
      );
    }

    let profilePictureUrl = null;

    if (sessionImage) {
      const response = await fetch(sessionImage);
      const buffer = Buffer.from(await response.arrayBuffer());
      profilePictureUrl = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream(
          { folder: "employee_profiles", public_id: `${employeeId}-session-${Date.now()}` },
          (error, result) => resolve(error ? null : result!.secure_url)
        ).end(buffer);
      });
    }

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      profilePictureUrl = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream(
          { folder: "employee_profiles", public_id: `${employeeId}-${Date.now()}` },
          (error, result) => resolve(error ? null : result!.secure_url)
        ).end(buffer);
      });
    }

    const employee = new Employee({
      employeeId,
      fullName: validatedData.fullName,
      email: validatedData.email,
      employeeIdNumber: validatedData.employeeIdNumber,
      workingHours: validatedData.workingHours,
      profilePicture: profilePictureUrl,
    });

    await employee.save();

    return NextResponse.json(
      {
        message: "Employee registered successfully! 🎉",
        data: employee,
        success: true,
        isExisting: false,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/auth/profile:", error);

    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json(
        { message: "Validation failed", errors: errorMessages, success: false },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { message: `${field} already exists`, success: false },
        { status: 409 }
      );
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { message: "Validation failed", errors: messages, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred", success: false },
      { status: 500 }
    );
  }
}

export const config = { api: { bodyParser: false } };