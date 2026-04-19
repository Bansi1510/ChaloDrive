import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    )
  }
}
