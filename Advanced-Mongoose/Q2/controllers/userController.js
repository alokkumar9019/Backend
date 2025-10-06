const User = require("../models/User");
const validator = require("validator");


exports.addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};


exports.addProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { profileName, url } = req.body;

    if (!["fb", "twitter", "github", "instagram"].includes(profileName)) {
      return res.status(400).json({ message: "Invalid profile name" });
    }

    if (!validator.isURL(url)) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profiles.push({ profileName, url });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { profile } = req.query;

    let users;
    if (profile) {
      users = await User.find({ "profiles.profileName": profile });
    } else {
      users = await User.find();
    }

    res.json(users);
  } catch (err) {
    next(err);
  }
};


exports.searchUser = async (req, res, next) => {
  try {
    const { name, profile } = req.query;

    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: "User not found" });

    const matchedProfile = user.profiles.find(p => p.profileName === profile);

    if (matchedProfile) {
      return res.json({ user, profile: matchedProfile });
    } else {
      return res.status(404).json({
        message: "User found, but profile not found",
        user,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    if (!validator.isURL(url)) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = user.profiles.find(p => p.profileName === profileName);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.url = url;
    await user.save();

    res.json({ message: "Profile updated", profile });
  } catch (err) {
    next(err);
  }
};


exports.deleteProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.profiles.findIndex(p => p.profileName === profileName);
    if (index === -1) return res.status(404).json({ message: "Profile not found" });

    user.profiles.splice(index, 1);
    await user.save();

    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    next(err);
  }
};
