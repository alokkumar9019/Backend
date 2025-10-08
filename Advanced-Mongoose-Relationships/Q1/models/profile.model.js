const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  bio: { type: String },
  socialMediaLinks: [{ type: String }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference required'],
    unique: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
