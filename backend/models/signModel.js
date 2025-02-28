const mongoose=require("mongoose")
const singSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email: {
        type: String,
        require: true
    },
    contact:{
        type:Number,
        require:true
    },
    Date:{
        type:Date,
        defalut:Date.now
    }
})
const LibrarySchema=new mongoose.model("LibrarySchema",singSchema);
module.exports={LibrarySchema}