import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
    {
        hospitalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        patientName: {
            type: String,
            required: true,
            trim: true,
        },

        age: {
            type: Number,
            required: true,
            min: 0,
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },

        bloodGroup: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
            required: true,
        },

        disease: {
            type: String,
            required: true,
        },

        requiredOrgan: {
            type: String,
            enum: ["kidney", "liver", "heart", "lungs", "cornea", ""],
            default: "",
        },

        requiredBloodUnits: {
            type: Number,
            default: 0,
        },

        urgencyLevel: {
            type: String,
            enum: ["low", "medium", "high"],
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
