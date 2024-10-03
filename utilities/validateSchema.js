const Joi = require("joi");

const patientSchema = Joi.object({
  patientName: Joi.string().min(4).max(50).required(),
  gender: Joi.string().valid("Male", "Female").required(),
  phone: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required(),
  email: Joi.string().email().required(),
  occupation: Joi.string().max(50).optional(),
  birthdate: Joi.date().iso().required(),
  address: Joi.string().max(300).required(),
  allergies: Joi.array().items(Joi.string()).required,
  isInsured: Joi.boolean().optional(),
});

module.exports = patientSchema;
