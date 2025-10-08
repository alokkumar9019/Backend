const mongoose = require('mongoose');

module.exports = (err, req, res, next) => {
  // ValidationError
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: 'Validation error', errors: messages });
  }

  // Duplicate key error
  if (err.code && err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate value', fields: err.keyValue });
  }

  // CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
};
