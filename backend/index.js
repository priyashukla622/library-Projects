const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config({path:'./.env'})
const userRouter = require("./route/userRouter")
const port = process.env.PORT ||4000;

// mongoose.connect("mongodb+srv://priyashukla22:ViblLezj9bb2pKim@test-pro-db.kshgj.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db")
// mongoose.connect(process.env.MONGODB_URL)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, 
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
   mongoose.set("bufferCommands", false);

   
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.listen(port, () =>{
  console.log(`Server is running on port ${port}`)
});