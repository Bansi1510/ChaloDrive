import { authOptions } from "@/auth";
import connectDB from "@/lib/db"
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";
import { getServerSession } from "next-auth";

const VEHICLE_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/
export const POST = async (req: Request) => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json(
        { message: "You are not authorized" },
        { status: 401 }
      )
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json(
        { message: "user not found" },
        { status: 401 }
      )
    }

    const { type, number, vehicleModel } = await req.json();

    if (!type || !number || !vehicleModel) {
      return Response.json(
        { message: "missing required field" },
        { status: 400 }
      )
    }


    if (VEHICLE_REGEX.test(number)) {
      return Response.json(
        { message: "Invalid vehicle number" },
        { status: 400 }
      )
    }
    const vehicleNumber = number.toUpperCase();

    const isDuplicate = await Vehicle.findOne({ vehicle_no: vehicleNumber });
    if (isDuplicate) {
      return Response.json(
        { message: "This vehicle is already register" },
        { status: 400 }
      )
    }

    let vehicle = await Vehicle.findOne({ owner: session.user.id })
    if (vehicle) {
      vehicle.type = type;
      vehicle.vehicle_no = vehicleNumber;
      vehicle.model = vehicleModel;
      vehicle.status = "pending";

      vehicle.save();

      return Response.json(
        vehicle, { status: 200 }
      )
    } else {
      vehicle = await Vehicle.create({
        owner: user._id,
        type,
        vehicle_no: vehicleNumber,
        model: vehicleModel
      });

      return Response.json(
        vehicle, { status: 201 }
      )
    }

  } catch (error) {
    return Response.json(
      { message: `vehicle boaring error :  ${error}` },
      { status: 500 }
    );
  }
}