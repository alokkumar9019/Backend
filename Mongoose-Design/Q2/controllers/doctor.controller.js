const Doctor = require('../models/doctor.model');
const Consultation = require('../models/consultation.model');

// Create Doctor
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete Doctor + related consultations
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    doctor.isActive = false;
    await doctor.save();

    await Consultation.updateMany({ doctorId: req.params.id }, { isActive: false });
    res.json({ message: 'Doctor deactivated and consultations updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get patients consulted by a doctor
exports.getDoctorPatients = async (req, res) => {
  try {
    const n = parseInt(req.query.limit) || 10; // optional ?limit=n
    const consultations = await Consultation.find({
      doctorId: req.params.id,
      isActive: true
    })
      .populate({ path: 'patientId', match: { isActive: true }, select: 'name age gender' })
      .sort({ consultedAt: -1 })
      .limit(n);

    const patients = consultations
      .filter(c => c.patientId)
      .map(c => c.patientId);

    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Count consultations for a doctor
exports.getDoctorConsultationCount = async (req, res) => {
  try {
    const count = await Consultation.countDocuments({
      doctorId: req.params.id,
      isActive: true
    });
    res.json({ totalConsultations: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
