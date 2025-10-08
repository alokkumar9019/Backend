const Book = require('../models/book.model');
const User = require('../models/user.model');


exports.addBook = async (req, res, next) => {
  try {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json({ message: 'Book added', book });
  } catch (err) {
    next(err);
  }
};

exports.getBookRenters = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId).populate('rentedBy');
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

    await User.updateMany(
      { rentedBooks: bookId },
      { $pull: { rentedBooks: bookId } }
    );

    await book.deleteOne();

    res.json({ message: 'Book deleted and references removed' });
  } catch (err) {
    next(err);
  }
};
