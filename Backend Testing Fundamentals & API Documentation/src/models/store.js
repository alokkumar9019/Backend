
const store = {
  users: [], 
  todos: []  
};

function reset() {
  store.users = [];
  store.todos = [];
}

function createUser(user) {
  store.users.push(user);
  return user;
}

function findUserByUsername(username) {
  return store.users.find(u => u.username === username);
}

function findUserById(id) {
  return store.users.find(u => u.id === id);
}

function createTodo(todo) {
  store.todos.push(todo);
  return todo;
}

function getTodosByUserId(userId) {
  return store.todos.filter(t => t.userId === userId);
}

function findTodoById(id) {
  return store.todos.find(t => t.id === id);
}

function updateTodo(id, patch) {
  const t = findTodoById(id);
  if (!t) return null;
  Object.assign(t, patch);
  return t;
}

function deleteTodo(id) {
  const idx = store.todos.findIndex(t => t.id === id);
  if (idx === -1) return false;
  store.todos.splice(idx,1);
  return true;
}

module.exports = {
  store,
  reset,
  createUser,
  findUserByUsername,
  findUserById,
  createTodo,
  getTodosByUserId,
  findTodoById,
  updateTodo,
  deleteTodo
};
