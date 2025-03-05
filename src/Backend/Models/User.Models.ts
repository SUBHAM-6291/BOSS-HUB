import mongoose, { Schema, Document, Model } from 'mongoose';
import { formatDate } from '../utils/dateUtils';


export interface Message extends Document {
  _id: string;
  content: string;
  createdAt: string;
}

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: formatDate,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  messages: Message[];
  generateAuthToken: () => string;
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
  messages: [messageSchema],
});

export const MessageModel: Model<Message> =
  mongoose.models.Message || mongoose.model<Message>('Message', messageSchema);
export const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', userSchema);

export default userSchema;