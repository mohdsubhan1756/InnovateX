import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routers/auth.routes.js";
import patientRoutes from "./routers/patientRoutes.js";
import donationRoutes from './routers/donationRoutes.js'
import recordsRoutes from './routers/recordsRoutes.js';
import campaignRoutes from './routers/campaign.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/donate", donationRoutes);
app.use("/api/record", recordsRoutes);
app.use("/api/campaign", campaignRoutes)

app.get("/", (req, res) => {
    res.send("Blood & Organ Donation API Running...");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
