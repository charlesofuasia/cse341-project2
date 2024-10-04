const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
    },
    phoneExtension: {
      type: String,
      default: '000',
    },
    accessType: {
      type: String,
      default: 'User',
    },
    dateEmployed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        (ret.id = ret._id), delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        (ret.id = ret._id), delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
