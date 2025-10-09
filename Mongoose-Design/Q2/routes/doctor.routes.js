const express = require('express');
const router = express.Router();
const doctorCtrl = require('../controllers/doctor.controller');

router.post('/doctors', doctorCtrl.createDoctor);
router.delete('/doctors/:id', doctorCtrl.deleteDoctor);
router.get('/doctors/:id/patients', doctorCtrl.getDoctorPatients);
router.get('/doctors/:id/consultations/count', doctorCtrl.getDoctorConsultationCount);

module.exports = router;
