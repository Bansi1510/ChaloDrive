import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json();

    await connectDB();
    let user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already register" },
        { status: 400 }
      )
    }
    if (password.length < 4) {
      return NextResponse.json(
        { message: "password must be at least 4 characteres" },
        { status: 400 }
      )
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword });

    return NextResponse.json(
      user,
      { status: 200 }
    )

  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    )
  }
}