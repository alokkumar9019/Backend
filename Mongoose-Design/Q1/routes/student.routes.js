const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/student.controller');

router.post('/students', studentCtrl.createStudent);
router.delete('/students/:id', studentCtrl.deleteStudent);
router.get('/students/:id/courses', studentCtrl.getStudentCourses);

module.exports = router;
