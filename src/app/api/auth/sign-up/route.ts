import { NextRequest, NextResponse } from 'next/server';
import { UserModel as AppUserModel } from '@/Backend/Models/User.Models';
import connectToDatabase from '@/Backend/lib/Db.connect';
import '@/Backend/Middleware/Middleware';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { status: 'error', message: 'Username, email, and password are required' },
      { status: 400 }
    );
  }

  const existingUser = await AppUserModel.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return NextResponse.json(
      { status: 'error', message: 'Username or email already exists' },
      { status: 409 }
    );
  }

  const newUser = new AppUserModel({ username, email, password });
  await newUser.save();

  const accessToken = newUser.generateAuthToken();
  const refreshToken = newUser.generateRefreshToken();
  const userId = newUser._id.toString();

  const response = NextResponse.json(
    {
      status: 'success',
      message: 'User created successfully',
      user: { id: userId, username: newUser.username, email: newUser.email },
    },
    { status: 201 }
  );

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    maxAge:60*60,
    path: '/dashboard',
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60, 
    path: '/',
  });

  return response;
}