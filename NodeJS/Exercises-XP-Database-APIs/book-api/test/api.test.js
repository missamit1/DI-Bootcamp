const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { newDb } = require('pg-mem');
const { createApp } = require('../app.js');

test('database-backed routes and error handling', async (t) => {
  const db = newDb().adapters.createKnex();
  t.after(() => db.destroy());
  await require('../migrations/001_create_books').up(db);
  const app = createApp(db);
  const data = {"title": "The Hobbit", "author": "J.R.R. Tolkien", "publishedYear": 1937};
  assert.deepEqual((await request(app).get('/api/books').expect(200)).body, []);
  const created = (await request(app).post('/api/books').send(data).expect(201)).body;
  assert.equal(created.id, 1);
  assert.equal((await db('books').first()).title, data.title);
  assert.equal((await request(app).get('/api/books/1').expect(200)).body.title, data.title);
  assert.equal((await request(app).get('/api/books').expect(200)).body.length, 1);
  await request(app).get('/api/books/999').expect(404);
  await request(app).get('/api/books/bad').expect(400);
  await request(app).post('/api/books').send({}).expect(400);
  await request(app).post('/api/books').set('Content-Type', 'application/json').send('{broken').expect(400);
  await request(app).get('/missing').expect(404);
  await db.schema.dropTable('books');
  assert.deepEqual((await request(app).get('/api/books').expect(500)).body, { error: 'Internal server error' });
});
