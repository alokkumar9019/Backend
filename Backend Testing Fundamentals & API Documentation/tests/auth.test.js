const request = require('supertest');
const app = require('../src/app');
const { reset, createUser } = require('../src/models/store');

beforeAll(() => {});
afterAll(() => {});
beforeEach(() => { reset(); });
afterEach(() => { reset(); });

describe('Auth integration', () => {
  test('User can signup', async () => {
    const res = await request(app).post('/auth/signup').send({ username: 'alice', password: 'pass' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toBe('alice');
  });

  test('User can login and receive JWT', async () => {
    await request(app).post('/auth/signup').send({ username: 'bob', password: 'secret' });
    const res = await request(app).post('/auth/login').send({ username: 'bob', password: 'secret' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  test('Login fails for invalid credentials', async () => {
    await request(app).post('/auth/signup').send({ username: 'carol', password: 'pwd' });
    const res = await request(app).post('/auth/login').send({ username: 'carol', password: 'wrong' });
    expect(res.status).toBe(401);
  });

  test('Accessing protected route without token should fail', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(401);
  });

  test('Accessing protected route with invalid token should fail', async () => {
    const res = await request(app).get('/todos').set('Authorization', 'Bearer bad.token.here');
    expect(res.status).toBe(401);
  });
});
