const express = require("express");
const { getCompanies, createCompanies } = require("../controllers/companies");
const router = express.Router();

//routes
router.post("/createCompany", createCompanies); //create company
router.get("/getCompany", getCompanies); //get company data

//export 
module.exports = router;
