import mongoose, { Schema, Document, model } from "mongoose";

export interface Ceo extends Document {
  ceoIdNumber: string;
  fullName: string;
  email: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CeoSchema = new Schema<Ceo>(
  {
    ceoIdNumber: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

const CeoModel = mongoose.models.Ceo || model<Ceo>("Ceo", CeoSchema);

export default CeoModel;