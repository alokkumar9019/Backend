const Enrollment = require('../models/enrollment.model');
const Student = require('../models/student.model');
const Course = require('../models/course.model');

exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;


    const student = await Student.findById(studentId);
    if (!student || !student.isActive) {
      return res.status(400).json({ error: 'Student not active or not found' });
    }

    const course = await Course.findById(courseId);
    if (!course || !course.isActive) {
      return res.status(400).json({ error: 'Course not active or not found' });
    }

    const enrollment = await Enrollment.create({ studentId, courseId });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
