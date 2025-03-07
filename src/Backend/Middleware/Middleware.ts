import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';
import { User } from '@/Backend/Models/User.Models';

export const applyUserMiddleware = (userSchema: Schema<User>) => {
  userSchema.pre('save', async function (next) {
    const user = this as User;
    if (!user.isModified('password')) return next();
    
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      next(error as Error);
    }
  });

  userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    } catch (error) {
      throw error;
    }
  };

  userSchema.methods.generateAuthToken = function (): string {
    const user = this as User;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    
    if (!secret) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }

    const expiresIn: string = process.env.ACCESS_TOKEN_EXPIRY || '1h';
    const options: jwt.SignOptions = {
      expiresIn: expiresIn as any,
    };

    try {
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        secret,
        options
      );
      return token;
    } catch (error) {
      throw error;
    }
  };

  userSchema.methods.generateRefreshToken = function (): string {
    const user = this as User;
    const secret = process.env.REFRESH_TOKEN_SECRET;
    
    if (!secret) {
      throw new Error('REFRESH_TOKEN_SECRET is not defined');
    }

    const expiresIn: string = process.env.REFRESH_TOKEN_EXPIRY || '1d';
    const options: jwt.SignOptions = {
      expiresIn: expiresIn as any,
    };

    try {
      const token = jwt.sign(
        { id: user._id },
        secret,
        options
      );
      return token;
    } catch (error) {
      throw error;
    }
  };
};