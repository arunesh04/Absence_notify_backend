const Student = require('../models/students');

const createStudent = async (req, res) => {
  try {
    const { name, rollNo, department, parentMobile } = req.body;
    const student = new Student({ name, rollNo, department, parentMobile });
    await student.save();
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ error: 'Failed to get students' });
  }
};

const getStudentByRollNo = async (req, res) => {
  try {
    const { rollNo } = req.params;
    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error getting student:', error);
    res.status(500).json({ error: 'Failed to get student' });
  }
};

const updateStudentByRollNo = async (req, res) => {
  try {
    const { rollNo } = req.params;
    const { name, department, parentMobile } = req.body;
    const student = await Student.findOneAndUpdate(
      { rollNo },
      { name, department, parentMobile },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

const deleteStudentByRollNo = async (req, res) => {
  try {
    const { rollNo } = req.params;
    const student = await Student.findOneAndDelete({ rollNo });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully', student });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByRollNo,
  updateStudentByRollNo,
  deleteStudentByRollNo
};
