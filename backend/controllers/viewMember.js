const memberModel = require("../models/memberScheema");
const viewUser = async (req, res) => {
    const { email } = req.query;
    try {
        if (email) {
            const member = await memberModel.findOne({ email });
            if (!member) {
                return res.status(404).json({ message: "Member not found" });
            }
            return res.status(200).json(member);
        } else {
            const userList = await memberModel.find();
            res.status(200).json(userList);
            console.log("User list viewed successfully");
        }
    } catch (error) {
        res.status(400).json({ message: "Unable to get user list", error: error.message });
        console.log("Unable to get user list");
    }
};
module.exports = { viewUser };