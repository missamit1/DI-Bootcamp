const express = require('express');
const bcrypt = require('bcrypt');
const { randomUUID } = require('node:crypto');
const safeUser = ({ password, ...user }) => user;
function fail(status, message) { throw Object.assign(new Error(message), { status }); }
function validate(body, register = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) fail(400, 'JSON object required');
  const allowed = ['first_name', 'last_name', 'email', 'username', 'password'];
  if (!Object.keys(body).length || Object.keys(body).some(k => !allowed.includes(k))) fail(400, 'Invalid fields');
  if (register && (!body.username || !body.password)) fail(400, 'Username and password required');
  const result = {};
  for (const key of allowed) {
    if (body[key] === undefined) continue;
    if (typeof body[key] !== 'string' || !body[key].trim() || body[key].length > 254) fail(400, 'Invalid ' + key);
    result[key] = key === 'password' ? body[key] : body[key].trim();
  }
  if (result.password && Buffer.byteLength(result.password, 'utf8') > 72) fail(400, 'Password exceeds 72 bytes');
  if (result.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) fail(400, 'Invalid email');
  return result;
}
async function checkDuplicates(users, data, exceptId) {
  for (const user of users) {
    if (user.id === exceptId) continue;
    if ((data.username && user.username === data.username) || (data.password && await bcrypt.compare(data.password, user.password))) {
      fail(409, 'Username or password already exists');
    }
  }
}
module.exports = store => {
  const router = express.Router();
  router.param('id', (req, res, next, id) => {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id)) return res.status(400).json({ error: 'Invalid user ID' });
    next();
  });
  router.post('/register', async (req, res) => {
    const data = validate(req.body, true);
    const user = await store.change(async users => {
      await checkDuplicates(users, data);
      const user = { id: randomUUID(), ...data, password: await bcrypt.hash(data.password, 12) };
      users.push(user);
      return safeUser(user);
    });
    res.status(201).json({ message: 'Registration successful', user });
  });
  router.post('/login', async (req, res) => {
    const { username, password } = validate(req.body, true);
    const user = (await store.read()).find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) fail(401, 'Invalid username or password');
    res.json({ message: 'Login successful', user: safeUser(user) });
  });
  router.get('/users', async (req, res) => res.json((await store.read()).map(safeUser)));
  router.get('/users/:id', async (req, res) => {
    const user = (await store.read()).find(u => u.id === req.params.id);
    if (!user) fail(404, 'User not found');
    res.json(safeUser(user));
  });
  router.put('/users/:id', async (req, res) => {
    const data = validate(req.body);
    const user = await store.change(async users => {
      const user = users.find(u => u.id === req.params.id);
      if (!user) fail(404, 'User not found');
      await checkDuplicates(users, data, user.id);
      const changes = { ...data };
      if (changes.password) changes.password = await bcrypt.hash(changes.password, 12);
      Object.assign(user, changes);
      return safeUser(user);
    });
    res.json(user);
  });
  return router;
};
