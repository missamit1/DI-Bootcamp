const bcrypt = require('bcrypt');
function invalid(message) {
  const error = new Error(message);
  error.status = 400;
  throw error;
}
function fields(body, registration = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) invalid('JSON object required');
  const allowed = ['username', 'password', 'email', 'first_name', 'last_name'];
  if (Object.keys(body).some((key) => !allowed.includes(key))) invalid('Unknown field');
  if (registration && (!body.username || !body.password)) invalid('Username and password required');
  const details = {};
  for (const key of ['username', 'email', 'first_name', 'last_name']) {
    if (body[key] === undefined) continue;
    const limit = key === 'email' ? 254 : 100;
    if (typeof body[key] !== 'string' || !body[key].trim() || body[key].trim().length > limit) {
      invalid('Invalid ' + key);
    }
    details[key] = body[key].trim();
  }
  if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) invalid('Invalid email');
  if (body.password !== undefined && (typeof body.password !== 'string' || !body.password.length || Buffer.byteLength(body.password, 'utf8') > 72)) {
    invalid('Password must contain 1 to 72 bytes');
  }
  if (!registration && !Object.keys(details).length && body.password === undefined) invalid('No update fields');
  return details;
}
module.exports = (model) => ({
  register: async (req, res) => {
    const details = fields(req.body, true);
    const password = await bcrypt.hash(req.body.password, 12);
    res.status(201).json(await model.create(details, password));
  },
  login: async (req, res) => {
    const { username, password } = req.body || {};
    if (typeof username !== 'string' || !username.trim() || typeof password !== 'string' || !password || Buffer.byteLength(password, 'utf8') > 72) {
      invalid('Valid username and password required');
    }
    const record = await model.credentials(username.trim());
    if (!record || !(await bcrypt.compare(password, record.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful', user: await model.byUsername(username.trim()) });
  },
  list: async (req, res) => res.json(await model.all()),
  get: async (req, res) => {
    const user = await model.find(Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  },
  update: async (req, res) => {
    const details = fields(req.body);
    const password = req.body.password === undefined ? undefined : await bcrypt.hash(req.body.password, 12);
    const user = await model.update(Number(req.params.id), details, password);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  },
});
