const signupModel = require("../models/user");
const memberModel = require("../models/memberScheema");
const bcrypt = require('bcrypt');
const addUser = async (req, res) => {
  const { username, email, password, contact } = req.body;
  if (!username || !email || !password || !contact) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Invalid password format. Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character."
    });
  }
  const usernameRegex = /^[A-Za-z\s]+[0-9]*$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ error: "Invalid username format. Username should contain only letters and optionally end with numbers." });
  }
  const contactRegex = /^\d{10}$/;
  if (!contactRegex.test(contact)) {
    return res.status(400).json({ error: "Invalid contact number format. Contact number must be exactly 10 digits." });
  }
  try {
    const existingSignupUser = await signupModel.findOne({ email: email });
    if (!existingSignupUser) {
      return res.status(404).json({ message: "User must sign up first" });
    }
    const existingMemberUser = await memberModel.findOne({ email: email });
    if (existingMemberUser) {
      return res.status(409).json({ message: "User already exists as a member" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      username,
      email,
      password: hashedPassword,
      contact
    };
    const newUser = await memberModel.create(data);
    res.status(201).json({ message: "User added successfully", data: newUser });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
module.exports = { addUser };
