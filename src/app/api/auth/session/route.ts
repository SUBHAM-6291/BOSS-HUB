
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/Backend/lib/Db.connect";
import CeoModel from "@/Backend/Models/Ceo.Models";
import { handleImageUpload } from "@/Backend/Middleware/Cloudinary/cloud.middleware";
import { CeoZodvalidation } from "@/Backend/Schema/Ceo.Schema";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();
    
    const rawData = {
      fullName: formData.get("fullName")?.toString() || "Unknown CEO",
      email: formData.get("email")?.toString() || `ceo-${Date.now()}@example.com`,
      ceoIdNumber: formData.get("ceoIdNumber")?.toString() || `CEO-${Date.now()}`,
    };

    const validatedData = CeoZodvalidation.parse(rawData);

    const file = formData.get("profilePicture") as File | null;
    let  sessionImage: string | undefined|null;
    
    if (file) {
     sessionImage = await handleImageUpload(file, null, validatedData.ceoIdNumber);
    }

    const existingCeo = await CeoModel.findOne({
      $or: [
        { email: validatedData.email },
        { fullname: validatedData.fullName }
      ]
    });

    if (existingCeo) {
      return NextResponse.json(
        { message: "CEO with this email or ID already exists" },
        { status: 400 }
      );
    }

    const newCeo = await CeoModel.create({
      ...validatedData,
      profilePicture:  sessionImage
    });

    return NextResponse.json(
      { 
        message: "CEO created successfully",
        data: newCeo 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error in CEO API:", error);
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { message: "Welcome back CEO" },
    { status: 200 }
  );
}