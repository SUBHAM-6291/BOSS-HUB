import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/Backend/Models/User.Models';
import connectToDatabase from '@/Backend/lib/Db.connect';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { status: 'error', message: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { status: 'error', message: 'Username or email already exists' },
        { status: 409 }
      );
    }

    const newUser = new UserModel({ username, email, password });
    await newUser.save();

    return NextResponse.json(
      { status: 'success', message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}