import { Schema, model, Document, models } from 'mongoose';


export interface ManagerSchemaTypee extends Document {
    name: string;
    email: string;
    employeeUID: string;
    phoneNumber: number;
    department: string;
    createdAt: Date;
    updatedAt: Date;
}

const ManagersSchema: Schema<ManagerSchemaTypee> = new Schema(
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
        phoneNumber: { 
            type: Number, 
            required: [true, 'Phone number is required'],
            min: [0, 'Phone number cannot be negative']
        },
        department: { 
            type: String, 
            required: [true, 'Department is required'],
            enum: {
                values: ['Manager', 'CTO', 'Senior Engineer (8-10 years)'],
                message: '{VALUE} is not a valid department'
            }
        },
    },
    {
        timestamps: true,
    }
);

export const ManagersModel = (models.Manager || model<ManagerSchemaTypee>('Manager', ManagersSchema));