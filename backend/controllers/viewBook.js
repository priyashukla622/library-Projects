const bookModel = require("../models/bookScheema");
const viewBooks = async (req, res) => {
    const { title } = req.query;
    try {
        if (title) {
            const books = await bookModel.find({ title });
            if (books.length === 0) {
                return res.status(404).json({ message: "No books found with the given title" });
            }
            return res.status(200).json(books);
        } else {
            const bookList = await bookModel.find();
            res.status(200).json(bookList);
            console.log("Book list viewed successfully");
        }
    } catch (error) {
        res.status(400).json({ message: "Unable to get book list", error: error.message });
        console.log("Unable to get book list");
    }
};
module.exports = { viewBooks };
