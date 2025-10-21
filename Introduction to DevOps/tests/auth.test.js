const request = require('supertest');
const app = require('../src/app');
const setup = require('./setupMemoryServer');
const User = require('../src/models/User');

beforeAll(async () => {
  await setup.start();
});

afterAll(async () => {
  await setup.stop();
});

describe('Auth: signup & login', () => {
  test('signup creates a user and returns token', async () => {
    const res = await request(app).post('/api/auth/signup').send({ email: 'a@b.com', password: 'password' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    const user = await User.findOne({ email: 'a@b.com' });
    expect(user).not.toBeNull();
  });

  test('login returns token for valid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'a@b.com', password: 'password' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });
});
