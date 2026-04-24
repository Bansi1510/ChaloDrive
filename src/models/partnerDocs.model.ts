import mongoose, { Document } from "mongoose";

export interface IPartnerDocs extends Document {
  owner: mongoose.Types.ObjectId;
  aadharCard: string,
  rCBook: string,
  licenseUrl: string,
  status: "approved" | "pending" | "rejected",
  rejectionReason?: string,
  createdAt: Date,
  updatedAt: Date
}

const partnerDocsSchema = new mongoose.Schema<IPartnerDocs>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  aadharCard: {
    type: String,
    required: true
  },
  rCBook: String,
  licenseUrl: String,
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"]
  },
  rejectionReason: String,
}, { timestamps: true });

const PartnerDocs = mongoose.models.PartnerDocs || mongoose.model("PartnerDocs", partnerDocsSchema);
export default PartnerDocs;