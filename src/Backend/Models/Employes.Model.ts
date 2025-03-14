import mongoose, { Model, Schema } from "mongoose";

interface Employee {
  fullName: string;
  email: string;
  employeeIdNumber: string;
  jobPosition: string;
  password: string;
  workingHours: number;
  createdat: string,
  ubdatedat: string
}

const EmployeeSchema = new Schema<Employee>({
  fullName: { type: String, required: true },
  email: { type: String, required: [true, "Please enter your email"] },
  employeeIdNumber: {
    type: String,
    required: [true, "Please enter your employee ID"],
  },
  jobPosition: {
    type: String,
    required: [true, "Please enter your job position"],
  },
  password: { type: String, required: [true, "Please enter your password"] },
  workingHours: {
    type: Number,
    required: [true, "Please enter your working hours"],
  },
}, {
  timestamps: true
});

const Employee: Model<Employee> =
  mongoose.models.Employee ||
  mongoose.model<Employee>("Employee", EmployeeSchema);

export default Employee;