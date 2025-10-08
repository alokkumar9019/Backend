const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
    minlength: [3, 'Name must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  borrowedBooks: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);
