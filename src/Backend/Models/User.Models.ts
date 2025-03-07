import mongoose, { Schema, Document, Model } from 'mongoose';
import { applyUserMiddleware } from '../Middleware/Middleware';  // Adjust path

export interface User extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly define _id
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken: () => string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  generateRefreshToken: () => string;
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
}, {
  timestamps: true,
});

applyUserMiddleware(userSchema);

export const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', userSchema);

export default userSchema;