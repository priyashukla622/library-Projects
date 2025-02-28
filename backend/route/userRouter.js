const express=require("express");
const router=express.Router();
const authToken = require('../middlewares/auth');

const {Signup}=require("../controllers/signup");
const {login}=require("../controllers/login");
const {addUser}=require("../controllers/addMember")
const { updateUser}=require("../controllers/updateMember")
const {viewUser}=require("../controllers/viewMember")
const {deleteUser}=require("../controllers/deleteMember")

// // ########### book data ###################
const {addBooks}=require("../controllers/addBook")
const {bookUpdated}=require("../controllers/updateBook")
const {viewBooks}=require("../controllers/viewBook")
const {deleteBooks}=require("../controllers/deleteBook")
const {issueBooks}=require("../controllers/issueBook")
const {returnBook}=require('../controllers/returnBook')

// // ################ api endpoints ################
router.post("/signup",Signup)
router.post("/login",login)
router.post("/addUser",addUser);
router.put("/updateUser",updateUser)
router.get("/viewUser",viewUser)
router.delete("/deleteUser",deleteUser)

// // ###### Book data 
router.post("/addBook",authToken,addBooks)
router.put("/updateBook",authToken,bookUpdated)
router.get("/viewBook",viewBooks)
router.delete("/deleteBook",authToken, deleteBooks);
router.post("/issueBooks",issueBooks)
router.post("/returnBook",returnBook)

module.exports = router;