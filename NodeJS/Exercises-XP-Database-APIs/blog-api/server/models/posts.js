module.exports = (db) => ({
  all: () => db('posts').select('*').orderBy('id'),
  find: (id) => db('posts').where({ id }).first(),
  create: (data) => db('posts').insert(data).returning('*'),
  update: (id, data) => db('posts').where({ id }).update(data).returning('*'),
  remove: (id) => db('posts').where({ id }).del(),
});
