const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/add-user', userController.addUser);


router.post('/rent-book', userController.rentBook);

router.post('/return-book', userController.returnBook);


router.get('/user-rentals/:userId', userController.getUserRentals);

module.exports = router;
