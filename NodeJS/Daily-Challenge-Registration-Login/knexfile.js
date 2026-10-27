const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || { database: 'user_management' },
  migrations: { directory: path.join(__dirname, 'migrations') },
};
