import { authOptions } from "@/auth";
import connectDB from "@/lib/db"
import User from "@/models/user.model";
import { getServerSession } from "next-auth";

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(user, { status: 200 });

  } catch (error) {
    console.log(error);
    return Response.json(
      { message: `user data error ${error}` },
      { status: 500 }
    );
  }
};