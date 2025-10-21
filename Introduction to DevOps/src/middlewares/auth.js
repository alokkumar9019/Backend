const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { error } = require('../utils/response');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return error(res, { status: 401, message: 'No token provided' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2) return error(res, { status: 401, message: 'Token error' });
    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    const user = await User.findById(decoded.id);
    if (!user) return error(res, { status: 401, message: 'User not found' });
    req.user = { id: user._id };
    next();
  } catch (err) {
    return error(res, { status: 401, message: 'Invalid token' });
  }
};
