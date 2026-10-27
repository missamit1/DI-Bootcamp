module.exports = (model) => {
  function dataFrom(body) {
    if (!body || typeof body.title !== 'string' || !body.title.trim() || typeof body.content !== 'string' || !body.content.trim()) {
      const error = new Error('Valid title, content are required');
      error.status = 400;
      throw error;
    }
    return { title: body.title.trim(), content: body.content.trim() };
  }
  return {
    list: async (req, res) => res.json(await model.all()),
    get: async (req, res) => {
      const item = await model.find(Number(req.params.id));
      if (!item) return res.status(404).json({ error: 'Post not found' });
      res.json(item);
    },
    create: async (req, res) => {
      const [item] = await model.create(dataFrom(req.body));
      res.status(201).json(item);
    },
    update: async (req, res) => {
      const [item] = await model.update(Number(req.params.id), dataFrom(req.body));
      if (!item) return res.status(404).json({ error: 'Post not found' });
      res.json(item);
    },
    remove: async (req, res) => {
      const count = await model.remove(Number(req.params.id));
      if (!count) return res.status(404).json({ error: 'Post not found' });
      res.status(204).end();
    },
  };
};
