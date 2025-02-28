const memberModel= require("../models/memberScheema");
const deleteUser = async (req, res) => {
    const username = req.body.username;
    try {
        console.log("Request Body Username:", username);
        const existsUser = await memberModel.findOne({ username: username });
        console.log("Fetched User:", existsUser);
        if (existsUser) {
            await memberModel.deleteOne({ username: username });
            res.json({ message: "User deleted successfully" });
        } else {
            res.json({ message: "Please provide a correct username" });
        }
    } catch (err) {
        console.error("Error occurred:", err);
        res.json({ message: "An error occurred while processing your request" });
    }
};
module.exports = { deleteUser };