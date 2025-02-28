const signupModel = require("../models/user");
const bcrypt = require("bcrypt");
const Signup = async (req, res) => {
    const { username, email, password, contact, role } = req.body;
    if (!email || !password || !username || !contact || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Invalid password format. Password must be at least 8 characters." });
    }
    const usernameRegex = /^[A-Za-z\s]+[0-9]*$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ error: "Invalid username format." });
    }
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
        return res.status(400).json({ error: "Invalid contact number format. Contact number must be exactly 10 digits." });
    }
    try {
        const existingUser = await signupModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await signupModel.create({
            username,
            email,
            password: hashPassword,
            contact,
            role
        });
        res.status(201).json({ message: "User signed up successfully", user: result });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
module.exports = { Signup };



