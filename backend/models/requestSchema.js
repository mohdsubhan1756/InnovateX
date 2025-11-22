// models/Request.js
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
        donor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        type: { type: String, enum: ["Blood", "Organ"], required: true },
        status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
