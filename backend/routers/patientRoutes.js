import express from "express";
import { addPatient, getPatientsByBloodGroup, getPatientsByHospital } from "../controllers/patientControllers.js";

const router = express.Router();

// Add Patient
router.post("/add", addPatient);
router.get("/:hospitalId", getPatientsByHospital);
router.get("/blood/:bloodGroup", getPatientsByBloodGroup);


export default router;
