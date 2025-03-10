import { NextRequest, NextResponse } from 'next/server';
import CeoModel from '@/Backend/Models/Ceo.Models';
import connectToDatabase from '@/Backend/lib/Db.connect';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { username, email, UserId } = await req.json();

    if (!username || !email || !UserId) {
      return NextResponse.json(
        { status: 'error', message: 'Username, email, and UserId are required' },
        { status: 400 }
      );
    }

    const existingCeo = await CeoModel.findOne({
      $or: [{ email }, { username }, { UserId: UserId }]
    });

    if (existingCeo) {
      return NextResponse.json(
        { status: 'error', message: 'CEO username, email, or UserId already exists' },
        { status: 409 }
      );
    }

    const newCeo = new CeoModel({ username, email, UserId });
    await newCeo.save();

    return NextResponse.json(
      { status: 'success', message: 'CEO registered successfully' },
      { status: 201 }
    );
  } catch (error) {
 
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
