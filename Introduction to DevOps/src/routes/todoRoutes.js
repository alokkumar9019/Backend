const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const todoCtrl = require('../controllers/todoController');

router.use(auth);
router.post('/', todoCtrl.createTodo);
router.get('/', todoCtrl.getTodos);
router.patch('/:id', todoCtrl.updateTodo);
router.delete('/:id', todoCtrl.deleteTodo);

module.exports = router;
