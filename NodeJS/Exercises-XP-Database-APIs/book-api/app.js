const express = require('express');
function createApp(db) {
  const app = express();
  app.use(express.json());
  app.use('/api/books', require('./server/routes/books')(db));
  app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
  app.use((error, req, res, next) => {
    if (error.status === 400 || error.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Invalid request: ' + error.message });
    }
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  });
  return app;
}
if (require.main === module) {
  const db = require('./server/config/db');
  const port = process.env.PORT || 5000;
  db.raw('SELECT 1').then(() => {
    createApp(db).listen(port, () => console.log('Server running on port ' + port));
  }).catch(async (error) => {
    console.error('Database connection failed:', error.message);
    await db.destroy();
    process.exitCode = 1;
  });
}
module.exports = { createApp };
