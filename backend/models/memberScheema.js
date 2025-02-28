const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type:String, 
        required: true 
    },
    contact: { 
        type:Number, 
        required: true 
    },
});
const memberModel = mongoose.model("Member", memberSchema);
module.exports = memberModel;