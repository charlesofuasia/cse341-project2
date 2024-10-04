const express = require('express');
const router = express.Router();
const patientControl = require('../controller/patientController');

router.get(
  // #swagger.tags = ["Patients"]
  '/',
  patientControl.getAllPatients
);
router.get(
  // #swagger.tags = ["Patients"]
  '/:id',
  patientControl.getPatientById
);
router.post(
  // #swagger.tags = ["Patients"]
  '/',
  patientControl.createNewPatient
);
router.put(
  // #swagger.tags = ["Patients"]
  '/:id',
  patientControl.updatePatient
);
router.delete(
  // #swagger.tags = ["Patients"]
  '/:id',
  patientControl.deletePatient
);

module.exports = router;
