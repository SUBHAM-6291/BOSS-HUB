import mongoose, { Schema, Document, Model } from 'mongoose';
import { applyUserMiddleware } from '../Middleware/Middleware';

export interface User extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  name?: string;

  profilePic?: string;
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
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    
  },
  name: {
    type: String,
    default: '',
  },
 
  profilePic: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});


applyUserMiddleware(userSchema);

const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', userSchema);
export default UserModel;