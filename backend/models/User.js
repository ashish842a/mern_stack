const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    minlength: [2, 'Full Name must be at least 2 characters'],
    maxlength: [50, 'Full Name must be at most 50 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format'
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: 'Phone number must be 10 digits',
    },
  },
  dob: {
    type: Date,
    required: [true, 'Date of Birth is required'],
    validate: {
      validator: function (value) {
        const age = new Date().getFullYear() - value.getFullYear();
        return age >= 18;
      },
      message: 'User must be at least 18 years old',
    },
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required'],
  },
  predictedAge: {
    type: Number,
    default: null,
  },
  address1: {
    type: String,
    required: [true, 'Address Line 1 is required'],
    maxlength: [100, 'Maximum 100 characters allowed'],
  },
  address2: {
    type: String,
    maxlength: [100, 'Maximum 100 characters allowed'],
    default: '',
  },
  country: {
    type: String,
    enum: ['India', 'USA', 'Canada'],
    required: [true, 'Country is required'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  zip: {
    type: String,
    required: [true, 'Zip Code is required'],
    validate: {
      validator: v => /^[a-zA-Z0-9]{5,6}$/.test(v),
      message: 'Zip code must be 5–6 alphanumeric characters',
    },
  },
  occupation: {
    type: String,
    enum: ['Student', 'Engineer', 'Doctor', 'Other'],
    required: [true, 'Occupation is required'],
  },
  income: {
    type: Number,
    min: [0, 'Income must be a positive number'],
    default: null,
  },
  signature: {
    type: String, // Base64 or file path
    required: [true, 'Signature is required'],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
