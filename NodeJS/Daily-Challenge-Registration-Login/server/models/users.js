module.exports = (db) => ({
  all: () => db('users').select('*').orderBy('id'),
  find: (id) => db('users').where({ id }).first(),
  credentials: (username) => db('hashpwd').where({ username }).first(),
  byUsername: (username) => db('users').where({ username }).first(),
  create: (details, password) => db.transaction(async (trx) => {
    const [user] = await trx('users').insert(details).returning('*');
    await trx('hashpwd').insert({ username: user.username, password });
    return user;
  }),
  update: (id, details, password) => db.transaction(async (trx) => {
    const current = await trx('users').where({ id }).forUpdate().first();
    if (!current) return null;
    let user = current;
    if (Object.keys(details).length) {
      [user] = await trx('users').where({ id }).update(details).returning('*');
    }
    if (password) {
      await trx('hashpwd').where({ username: user.username }).update({ password });
    }
    return user;
  }),
});
