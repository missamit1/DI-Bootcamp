const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const bcrypt = require('bcrypt');
const { PGlite } = require('@electric-sql/pglite');
const Knex = require('knex');
const PgClient = require('knex/lib/dialects/postgres');
const { createApp } = require('../server');

test('registration, login, updates, constraints and rollback', async (t) => {
  const engine = new PGlite();
  class TestClient extends PgClient {
    async acquireRawConnection() { return engine; }
    async destroyRawConnection() {}
    async _query(connection, query) {
      const result = await connection.query(query.sql, query.bindings || []);
      query.response = {
        rows: result.rows,
        rowCount: result.affectedRows ?? result.rows.length,
        command: query.sql.trim().split(/\s/)[0].toUpperCase(),
      };
      return query;
    }
  }
  const db = Knex({ client: TestClient, connection: {}, pool: { min: 0, max: 1 } });
  t.after(async () => { await db.destroy(); await engine.close(); });
  await require('../migrations/001_users').up(db);
  const app = createApp(db);
  const input = { username: 'amit', password: 'secret-password', email: 'amit@example.com' };
  const user = (await request(app).post('/register').send(input).expect(201)).body;
  assert.equal(user.username, 'amit');
  assert.equal(user.password, undefined);
  const credentials = await db('hashpwd').first();
  assert.notEqual(credentials.password, input.password);
  assert.equal(await bcrypt.compare(input.password, credentials.password), true);
  await request(app).post('/login').send(input).expect(200);
  await request(app).post('/login').send({ username: 'amit', password: 'wrong' }).expect(401);
  await request(app).post('/login').send({ username: 'unknown', password: 'wrong' }).expect(401);
  await request(app).post('/register').send(input).expect(409);
  await request(app).post('/register').send({ ...input, username: 'other' }).expect(409);
  await request(app).post('/register').send({}).expect(400);
  await request(app).post('/register').send({ username: 'long', password: 'é'.repeat(37) }).expect(400);
  await request(app).post('/login').set('Content-Type', 'application/json').send('{broken').expect(400);
  const users = (await request(app).get('/users').expect(200)).body;
  assert.equal(users.length, 1);
  assert.equal(users[0].password, undefined);
  await request(app).get('/users/' + user.id).expect(200);
  await request(app).get('/users/999').expect(404);
  await request(app).get('/users/bad').expect(400);
  await request(app).get('/missing').expect(404);
  await request(app).put('/users/999').send({ first_name: 'Nobody' }).expect(404);
  await request(app).put('/users/' + user.id).send({}).expect(400);
  await request(app).put('/users/' + user.id).send({ username: 'renamed', password: 'new-password', first_name: 'Amit' }).expect(200);
  assert.equal((await db('hashpwd').first()).username, 'renamed');
  await request(app).post('/login').send({ username: 'renamed', password: input.password }).expect(401);
  await request(app).post('/login').send({ username: 'renamed', password: 'new-password' }).expect(200);
  await request(app).post('/login').send({ username: 'amit', password: 'new-password' }).expect(401);
  await request(app).post('/register').send({ username: 'second', password: 'second-password' }).expect(201);
  await request(app).put('/users/' + user.id).send({ username: 'second', first_name: 'Changed' }).expect(409);
  assert.equal((await db('users').where({ id: user.id }).first()).first_name, 'Amit');

  // Fail the second insert to prove the first insert is rolled back.
  await db.raw("ALTER TABLE hashpwd ADD CONSTRAINT reject_test_username CHECK (username <> 'rollback-test')");
  await request(app).post('/register').send({ username: 'rollback-test', password: 'secret' }).expect(500);
  assert.equal((await db('users').where({ username: 'rollback-test' })).length, 0);
  assert.equal((await db('hashpwd').where({ username: 'rollback-test' })).length, 0);
  await db.raw('ALTER TABLE hashpwd DROP CONSTRAINT reject_test_username');
  assert.equal((await db('users')).length, 2);
});
