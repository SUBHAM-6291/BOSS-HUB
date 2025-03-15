import connectToDatabase from "@/Backend/lib/Db.connect";
import Employee from "@/Backend/Models/Employes.Model";
import { EmployeeSchemaType } from "@/Backend/Schema/Employe.Schema";
import { NextRequest, NextResponse } from "next/server";

interface EmployeeRequestBody extends EmployeeSchemaType {
  employeeId: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body: EmployeeRequestBody = await req.json();
    const { employeeId, fullName, email, employeeIdNumber, workingHours } = body;

    if (!employeeId || !fullName || !email || !employeeIdNumber || !workingHours) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Employee ID, full name, email, employee ID number, and working hours are required",
        },
        { status: 400 }
      );
    }

    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { employeeIdNumber }],
    });

    if (existingEmployee) {
      return NextResponse.json(
        {
          status: "error",
          message: "Employee with this email or employee ID number already exists",
        },
        { status: 409 }
      );
    }

    const newEmployee = new Employee({
      employeeId,
      fullName,
      email,
      employeeIdNumber,
      workingHours,
    });
    const savedEmployee = await newEmployee.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Employee registered successfully",
        data: savedEmployee,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        {
          status: "error",
          message: "Duplicate entry found for email or employee ID",
        },
        { status: 409 }
      );
    }

    console.error("Error in employee registration:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}