const Absence = require('../models/absence');
const smsService = require('sms-service');
// const twilio = require('twilio');
const Student = require('../models/students')

const createAbsence = async (req, res) => {
  try {
    const { rollNos, session } = req.body;
    const absence = new Absence({ rollNos, session });
    await absence.save();
    res.status(201).json({ message: 'Absence record created successfully', absence });
  } catch (error) {
    console.error('Error creating absence record:', error);
    res.status(500).json({ error: 'Failed to create absence record' });
  }
};

const getAllAbsences = async (req, res) => {
  try {
    const absences = await Absence.find();
    res.json(absences);
  } catch (error) {
    console.error('Error getting absence records:', error);
    res.status(500).json({ error: 'Failed to get absence records' });
  }
};

const getAbsenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const absence = await Absence.findById(id);
    if (!absence) {
      return res.status(404).json({ error: 'Absence record not found' });
    }
    res.json(absence);
  } catch (error) {
    console.error('Error getting absence record:', error);
    res.status(500).json({ error: 'Failed to get absence record' });
  }
};

const updateAbsenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rollNos, session } = req.body;
    const absence = await Absence.findByIdAndUpdate(
      id,
      { rollNos, session },
      { new: true }
    );
    if (!absence) {
      return res.status(404).json({ error: 'Absence record not found' });
    }
    res.json({ message: 'Absence record updated successfully', absence });
  } catch (error) {
    console.error('Error updating absence record:', error);
    res.status(500).json({ error: 'Failed to update absence record' });
  }
};

const deleteAbsenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const absence = await Absence.findByIdAndDelete(id);
    if (!absence) {
      return res.status(404).json({ error: 'Absence record not found' });
    }
    res.json({ message: 'Absence record deleted successfully', absence });
  } catch (error) {
    console.error('Error deleting absence record:', error);
    res.status(500).json({ error: 'Failed to delete absence record' });
  }
};
const sendSMS = async (req, res) => {
  console.log("came")
    try {
      const { rollNumbers, session } = req.body;
      const students = await Student.find({ rollNo: { $in: rollNumbers } });
      
      for (const student of students) {
        const message = `Your child ${student.name} is absent ${session === 'forenoon' ? 'for the forenoon class' : 'for the afternoon class'}.`;
        smsService.sendSMS(student.parentMobile, message);
      }
  
      res.json({ message: 'SMS notifications sent successfully' });
    } catch (error) {
      console.error('Error sending SMS notifications:', error);
      res.status(500).json({ error: 'Failed to send SMS notifications' });
    }
  };

// const sendSMS = async (req, res) => {
//   try {
//     const { rollNumbers, session } = req.body;
//     const accountSid = '';
//     const authToken = '';
//     const client = twilio(accountSid, authToken);
//     const students = await Student.find({ rollNo: { $in: rollNumbers } });
    
//     for (const student of students) {
//       const message = `Your child ${student.name} is absent ${session === 'forenoon' ? 'in the forenoon' : 'in the afternoon'}.`;
//       await client.messages.create({
//         body: message,
//         from: '9952315199',
//         to: student.parentMobile,
//       });
//     }

//     res.json({ message: 'SMS notifications sent successfully' });
//   } catch (error) {
//     console.error('Error sending SMS notifications:', error);
//     res.status(500).json({ error: 'Failed to send SMS notifications' });
//   }
// };


module.exports = {
  createAbsence,
  getAllAbsences,
  sendSMS,
  getAbsenceById,
  updateAbsenceById,
  deleteAbsenceById
};
