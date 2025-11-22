import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, default: Date.now },
    items: [
        {
            name: String,
            quantity: Number,
            patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
        },
    ],
}, { timestamps: true });

export default mongoose.model("Campaign", campaignSchema);
