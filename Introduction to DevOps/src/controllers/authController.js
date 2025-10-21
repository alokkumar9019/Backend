const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { success, error } = require('../utils/response');

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return error(res, { status: 400, message: 'User already exists' });
    const user = await User.create({ email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    success(res, { status: 201, data: { token }, message: 'User created' });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return error(res, { status: 400, message: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match) return error(res, { status: 400, message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    success(res, { data: { token }, message: 'Logged in' });
  } catch (err) { next(err); }
};
