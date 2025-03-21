import { Schema, model, Document, models } from 'mongoose';

export interface ManagerSchemaType extends Document {
    name: string;
    email: string;
    employeeUID: string;
    phoneNumber: number;
    department: string;
    createdAt: Date;
    updatedAt: Date;
    profilePicture?: string;
}

const DepartmentEnum = ['Manager', 'CTO', 'Senior Engineer (8-10 years)'] as const;
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
        phoneNumber: { 
            type: Number, 
            required: [true, 'Phone number is required'],
            min: [0, 'Phone number cannot be negative'],
            validate: {
                validator: (v: number) => v.toString().length >= 7 && v.toString().length <= 15,
                message: 'Phone number must be between 7 and 15 digits'
            }
        },
        profilePicture: { 
            type: String,
            required: false
        },
        department: { 
            type: String, 
            required: [true, 'Department is required'],
            enum: {
                values: DepartmentEnum,
                message: '{VALUE} is not a valid department'
            }
        },
    },
    {
        timestamps: true,
    }
);

export const ManagersModel = models.Manager || model<ManagerSchemaType>('Manager', ManagersSchema);