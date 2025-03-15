import connectToDatabase from "@/Backend/lib/Db.connect";
import { ManagersModel } from "@/Backend/Models/Manager";
import { ManagerSchemaValidation } from "@/Backend/Schema/Manager.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        
        const body = await req.json();
        const { username, email, UserId } = body;
        
        if (!username || !email || !UserId) {
            return NextResponse.json(
                { status: "error", message: "Username, email, and UserId are required" },
                { status: 400 }
            );
        }

        const validation = ManagerSchemaValidation.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { status: "error", message: "Invalid data", errors: validation.error.errors },
                { status: 400 }
            );
        }

        const existingManager = await ManagersModel.findOne({
            $or: [{ email }, { username }, { UserId: UserId }]
        });
        
        if (existingManager) {
            return NextResponse.json(
                { status: "error", message: "Manager username, email, or UserId already exists" },
                { status: 409 }
            );
        }

        const newManager = new ManagersModel(body);
        const savedManager = await newManager.save();
        
        return NextResponse.json(
            { 
                status: "success", 
                message: "Manager registered successfully", 
                data: savedManager 
            },
            { status: 201 }
        );
    } catch (error: any) {
        if (error.code === 400) {
            return NextResponse.json(
                { status: "error", message: "Duplicate entry" },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
} 