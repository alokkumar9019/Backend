const User = require("../model/User");
const Address = require("../model/Address");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = await User.create({ name, email, age });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add an address to a user
exports.addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { street, city, state, country, pincode } = req.body;

    const address = await Address.create({
      street,
      city,
      state,
      country,
      pincode,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: address._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json({ user, address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get summary of all users and address counts
exports.getSummary = async (req, res) => {
  try {
    const users = await User.find().populate("addresses");

    const totalUsers = users.length;
    const totalAddresses = users.reduce(
      (sum, user) => sum + user.addresses.length,
      0
    );

    const summary = users.map((user) => ({
      name: user.name,
      addressCount: user.addresses.length,
    }));

    res.json({ totalUsers, totalAddresses, users: summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific user with their addresses
exports.getUserWithAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("addresses");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
