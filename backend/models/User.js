import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["donor", "beneficiary"],
            required: true,
        },

        // Common fields
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        address: { type: String, required: true },

        // Donor fields
        gender: { type: String, enum: ["male", "female", "other"], default: null },
        bloodGroup: { type: String, default: null },
        donationType: {
            type: String,
            enum: ["blood", "organ", "both"],
            default: null,
        },

        // Beneficiary (Hospital) fields
        hospitalName: { type: String, default: null },
        registrationNumber: { type: String, default: null },

        // Volunteer Degree Verification
        degreeFile: { type: String, default: null },
        degreeStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        // Certificates for Donors
        certificates: [
            {
                fileUrl: String,
                approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                date: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
