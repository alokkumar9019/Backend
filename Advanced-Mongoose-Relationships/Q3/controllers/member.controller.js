const Member = require('../models/member.model');
const Book = require('../models/book.model');


exports.addMember = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const member = new Member({ name, email });
    await member.save();
    res.status(201).json({ message: 'Member added', member });
  } catch (err) {
    next(err);
  }
};

exports.borrowBook = async (req, res, next) => {
  try {
    const { memberId, bookId } = req.body;

    const member = await Member.findById(memberId);
    const book = await Book.findById(bookId);

    if (!member) return res.status(404).json({ message: 'Member not found' });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.status === 'borrowed') {
      
    }


    if (!member.borrowedBooks.includes(bookId)) member.borrowedBooks.push(bookId);
    if (!book.borrowers.includes(memberId)) book.borrowers.push(memberId);

    await member.save();
    await book.save();

    res.json({ message: 'Book borrowed successfully', member, book });
  } catch (err) {
    next(err);
  }
};


exports.returnBook = async (req, res, next) => {
  try {
    const { memberId, bookId } = req.body;

    const member = await Member.findById(memberId);
    const book = await Book.findById(bookId);

    if (!member) return res.status(404).json({ message: 'Member not found' });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    member.borrowedBooks = member.borrowedBooks.filter(id => id.toString() !== bookId);
    book.borrowers = book.borrowers.filter(id => id.toString() !== memberId);

    await member.save();
    await book.save();

    res.json({ message: 'Book returned successfully', member, book });
  } catch (err) {
    next(err);
  }
};


exports.getMemberBorrowedBooks = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const member = await Member.findById(memberId).populate('borrowedBooks');
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json({ member });
  } catch (err) {
    next(err);
  }
};
