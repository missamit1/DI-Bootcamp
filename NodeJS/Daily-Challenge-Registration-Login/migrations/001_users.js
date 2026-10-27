exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 254).unique();
    table.string('username', 100).notNullable().unique();
    table.string('first_name', 100);
    table.string('last_name', 100);
  });
  await knex.schema.createTable('hashpwd', (table) => {
    table.increments('id').primary();
    table.string('username', 100).notNullable().unique()
      .references('username').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    table.string('password', 60).notNullable();
  });
};
exports.down = async (knex) => {
  await knex.schema.dropTable('hashpwd');
  await knex.schema.dropTable('users');
};
