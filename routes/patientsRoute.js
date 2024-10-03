const express = require("express");
const router = express.Router();
const patientControl = require("../controller/patientController");

router.get("/", patientControl.getAllPatients);
router.get("/:id", patientControl.getPatientById);
router.post("/", patientControl.createNewPatient);
router.put("/:id", patientControl.updatePatient);
router.delete("/:id", patientControl.deletePatient);

module.exports = router;
