const express = require('express');
function createApp(db) {
  const app = express();
  app.use(express.json());
  app.use(require('./server/routes/users')(db));
  app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
  app.use((error, req, res, next) => {
    if (error.code === '23505') return res.status(409).json({ error: 'Username or email already exists' });
    if (error.status === 400) return res.status(400).json({ error: 'Invalid request' });
    console.error('Request failed:', error.code || error.name);
    res.status(500).json({ error: 'Internal server error' });
  });
  return app;
}
if (require.main === module) {
  const db = require('./server/config/db');
  const port = process.env.PORT || 3000;
  db.raw('SELECT 1').then(() => {
    createApp(db).listen(port, () => console.log('Server running on port ' + port));
  }).catch(async () => {
    console.error('Database connection failed. Check your .env settings.');
    await db.destroy();
    process.exitCode = 1;
  });
}
module.exports = { createApp };
