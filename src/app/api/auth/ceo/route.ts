import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/Backend/lib/Db.connect";
import mongoose, { Schema, model } from "mongoose";
import { handleImageUpload } from "@/Backend/Middleware/Cloudinary/cloud.middleware";
import { CeoZodvalidation } from "@/Backend/Schema/Ceo.Schema";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path to your NextAuth config

const CeoSchema = new Schema(
  {
    ceoIdNumber: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);
delete mongoose.models.Ceo;
const CeoModel = model("Ceo", CeoSchema);

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    // Get session data
    const session = await getServerSession(authOptions);
    console.log("Session data:", session);

    const formData = await req.formData();
    console.log("Form data received:", Object.fromEntries(formData));

    const rawData = {
      fullName: formData.get("fullName")?.toString() || "Unknown CEO",
      email:
        formData.get("email")?.toString() || `ceo-${Date.now()}@example.com`,
      ceoIdNumber:
        formData.get("ceoIdNumber")?.toString() || `CEO-UID-${Date.now()}`,
      profilePicture: formData.get("profilePicture")
        ? undefined // Will be handled by handleImageUpload if a file is present
        : session?.user?.image || null, // Default to session image if no file
    };
    console.log("Processed raw data:", rawData);

    const validatedData = CeoZodvalidation.parse(rawData);

    const ceoId = validatedData.ceoIdNumber;
    const file = formData.get("profilePicture") as File | null;
    const sessionImage = formData.get("sessionImage")?.toString() || null;
    console.log(
      "Image upload details - File:",
      file ? "Present" : "Not present",
      "Session Image:",
      sessionImage
    );

    // Check for existing CEO
    const existingCeo = await CeoModel.findOne({
      $or: [
        { email: validatedData.email },
        { ceoIdNumber: validatedData.ceoIdNumber },
      ],
    });
    console.log("Existing CEO query result:", existingCeo);

    if (existingCeo) {
      console.log("CEO found, returning 'Welcome back!'");
      return NextResponse.json(
        { status: "success", message: "Welcome back!", data: existingCeo },
        { status: 200 }
      );
    }

    const profilePictureUrl = file
      ? await handleImageUpload(file, sessionImage, ceoId) // Upload new file
      : rawData.profilePicture; // Use session image or null
    console.log("Profile picture URL:", profilePictureUrl);

    const newCeo = new CeoModel({
      ...validatedData,
      profilePicture: profilePictureUrl,
    });
    console.log("New CEO data to save:", newCeo);

    await newCeo.save();
    console.log("New CEO saved successfully:", newCeo);

    return NextResponse.json(
      {
        status: "success",
        message: "CEO registered successfully!",
        data: newCeo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/auth/ceo:", error);
    if (error instanceof z.ZodError) {
      console.log("Zod validation errors:", error.errors);
      return NextResponse.json(
        { status: "error", message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }
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
