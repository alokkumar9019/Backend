const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');


router.post('/add-book', bookController.addBook);

router.get('/book-borrowers/:bookId', bookController.getBookBorrowers);


router.put('/update-book/:bookId', bookController.updateBook);


router.delete('/delete-book/:bookId', bookController.deleteBook);

module.exports = router;
