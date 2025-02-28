const signupModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("Login attempt for email:", email);
        const existingUser = await signupModel.findOne({ email: email});
        console.log(existingUser, "hello")
        if (!existingUser) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            console.log("Incorrect password for user:", email);
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        console.log("Login successful for user:", email);
        res.status(200).json({ user: existingUser, token: token });
    } catch (error) {
        console.log("Error during login process:", error.message);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
module.exports = { login };




