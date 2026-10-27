module.exports = (model) => {
  function dataFrom(body) {
    if (!body || typeof body.title !== 'string' || !body.title.trim() || typeof body.author !== 'string' || !body.author.trim() || !Number.isInteger(body.publishedYear) || body.publishedYear < 0) {
      const error = new Error('Valid title, author, publishedYear are required');
      error.status = 400;
      throw error;
    }
    return { title: body.title.trim(), author: body.author.trim(), publishedYear: body.publishedYear };
  }
  return {
    list: async (req, res) => res.json(await model.all()),
    get: async (req, res) => {
      const item = await model.find(Number(req.params.bookId));
      if (!item) return res.status(404).json({ error: 'Book not found' });
      res.json(item);
    },
    create: async (req, res) => {
      const [item] = await model.create(dataFrom(req.body));
      res.status(201).json(item);
    },
  };
};
