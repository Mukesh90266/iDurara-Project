const express = require("express");
const router = express.Router();
const {login, signup} = require("../controllers/auth")

//routes
router.post("/login", login); //login
router.post("/signup", signup); //signup

//export 
module.exports = router;
