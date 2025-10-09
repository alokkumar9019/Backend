const Patient = require('../models/patient.model');
const Consultation = require('../models/consultation.model');

// Create Patient
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete Patient + related consultations
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    patient.isActive = false;
    await patient.save();

    await Consultation.updateMany({ patientId: req.params.id }, { isActive: false });
    res.json({ message: 'Patient deactivated and consultations updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get doctors consulted by a patient
exports.getPatientDoctors = async (req, res) => {
  try {
    const consultations = await Consultation.find({
      patientId: req.params.id,
      isActive: true
    })
      .populate({ path: 'doctorId', match: { isActive: true }, select: 'name specialization' });

    const doctors = consultations
      .filter(c => c.doctorId)
      .map(c => c.doctorId);

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all active patients (filter by gender)
exports.getPatientsByGender = async (req, res) => {
  try {
    const gender = req.query.gender;
    const query = { isActive: true };
    if (gender) query.gender = gender;

    const patients = await Patient.find(query);
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
