const express = require('express');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

module.exports = app;
