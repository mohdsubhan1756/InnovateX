import mongoose from "mongoose";

const goodsDonationSchema = new mongoose.Schema({
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    goods: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    status: { type: String, enum: ["Pending", "Delivered"], default: "Pending" },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("GoodsDonation", goodsDonationSchema);
