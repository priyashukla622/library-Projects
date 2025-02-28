const memberModel = require('../models/memberScheema');
const updateUser = async (req, res) => {
    const { email, username, contact } = req.body;
    try {
        const userEmail = await memberModel.findOne({ email });
        if (userEmail) {
            const updateResult = await memberModel.updateOne({ email },{ $set: { username, contact } } );

            if (updateResult.modifiedCount > 0) {
                res.status(201).json({ message: "Member updated successfully",updateResult });
                console.log("Member updated successfully");
            } else {
                res.status(400).json({ message: "No changes were made to the member details" });
                console.log("No changes were made to the member details");
            }
        } else {
            res.status(404).json({ message: "User not found with the provided email" });
            console.log("User not found with the provided email");
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating member", error: error.message });
        console.log("Error updating member", error);
    }
};

module.exports = { updateUser };