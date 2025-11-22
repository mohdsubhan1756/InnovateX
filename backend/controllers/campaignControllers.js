import Campaign from "../models/Campaign.js";
import GoodsDonation from "../models/GoodsDonation.js";
import CampaignDonation from "../models/CampaignDonation.js";

// Create Campaign (Beneficiary)
export const createCampaign = async (req, res) => {
    try {
        const { beneficiary, title, description, goodsRequired, endDate } = req.body;
        const campaign = new Campaign({ beneficiary, title, description, goodsRequired, endDate });
        await campaign.save();
        res.status(201).json({ message: "Campaign created", campaign });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all campaigns (for donors to see)
export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate("beneficiary", "name hospitalName");
        res.status(200).json({ campaigns });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get campaign by ID (for analysis)
// export const getCampaignById = async (req, res) => {
//     try {
//         const campaign = await Campaign.findById(req.params.id).populate("beneficiary", "name hospitalName");
//         if (!campaign) return res.status(404).json({ message: "Campaign not found" });
//         console.log("campaign", campaign)
//         res.status(200).json({ campaign });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// backend controller: getCampaignById
export const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
            .populate("beneficiary", "name hospitalName")
            .populate("items.patient", "patientName age gender"); // populate patients for each item
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });
        res.status(200).json({ campaign });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


// Donor donates goods

export const donateToCampaign = async (req, res) => {
    try {
        const { donor, campaign, type, quantity, notes } = req.body;
        if (!donor || !campaign || !type) return res.status(400).json({ message: "Missing fields" });

        const donation = new CampaignDonation({ donor, campaign, type, quantity, notes });
        await donation.save();
        res.status(201).json({ message: "Donation submitted", donation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Donor's donations
export const getMyCampaignDonations = async (req, res) => {
    try {
        const donations = await CampaignDonation.find({ donor: req.params.donorId })
            .populate("campaign", "title description")
            .sort({ donatedAt: -1 });

        res.status(200).json({ donations });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

