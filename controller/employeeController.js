const mongoose = require('mongoose');
const Employee = require('../model/Employee');
const employeeSchema = require('../utilities/employeeValidator');

const createEmployee = async (req, res, next) => {
  const { error, value } = employeeSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({
      message: 'Validation Error',
      details: error.details.map((e) => e.message),
    });
    return;
  }
  try {
    const employee = new Employee(value);
    const addNewEmployee = await employee.save();
    res.status(201).json(addNewEmployee);
  } catch (error) {
    next(error);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    if (!employees) {
      return res.send('there are no employees in the database');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const empId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(empId)) {
      return res
        .status(400)
        .json({ message: `${empId} is not a valid id type` });
    }
    const objectId = new mongoose.Types.ObjectId(empId);
    const employee = await Employee.find(objectId);
    if (!employee) {
      return res.status(404).json(`Enployee with id ${empId} not found.`);
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const empId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(empId)) {
      return res.status(400).json(`${empId} is not a valid ID`);
    }

    const { error, value } = employeeSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((err) => err.message),
      });
    }

    const objectId = new mongoose.Types.ObjectId(empId);
    const existingEmployee = await Employee.findById(objectId);
    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const updated = await Employee.findByIdAndUpdate(empId, value, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const empId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(empId)) {
      return res
        .status(400)
        .json({ message: `${empId} is not a valid id type.` });
    }
    const convId = new mongoose.Types.ObjectId(empId);

    const deleted = await Employee.findByIdAndDelete(convId);

    if (!deleted) {
      return res.status(404).json(`Employee with the id ${empId} not found`);
    }
    res
      .status(200)
      .json(`employee with id ${empId} has been successfully deleted`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
