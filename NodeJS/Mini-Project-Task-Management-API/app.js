const express = require('express');
const path = require('node:path');
const { createStore } = require('./storage/tasks');
function createApp(filePath = path.join(__dirname, 'tasks.json')) {
  const app = express();
  app.use(express.json({ limit: '32kb' }));
  app.use('/tasks', require('./routes/tasks')(createStore(filePath)));
  app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
  app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON body' });
    if (error.type === 'entity.too.large') return res.status(413).json({ error: 'Request body too large' });
    console.error('Task storage error:', error.code || error.name);
    res.status(500).json({ error: 'Unable to access task storage' });
  });
  return app;
}
if (require.main === module) {
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log('Task API running on port ' + port));
}
module.exports = { createApp };
