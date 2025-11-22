// models/CampaignDonation.js
import mongoose from "mongoose";

const campaignDonationSchema = new mongoose.Schema(
    {
        donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
        type: { type: String, enum: ["Food", "Bedsheet", "Money", "Other"], required: true },
        quantity: { type: Number, default: 1 }, // For items
        notes: { type: String }, // Optional message/details
        status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
        donatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export default mongoose.model("CampaignDonation", campaignDonationSchema);
