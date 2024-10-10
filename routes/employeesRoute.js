const express = require('express');
const router = express.Router();
const employeeControl = require('../controller/employeeController');
const { isAuthenticated } = require('../utilities/authenticator');

router.get(
  // #swagger.tags = ["Employees"]
  // #swagger.description = "Use this endpoint retrieves all the employees "
  '/',
  employeeControl.getEmployees
);
router.get(
  // #swagger.tags = ["Employees"]
  // #swagger.description = "Use this endpoint to retrieve employee details by the _id"
  '/:id',
  employeeControl.getEmployeeById
);
router.post(
  // #swagger.tags = ["Employees"]
  // #swagger.description = "Use this endpoint to create a new employee"
  '/',
  isAuthenticated,
  employeeControl.createEmployee
);
router.put(
  // #swagger.tags = ["Employees"]
  // #swagger.description = "Use this endpoint to update an employee details bi _id"
  '/:id',
  isAuthenticated,
  employeeControl.updateEmployee
);
router.delete(
  // #swagger.tags = ["Employees"]
  // #swager.description = "use this endpoint to remove an employee from database by _id"
  '/:id',
  isAuthenticated,
  employeeControl.deleteEmployee
);

module.exports = router;
