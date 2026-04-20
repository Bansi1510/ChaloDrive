import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {

    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Required email and otp" },
        { status: 400 }
      )
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 400 }
      )
    }
    if (user.isEmailVerified) {
      return NextResponse.json(
        { message: "Email is already  verified" },
        { status: 400 }
      )
    }
    if (!user.otpExpires || user.otpExpires < new Date()) {
      return NextResponse.json(
        { message: "otp is expired , try again" },
        { status: 400 }
      )
    }
    if (!user.otp || user.otp != otp) {
      return NextResponse.json(
        { message: "invalid otp" },
        { status: 400 }
      )
    }
    user.isEmailVerified = true
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();
    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `email verification error ${error}` },
      { status: 500 }
    )
  }
}
