const bookModel = require("../models/bookScheema");
const signupModel = require("../models/user");
const deleteBooks = async (req, res) => {
    const { email, title } = req.body; 
    console.log("Request received with email:", email, "and title:", title); 
    try {
        const admin = await signupModel.findOne({ email: email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        if (admin.role !== "admin") {
            return res.status(403).json({ message: "Only admins can delete books" });
        }
        const existingBook = await bookModel.findOne({ title });
        if (!existingBook) {
            return res.status(404).json({ message: "Book does not exist" });
        }
        const deletedBook = await bookModel.findOneAndDelete({ title });
        if (!deletedBook) {
            return res.status(400).json({ message: "Failed to delete the book" });
        }
        res.status(200).json({ message: "Book deleted successfully", deletedBook });
    } catch (err) {
        console.error("Error occurred while deleting book:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};
module.exports = { deleteBooks };