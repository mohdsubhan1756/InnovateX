import express from "express";
import {
    createCampaign,
    getCampaigns,
    getCampaignById,
    donateToCampaign,
    getMyCampaignDonations
} from "../controllers/campaignControllers.js";

const router = express.Router();

// Beneficiary APIs
router.post("/create", createCampaign);
router.get("/", getCampaigns);
// router.get("/get-campaigns", getCampaigns);
router.get("/:id", getCampaignById);

// Donor APIs
router.post("/donate", donateToCampaign);
router.get("/my-donations/:donorId", getMyCampaignDonations);

export default router;
