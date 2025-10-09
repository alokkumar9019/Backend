const Course = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    course.isActive = false;
    await course.save();

    await Enrollment.updateMany(
      { courseId: req.params.id },
      { isActive: false }
    );

    res.json({ message: 'Course deactivated and enrollments updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      courseId: req.params.id,
      isActive: true
    }).populate({
      path: 'studentId',
      match: { isActive: true }
    });

    const students = enrollments
      .filter(e => e.studentId)
      .map(e => e.studentId);

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
