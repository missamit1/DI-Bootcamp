const express = require('express');
module.exports = (db) => {
  const router = express.Router();
  const model = require('../models/books')(db);
  const controller = require('../controllers/books')(model);
  router.param('bookId', (req, res, next, value) => {
    if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < 1 || Number(value) > 2147483647) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    next();
  });
  router.get('/', controller.list);
  router.get('/:bookId', controller.get);
  router.post('/', controller.create);
  return router;
};
