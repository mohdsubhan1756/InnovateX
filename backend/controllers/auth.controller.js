import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            role,
            address,
            gender,
            bloodGroup,
            donationType,
            hospitalName,
            registrationNumber
        } = req.body;

        if (!["donor", "beneficiary"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        if (!name || !email || !password || !role || !address || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            address,

            // donor fields
            gender: role === "donor" ? gender : null,
            bloodGroup: role === "donor" ? bloodGroup : null,
            donationType: role === "donor" ? donationType : null,

            // hospital fields
            hospitalName: role === "beneficiary" ? hospitalName : null,
            registrationNumber: role === "beneficiary" ? registrationNumber : null,
        });

        await newUser.save();

        // Create JWT
        const token = jwt.sign(
            {
                id: newUser._id,
                role: newUser.role,
                name: newUser.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            message: "Registration successful",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone,
                address: newUser.address,
                gender: newUser.gender,
                bloodGroup: newUser.bloodGroup,
                donationType: newUser.donationType,
                hospitalName: newUser.hospitalName,
                registrationNumber: newUser.registrationNumber
            },
            token
        });

    } catch (error) {
        console.log("REGISTRATION ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "All fields required" });

        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid password" });

        // Create Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                name: user.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            message: "Login success",
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                phone: user.phone,
                email: user.email,
                address: user.address,
                gender: user.gender,
                bloodGroup: user.bloodGroup,
            },
            token,
        });
    } catch (error) {
        console.log("LOGIN ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};
