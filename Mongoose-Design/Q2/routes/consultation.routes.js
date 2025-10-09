const express = require('express');
const router = express.Router();
const consultationCtrl = require('../controllers/consultation.controller');

router.post('/consultations', consultationCtrl.createConsultation);
router.get('/consultations/recent', consultationCtrl.getRecentConsultations);

module.exports = router;
