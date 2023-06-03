const Faculty = require('../models/faculty');
const bcrypt = require('bcrypt');

const createFaculty = async (req, res) => {
  try {
    const { name, email, department, designation, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const faculty = new Faculty({ name, email, department, designation, password: hashedPassword });
    await faculty.save();
    res.status(201).json({ message: 'Faculty member created successfully', faculty });
  } catch (error) {
    console.error('Error creating faculty member:', error);
    res.status(500).json({ error: 'Failed to create faculty member' });
  }
};

const authenticateFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty member not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, faculty.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    res.json({ message: 'Authentication successful' });
  } catch (error) {
    console.error('Error authenticating faculty member:', error);
    res.status(500).json({ error: 'Failed to authenticate faculty member' });
  }
};

const getAllFaculty = async (req, res) => {
  try {
    const facultyMembers = await Faculty.find();
    res.json(facultyMembers);
  } catch (error) {
    console.error('Error getting faculty members:', error);
    res.status(500).json({ error: 'Failed to get faculty members' });
  }
};

const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty member not found' });
    }
    res.json(faculty);
  } catch (error) {
    console.error('Error getting faculty member:', error);
    res.status(500).json({ error: 'Failed to get faculty member' });
  }
};

const updateFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, designation } = req.body;
    const faculty = await Faculty.findByIdAndUpdate(
      id,
      { name, email, department, designation },
      { new: true }
    );
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty member not found' });
    }
    res.json({ message: 'Faculty member updated successfully', faculty });
  } catch (error) {
    console.error('Error updating faculty member:', error);
    res.status(500).json({ error: 'Failed to update faculty member' });
  }
};

const deleteFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByIdAndDelete(id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty member not found' });
    }
    res.json({ message: 'Faculty member deleted successfully', faculty });
  } catch (error) {
    console.error('Error deleting faculty member:', error);
    res.status(500).json({ error: 'Failed to delete faculty member' });
  }
};

module.exports = {
  createFaculty,
  authenticateFaculty,
  getAllFaculty,
  getFacultyById,
  updateFacultyById,
  deleteFacultyById
};
