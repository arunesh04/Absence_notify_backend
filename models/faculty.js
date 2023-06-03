const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash the password before saving
facultySchema.pre('save', async function (next) {
  const faculty = this;
  if (!faculty.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(faculty.password, salt);
    faculty.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
