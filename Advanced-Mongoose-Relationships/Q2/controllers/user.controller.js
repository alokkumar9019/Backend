const User = require('../models/user.model');
const Book = require('../models/book.model');

exports.addUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    next(err);
  }
};

exports.rentBook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!book) return res.status(404).json({ message: 'Book not found' });


    if (user.rentedBooks.includes(bookId)) {
      return res.status(400).json({ message: 'User already rented this book' });
    }

    user.rentedBooks.push(bookId);
    book.rentedBy.push(userId);

    await user.save();
    await book.save();

    res.json({ message: 'Book rented successfully', user, book });
  } catch (err) {
    next(err);
  }
};


exports.returnBook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    user.rentedBooks = user.rentedBooks.filter(id => id.toString() !== bookId);
    book.rentedBy = book.rentedBy.filter(id => id.toString() !== userId);

    await user.save();
    await book.save();

    res.json({ message: 'Book returned successfully', user, book });
  } catch (err) {
    next(err);
  }
};


exports.getUserRentals = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('rentedBooks');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
