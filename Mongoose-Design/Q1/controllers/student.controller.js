const Student = require('../models/student.model');
const Enrollment = require('../models/enrollment.model');

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.isActive = false;
    await student.save();

    await Enrollment.updateMany(
      { studentId: req.params.id },
      { isActive: false }
    );

    res.json({ message: 'Student deactivated and enrollments updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      studentId: req.params.id,
      isActive: true
    }).populate({
      path: 'courseId',
      match: { isActive: true }
    });

    const courses = enrollments
      .filter(e => e.courseId)
      .map(e => e.courseId);

    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
