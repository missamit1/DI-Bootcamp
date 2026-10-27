exports.up = (knex) => knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.text('title').notNullable();
    table.text('content').notNullable();
});
exports.down = (knex) => knex.schema.dropTable('posts');
