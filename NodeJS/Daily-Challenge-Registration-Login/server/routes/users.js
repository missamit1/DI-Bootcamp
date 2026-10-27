const express = require('express');
module.exports = (db) => {
  const router = express.Router();
  const controller = require('../controllers/users')(require('../models/users')(db));
  router.param('id', (req, res, next, value) => {
    if (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 2147483647) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    next();
  });
  router.post('/register', controller.register);
  router.post('/login', controller.login);
  router.get('/users', controller.list);
  router.get('/users/:id', controller.get);
  router.put('/users/:id', controller.update);
  return router;
};
