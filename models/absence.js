const mongoose = require('mongoose');

const absenceSchema = new mongoose.Schema({
  rollNo: {
    type: [String],
    required: true
  },
  session: {
    type: String,
    enum: ['forenoon', 'afternoon'],
    required: true
  }
});

const Absence = mongoose.model('Absence', absenceSchema);

module.exports = Absence;
