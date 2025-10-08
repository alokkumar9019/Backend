const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required'],
    minlength: [3, 'Title must be at least 3 characters']
  },
  author: {
    type: String,
    required: [true, 'Author required']
  },
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available'
  },
  borrowers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Member' }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

BookSchema.pre('save', function (next) {
  if (this.borrowers.length > 0 && this.status !== 'borrowed') {
    this.status = 'borrowed';
  }
  if (this.borrowers.length === 0) {
    this.status = 'available';
  }
  next();
});

module.exports = mongoose.model('Book', BookSchema);
