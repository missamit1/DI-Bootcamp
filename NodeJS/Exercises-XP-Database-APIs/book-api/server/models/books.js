module.exports = (db) => ({
  all: () => db('books').select('*').orderBy('id'),
  find: (id) => db('books').where({ id }).first(),
  create: (data) => db('books').insert(data).returning('*'),
});
