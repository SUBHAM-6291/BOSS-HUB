// src/Backend/Models/Manager.ts
import { Schema, model, Document, models } from 'mongoose';

export interface ManagerSchemaType extends Document {
    name: string;
    email: string;
    employeeUID: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
    profilePicture?: string;
}

const DepartmentEnum = ['Manager', 'CTO', 'Senior Engineer (8-10 years)', 'Engineering Manager'] as const;
type DepartmentType = typeof DepartmentEnum[number];

const ManagersSchema: Schema<ManagerSchemaType> = new Schema(
    {
        name: { 
            type: String, 
            required: [true, 'Name is required'],
            trim: true 
        },
        email: { 
            type: String, 
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address']
        },
        employeeUID: { 
            type: String, 
            required: [true, 'Employee UID is required'],
            unique: true,
            trim: true 
        },
        department: { 
            type: String, 
            required: [true, 'Department is required'],
            enum: {
                values: DepartmentEnum,
                message: '{VALUE} is not a valid department'
            }
        },
        profilePicture: { 
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
    }
);

export const ManagersModel = models.Manager || model<ManagerSchemaType>('Manager', ManagersSchema);