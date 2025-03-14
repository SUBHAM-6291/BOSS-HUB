import connectToDatabase from "@/Backend/lib/Db.connect";
import { ManagersModel } from "@/Backend/Models/Manager";
import { ManagerSchemaValidation } from "@/Backend/Schema/Manager.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        
        const body = await req.json();
        const { name, email, employeeUID, phoneNumber, department } = body;

       
        const validation = ManagerSchemaValidation.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { 
                    status: 'error', 
                    message: 'Invalid data format', 
                    errors: validation.error.issues 
                },
                { status: 400 }
            );
        }

  
        const newManager = new ManagersModel({
            name,
            email,
            employeeUID,
            phoneNumber,
            department
        });
        
        const savedManager = await newManager.save();
        
        return NextResponse.json(
            { 
                status: 'success', 
                message: 'Manager created successfully',
                data: savedManager 
            },
            { status: 201 }
        );
        
    } catch (error: any) {
        console.error('Error creating manager:', error);
        if (error.code === 11000) {
            return NextResponse.json(
                { 
                    status: 'error', 
                    message: `Duplicate ${Object.keys(error.keyValue)[0]} detected` 
                },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { 
                status: 'error', 
                message: error.message || 'Something went wrong' 
            },
            { status: 500 }
        );
    }
}