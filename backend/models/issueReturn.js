const mongoose = require("mongoose");
const issueReturnSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    contact: {
        type: Number,
        require: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    autherName: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    publish: {
        type: String,
        required: true,
    },
});
const issueReturn = mongoose.model("Book issueReturn", issueReturnSchema);
module.exports = issueReturn;