const express = require('express');
const router = express.Router();
const courseCtrl = require('../controllers/course.controller');

router.post('/courses', courseCtrl.createCourse);
router.delete('/courses/:id', courseCtrl.deleteCourse);
router.get('/courses/:id/students', courseCtrl.getCourseStudents);

module.exports = router;
