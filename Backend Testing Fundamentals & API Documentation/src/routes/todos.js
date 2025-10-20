const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createTodo, getTodosByUserId, findTodoById, updateTodo, deleteTodo } = require('../models/store');

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

router.use(auth);

router.post('/', (req, res) => {
  const { title, description, status } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const todo = { id: makeId(), userId: req.user.id, title, description: description||'', status: status||'pending' };
  createTodo(todo);
  res.status(201).json(todo);
});

router.get('/', (req, res) => {
  const todos = getTodosByUserId(req.user.id);
  res.json(todos);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const todo = findTodoById(id);
  if (!todo) return res.status(404).json({ error: 'not found' });
  if (todo.userId !== req.user.id) return res.status(403).json({ error: 'forbidden' });
  const patch = {};
  ['title','description','status'].forEach(k => { if (k in req.body) patch[k] = req.body[k]; });
  const updated = updateTodo(id, patch);
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const todo = findTodoById(id);
  if (!todo) return res.status(404).json({ error: 'not found' });
  if (todo.userId !== req.user.id) return res.status(403).json({ error: 'forbidden' });
  deleteTodo(id);
  res.status(204).end();
});

module.exports = router;
