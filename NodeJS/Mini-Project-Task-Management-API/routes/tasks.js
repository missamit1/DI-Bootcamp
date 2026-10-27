const express = require('express');
function validate(body, partial = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const keys = Object.keys(body);
  if (!keys.length || keys.some(key => !['title', 'description', 'completed'].includes(key))) return null;
  if ((!partial || 'title' in body) && (typeof body.title !== 'string' || !body.title.trim() || body.title.trim().length > 200)) return null;
  if ('description' in body && (typeof body.description !== 'string' || body.description.length > 5000)) return null;
  if ('completed' in body && typeof body.completed !== 'boolean') return null;
  const data = partial ? {} : { description: '', completed: false };
  if ('title' in body) data.title = body.title.trim();
  if ('description' in body) data.description = body.description;
  if ('completed' in body) data.completed = body.completed;
  return data;
}
module.exports = store => {
  const router = express.Router();
  router.param('id', (req, res, next, id) => {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    next();
  });
  router.get('/', async (req, res) => res.json(await store.all()));
  router.get('/:id', async (req, res) => {
    const task = (await store.all()).find(task => task.id === req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  });
  router.post('/', async (req, res) => {
    const data = validate(req.body);
    if (!data) return res.status(400).json({ error: 'Provide a title (1–200 characters), optional description and boolean completed' });
    const task = await store.create(data);
    res.status(201).location('/tasks/' + task.id).json(task);
  });
  router.put('/:id', async (req, res) => {
    const data = validate(req.body, true);
    if (!data) return res.status(400).json({ error: 'Provide at least one valid task field' });
    const task = await store.update(req.params.id, data);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  });
  router.delete('/:id', async (req, res) => {
    if (!(await store.remove(req.params.id))) return res.status(404).json({ error: 'Task not found' });
    res.status(204).end();
  });
  return router;
};
