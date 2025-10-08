const Book = require('../models/book.model');
const Member = require('../models/member.model');


exports.addBook = async (req, res, next) => {
  try {
    const { title, author } = req.body;
    const book = new Book({ title, author }); // default status available
    await book.save();
    res.status(201).json({ message: 'Book added', book });
  } catch (err) {
    next(err);
  }
};


exports.getBookBorrowers = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId).populate('borrowers');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ book });
  } catch (err) {
    next(err);
  }
};


exports.updateBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const updated = await Book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book updated', book: updated });
  } catch (err) {
    next(err);
  }
};


exports.deleteBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await Member.updateMany(
      { borrowedBooks: bookId },
      { $pull: { borrowedBooks: bookId } }
    );

    await book.deleteOne();

    res.json({ message: 'Book deleted and references removed' });
  } catch (err) {
    next(err);
  }
};
