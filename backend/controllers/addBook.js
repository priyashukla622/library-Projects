const signupModel = require("../models/user");
const bookModel = require("../models/bookScheema"); 
const addBooks = async (req, res) => {
    try {
        const { title, authorName, publish, price, language } = req.body;
        const { email } = req.body; 
        const user = await signupModel.findOne({email});

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can add books" });
        }
        if (!title || !authorName || !publish || !price || !language) {
            return res.status(400).json({ message: "Please send proper data" });
        }
        await bookModel.create({ title, authorName, publish, price, language });
        res.status(201).json({ message: "Book added successfully" });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Unable to add book", error: error.message });
    }
};
module.exports = { addBooks };




















