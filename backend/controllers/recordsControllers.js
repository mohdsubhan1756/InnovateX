import User from "../models/User.js";
import Patient from "../models/patientModel.js";
import Donation from "../models/donationSchema.js";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all patients
export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate("hospitalId", "hospitalName");
        res.status(200).json({ patients });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all donations
export const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find()
            .populate("donor", "name phone")
            .populate("patient", "patientName");
        res.status(200).json({ donations });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
