import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userSchema  from '@/Backend/Models/User.Models';
import { User } from "@/Backend/Models/User.Models";

userSchema.pre("save", async function (next) {
  const user = this as User;

  if (!user.isModified) 
  return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.generateAuthToken = function (): string {
  const user = this as User;
  const secret = process.env.JWT_SECRET || "";
  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    secret,
    { expiresIn: "1h" }
  );
  return token;
};
