const mongoose = require('mongoose');
const Patient = require('../model/Patient');
const patientSchema = require('../utilities/patientValidator');

const createNewPatient = async (req, res, next) => {
  const { error, value } = patientSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({
      message: 'Validation error',
      details: error.details.map((e) => e.message),
    });
    return;
  }
  try {
    const patient = new Patient(value);
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    next(error);
  }
};

const getAllPatients = async (req, res, next) => {
  try {
    const result = await Patient.find();

    if (!result) {
      return res.send('Patients not found');
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const getPatientById = async (req, res, next) => {
  try {
    const patientId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(404).json('Invalid Id');
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json(`No patient with the ID ${patientId} found`);
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: 'Invalid Id use' });
    }

    const patientUpdate = await Patient.findByIdAndUpdate(
      patientId,
      {
        patientName: req.body.patientName,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        occupation: req.body.occupation,
        birthdate: req.body.birthdate,
        address: req.body.address,
        allergies: req.body.allergies,
        isInsured: req.body.isInsured,
      },
      { new: true, runValidators: true }
    );
    if (!patientUpdate) {
      res.status(404).json({ message: 'Patient is not found' });
    }
    res.status(200).json(patientUpdate);
  } catch (error) {
    next(error);
  }
};

const deletePatient = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: 'Invalid id type' });
    }
    const deleted = await Patient.findByIdAndDelete(patientId);
    if (!deleted) {
      res
        .status(404)
        .json({ message: `Patient with id ${patientId} not found` });
    }
    res
      .status(200)
      .json({ message: `Patient with id ${patientId} has been deleted` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
