import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { name, email, password } = req.json();
    await connectDB();

  } catch (error) {
    return NextResponse.json({
    })
  }
}