import { Mongoose, Schema, model, Document } from "mongoose";

interface IOvertimeRequest extends Document {
  hours: number;
  message: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OvertimeRequestSchema = new Schema<IOvertimeRequest>(
  {
    hours: { 
      type: Number, 
      required: true,
      min: [0, 'Hours cannot be negative']
    },
    message: { 
      type: String, 
      required: true,
      trim: true 
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
    },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'],
      required: true,
      default: 'pending'
    },
    approvedBy: { 
      type: String,
      trim: true 
    }
  },
  {
    timestamps: true,
    collection: 'overtime_requests'
  }
);

const OvertimeRequestModel = model<IOvertimeRequest>('OvertimeRequest', OvertimeRequestSchema);

export default OvertimeRequestModel;