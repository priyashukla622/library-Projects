const bookModel = require("../models/bookScheema");
const signupModel = require("../models/user"); 
const bookUpdated = async (req, res) => {
    const {title, authorName, price, publish } = req.body;
    const { email } = req.body;  
    try {
        const user = await signupModel.findOne({email});

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can update books" });
        }
        const existingBook = await bookModel.findOne({ title });

        if (!existingBook) {
            return res.status(404).json({ message: "Book does not exist" });
        }
        const updateResult = await bookModel.updateOne(
            { title },
            { $set: { authorName, price, publish } }
        );

        if (updateResult.modifiedCount > 0) {
            res.status(200).json({ message: "Book updated successfully", updateResult });
            console.log("Book updated successfully");
        } else {
            res.status(400).json({ message: "No changes were made to the book details" });
            console.log("No changes were made to the book details");
        }
    } catch (err) {
        console.error("Error updating book", err);
        res.status(500).json({ message: "Error updating book", error: err.message });
    }
};
module.exports = { bookUpdated };
