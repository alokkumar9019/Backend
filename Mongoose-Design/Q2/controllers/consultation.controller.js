const Consultation = require('../models/consultation.model');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');

// Add consultation only if doctor & patient active
exports.createConsultation = async (req, res) => {
  try {
    const { doctorId, patientId, notes } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isActive) {
      return res.status(400).json({ error: 'Doctor not active or not found' });
    }

    const patient = await Patient.findById(patientId);
    if (!patient || !patient.isActive) {
      return res.status(400).json({ error: 'Patient not active or not found' });
    }

    const consultation = await Consultation.create({ doctorId, patientId, notes });
    res.status(201).json(consultation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get recent 5 consultations
exports.getRecentConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ isActive: true })
      .populate('doctorId', 'name specialization')
      .populate('patientId', 'name age gender')
      .sort({ consultedAt: -1 })
      .limit(5);

    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
