import express from "express";
import { createDonation, createOrganDonation, getBloodDonationRequests, getOrganDonationRequests, getOrganPatients, updateDonationStatus, updateStatus } from '../controllers/donationController.js'

const router = express.Router();

router.post("/create", createDonation);
router.get("/getblooddonationrequests", getBloodDonationRequests);
router.post("/update-status/:id", updateStatus);
router.post("/create-organ-donation", createOrganDonation);
router.get("/get-organ-donation-request", getOrganDonationRequests);
router.post("/update-donation-status/:id", updateDonationStatus);
router.get("/get-organ-patients", getOrganPatients)

export default router;
