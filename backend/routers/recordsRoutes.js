import express from "express";
import { getAllDonations, getAllPatients, getAllUsers } from '../controllers/recordsControllers.js'

const router = express.Router();

router.get("/users", getAllUsers);

// GET all patients
router.get("/patients", getAllPatients);

// GET all donations
router.get("/donations", getAllDonations);

export default router;
