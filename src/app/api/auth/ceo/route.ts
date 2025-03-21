import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/Backend/lib/Db.connect";
import mongoose, { Schema, model } from "mongoose";
import { handleImageUpload } from "@/Backend/Middleware/Cloudinary/cloud.middleware";
import { CeoZodvalidation } from "@/Backend/Schema/Ceo.Schema";
import { z } from "zod";

// Define schema inline
const CeoSchema = new Schema(
  {
    ceoIdNumber: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);
delete mongoose.models.Ceo; // Clear cache
const CeoModel = model("Ceo", CeoSchema);

export async function POST(req: NextRequest) {
  try {
    console.log("Starting CEO registration process...");
    await connectToDatabase();
    console.log("Database connected successfully");

    const formData = await req.formData();
    console.log("FormData received:", Object.fromEntries(formData));

    const rawData = {
      fullName: formData.get("fullName")?.toString() || "Unknown CEO",
      email: formData.get("email")?.toString() || `ceo-${Date.now()}@example.com`,
      ceoIdNumber: formData.get("ceoIdNumber")?.toString() || `CEO-UID-${Date.now()}`,
    };
    console.log("Raw data extracted:", rawData);

    const validatedData = CeoZodvalidation.parse(rawData);
    console.log("Data validated successfully:", validatedData);

    const ceoId = validatedData.ceoIdNumber;
    const file = formData.get("profilePicture") as File | null;
    const sessionImage = formData.get("sessionImage")?.toString() || null;
    console.log("CEO ID:", ceoId, "File exists:", !!file, "Session image:", sessionImage);

    const existingCeo = await CeoModel.findOne({
      $or: [{ email: validatedData.email }, { ceoIdNumber: validatedData.ceoIdNumber }],
    });
    console.log("Existing CEO check result:", existingCeo ? "Found" : "Not found");

    if (existingCeo) {
      console.log("Returning existing CEO response");
      return NextResponse.json(
        { status: "success", message: "Welcome back!", data: existingCeo },
        { status: 200 }
      );
    }

    console.log("Uploading image to Cloudinary...");
    const profilePictureUrl = await handleImageUpload(file, sessionImage, ceoId);
    console.log("Image uploaded successfully, URL:", profilePictureUrl);

    const newCeo = new CeoModel({
      ceoId, // Maps to ceoIdNumber
      ...validatedData,
      profilePicture: profilePictureUrl,
    });
    console.log("New CEO document created:", newCeo.toObject());

    await newCeo.save();
    console.log("CEO saved to database successfully");

    return NextResponse.json(
      { status: "success", message: "CEO registered successfully!", data: newCeo },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Zod validation error:", error.errors);
      return NextResponse.json(
        { status: "error", message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Internal server error occurred:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export const config = { api: { bodyParser: false } };