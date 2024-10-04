const Joi = require('joi');

const employeeSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).required(),
  phoneExtension: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .optional(),
  email: Joi.string().email().required(),
  jobTitle: Joi.string().max(50).required(),
  employeeId: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .required(),
});

module.exports = employeeSchema;
