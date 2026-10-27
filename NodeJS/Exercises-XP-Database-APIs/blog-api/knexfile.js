const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || { database: 'postgres' },
  migrations: { tableName: 'knex_migrations_posts', directory: path.join(__dirname, 'migrations') },
};
