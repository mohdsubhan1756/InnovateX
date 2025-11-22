// models/Donation.js
import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
    {
        donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ["Blood", "Organ"], required: true },
        phone: { type: String },
        patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" }, // optional if specific
        date: { type: Date, default: Date.now },
        quantity: { type: Number }, // in ml for blood or just 1 for organ
        status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
