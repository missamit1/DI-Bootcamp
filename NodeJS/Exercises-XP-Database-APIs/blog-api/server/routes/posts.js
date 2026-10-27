const express = require('express');
module.exports = (db) => {
  const router = express.Router();
  const model = require('../models/posts')(db);
  const controller = require('../controllers/posts')(model);
  router.param('id', (req, res, next, value) => {
    if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < 1 || Number(value) > 2147483647) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    next();
  });
  router.get('/', controller.list);
  router.get('/:id', controller.get);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);
  return router;
};
