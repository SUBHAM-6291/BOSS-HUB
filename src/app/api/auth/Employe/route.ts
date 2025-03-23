// src/app/api/auth/Managers/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/Backend/lib/Db.connect";
import { ManagersModel } from "@/Backend/Models/Manager";
import { handleImageUpload } from "@/Backend/Middleware/Cloudinary/cloud.middleware";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const formData = await req.formData();

  const rawData = {
    name: formData.get("name")?.toString() || "Unknown User",
    email: formData.get("email")?.toString() || `user-${Date.now()}@example.com`,
    employeeUID: formData.get("employeeUID")?.toString() || `EMP-${Date.now()}`,
    department: formData.get("department")?.toString() || "Manager",
  };

  try {
    // Check for existing manager by email
    const existingManager = await ManagersModel.findOne({ email: rawData.email });

    if (existingManager) {
      return NextResponse.json(
        { status: "success", message: "Welcome back!", data: existingManager },
        { status: 200 }
      );
    }

    // Handle image upload if provided
    const file = formData.get("profilePicture") as File | null;
    const sessionImage = formData.get("sessionImage")?.toString() || null;
    const profilePictureUrl = await handleImageUpload(file, sessionImage, rawData.employeeUID);

    // Create and save new manager
    const newManager = new ManagersModel({
      ...rawData,
      profilePicture: profilePictureUrl,
    });
    await newManager.save();

    return NextResponse.json(
      { status: "success", message: "New user created!", data: newManager },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export const config = { api: { bodyParser: false } };