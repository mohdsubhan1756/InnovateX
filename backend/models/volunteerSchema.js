// models/VolunteerApplication.js
import mongoose from "mongoose";

const volunteerApplicationSchema = new mongoose.Schema(
    {
        donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        campaignName: { type: String },
        status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
        uploadedCertificate: { type: String }, // path to degree/license
    },
    { timestamps: true }
);

export default mongoose.model("VolunteerApplication", volunteerApplicationSchema);
