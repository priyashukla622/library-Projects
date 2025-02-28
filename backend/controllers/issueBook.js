
const bookModel  = require("../models/bookScheema");   
const issueReturn= require("../models/issueReturn");         
const signupModel = require("../models/user"); 
const issueBooks = async (req, res) => {
    const data = {
        authorName: req.body.authorName,
        email: req.body.email,
        contact: req.body.contact,
        title: req.body.title,
        language: req.body.language,
        price: req.body.price,
        publish: req.body.publish
    };
    try {
        console.log('Checking data:', data);

        if (!data.email) {
            return res.json({ message: "Please provide an email" });
        }
        const exitMember = await signupModel.findOne({ email: data.email} );

        if (!exitMember) {
            return res.json({ message: "User does not exist" });
        }
        console.log(data.authorName,"this is author name")

        const bookAuthorName = await bookModel.findOne({ authorName: data.authorName });
        console.log(bookAuthorName,"HELLO")
        if (!bookAuthorName) {
            return res.json({ message: "This author name book is not present" });
        }
        const book = await bookModel.findOne({ title: data.title });
        if (!book) {
            return res.json({ message: "Book with this title not found" });
        }
        const issueBookData = new issueReturn({
            authorName: data.authorName,
            email: data.email,
            contact: data.contact,
            title: data.title,
            language: data.language,
            price: data.price,
            publish: data.publish
        });
        await issueBookData.save();
        res.json({ message: "Book is available and issued successfully" });

    } catch (error) {
        console.error(error);
        res.json({ message: "Error occurred while issuing the book", error: error.message });
    }
};
module.exports = { issueBooks };