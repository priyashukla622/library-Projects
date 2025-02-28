const issueReturn= require("../models/issueReturn");
const signupModel=require("../models/user");
const returnBook = async (req, res) => {
    const data = {
        email: req.body.email,
        contact: req.body.contact,
        title: req.body.title,
    };
    try {
        console.log('Checking data for return:', data);
        if (!data.email) {
            return res.json({ message: "Please provide an email" });
        }
        if (!data.title) {
            return res.json({ message: "Please provide the book title" });
        }
        const exitMember = await signupModel.findOne({ email: data.email });
        if (!exitMember) {
            return res.json({ message: "User does not exist" });
        }
        const issuedBook = await issueReturn.findOne({ email: data.email, title: data.title });

        if (!issuedBook) {
            return res.json({ message: "No such book issued to this user" });
        }
        await issueReturn.deleteOne({ email: data.email, title: data.title });

        res.json({ message: "Book returned successfully" });
    } catch (error) {
        console.error(error);
        res.json({ message: "Error occurred while returning the book", error: error.message });
    }
};
module.exports = { returnBook };