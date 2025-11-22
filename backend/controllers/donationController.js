import Donation from '../models/donationSchema.js'
import Patient from '../models/patientModel.js';

export const createDonation = async (req, res) => {
    try {
        const { donor, type, patient, quantity, phone } = req.body;

        console.log(req.body);

        if (!donor || !type) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const donation = new Donation({
            donor,
            type,
            patient,
            quantity,
            phone
        });

        await donation.save();

        res.status(201).json({
            message: "Donation request submitted",
            donation
        });
    } catch (err) {
        console.error("Donation error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

export const getBloodDonationRequests = async (req, res) => {
    try {
        const donations = await Donation.find()
            .populate("donor", "name email phone bloodGroup")
            .populate("patient");


        console.log("Donations: ", donations)

        res.json({ donations });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Pending", "Completed", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        res.json({ message: "Status updated", donation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const createOrganDonation = async (req, res) => {
    try {
        const { donor, type, patient, quantity, phone } = req.body;

        if (!donor || !type) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const donation = new Donation({
            donor,
            type,
            patient: patient || null,
            quantity: quantity || 1,
            phone: phone || null,
        });

        await donation.save();

        res.status(201).json({ message: "Donation request submitted", donation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


export const getOrganDonationRequests = async (req, res) => {
    try {
        const donations = await Donation.find({ type: "Organ" })
            .populate("donor", "name email phone bloodGroup")
            .populate("patient");

        res.status(200).json({ donations });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateDonationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Pending", "Completed", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!donation) return res.status(404).json({ message: "Donation not found" });

        res.status(200).json({ message: "Status updated", donation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getOrganPatients = async (req, res) => {
    try {
        const patients = await Patient.find({ requiredOrgan: { $ne: "" } });
        res.status(200).json({ patients });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
