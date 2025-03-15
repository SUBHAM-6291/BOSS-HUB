import mongoose, { Model, Schema } from "mongoose";

interface Employee {
  employeeId: string;
  fullName: string;
  email: string;
  employeeIdNumber: string;
  workingHours: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const EmployeeSchemaModel = new Schema<Employee>(
  {
    employeeId: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      trim: true,
    },
    employeeIdNumber: {
      type: String,
      required: [true, "Please enter your employee ID"],
      unique: true,
      trim: true,
    },
    workingHours: {
      type: Number,
      required: [true, "Please enter your working hours"],
      min: [1, "Working hours must be at least 1"],
      max: [24, "Working hours cannot exceed 24"],
    },
  },
  {
    timestamps: true,
  }
);

type EmployeeModel = Model<Employee>;

const Employee: EmployeeModel =
  mongoose.models.Employee ||
  mongoose.model<Employee>("Employee", EmployeeSchemaModel);

export { EmployeeSchemaModel, Employee };
export default Employee;