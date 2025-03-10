import mongoose, { Schema, Document, model } from "mongoose";

export interface Ceo extends Document {
  UserId: string;
  username: string;
  email: string;
  name?: string;
  image?: string;
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CeoSchema = new Schema<Ceo>(
  {
    UserId: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    image: { type: String },
    profilePic: { type: String },
  },
  {
    timestamps: true,
  }
);

const CeoModel = mongoose.models.Ceo || model<Ceo>("Ceo", CeoSchema);

export default CeoModel;
