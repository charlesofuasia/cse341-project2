const express = require('express');
const router = express.Router();
const patientControl = require('../controller/patientController');

const { isAuthenticated } = require('../utilities/authenticator');

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
  isAuthenticated,
  patientControl.createNewPatient
);
router.put(
  // #swagger.tags = ["Patients"]
  '/:id',
  isAuthenticated,
  patientControl.updatePatient
);
router.delete(
  // #swagger.tags = ["Patients"]
  '/:id',
  isAuthenticated,
  patientControl.deletePatient
);

module.exports = router;
