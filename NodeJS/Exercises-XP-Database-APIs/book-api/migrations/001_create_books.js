exports.up = (knex) => knex.schema.createTable('books', (table) => {
    table.increments('id').primary();
    table.text('title').notNullable();
    table.text('author').notNullable();
    table.integer('publishedYear').notNullable();
});
exports.down = (knex) => knex.schema.dropTable('books');
