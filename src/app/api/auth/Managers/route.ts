// src/app/api/auth/Managers/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/Backend/lib/Db.connect";
import { ManagersModel } from "@/Backend/Models/Manager";
import { handleImageUpload } from "@/Backend/Middleware/Cloudinary/cloud.middleware";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path to your NextAuth config

export async function POST(req: NextRequest) {
  console.log("POST request received at /api/auth/Managers");
  await connectToDatabase();
  console.log("Database connection established");

  // Get session data
  const session = await getServerSession(authOptions);
  console.log("Session data:", session);

  const formData = await req.formData();
  console.log("Form data received:", Object.fromEntries(formData));

  const rawData = {
    name: formData.get("name")?.toString() || "Unknown User",
    email:
      formData.get("email")?.toString() || `user-${Date.now()}@example.com`,
    employeeUID: formData.get("employeeUID")?.toString() || `EMP-${Date.now()}`,
    department: formData.get("department")?.toString() || "Manager",
    profilePicture: formData.get("profilePicture")
      ? undefined // Will be handled by handleImageUpload if a file is present
      : session?.user?.image || null, // Default to session image if no file
  };
  console.log("Processed raw data:", rawData);

  try {
    console.log("Checking for existing manager with email:", rawData.email);
    const existingManager = await ManagersModel.findOne({
      email: rawData.email,
    });
    console.log("Existing manager query result:", existingManager);

    if (existingManager) {
      console.log("Manager found, returning 'Welcome back!'");
      return NextResponse.json(
        { status: "success", message: "Welcome back!", data: existingManager },
        { status: 200 }
      );
    }

    const file = formData.get("profilePicture") as File | null;
    const sessionImage = formData.get("sessionImage")?.toString() || null;
    console.log(
      "Image upload details - File:",
      file ? "Present" : "Not present",
      "Session Image:",
      sessionImage
    );
    const profilePictureUrl = file
      ? await handleImageUpload(file, sessionImage, rawData.employeeUID) // Upload new file
      : rawData.profilePicture; // Use session image or null
    console.log("Profile picture URL:", profilePictureUrl);

    const newManager = new ManagersModel({
      ...rawData,
      profilePicture: profilePictureUrl,
    });
    console.log("New manager data to save:", {
      ...rawData,
      profilePicture: profilePictureUrl,
    });
    await newManager.save();
    console.log("New manager saved successfully:", newManager);

    return NextResponse.json(
      { status: "success", message: "New user created!", data: newManager },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred in POST /api/auth/Managers:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export const config = { api: { bodyParser: false } };
