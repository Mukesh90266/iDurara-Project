const express = require("express")
const {getPeoples,createPeoples} = require("../controllers/peoples")
const router = express.Router();

router.post("/createPeoples",createPeoples)
router.get("/getPeoples",getPeoples)

module.exports = router;