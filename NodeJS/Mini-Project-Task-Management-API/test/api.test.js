const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const request = require('supertest');
const { createApp } = require('../app');

test('CRUD, validation, persistence, concurrent writes and storage failures', async t => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'tasks-api-'));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const file = path.join(dir, 'tasks.json');
  await fs.writeFile(file, '[]');
  const app = createApp(file);
  assert.deepEqual((await request(app).get('/tasks').expect(200)).body, []);
  const task = (await request(app).post('/tasks').send({ title: 'Learn Express' }).expect(201)).body;
  assert.equal(task.completed, false);
  assert.equal((await request(app).get('/tasks/' + task.id).expect(200)).body.title, 'Learn Express');
  await request(app).put('/tasks/' + task.id).send({ completed: true }).expect(200);
  assert.equal(JSON.parse(await fs.readFile(file, 'utf8'))[0].completed, true);
  assert.equal((await request(createApp(file)).get('/tasks').expect(200)).body.length, 1);
  for (const body of [{}, { title: '' }, { title: 1 }, { title: 'x', completed: 'yes' }, { title: 'x', id: 'overwrite' }]) {
    await request(app).post('/tasks').send(body).expect(400);
  }
  await request(app).put('/tasks/' + task.id).send({}).expect(400);
  await request(app).put('/tasks/' + task.id).send({ title: ' ' }).expect(400);
  await request(app).post('/tasks').set('Content-Type', 'application/json').send('{bad').expect(400);
  await request(app).get('/tasks/bad-id').expect(400);
  const missing = '/tasks/' + randomUUID();
  await request(app).get(missing).expect(404);
  await request(app).put(missing).send({ title: 'Missing' }).expect(404);
  await request(app).delete(missing).expect(404);
  await request(app).get('/unknown').expect(404);
  await Promise.all(Array.from({ length: 10 }, (_, i) => request(app).post('/tasks').send({ title: 'Task ' + i }).expect(201)));
  const saved = JSON.parse(await fs.readFile(file, 'utf8'));
  assert.equal(saved.length, 11);
  assert.equal(new Set(saved.map(task => task.id)).size, 11);
  await request(app).delete('/tasks/' + task.id).expect(204);
  await request(app).get('/tasks/' + task.id).expect(404);
  await fs.writeFile(file, '{corrupt');
  await request(app).get('/tasks').expect(500);
  await request(app).post('/tasks').send({ title: 'No overwrite' }).expect(500);
  assert.equal(await fs.readFile(file, 'utf8'), '{corrupt');
  await fs.unlink(file);
  await request(app).get('/tasks').expect(500);
  await fs.writeFile(file, '[]');
  // Reading succeeds, but creating a sibling temporary file must fail.
  const originalWriteFile = fs.writeFile;
  fs.writeFile = async (...args) => {
    if (String(args[0]).endsWith('.tmp')) throw Object.assign(new Error('Write denied'), { code: 'EACCES' });
    return originalWriteFile(...args);
  };
  try {
    await request(app).post('/tasks').send({ title: 'Failed write' }).expect(500);
    assert.equal(await fs.readFile(file, 'utf8'), '[]');
  } finally { fs.writeFile = originalWriteFile; }
  await request(app).post('/tasks').send({ title: 'Recovered' }).expect(201);
});
