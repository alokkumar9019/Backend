const request = require('supertest');
const app = require('../src/app');
const setup = require('./setupMemoryServer');
const Todo = require('../src/models/Todo');
const User = require('../src/models/User');

let token;

beforeAll(async () => {
  await setup.start();
  await request(app).post('/api/auth/signup').send({ email: 'u@u.com', password: 'pass' });
  const res = await request(app).post('/api/auth/login').send({ email: 'u@u.com', password: 'pass' });
  token = res.body.data.token;
});

afterAll(async () => {
  await setup.stop();
});

describe('Todos CRUD', () => {
  test('create todo', async () => {
    const res = await request(app).post('/api/todos').set('Authorization', 'Bearer ' + token).send({ title: 'first' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('first');
  });

  test('get todos', async () => {
    const res = await request(app).get('/api/todos').set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test('update todo', async () => {
    const list = await request(app).get('/api/todos').set('Authorization', 'Bearer ' + token);
    const id = list.body.data[0]._id;
    const res = await request(app).patch('/api/todos/' + id).set('Authorization', 'Bearer ' + token).send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.completed).toBe(true);
  });

  test('delete todo', async () => {
    const list = await request(app).get('/api/todos').set('Authorization', 'Bearer ' + token);
    const id = list.body.data[0]._id;
    const res = await request(app).delete('/api/todos/' + id).set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    const found = await Todo.findById(id);
    expect(found).toBeNull();
  });
});
