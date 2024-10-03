const express = require("express");
const router = express.Router();

router.use("/patients", require("./patientsRoute"));

module.exports = router;
