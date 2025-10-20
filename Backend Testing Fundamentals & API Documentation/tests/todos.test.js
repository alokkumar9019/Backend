const request = require('supertest');
const app = require('../src/app');
const { reset } = require('../src/models/store');

let tokenA, tokenB, todoId;

beforeAll(async () => {});
afterAll(async () => {});
beforeEach(async () => {
  reset();
  // create two users and get tokens
  await request(app).post('/auth/signup').send({ username: 'userA', password: 'a' });
  await request(app).post('/auth/signup').send({ username: 'userB', password: 'b' });
  const r1 = await request(app).post('/auth/login').send({ username: 'userA', password: 'a' });
  tokenA = r1.body.token;
  const r2 = await request(app).post('/auth/login').send({ username: 'userB', password: 'b' });
  tokenB = r2.body.token;
});
afterEach(() => { reset(); });

describe('Todos integration', () => {
  test('Create todo (with valid token)', async () => {
    const res = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ title: 't1', description: 'd1' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('t1');
    todoId = res.body.id;
  });

  test('Get all todos for logged-in user', async () => {
    // create two todos for userA and one for userB
    await request(app).post('/todos').set('Authorization', `Bearer ${tokenA}`).send({ title: 'A1' });
    await request(app).post('/todos').set('Authorization', `Bearer ${tokenA}`).send({ title: 'A2' });
    await request(app).post('/todos').set('Authorization', `Bearer ${tokenB}`).send({ title: 'B1' });

    const res = await request(app).get('/todos').set('Authorization', `Bearer ${tokenA}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body.every(t => t.userId)).toBeTruthy();
  });

  test('Update a specific todo (ensure only owner can update)', async () => {
    const create = await request(app).post('/todos').set('Authorization', `Bearer ${tokenA}`).send({ title: 'to-update' });
    const id = create.body.id;
    // other user tries
    const rForbidden = await request(app).put(`/todos/${id}`).set('Authorization', `Bearer ${tokenB}`).send({ title: 'hack' });
    expect(rForbidden.status).toBe(403);

    // owner updates
    const r = await request(app).put(`/todos/${id}`).set('Authorization', `Bearer ${tokenA}`).send({ title: 'updated' });
    expect(r.status).toBe(200);
    expect(r.body.title).toBe('updated');
  });

  test('Delete a specific todo', async () => {
    const create = await request(app).post('/todos').set('Authorization', `Bearer ${tokenA}`).send({ title: 'to-delete' });
    const id = create.body.id;
    const res = await request(app).delete(`/todos/${id}`).set('Authorization', `Bearer ${tokenA}`);
    expect(res.status).toBe(204);
    // ensure not found afterwards
    const res2 = await request(app).get('/todos').set('Authorization', `Bearer ${tokenA}`);
    expect(res2.body.find(t => t.id === id)).toBeUndefined();
  });

  test('Access fails for unauthenticated user', async () => {
    const res = await request(app).post('/todos').send({ title: 'noauth' });
    expect(res.status).toBe(401);
  });

  test('Access fails if trying to update/delete others todo', async () => {
    const create = await request(app).post('/todos').set('Authorization', `Bearer ${tokenA}`).send({ title: 'owned' });
    const id = create.body.id;
    // update by B
    const r1 = await request(app).put(`/todos/${id}`).set('Authorization', `Bearer ${tokenB}`).send({ title: 'x' });
    expect(r1.status).toBe(403);
    // delete by B
    const r2 = await request(app).delete(`/todos/${id}`).set('Authorization', `Bearer ${tokenB}`);
    expect(r2.status).toBe(403);
  });
});
