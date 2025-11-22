// models/Certificate.js
import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
    {
        donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ["Gratitude", "Volunteer"], required: true },
        fileUrl: { type: String }, // path to uploaded certificate
        approved: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
