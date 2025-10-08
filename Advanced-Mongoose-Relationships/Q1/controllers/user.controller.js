const User = require('../models/user.model');
const Profile = require('../models/profile.model');

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


exports.addProfile = async (req, res, next) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;

  
    const existingUser = await User.findById(user);
    if (!existingUser) return res.status(404).json({ message: 'User not found' });

  
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) return res.status(400).json({ message: 'Profile already exists for this user' });

    const profile = new Profile({ bio, socialMediaLinks, user });
    await profile.save();
    res.status(201).json({ message: 'Profile created', profile });
  } catch (err) {
    next(err);
  }
};


exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate('user', 'name email');
    res.json({ count: profiles.length, profiles });
  } catch (err) {
    next(err);
  }
};
