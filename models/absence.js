const mongoose = require('mongoose');

const absenceSchema = new mongoose.Schema({
  rollNos: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    enum: ['forenoon', 'afternoon'],
    required: true,
  },
});

module.exports = mongoose.model('Absence', absenceSchema);
