import mongoose from "mongoose";


type vehicleType = "bike" | "car" | "bus" | "truck";
export interface IVehicle extends Document {
  owner: mongoose.Types.ObjectId,
  vehicle_no: string,
  type: vehicleType,
  imageUrl?: string,
  model: string,
  baseFare?: number,
  pricePerKM?: number,
  waitingCharge?: number,
  status: "approved" | "pending" | "rejected",
  rejectionReason?: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
}
const vehicleSchema = new mongoose.Schema<IVehicle>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["bike", "car", "bus", "truck"],
    required: true,
  },
  vehicle_no: {
    type: String,
    unique: true
  },
  model: {
    type: String,
    required: true
  },
  imageUrl: String,
  baseFare: Number,
  pricePerKM: Number,
  waitingCharge: Number,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  rejectionReason: String,
  isActive: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);

export default Vehicle