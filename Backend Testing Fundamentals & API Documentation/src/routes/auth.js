const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/store');

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  if (findUserByUsername(username)) return res.status(409).json({ error: 'user exists' });
  const hash = await bcrypt.hash(password, 8);
  const user = { id: makeId(), username, passwordHash: hash };
  createUser(user);
  return res.status(201).json({ id: user.id, username: user.username });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const user = findUserByUsername(username);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token });
});

module.exports = router;
