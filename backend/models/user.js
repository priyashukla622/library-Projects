const mongoose = require("mongoose");
const userSignup = new mongoose.Schema({
    username:{ 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    role: { 
        type: String, 
        enum: ["admin", "member"], 
        required: true },
});
const signupModel = mongoose.model("Signup", userSignup);
module.exports = signupModel;