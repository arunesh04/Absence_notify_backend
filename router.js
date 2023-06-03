const express = require('express');
const router = express.Router();

const facultyController = require('../backend/controllers/facultycontroller');
const studentController = require('../backend/controllers/studentcontroller');
const absenceController = require('../backend/controllers/absencecontroller');

router.post('/faculty', facultyController.createFaculty);
router.get('/faculty', facultyController.getAllFaculty);
router.get('/faculty/:id', facultyController.getFacultyById);
router.put('/faculty/:id', facultyController.updateFacultyById);
router.delete('/faculty/:id', facultyController.deleteFacultyById);

router.post('/student', studentController.createStudent);
router.get('/student', studentController.getAllStudents);
router.get('/student/:rollNo', studentController.getStudentByRollNo);
router.put('/student/:rollNo', studentController.updateStudentByRollNo);
router.delete('/student/:rollNo', studentController.deleteStudentByRollNo);

router.post('/absence', absenceController.createAbsence);
router.get('/absence', absenceController.getAllAbsences);
router.post('/absence/sendSMS', absenceController.sendSMS);
router.get('/absence/:id', absenceController.getAbsenceById);
router.put('/absence/:id', absenceController.updateAbsenceById);
router.delete('/absence/:id', absenceController.deleteAbsenceById);

module.exports = router;
