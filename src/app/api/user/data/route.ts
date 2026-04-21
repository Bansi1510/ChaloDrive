import auth from "@/auth";
import connectDB from "@/lib/db"
import User from "@/models/user.model";

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const session = await auth();

    if (!session || !session.user) {
      return Response.json(
        { message: "User not autheticated" },
        { status: 400 }
      )
    }
    const user = await User.findOne({ email: session.email });
    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: 400 }
      )
    }
    return Response.json(
      user,
      { status: 200 }
    )
  } catch (error) {
    return Response.json(
      { message: `email verification error ${error}` },
      { status: 500 }
    )
  }
}