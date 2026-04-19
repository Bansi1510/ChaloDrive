import connectDB from "@/lib/db";
import { sendMail } from "@/lib/sendMail";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json();

    await connectDB();
    let user = await User.findOne({ email });

    if (user && user.isEmailVerified) {
      return NextResponse.json(
        { message: "User already register" },
        { status: 400 }
      )
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    if (password.length < 4) {
      return NextResponse.json(
        { message: "password must be at least 4 characteres" },
        { status: 400 }
      )
    }
    const hashPassword = await bcrypt.hash(password, 10);

    if (user && !user.isEmailVerified) {
      user.name = name
      user.password = hashPassword
      user.email = email
      user.otp = otp
      user.otpExpires = otpExpires
      await user.save();
    } else {
      user = await User.create({ name, email, password: hashPassword, otp, otpExpires });
    }

    await sendMail(
      email,
      "OTP for Email verification",
      `<h3>You OTP for Verification is :  ${otp}</h3>`
    );
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