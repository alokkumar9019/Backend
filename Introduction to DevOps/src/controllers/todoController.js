const Todo = require('../models/Todo');
const { success, error } = require('../utils/response');

exports.createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return error(res, { status: 400, message: 'Title required' });
    const todo = await Todo.create({ title, owner: req.user.id });
    success(res, { status: 201, data: todo, message: 'Todo created' });
  } catch (err) { next(err); }
};

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ owner: req.user.id });
    success(res, { data: todos });
  } catch (err) { next(err); }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndUpdate({ _id: id, owner: req.user.id }, req.body, { new: true });
    if (!todo) return error(res, { status: 404, message: 'Todo not found' });
    success(res, { data: todo, message: 'Updated' });
  } catch (err) { next(err); }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, owner: req.user.id });
    if (!todo) return error(res, { status: 404, message: 'Todo not found' });
    success(res, { data: null, message: 'Deleted' });
  } catch (err) { next(err); }
};
