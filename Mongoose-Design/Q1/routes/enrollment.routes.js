const express = require('express');
const router = express.Router();
const enrollmentCtrl = require('../controllers/enrollment.controller');

router.post('/enroll', enrollmentCtrl.enrollStudent);

module.exports = router;
