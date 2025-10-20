const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/store');
const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

module.exports = function (req, res, next) {
  const h = req.header('authorization') || req.header('Authorization');
  if (!h || !h.startsWith('Bearer ')) return res.status(401).json({ error: 'missing token' });
  const token = h.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = findUserById(payload.sub);
    if (!user) return res.status(401).json({ error: 'invalid token' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
};
