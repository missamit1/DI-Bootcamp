const express = require('express');
const path = require('node:path');
function createApp(file = path.join(__dirname, 'users.json')) {
  const app = express();
  app.use(express.json({ limit: '16kb' }));
  app.use(require('./routes/users')(require('./store')(file)));
  app.get('/', (req, res) => res.redirect('/login.html'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
  app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' });
    if ([400, 401, 404, 409, 413].includes(error.status)) return res.status(error.status).json({ error: error.message });
    console.error('Storage error:', error.code || error.name);
    res.status(500).json({ error: 'Unable to access user storage' });
  });
  return app;
}
if (require.main === module) {
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log('Server running on port ' + port));
}
module.exports = { createApp };
