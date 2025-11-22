import Patient from "../models/patientModel.js";
import User from "../models/User.js";

export const addPatient = async (req, res) => {
    try {
        const {
            hospitalId,
            patientName,
            age,
            gender,
            bloodGroup,
            disease,
            requiredOrgan,
            requiredBloodUnits,
            urgencyLevel,
        } = req.body;


        console.log("Hospital id: ", hospitalId);

        // Validate hospital
        const hospital = await User.findById(hospitalId);
        if (!hospital || hospital.role !== "beneficiary") {
            return res.status(400).json({ message: "Invalid hospital ID" });
        }

        // Required field check
        if (
            !patientName ||
            !age ||
            !gender ||
            !bloodGroup ||
            !disease ||
            !urgencyLevel
        ) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        // Create patient
        const newPatient = new Patient({
            hospitalId,
            patientName,
            age,
            gender,
            bloodGroup,
            disease,
            requiredOrgan: requiredOrgan || "",
            requiredBloodUnits: requiredBloodUnits || 0,
            urgencyLevel,
        });

        await newPatient.save();

        return res.status(201).json({
            message: "Patient added successfully",
            patient: newPatient,
        });

    } catch (error) {
        console.log("ADD PATIENT ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getPatientsByHospital = async (req, res) => {
    try {
        const { hospitalId } = req.params;

        const patients = await Patient.find({ hospitalId });

        console.log("HospitalId", hospitalId, patients)

        res.status(200).json({
            success: true,
            data: patients,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getPatientsByBloodGroup = async (req, res) => {
    try {
        const { bloodGroup } = req.params;

        console.log("Requested Blood Group:", bloodGroup);

        if (!bloodGroup) {
            return res.status(400).json({
                success: false,
                message: "Blood group is required",
            });
        }

        const patients = await Patient.find({ bloodGroup });

        console.log("Patients", patients)

        res.status(200).json({
            success: true,
            patients,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
